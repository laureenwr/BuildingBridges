'use client';

import Link from 'next/link';
import { CommunityStories } from '@/components/landing/CommunityStories';
import { useLanguage } from '@/lib/hooks/useLanguage';

export function PostedStoriesPage() {
  const { isDe } = useLanguage();

  return (
    <div className="relative min-h-[calc(100dvh-70px)] overflow-hidden bg-[#1A1033] text-white">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_80%_50%,rgba(145,82,255,0.18)_0%,transparent_70%),radial-gradient(ellipse_40%_60%_at_10%_80%,rgba(107,170,138,0.12)_0%,transparent_70%)]"
        aria-hidden
      />
      <div className="relative z-[1] mx-auto max-w-[1280px] px-6 py-16 sm:px-10 sm:py-20">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="mb-2 text-[0.72rem] font-bold uppercase tracking-[0.13em] text-[#B580FF]">
              {isDe ? 'Veröffentlichte Stories' : 'Published stories'}
            </p>
            <h1 className="font-lora text-[clamp(2rem,3vw,2.6rem)] font-bold leading-tight">
              {isDe ? (
                <>
                  Community-Stories, die <em className="font-normal not-italic text-[#B580FF]">Brücken bauen</em>
                </>
              ) : (
                <>
                  Community stories that <em className="font-normal not-italic text-[#B580FF]">build bridges</em>
                </>
              )}
            </h1>
          </div>
          <Link
            href="/story-tool"
            className="inline-flex items-center justify-center rounded-full border border-[rgba(145,82,255,0.45)] bg-[rgba(145,82,255,0.12)] px-5 py-2.5 text-[0.88rem] font-semibold text-[#B580FF] transition hover:bg-[rgba(145,82,255,0.22)] hover:text-white"
          >
            {isDe ? '← Story-Werkzeug' : '← Story Creation Tool'}
          </Link>
        </div>
        <CommunityStories />
      </div>
    </div>
  );
}
