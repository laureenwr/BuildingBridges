import { DashboardLayout } from '@/components/dashboard-portal/DashboardLayout';
import { resolveUserPortalShell } from '@/lib/dev/dashboard-preview-resolve';

export default async function UserPortalLayout({ children }: { children: React.ReactNode }) {
  const { user } = await resolveUserPortalShell();

  const userName =
    user.name?.trim() ||
    (user.email?.includes('@') ? user.email.split('@')[0]!.replace(/\./g, ' ') : null) ||
    'Community member';

  const roleLabel = user.role === 'ADMIN' ? 'Admin' : user.role === 'MENTOR' ? 'Mentor' : 'Mentee';

  return (
    <DashboardLayout variant="user" userName={userName} roleLabel={roleLabel} dashboardHref="/portal">
      {children}
    </DashboardLayout>
  );
}
