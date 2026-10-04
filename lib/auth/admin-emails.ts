const HARDCODED_PLATFORM_ADMIN_EMAILS = [
  'sumerasajid99@gmail.com',
  'laureen.warikoru@uni-due.de',
] as const;

function extraAdminEmailsFromEnv() {
  const raw = process.env.PLATFORM_ADMIN_EMAILS || process.env.ADMIN_EMAILS || '';
  return raw
    .split(',')
    .map((value) => value.trim().toLowerCase())
    .filter(Boolean);
}

function platformAdminEmailSet() {
  return new Set<string>([...HARDCODED_PLATFORM_ADMIN_EMAILS, ...extraAdminEmailsFromEnv()]);
}

export function isPlatformAdminEmail(email?: string | null) {
  if (!email) return false;
  return platformAdminEmailSet().has(email.trim().toLowerCase());
}

export function userHasAdminAccess<T extends { role?: string | null; email?: string | null }>(
  user?: T | null
): user is T {
  if (!user) return false;
  return user.role === 'ADMIN' || isPlatformAdminEmail(user.email);
}

/** Any signed-in mentor, mentee, or admin can open the user portal and submit stories. */
export function userCanAccessUserPortal<T extends { role?: string | null; email?: string | null }>(
  user?: T | null
): user is T {
  return Boolean(user);
}

export function userCanSubmitStories<T extends { role?: string | null; email?: string | null }>(
  user?: T | null
): user is T {
  return Boolean(user);
}
