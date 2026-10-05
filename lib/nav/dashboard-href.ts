import { userHasAdminAccess } from '@/lib/auth/admin-emails';
import type { User } from '@/lib/db/schema';

export type PortalNavKey = 'admin' | 'mentor' | 'participant' | 'signIn';
export type PortalUser = { role?: string | null; email?: string | null };

export type PortalNavItem = {
  href: string;
  key: PortalNavKey;
  primary: boolean;
};

/** Main site CTA: sign-in when logged out; primary portal when logged in. */
export function getMarketingDashboardHref(user: User | null | undefined) {
  return getPortalNavItems(user)[0]!.href;
}

/** After login or a visit to /dashboard. Accepts a role string or a user with role/email. */
export function getPostLoginHref(
  roleOrUser?: string | PortalUser | null
) {
  const user = typeof roleOrUser === 'string' || roleOrUser == null
    ? { role: typeof roleOrUser === 'string' ? roleOrUser : null }
    : roleOrUser;
  if (userHasAdminAccess(user)) return '/portal/admin' as const;
  return '/portal' as const;
}

/** Only allow in-app destinations after sign-in. */
export function safeAuthRedirect(
  raw?: string | null
): '/portal' | '/portal/admin' | '/story-tool' | '/logged-in' {
  if (!raw || !raw.startsWith('/') || raw.startsWith('//')) return '/logged-in';
  if (raw === '/portal/admin' || raw.startsWith('/portal/admin/')) return '/portal/admin';
  if (raw === '/portal' || raw.startsWith('/portal/')) return '/portal';
  if (raw === '/story-tool' || raw.startsWith('/story-tool/')) return '/story-tool';
  return '/logged-in';
}

/** One signed-in destination: Admin home, or Portal for everyone else. */
export function getPortalNavItems(user: PortalUser | null | undefined): PortalNavItem[] {
  if (!user) {
    return [{ href: '/sign-in?redirect=/logged-in', key: 'signIn', primary: true }];
  }

  const role = user.role;
  if (userHasAdminAccess(user)) {
    return [{ href: '/portal/admin', key: 'admin', primary: true }];
  }
  if (role === 'MENTOR') {
    return [{ href: '/portal', key: 'mentor', primary: true }];
  }
  return [{ href: '/portal', key: 'participant', primary: true }];
}

export function portalNavLabelKey(key: PortalNavKey) {
  if (key === 'signIn') return 'nav.signIn' as const;
  if (key === 'admin') return 'nav.adminPortal' as const;
  return 'nav.portal' as const;
}
