import { describe, expect, it } from 'vitest';
import { allowSignupPost } from '@/lib/auth/signup-http-limit';
import { consumeSignupRateLimit, evaluateSignupGuard } from '@/lib/auth/signup-guard';

describe('signup flood protection', () => {
  it('allows a normal person to retry a few times, then pauses the IP', () => {
    const ip = `signup-limit-${Date.now()}`;
    expect(allowSignupPost(ip)).toBe(true);
    expect(allowSignupPost(ip)).toBe(true);
  });

  it('stops a burst of signup posts from one IP', () => {
    const ip = `signup-burst-${Date.now()}`;
    const allowed = Array.from({ length: 31 }, () => allowSignupPost(ip));
    expect(allowed.filter(Boolean).length).toBe(30);
    expect(allowed[30]).toBe(false);
  });

  it('keeps ordinary sign-ups working under the server-side guard', () => {
    const now = Date.now();
    expect(
      evaluateSignupGuard({
        honeypot: '',
        startedAt: String(now - 4_000),
        email: 'laureen.warikoru@uni-due.de',
        name: 'Laureen Warikoru',
        ip: `human-${now}`,
        now,
      })
    ).toEqual({ ok: true });
  });

  it('rate-limits completed signup attempts per IP', () => {
    const ip = `guard-burst-${Date.now()}`;
    const results = Array.from({ length: 6 }, () => consumeSignupRateLimit(ip));
    expect(results.filter(Boolean).length).toBe(4);
    expect(results[4]).toBe(false);
  });
});
