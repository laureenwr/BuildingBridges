import { redirect } from 'next/navigation';
import { MentorMenteeDashboard } from '@/components/dashboard-portal/MentorMenteeDashboard';
import { getUserOrPreviewForPortalUser } from '@/lib/dev/dashboard-preview-resolve';

export default async function UserPortalHomePage({
  searchParams,
}: {
  searchParams?: { approval?: string; pending?: string };
}) {
  const user = await getUserOrPreviewForPortalUser();
  if (!user) redirect('/sign-in');

  const pendingApproval =
    searchParams?.approval === 'pending' || searchParams?.pending === '1';

  // TODO: derive from DB — users.approval_status === 'pending' | 'approved' | 'rejected'
  const storiesAllowed = !pendingApproval;

  const greetingName =
    (user.name?.trim() && user.name.trim().split(/\s+/)[0]) ||
    (user.email?.includes('@') ? user.email!.split('@')[0] : 'Amina');

  return (
    <MentorMenteeDashboard
      greetingName={greetingName}
      pendingApproval={pendingApproval}
      storiesAllowed={storiesAllowed}
    />
  );
}
