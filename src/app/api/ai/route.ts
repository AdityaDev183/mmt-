import { NextResponse } from 'next/server';
import { callNvidiaAI } from '@/lib/nvidia';
import { trackUsage, saveGeneration } from '@/lib/db';

export async function POST(req: Request) {
  try {
    const { prompt, systemPrompt, model, type, uid } = await req.json();

    if (!uid) {
      return NextResponse.json({ error: "User ID is required" }, { status: 400 });
    }

    // Rate limiting removed - all users have unlimited access

    const result = await callNvidiaAI(prompt, systemPrompt, model);

    // Still log usage and save generation for history, but no limits enforced
    await trackUsage(uid);
    await saveGeneration(uid, type, prompt, result.content);

    return NextResponse.json({
        content: result.content,
        model: result.model
    });
  } catch (error: any) {
    console.error("AI API Route Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
