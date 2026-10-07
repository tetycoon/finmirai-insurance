import "server-only";

/**
 * Minimal fixed-window rate limiter (Plan §15: CAPTCHA/rate limiting against spam).
 * In-memory, so it is per server instance — adequate for a single Node host. On serverless or
 * multi-instance hosting, replace with a shared store (e.g. Redis/Upstash) and add CAPTCHA.
 */
const WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS = 6;
const hits = new Map<string, { count: number; resetAt: number }>();

export function rateLimit(key: string): { allowed: boolean; retryAfterSeconds: number } {
  const now = Date.now();
  if (hits.size > 5000) {
    for (const [k, v] of hits) if (v.resetAt <= now) hits.delete(k);
  }
  const entry = hits.get(key);
  if (!entry || entry.resetAt <= now) {
    hits.set(key, { count: 1, resetAt: now + WINDOW_MS });
    return { allowed: true, retryAfterSeconds: 0 };
  }
  entry.count += 1;
  return { allowed: entry.count <= MAX_REQUESTS, retryAfterSeconds: Math.ceil((entry.resetAt - now) / 1000) };
}
