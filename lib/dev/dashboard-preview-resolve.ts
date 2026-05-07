import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { getUser } from '@/lib/db/queries';
import { getDashboardPreviewMockUser } from '@/lib/dev/dashboard-preview-mock';
import { isDashboardPreviewModeEnabled } from '@/lib/dev/dashboard-preview-mode';
import type { User } from '@/lib/db/schema';

/**
 * // TEMP: Dashboard preview mode (remove before production)
 */
function bypassFromRequest(): boolean {
  const h = headers();
  return isDashboardPreviewModeEnabled({ hostHeader: h.get('host') });
}

/**
 * // TEMP: Dashboard preview mode (remove before production)
 */
export async function getUserOrPreviewForPortalUser(): Promise<User | null> {
  const auth = await getUser();
  if (auth) return auth;
  if (bypassFromRequest()) return getDashboardPreviewMockUser('mentee');
  return null;
}

/**
 * // TEMP: Dashboard preview mode (remove before production)
 */
export async function getUserOrPreviewForPortalAdmin(): Promise<User | null> {
  const auth = await getUser();
  if (auth) return auth;
  if (bypassFromRequest()) return getDashboardPreviewMockUser('admin');
  return null;
}

/**
 * // TEMP: Dashboard preview mode (remove before production)
 */
export async function resolveUserPortalShell(): Promise<{
  user: User;
  showDevelopmentPreviewBanner: boolean;
}> {
  const bypass = bypassFromRequest();
  const auth = await getUser();
  const user = auth ?? (bypass ? getDashboardPreviewMockUser('mentee') : null);
  if (!user) {
    redirect('/sign-in');
  }
  return { user, showDevelopmentPreviewBanner: bypass };
}

/**
 * // TEMP: Dashboard preview mode (remove before production)
 */
export async function resolveAdminPortalShell(): Promise<{
  user: User;
  showDevelopmentPreviewBanner: boolean;
}> {
  const bypass = bypassFromRequest();
  const auth = await getUser();
  const user = auth ?? (bypass ? getDashboardPreviewMockUser('admin') : null);
  if (!user) {
    redirect('/sign-in');
  }
  if (user.role !== 'ADMIN') {
    redirect('/portal');
  }
  return { user, showDevelopmentPreviewBanner: bypass };
}
