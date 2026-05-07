'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import { TopNav } from '@/components/dashboard-portal/TopNav';
import { Sidebar } from '@/components/dashboard-portal/Sidebar';
import { DashboardDevelopmentPreviewBanner } from '@/components/dashboard-portal/DashboardDevelopmentPreviewBanner';

export type DashboardLayoutProps = {
  variant: 'user' | 'admin';
  /** Shown near the avatar in the header */
  roleLabel: 'Mentee' | 'Mentor' | 'Admin';
  userName: string;
  children: React.ReactNode;
  /** TopNav “Dashboard” button target */
  dashboardHref?: string;
  /** // TEMP: Dashboard preview mode (remove before production) */
  developmentPreviewBanner?: boolean;
};

/** // TEMP: Dashboard preview mode (remove before production) — matches fixed banner stacked height */
const PREVIEW_BANNER_OFFSET = '2.75rem';

export function DashboardLayout({
  variant,
  roleLabel,
  userName,
  children,
  dashboardHref,
  developmentPreviewBanner = false,
}: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const contentPadTop = developmentPreviewBanner
    ? `calc(70px + ${PREVIEW_BANNER_OFFSET})`
    : '70px';

  return (
    <div className="min-h-[100dvh] bg-[#F2EEFF] text-[#1A1033]">
      <TopNav
        userName={userName}
        roleLabel={roleLabel}
        onMenuClick={() => setSidebarOpen(true)}
        dashboardHref={dashboardHref ?? (variant === 'admin' ? '/portal/admin' : '/portal')}
      />

      {developmentPreviewBanner ? (
        <div className="fixed left-0 right-0 top-[70px] z-[998]">
          {/* // TEMP: Dashboard preview mode (remove before production) */}
          <DashboardDevelopmentPreviewBanner />
        </div>
      ) : null}

      <div className="mx-auto flex max-w-[1600px]" style={{ paddingTop: contentPadTop }}>
        <Sidebar
          variant={variant}
          open={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          developmentPreviewBanner={developmentPreviewBanner}
        />
        <div
          className={cn(
            'min-w-0 flex-1 px-4 py-6 sm:px-6 lg:px-8 lg:py-8',
          )}
        >
          <div className="lg:pl-0">{children}</div>
        </div>
      </div>
    </div>
  );
}
