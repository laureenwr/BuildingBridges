import type { User } from '@/lib/db/schema';

/** Main site “Dashboard” / hero CTA: sign-in when logged out; role-based portal when logged in. */
export function getMarketingDashboardHref(user: User | null | undefined) {
  if (!user) return '/sign-in' as const;
  if (user.role === 'ADMIN') return '/portal/admin' as const;
  return '/portal' as const;
}
