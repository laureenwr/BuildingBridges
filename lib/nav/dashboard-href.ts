import type { User } from '@/lib/db/schema';

/** Main site “Dashboard” / hero CTA: sign-in when logged out; role-based portal when logged in. */
export function getMarketingDashboardHref(user: User | null | undefined) {
  if (!user) return '/sign-in' as const;
  if (user.role === 'ADMIN') return '/portal/admin' as const;
  return '/portal' as const;
}

/** After login or a visit to /dashboard: admins use the real Admin Portal. */
export function getPostLoginHref(role?: string | null) {
  if (role === 'ADMIN') return '/portal/admin' as const;
  return '/dashboard' as const;
}
