import { afterEach, describe, expect, it, vi } from 'vitest';
import { isTurnstileEnabled, verifyTurnstileToken } from '@/lib/auth/turnstile';

describe('Cloudflare Turnstile', () => {
  const originalSecret = process.env.TURNSTILE_SECRET_KEY;
  const originalSite = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

  afterEach(() => {
    if (originalSecret === undefined) {
      delete process.env.TURNSTILE_SECRET_KEY;
    } else {
      process.env.TURNSTILE_SECRET_KEY = originalSecret;
    }
    if (originalSite === undefined) {
      delete process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
    } else {
      process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY = originalSite;
    }
    vi.unstubAllGlobals();
  });

  it('skips verification when keys are not configured', async () => {
    delete process.env.TURNSTILE_SECRET_KEY;
    delete process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
    expect(isTurnstileEnabled()).toBe(false);
    await expect(verifyTurnstileToken('')).resolves.toEqual({ ok: true, skipped: true });
  });

  it('rejects an empty token when keys are configured', async () => {
    process.env.TURNSTILE_SECRET_KEY = 'secret';
    process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY = 'site';
    expect(isTurnstileEnabled()).toBe(true);
    await expect(verifyTurnstileToken('')).resolves.toEqual({ ok: false, skipped: false });
  });

  it('accepts a token Cloudflare marks as successful', async () => {
    process.env.TURNSTILE_SECRET_KEY = 'secret';
    process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY = 'site';
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        json: async () => ({ success: true }),
      })
    );
    await expect(verifyTurnstileToken('token', '1.1.1.1')).resolves.toEqual({
      ok: true,
      skipped: false,
    });
  });
});
