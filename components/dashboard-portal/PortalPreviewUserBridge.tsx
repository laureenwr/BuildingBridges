'use client';

/**
 * // TEMP: Dashboard preview mode (remove before production)
 * Injects mock user into UserProvider when there is no session so global auth context matches portal shells.
 */

import { useEffect, useRef } from 'react';
import { useUser } from '@/lib/auth/index';
import { getDashboardPreviewMockUser } from '@/lib/dev/dashboard-preview-mock';
import { isDashboardPreviewModeEnabled } from '@/lib/dev/dashboard-preview-mode';

function clientBypassActive() {
  if (typeof window === 'undefined') return false;
  return isDashboardPreviewModeEnabled({
    hostname: window.location.hostname,
    hostHeader: window.location.host,
  });
}

export function PortalPreviewUserBridge({ variant }: { variant: 'mentee' | 'admin' }) {
  const { setUser } = useUser();
  const clearMockRef = useRef(false);

  useEffect(() => {
    if (!clientBypassActive()) return;

    clearMockRef.current = false;

    setUser((prev) => {
      if (prev != null) return prev;
      clearMockRef.current = true;
      return getDashboardPreviewMockUser(variant);
    });

    return () => {
      if (clearMockRef.current) setUser(null);
      clearMockRef.current = false;
    };
  }, [setUser, variant]);

  return null;
}
