import { DashboardLayout } from '@/components/dashboard-portal/DashboardLayout';
import { PortalPreviewUserBridge } from '@/components/dashboard-portal/PortalPreviewUserBridge';
import { resolveAdminPortalShell } from '@/lib/dev/dashboard-preview-resolve';

export default async function AdminPortalLayout({ children }: { children: React.ReactNode }) {
  const { user, showDevelopmentPreviewBanner } = await resolveAdminPortalShell();

  const userName =
    user.name?.trim() ||
    (user.email?.includes('@') ? user.email.split('@')[0]!.replace(/\./g, ' ') : null) ||
    'Moderator';

  return (
    <>
      {/* // TEMP: Dashboard preview mode (remove before production) */}
      <PortalPreviewUserBridge variant="admin" />
      <DashboardLayout
        variant="admin"
        userName={userName}
        roleLabel="Admin"
        dashboardHref="/portal/admin"
        developmentPreviewBanner={showDevelopmentPreviewBanner}
      >
        {children}
      </DashboardLayout>
    </>
  );
}
