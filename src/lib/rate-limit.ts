import { Redis } from '@upstash/redis';

const redis = process.env.UPSTASH_REDIS_REST_URL
  ? new Redis({
      url: process.env.UPSTASH_REDIS_REST_URL,
      token: process.env.UPSTASH_REDIS_REST_TOKEN!,
    })
  : null;

export async function checkRateLimit(uid: string, isPro: boolean): Promise<{ allowed: boolean, remaining: number }> {
  if (!redis) return { allowed: true, remaining: 10 }; // Demo mode

  const limit = isPro ? 100 : 10;
  const key = `usage:${uid}:${new Date().toISOString().split('T')[0]}`;

  const current = await redis.get<number>(key) || 0;

  if (current >= limit) {
    return { allowed: false, remaining: 0 };
  }

  await redis.set(key, current + 1, { ex: 86400 }); // Expire after 1 day

  return { allowed: true, remaining: limit - current - 1 };
}
