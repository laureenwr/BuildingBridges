import { DashboardLayout } from '@/components/dashboard-portal/DashboardLayout';
import { PortalPreviewUserBridge } from '@/components/dashboard-portal/PortalPreviewUserBridge';
import { resolveUserPortalShell } from '@/lib/dev/dashboard-preview-resolve';

export default async function UserPortalLayout({ children }: { children: React.ReactNode }) {
  const { user, showDevelopmentPreviewBanner } = await resolveUserPortalShell();

  const userName =
    user.name?.trim() ||
    (user.email?.includes('@') ? user.email.split('@')[0]!.replace(/\./g, ' ') : null) ||
    'Community member';

  const roleLabel = user.role === 'MENTOR' ? 'Mentor' : 'Mentee';

  return (
    <>
      {/* // TEMP: Dashboard preview mode (remove before production) */}
      <PortalPreviewUserBridge variant="mentee" />
      <DashboardLayout
        variant="user"
        userName={userName}
        roleLabel={roleLabel}
        dashboardHref="/portal"
        developmentPreviewBanner={showDevelopmentPreviewBanner}
      >
        {children}
      </DashboardLayout>
    </>
  );
}
