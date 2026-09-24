const PLATFORM_ADMIN_EMAILS = ['sumerasajid99@gmail.com'] as const;

export function isPlatformAdminEmail(email?: string | null) {
  if (!email) return false;
  return PLATFORM_ADMIN_EMAILS.includes(
    email.trim().toLowerCase() as (typeof PLATFORM_ADMIN_EMAILS)[number]
  );
}

export function userHasAdminAccess(
  user?: { role?: string | null; email?: string | null } | null
) {
  if (!user) return false;
  return user.role === 'ADMIN' || isPlatformAdminEmail(user.email);
}
