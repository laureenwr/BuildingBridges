'use client';

import { useState } from 'react';
import Link from 'next/link';
import { UpcomingWorkshopAlert } from '@/components/workshops/UpcomingWorkshopAlert';
import { useLanguage } from '@/lib/hooks/useLanguage';

type LocalizedText = { en: string; de: string };

const featuredNextUp = {
  eyebrow: { en: 'Next up', de: 'Als Nächstes' },
  title: {
    en: 'Online workshop: Evaluating storytelling formats with mentors',
    de: 'Online-Workshop: Storytelling-Formate mit Mentor:innen evaluieren',
  },
  meta: {
    en: 'Friday, July 31, 2026 · Time TBD · 90 minutes · Zoom + Miro',
    de: 'Freitag, 31.07.2026 · Uhrzeit folgt · 90 Minuten · Zoom + Miro',
  },
  description: {
    en: 'Help shape the Building Bridges storytelling platform — explore prototypes, share feedback, and co-create ideas for an accessible digital space.',
    de: 'Gestalte die Building-Bridges-Storytelling-Plattform mit — erkunde Prototypen, teile Feedback und entwickle Ideen für einen zugänglichen digitalen Raum.',
  },
};

const pastWorkshops: { date: LocalizedText; title: LocalizedText }[] = [
  {
    date: { en: 'Thursday, December 18, 2025', de: 'Donnerstag, 18.12.2025' },
    title: { en: 'Perlen & Power – Johanna-Eck', de: 'Perlen & Power – Johanna-Eck' },
  },
  {
    date: { en: 'Wednesday, October 8, 2025 · 1:00–4:00 PM', de: 'Mittwoch, 08.10.2025 · 13:00–16:00 Uhr' },
    title: { en: 'Get-to-know meeting with Building Bridges', de: 'Kennenlerntreffen mit Building Bridges' },
  },
  {
    date: { en: 'Saturday, November 22, 2025', de: 'Samstag, 22.11.2025' },
    title: { en: 'Opening event', de: 'Eröffnungsveranstaltung' },
  },
  {
    date: { en: 'Friday, June 20–22, 2025', de: 'Freitag, 20.–22.06.2025' },
    title: { en: 'Basic Training Group I', de: 'Grundausbildung Gruppe I' },
  },
];

function pick<T extends LocalizedText>(item: T, isDe: boolean): string {
  return isDe ? item.de : item.en;
}

