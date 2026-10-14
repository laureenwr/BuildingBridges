import { redirect } from 'next/navigation';
import { MentorMenteeDashboard } from '@/components/dashboard-portal/MentorMenteeDashboard';
import { getUser } from '@/lib/db/queries';
import { getStoriesSubmittedByUser } from '@/lib/actions/stories';
import { greetingFirstName } from '@/lib/portal/portal-data';

export const dynamic = 'force-dynamic';

export default async function UserPortalHomePage({
  searchParams,
}: {
  searchParams?: { approval?: string; pending?: string };
}) {
  const user = await getUser();
  if (!user) redirect('/sign-in');

  const pendingApproval =
    searchParams?.approval === 'pending' || searchParams?.pending === '1';

  const myStories = await getStoriesSubmittedByUser(user.id);
  return (
    <MentorMenteeDashboard
      greetingName={greetingFirstName(user)}
      pendingApproval={pendingApproval}
      storiesAllowed={!pendingApproval}
      myStories={myStories}
    />
  );
}
