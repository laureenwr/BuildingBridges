'use client';

import { Eye } from 'lucide-react';

/**
 * // TEMP: Dashboard preview mode (remove before production)
 */
export function DashboardDevelopmentPreviewBanner() {
  return (
    <div
      role="status"
      className="border-b border-amber-300/90 bg-gradient-to-r from-amber-100 via-amber-50 to-amber-100 px-4 py-2 text-center shadow-sm"
    >
      <p className="flex items-center justify-center gap-2 font-primary text-[0.8rem] font-semibold text-amber-950 sm:text-[0.85rem]">
        <Eye className="h-4 w-4 shrink-0 text-amber-800" aria-hidden />
        Preview Mode — Authentication is disabled for development
      </p>
    </div>
  );
}
