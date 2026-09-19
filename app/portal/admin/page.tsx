import { redirect } from 'next/navigation';
import { AdminPortalHome } from '@/components/dashboard-portal/AdminPortalHome';
import { getPendingStoriesForReview } from '@/lib/actions/stories';
import { getUserOrPreviewForPortalAdmin } from '@/lib/dev/dashboard-preview-resolve';

export const dynamic = 'force-dynamic';

export default async function AdminPortalHomePage() {
  const user = await getUserOrPreviewForPortalAdmin();
  if (!user || user.role !== 'ADMIN') redirect(user ? '/portal' : '/sign-in');

  const greetingName =
    (user.name?.trim() && user.name.trim().split(/\s+/)[0]) ||
    (user.email?.includes('@') ? user.email!.split('@')[0] : 'Amina');

  const storyRows = await getPendingStoriesForReview();

  return <AdminPortalHome greetingName={greetingName} storyRows={storyRows} />;
}
