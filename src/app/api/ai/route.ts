import { NextResponse } from 'next/server';
import { callNvidiaAI } from '@/lib/nvidia';
import { checkRateLimit } from '@/lib/rate-limit';
import { trackUsage, saveGeneration, getUserProfile } from '@/lib/db';

export async function POST(req: Request) {
  try {
    const { prompt, systemPrompt, model, type, uid } = await req.json();

    if (!uid) {
      return NextResponse.json({ error: "User ID is required" }, { status: 400 });
    }

    // 1. Get user profile to check pro status
    const profile = await getUserProfile(uid);
    const isPro = profile?.isPro || false;

    // 2. Check Rate Limit
    const { allowed, remaining } = await checkRateLimit(uid, isPro);
    if (!allowed) {
      return NextResponse.json({
        error: "Rate limit exceeded. Upgrade to Pro for more generations.",
        remaining
      }, { status: 429 });
    }

    // 3. Call AI
    const result = await callNvidiaAI(prompt, systemPrompt, model);

    // 4. Track usage and save generation in background (or wait)
    await trackUsage(uid);
    await saveGeneration(uid, type, prompt, result.content);

    return NextResponse.json({ ...result, remaining });
  } catch (error: any) {
    console.error("AI API Route Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
