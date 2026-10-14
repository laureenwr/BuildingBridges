'use client';

import Link from 'next/link';
import { useLanguage } from '@/lib/hooks/useLanguage';
import { portalText } from '@/lib/portal/portal-copy';

export function PortalPageIntro({
  titleEn,
  titleDe,
  bodyEn,
  bodyDe,
  boxed = true,
  backHref,
  backEn = '← Back to overview',
  backDe = '← Zurück zur Übersicht',
}: {
  titleEn: string;
  titleDe: string;
  bodyEn: string;
  bodyDe: string;
  boxed?: boolean;
  backHref?: string;
  backEn?: string;
  backDe?: string;
}) {
  const { isDe } = useLanguage();
  const inner = (
    <>
      <h1 className="font-lora text-2xl font-semibold text-[#1A1033]">
        {portalText(isDe, titleEn, titleDe)}
      </h1>
      <p className="mt-2 max-w-prose text-[0.95rem] leading-relaxed text-[#5C5275]">{portalText(isDe, bodyEn, bodyDe)}</p>
      {backHref ? (
        <Link
          href={backHref}
          className="mt-6 inline-flex rounded-full bg-[#EDE4FF] px-6 py-2.5 text-[0.88rem] font-semibold text-[#7339E0] hover:bg-[#E4DAFF]"
        >
          {portalText(isDe, backEn, backDe)}
        </Link>
      ) : null}
    </>
  );

  if (!boxed) {
    return <header>{inner}</header>;
  }

  return (
    <div className="rounded-2xl border border-[rgba(145,82,255,0.12)] bg-white p-8 shadow-[0_10px_36px_rgba(145,82,255,0.09)]">
      {inner}
    </div>
  );
}
