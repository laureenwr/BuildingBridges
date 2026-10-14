const DISPOSABLE_EMAIL_DOMAINS = new Set([
  '10minutemail.com',
  'guerrillamail.com',
  'guerrillamail.net',
  'mailinator.com',
  'tempmail.com',
  'temp-mail.org',
  'throwawaymail.com',
  'trashmail.com',
  'yopmail.com',
  'moakt.com',
  'sharklasers.com',
  'grr.la',
  'dispostable.com',
  'getnada.com',
  'mailnesia.com',
  'maildrop.cc',
  'fakeinbox.com',
  'emailondeck.com',
  'mintemail.com',
  'mytemp.email',
]);

const SIGNUP_WINDOW_MS = 15 * 60 * 1000;
const MAX_SIGNUPS_PER_WINDOW = 4;
const MIN_FORM_MS = 800;

const signupAttempts = new Map<string, number[]>();

export type SignupGuardResult =
  | { ok: true }
  | { ok: false; code: 'honeypot' | 'too-fast' | 'blocked-email' | 'too-many-signups' | 'suspicious-name' };

function emailDomain(email: string) {
  const at = email.lastIndexOf('@');
  if (at < 0) return '';
  return email.slice(at + 1).trim().toLowerCase();
}

export function isDisposableEmail(email: string) {
  const domain = emailDomain(email);
  if (!domain) return true;
  if (DISPOSABLE_EMAIL_DOMAINS.has(domain)) return true;
  return [...DISPOSABLE_EMAIL_DOMAINS].some((blocked) => domain.endsWith(`.${blocked}`));
}

export function isSuspiciousDisplayName(name: string) {
  const value = name.trim();
  if (!value) return false;
  const lower = value.toLowerCase();
  if (lower.includes('http://') || lower.includes('https://') || lower.includes('www.')) return true;
  if (/\d{6,}/.test(value)) return true;
  if ((value.match(/\d/g) ?? []).length > value.length / 2) return true;
  return false;
}

export function isLikelyAutomatedAccount(input: { name?: string | null; email?: string | null }) {
  const email = input.email?.trim().toLowerCase() ?? '';
  const name = input.name?.trim() ?? '';
  if (email && isDisposableEmail(email)) return true;
  if (name && isSuspiciousDisplayName(name)) return true;
  const local = email.split('@')[0] ?? '';
  if (local.length >= 18 && /^[a-z0-9]+$/i.test(local) && !local.includes('.')) return true;
  return false;
}

export function consumeSignupRateLimit(ip: string) {
  const key = ip.trim() || 'unknown';
  const now = Date.now();
  const recent = (signupAttempts.get(key) ?? []).filter((timestamp) => now - timestamp < SIGNUP_WINDOW_MS);
  if (recent.length >= MAX_SIGNUPS_PER_WINDOW) {
    signupAttempts.set(key, recent);
    return false;
  }
  recent.push(now);
  signupAttempts.set(key, recent);
  return true;
}

export function evaluateSignupGuard(input: {
  honeypot?: string | null;
  startedAt?: string | null;
  email: string;
  name?: string | null;
  ip?: string | null;
  now?: number;
}): SignupGuardResult {
  if (String(input.honeypot ?? '').trim()) {
    return { ok: false, code: 'honeypot' };
  }

  const startedAt = Number(input.startedAt);
  const now = input.now ?? Date.now();
  if (!Number.isFinite(startedAt) || now - startedAt < MIN_FORM_MS) {
    return { ok: false, code: 'too-fast' };
  }

  if (isDisposableEmail(input.email)) {
    return { ok: false, code: 'blocked-email' };
  }

  if (input.name && isSuspiciousDisplayName(input.name)) {
    return { ok: false, code: 'suspicious-name' };
  }

  if (!consumeSignupRateLimit(input.ip ?? 'unknown')) {
    return { ok: false, code: 'too-many-signups' };
  }

  return { ok: true };
}
