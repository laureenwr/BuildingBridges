import { requireAdminUser, requireSignedInUser } from '@/lib/auth/access';
import { getUser } from '@/lib/db/queries';
import type { User } from '@/lib/db/schema';

export async function getUserOrPreviewForPortalUser(): Promise<User | null> {
  return getUser();
}

export async function getUserOrPreviewForPortalAdmin(): Promise<User | null> {
  return getUser();
}

export async function resolveUserPortalShell(): Promise<{
  user: User;
  showDevelopmentPreviewBanner: boolean;
}> {
  const user = await requireSignedInUser();
  return { user, showDevelopmentPreviewBanner: false };
}

export async function resolveAdminPortalShell(): Promise<{
  user: User;
  showDevelopmentPreviewBanner: boolean;
}> {
  const user = await requireAdminUser();
  return { user, showDevelopmentPreviewBanner: false };
}
