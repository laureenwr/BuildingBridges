import { redirect } from 'next/navigation';
import { AdminPortalHome } from '@/components/dashboard-portal/AdminPortalHome';
import { getPendingStoriesForReview } from '@/lib/actions/stories';
import { getUser } from '@/lib/db/queries';
import { getRegisteredUsers, getStoryCounts, getUserCount, greetingFirstName } from '@/lib/portal/portal-data';

export const dynamic = 'force-dynamic';

export default async function AdminPortalHomePage() {
  const user = await getUser();
  if (!user) redirect('/sign-in');

  const [storyRows, users, userCount, storyCounts] = await Promise.all([
    getPendingStoriesForReview(),
    getRegisteredUsers(12),
    getUserCount(),
    getStoryCounts(),
  ]);

  return (
    <AdminPortalHome
      greetingName={greetingFirstName(user)}
      storyRows={storyRows}
      users={users}
      userCount={userCount}
      pendingStoryCount={storyCounts.pending}
    />
  );
}
