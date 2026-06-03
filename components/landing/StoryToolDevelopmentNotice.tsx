'use client';

import Link from 'next/link';
import { Construction } from 'lucide-react';
import { useLanguage } from '@/lib/hooks/useLanguage';

/** Non-blocking notice: story tool is in development; preview content remains usable below. */
export function StoryToolDevelopmentNotice() {
  const { isDe } = useLanguage();

  return (
    <div
      id="story-tool-notice"
      role="status"
      className="mb-10 flex scroll-mt-24 flex-wrap items-start gap-4 rounded-[20px] border border-amber-400/35 bg-gradient-to-r from-amber-500/15 via-amber-400/10 to-[rgba(145,82,255,0.12)] px-5 py-4 shadow-[0_4px_20px_rgba(240,165,0,0.08)] sm:px-6 sm:py-5"
    >
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-amber-400/20 text-amber-200">
        <Construction className="h-5 w-5" aria-hidden />
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-[0.72rem] font-bold uppercase tracking-[0.12em] text-amber-200">
          {isDe ? 'In Entwicklung' : 'Under development'}
        </p>
        <p className="mt-1 text-[0.95rem] font-semibold text-white">
          {isDe
            ? 'Das Co-Creation Story-Werkzeug wird derzeit mit der Community aufgebaut.'
            : 'The co-creation story tool is currently being built with the community.'}
        </p>
        <p className="mt-2 max-w-[720px] text-[0.88rem] leading-relaxed text-white/70">
          {isDe
            ? 'Die Vorschau unten ist bereits nutzbar: geführte Schritte, Einstellungen, KI-Story-Generator (Beispielmodus) und veröffentlichte Community-Stories.'
            : 'The preview below is already available: guided steps, settings, AI story generator (sample mode), and published community stories.'}
        </p>
        <div className="mt-3 flex flex-wrap gap-4">
          <a
            href="#story-tool-preview"
            className="inline-flex text-[0.84rem] font-bold text-[#EDE5FF] underline-offset-2 hover:text-white hover:underline"
          >
            {isDe ? 'Zur Vorschau ↓' : 'Jump to preview ↓'}
          </a>
          <Link
            href="/stories"
            className="inline-flex text-[0.84rem] font-bold text-[#B580FF] underline-offset-2 hover:text-[#EDE5FF] hover:underline"
          >
            {isDe ? 'Veröffentlichte Stories →' : 'Published stories →'}
          </Link>
        </div>
      </div>
    </div>
  );
}