export function LandingEvents() {
  const { isDe } = useLanguage();
  const [showPast, setShowPast] = useState(false);

  return (
    <section id="events" className="bg-white px-6 py-24 sm:px-10 sm:py-28">
      <div className="mx-auto max-w-[1280px]">
        <UpcomingWorkshopAlert className="mb-8" href="/workshops" />

        <div className="mb-16 grid grid-cols-1 items-start gap-12 lg:grid-cols-2 lg:gap-20">
          <div>
            <p className="mb-3 text-[0.72rem] font-bold uppercase tracking-[0.13em] text-[#9152FF]">
              {isDe ? 'Trainings & Veranstaltungen' : 'Training & Events'}
            </p>
            <h2 className="font-lora text-[clamp(2rem,3vw,2.6rem)] font-bold leading-tight tracking-tight text-[#1A1033]">
              {isDe ? (
                <>
                  Workshops & <em className="font-normal not-italic text-[#9152FF]">Programmaktivitäten</em>
                </>
              ) : (
                <>
                  Workshops & <em className="font-normal not-italic text-[#9152FF]">program activities</em>
                </>
              )}
            </h2>
            <p className="mt-4 max-w-[420px] text-base leading-relaxed text-[#6B5F8A]">
              {isDe
                ? 'Das Projekt Building Bridges bietet Programme und Forschungsaktivitäten zur Stärkung von Mädchen und FLINTA* of Colour auf akademischen Wegen.'
                : 'The Building Bridges project offers programs and research activities to empower girls and FLINTA* of Colour in academic careers.'}
            </p>
            <Link href="/workshops" className="mt-6 inline-block text-sm font-bold text-[#9152FF] hover:underline">
              {isDe ? 'Vollständiger Workshop-Kalender →' : 'Full workshop schedule →'}
            </Link>
          </div>

          <div className="relative rounded-[24px] bg-[#9152FF] p-8 text-white shadow-[0_12px_48px_rgba(145,82,255,0.18)]">
            <span className="absolute -right-2 -top-2 inline-flex items-center gap-1 rounded-full border-2 border-white bg-[#6BAA8A] px-2.5 py-1 text-[0.65rem] font-bold uppercase tracking-[0.08em] text-white shadow-md">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white/80 opacity-75" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-white" />
              </span>
              {isDe ? 'Aktuell' : 'Updated'}
            </span>
            <p className="mb-2 text-[0.72rem] font-bold uppercase tracking-[0.12em] text-white/65">
              {pick(featuredNextUp.eyebrow, isDe)}
            </p>
            <h3 className="font-lora text-xl font-bold">{pick(featuredNextUp.title, isDe)}</h3>
            <p className="mt-1 text-[0.84rem] opacity-72">{pick(featuredNextUp.meta, isDe)}</p>
            <p className="mt-3 text-[0.88rem] leading-relaxed opacity-80">{pick(featuredNextUp.description, isDe)}</p>
            <Link href="/workshops" className="mt-4 inline-block text-[0.84rem] font-bold text-[#EDE5FF] hover:underline">
              {isDe ? 'Mehr erfahren →' : 'Read more →'}
            </Link>
          </div>
        </div>

        <div className="flex justify-center">
          <Link
            href="/workshops"
            className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-[#9152FF] to-[#7339E0] px-7 py-3 text-sm font-semibold text-white shadow-[0_6px_24px_rgba(145,82,255,0.35)] transition hover:brightness-[1.03]"
          >
            {isDe ? 'Alle Workshops ansehen →' : 'View all workshops →'}
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setShowPast(!showPast)}
          className="mb-6 mt-10 flex cursor-pointer items-center gap-2 rounded-full border-[1.5px] border-[rgba(145,82,255,0.15)] bg-transparent px-5 py-2.5 font-primary text-[0.875rem] font-semibold text-[#6B5F8A] transition hover:border-[#9152FF] hover:bg-[#F5F0FF] hover:text-[#9152FF]"
        >
          <span>📋</span>{' '}
          {showPast
            ? isDe
              ? 'Vergangene Workshops ausblenden'
              : 'Hide past workshops'
            : isDe
              ? 'Vergangene Workshops ansehen'
              : 'View past workshops'}
        </button>

        {showPast && (
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {pastWorkshops.map((c) => (
              <div
                key={c.title.en}
                className="flex flex-col gap-2 rounded-[18px] border-[1.5px] border-[rgba(145,82,255,0.15)] bg-[#F5F0FF] p-5"
              >
                <span className="inline-flex w-fit items-center gap-1 text-[0.69rem] font-bold uppercase tracking-[0.08em] text-[#6BAA8A]">
                  ✓ {isDe ? 'Abgeschlossen' : 'Completed'}
                </span>
                <p className="text-[0.8rem] font-medium text-[#6B5F8A]">{pick(c.date, isDe)}</p>
                <p className="font-lora text-[0.98rem] font-bold text-[#666]">{pick(c.title, isDe)}</p>
              </div>
            ))}
          </div>
        )}

        <div className="mt-16">
          <p className="mb-2 text-[0.72rem] font-bold uppercase tracking-[0.13em] text-[#9152FF]">
            {isDe ? 'Forschungsaktivitäten' : 'Research activities'}
          </p>
          <h3 className="mb-8 font-lora text-3xl font-bold tracking-tight text-[#1A1033]">
            {isDe ? (
              <>
                Wissenschaftliche Studien zu{' '}
                <em className="font-normal not-italic text-[#9152FF]">Barrieren & Resilienz</em>
              </>
            ) : (
              <>
                Scientific studies on{' '}
                <em className="font-normal not-italic text-[#9152FF]">barriers & resilience</em>
              </>
            )}
          </h3>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {[
              {
                tag: isDe ? 'Diskriminierungsforschung' : 'Discrimination research',
                title: isDe ? 'Diskriminierung & Barrieren' : 'Discrimination & Barriers',
                body: isDe
                  ? 'Untersuchung von Diskriminierungserfahrungen und strukturellen Barrieren im Bildungssystem.'
                  : 'Investigation of experiences of discrimination and barriers in the education sector.',
                pills: isDe ? ['Schülerinnen & Studierende', 'Mixed Methods'] : ['Schoolgirls & students', 'Mixed methods'],
              },
              {
                tag: isDe ? 'Resilienzforschung' : 'Resilience studies',
                title: isDe ? 'Resilienz & Ressourcen' : 'Resilience & Resources',
                body: isDe
                  ? 'Forschung zu Schutzfaktoren und Resilienzressourcen bei M*oC.'
                  : 'Research into protective factors and resilience resources in M*oC.',
                pills: isDe ? ['MEP-Teilnehmende', 'Längsschnitt'] : ['MEP participants', 'Longitudinal'],
              },
              {
                tag: isDe ? 'Partizipative Evaluation' : 'Participatory evaluation',
                title: isDe ? 'MEP-Programmevaluation' : 'MEP program evaluation',
                body: isDe
                  ? 'Gemeinsame Evaluation und Weiterentwicklung des MEP mit allen Beteiligten.'
                  : 'Joint evaluation and further development of the MEP with all involved.',
                pills: isDe ? ['Alle Beteiligten', 'Partizipativ'] : ['All involved', 'Participatory'],
              },
            ].map((r) => (
              <article
                key={r.title}
                className="rounded-[24px] border-[1.5px] border-[rgba(145,82,255,0.15)] bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
              >
                <p className="mb-3 text-[0.7rem] font-bold uppercase tracking-[0.09em] text-[#9152FF]">{r.tag}</p>
                <h4 className="font-lora text-lg font-bold text-[#1A1033]">{r.title}</h4>
                <p className="mt-2 text-[0.875rem] leading-relaxed text-[#6B5F8A]">{r.body}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {r.pills.map((p) => (
                    <span key={p} className="rounded-full bg-[#EDE5FF] px-3 py-1 text-[0.72rem] font-semibold text-[#9152FF]">
                      {p}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
