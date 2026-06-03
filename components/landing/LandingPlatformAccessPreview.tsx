'use client';

import Link from 'next/link';
import { useTranslation } from 'react-i18next';

/** // TEMP: Dashboard preview mode (remove before production) */
function showPlatformPreviewAccess(): boolean {
  return process.env.NODE_ENV !== 'production';
}

export function LandingPlatformAccessPreview() {
  const { t } = useTranslation('common');

  if (!showPlatformPreviewAccess()) return null;

  return (
    <section className="border-y border-[#ECE6FF] bg-white/80">
      <div className="mx-auto flex w-full max-w-[1280px] flex-col items-center gap-4 px-6 py-8 text-center sm:px-10">
        {/* // TEMP: Dashboard preview mode (remove before production) */}
        <h2 className="text-lg font-semibold text-[#1A1033]">{t('platformPreview.title')}</h2>
        <div className="flex flex-wrap items-center justify-center gap-2.5">
          <Link
            href="/portal"
            className="rounded-full border border-[#CAB8F9] px-4 py-1.5 text-sm font-medium text-[#5A4A88] transition hover:border-[#9152FF] hover:text-[#7339E0]"
          >
            {t('platformPreview.userDashboard')}
          </Link>
          <Link
            href="/portal/admin"
            className="rounded-full border border-[#CAB8F9] px-4 py-1.5 text-sm font-medium text-[#5A4A88] transition hover:border-[#9152FF] hover:text-[#7339E0]"
          >
            {t('platformPreview.adminDashboard')}
          </Link>
        </div>
      </div>
    </section>
  );
}
