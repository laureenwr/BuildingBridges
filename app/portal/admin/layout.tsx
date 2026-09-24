import { DashboardLayout } from '@/components/dashboard-portal/DashboardLayout';
import { resolveAdminPortalShell } from '@/lib/dev/dashboard-preview-resolve';

export default async function AdminPortalLayout({ children }: { children: React.ReactNode }) {
  const { user } = await resolveAdminPortalShell();

  const userName =
    user.name?.trim() ||
    (user.email?.includes('@') ? user.email.split('@')[0]!.replace(/\./g, ' ') : null) ||
    'Moderator';

  return (
    <DashboardLayout variant="admin" userName={userName} roleLabel="Admin" dashboardHref="/portal/admin">
      {children}
    </DashboardLayout>
  );
}
