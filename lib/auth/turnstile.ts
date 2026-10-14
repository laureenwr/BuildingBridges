const SITEVERIFY_URL = 'https://challenges.cloudflare.com/turnstile/v0/siteverify';

export function isTurnstileEnabled() {
  return Boolean(
    process.env.TURNSTILE_SECRET_KEY?.trim() &&
      process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY?.trim()
  );
}

export async function verifyTurnstileToken(
  token: string,
  ip?: string
): Promise<{ ok: boolean; skipped: boolean }> {
  if (!isTurnstileEnabled()) {
    return { ok: true, skipped: true };
  }

  const secret = process.env.TURNSTILE_SECRET_KEY!.trim();
  const response = token.trim();
  if (!response) {
    return { ok: false, skipped: false };
  }

  try {
    const body = new URLSearchParams({ secret, response });
    if (ip && ip !== 'unknown') {
      body.set('remoteip', ip);
    }

    const res = await fetch(SITEVERIFY_URL, {
      method: 'POST',
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
      body,
    });
    const data = (await res.json()) as { success?: boolean };
    return { ok: Boolean(data.success), skipped: false };
  } catch {
    return { ok: false, skipped: false };
  }
}
