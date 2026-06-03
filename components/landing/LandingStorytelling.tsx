'use client';

import Link from 'next/link';
import { useLanguage } from '@/lib/hooks/useLanguage';

export function LandingStorytelling() {
  const { isDe } = useLanguage();
  return (
    <section
      id="storytelling"
      className="relative overflow-hidden bg-[#1A1033] px-6 py-24 text-white sm:px-10 sm:py-28"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_80%_50%,rgba(145,82,255,0.18)_0%,transparent_70%),radial-gradient(ellipse_40%_60%_at_10%_80%,rgba(107,170,138,0.12)_0%,transparent_70%)]"
        aria-hidden
      />
      <div className="relative z-[1] mx-auto max-w-[1280px]">
        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-2 lg:gap-20">
          <div>
            <p className="mb-3 text-[0.72rem] font-bold uppercase tracking-[0.13em] text-[#B580FF]">
              {isDe ? 'Story-Werkzeug · TP3' : 'Story Creation Tool · TP3'}
            </p>
            <h2 className="font-lora text-[clamp(2rem,3vw,2.8rem)] font-bold leading-tight tracking-tight">
              {isDe ? (
                <>Ein gemeinsam gestalteter Raum für <em className="font-normal not-italic text-[#B580FF]">deine Geschichte</em></>
              ) : (
                <>A co-creative space for <em className="font-normal not-italic text-[#B580FF]">your story</em></>
              )}
            </h2>
            <p className="mt-4 max-w-[420px] text-base leading-relaxed text-white/70">
              {isDe
                ? 'Entdecke das digitale Storytelling-Tool: geführte Schritte, Datenschutz-Einstellungen und optionale KI-Unterstützung – entwickelt mit und für die Community.'
                : 'Explore the digital storytelling tool: guided steps, privacy controls, and optional AI support - developed with and for the community.'}
            </p>
          </div>
          <div className="rounded-[24px] bg-[#9152FF] p-8 text-white shadow-[0_12px_48px_rgba(145,82,255,0.18)]">
            <p className="mb-2 text-[0.72rem] font-bold uppercase tracking-[0.12em] text-white/65">{isDe ? 'Story-Tool' : 'Story tool'}</p>
            <h3 className="font-lora text-xl font-bold">{isDe ? 'Erstelle und teile deine Geschichte' : 'Create and share your story'}</h3>
            <p className="mt-3 text-[0.88rem] leading-relaxed opacity-80">
              {isDe
                ? 'In Entwicklung — Vorschau, KI-Generator und Community-Stories sind schon nutzbar.'
                : 'Under development — preview, AI generator, and community stories are already available to explore.'}
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Link
                href="/story-tool"
                className="inline-flex w-full items-center justify-center rounded-full bg-white px-6 py-3.5 text-center font-primary text-[0.95rem] font-bold text-[#9152FF] shadow-md transition hover:bg-[#EDE5FF] sm:w-auto"
              >
                {isDe ? 'Story-Werkzeug öffnen' : 'Open Story Creation Tool'}
              </Link>
              <Link
                href="/stories"
                className="inline-flex w-full items-center justify-center rounded-full border-2 border-white/35 bg-white/10 px-6 py-3.5 text-center font-primary text-[0.95rem] font-bold text-white shadow-md backdrop-blur-sm transition hover:border-white/55 hover:bg-white/20 sm:w-auto"
              >
                {isDe ? 'Veröffentlichte Stories' : 'Published stories'}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
