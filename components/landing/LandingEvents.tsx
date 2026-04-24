'use client';

import { useState } from 'react';
import Link from 'next/link';

type EventTypeStyle = 'sage' | 'amber' | 'muted';

type UpcomingEvent = {
  type: string;
  audience: string;
  date: string;
  title: string;
  typeStyle?: EventTypeStyle;
};

const upcoming: UpcomingEvent[] = [
  { type: 'Networking & Exchange', audience: 'For participants', date: 'Wednesday, January 14, 2026 · 6:00 PM · Online', title: 'Online introductions to mentors' },
  { type: 'Individual Mentoring', audience: 'For participants', date: 'January – November 2026', title: 'Individual Mentoring' },
  { type: 'Workshop', audience: 'For participants', date: 'March 2026', title: 'Mentoring Workshop II – Johanna Eck' },
  { type: 'Self-care', audience: 'For participants', date: 'April 2026', title: 'SELF CARE I', typeStyle: 'sage' },
  { type: 'Vision & Goals', audience: 'For participants', date: 'Saturday, April 25, 2026 · All day', title: 'Mentoring Workshop II – Vision', typeStyle: 'amber' },
  { type: 'Self-care', audience: 'For participants', date: 'Friday, May 15, 2026', title: 'Self Care II', typeStyle: 'sage' },
  { type: 'Skills', audience: 'For participants', date: 'Friday, June 12, 2026', title: 'Skills Training I', typeStyle: 'muted' },
  { type: 'Skills', audience: 'For participants', date: 'Friday, August 3, 2026', title: 'Skills Training II', typeStyle: 'muted' },
  { type: 'Skills', audience: 'For participants', date: 'Friday, October 9, 2026', title: 'Skills Training III', typeStyle: 'muted' },
];

const completed = [
  { date: 'Friday, June 20–22, 2025', title: 'Basic Training Group I' },
  { date: 'Wednesday, October 8, 2025 · 1–4 PM', title: 'Introductory Workshop with Johanna Eck' },
  { date: 'Saturday, November 22, 2025', title: 'Opening Event' },
  { date: 'Tuesday, December 9, 2025 · 6–8 PM', title: 'Get-together' },
  { date: 'Thursday, December 18, 2025', title: 'Pearls & Power Workshop – Johanna Eck' },
];

function TypeBadge({ label, variant }: { label: string; variant?: EventTypeStyle }) {
  const styles =
    variant === 'sage'
      ? 'bg-[rgba(107,170,138,0.15)] text-[#4a9470]'
      : variant === 'amber'
        ? 'bg-[rgba(240,165,0,0.12)] text-[#c08800]'
        : variant === 'muted'
          ? 'bg-[rgba(145,82,255,0.08)] text-[#7339E0]'
          : 'bg-[#EDE5FF] text-[#9152FF]';
  return (
    <span className={`inline-flex w-fit items-center gap-1 rounded-full px-3 py-1 text-[0.69rem] font-bold uppercase tracking-[0.09em] ${styles}`}>
      {label}
    </span>
  );
}

export function LandingEvents() {
  const [showPast, setShowPast] = useState(false);

  return (
    <section id="events" className="bg-white px-6 py-24 sm:px-10 sm:py-28">
      <div className="mx-auto max-w-[1280px]">
        <div className="mb-16 grid grid-cols-1 items-start gap-12 lg:grid-cols-2 lg:gap-20">
          <div>
            <p className="mb-3 text-[0.72rem] font-bold uppercase tracking-[0.13em] text-[#9152FF]">Training &amp; Events</p>
            <h2 className="font-lora text-[clamp(2rem,3vw,2.6rem)] font-bold leading-tight tracking-tight text-[#1A1033]">
              Workshops &amp; <em className="font-normal not-italic text-[#9152FF]">program activities</em>
            </h2>
            <p className="mt-4 max-w-[420px] text-base leading-relaxed text-[#6B5F8A]">
              The Building Bridges project offers programs and research activities to empower girls and FLINTA* of Colour
              in academic careers.
            </p>
            <Link href="/workshops" className="mt-6 inline-block text-sm font-bold text-[#9152FF] hover:underline">
              Full workshop schedule →
            </Link>
          </div>
          <div className="rounded-[24px] bg-[#9152FF] p-8 text-white shadow-[0_12px_48px_rgba(145,82,255,0.18)]">
            <p className="mb-2 text-[0.72rem] font-bold uppercase tracking-[0.12em] text-white/65">Next up</p>
            <h3 className="font-lora text-xl font-bold">Networking &amp; Exchange</h3>
            <p className="mt-1 text-[0.84rem] opacity-72">Wednesday, January 14, 2026 · 6:00 PM · Online</p>
            <p className="mt-3 text-[0.88rem] leading-relaxed opacity-80">
              Online introductions to mentors. Get to know our mentors and learn more about the mentoring program.
            </p>
            <Link href="/workshops" className="mt-4 inline-block text-[0.84rem] font-bold text-[#EDE5FF] hover:underline">
              Read more →
            </Link>
          </div>
        </div>

        <p className="mb-2 text-[0.72rem] font-bold uppercase tracking-[0.13em] text-[#9152FF]">Workshop offerings</p>
        <p className="mb-8 text-[0.95rem] text-[#6B5F8A]">The next dates for workshops and events.</p>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {upcoming.map((e) => (
            <article
              key={e.title}
              className="flex flex-col gap-2 rounded-[18px] border-[1.5px] border-[rgba(145,82,255,0.15)] bg-white p-6 shadow-[0_2px_12px_rgba(145,82,255,0.08)] transition hover:-translate-y-1 hover:shadow-[0_6px_28px_rgba(145,82,255,0.13)]"
            >
              <TypeBadge label={e.type} variant={e.typeStyle} />
              <span className="text-[0.72rem] font-semibold uppercase tracking-[0.07em] text-[#aaa]">{e.audience}</span>
              <p className="text-[0.82rem] font-semibold text-[#7339E0]">{e.date}</p>
              <h4 className="font-lora text-base font-bold leading-snug text-[#1A1033]">{e.title}</h4>
              <Link href="/workshops" className="mt-auto text-[0.82rem] font-bold text-[#9152FF] hover:underline">
                Read more →
              </Link>
            </article>
          ))}
        </div>

        <button
          type="button"
          onClick={() => setShowPast(!showPast)}
          className="mb-6 mt-10 flex cursor-pointer items-center gap-2 rounded-full border-[1.5px] border-[rgba(145,82,255,0.15)] bg-transparent px-5 py-2.5 font-primary text-[0.875rem] font-semibold text-[#6B5F8A] transition hover:border-[#9152FF] hover:bg-[#F5F0FF] hover:text-[#9152FF]"
        >
          <span>📋</span> {showPast ? 'Hide' : 'View'} past workshops
        </button>

        {showPast && (
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {completed.map((c) => (
              <div
                key={c.title}
                className="flex flex-col gap-2 rounded-[18px] border-[1.5px] border-[rgba(145,82,255,0.15)] bg-[#F5F0FF] p-5"
              >
                <span className="inline-flex w-fit items-center gap-1 text-[0.69rem] font-bold uppercase tracking-[0.08em] text-[#6BAA8A]">
                  ✓ Completed
                </span>
                <p className="text-[0.8rem] font-medium text-[#6B5F8A]">{c.date}</p>
                <p className="font-lora text-[0.98rem] font-bold text-[#666]">{c.title}</p>
              </div>
            ))}
          </div>
        )}

        <div className="mt-16">
          <p className="mb-2 text-[0.72rem] font-bold uppercase tracking-[0.13em] text-[#9152FF]">Research activities</p>
          <h3 className="mb-8 font-lora text-3xl font-bold tracking-tight text-[#1A1033]">
            Scientific studies on <em className="font-normal not-italic text-[#9152FF]">barriers &amp; resilience</em>
          </h3>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {[
              { tag: 'Discrimination research', title: 'Discrimination & Barriers', body: 'Investigation of experiences of discrimination and barriers in the education sector.', pills: ['Schoolgirls & students', 'Mixed methods'] },
              { tag: 'Resilience studies', title: 'Resilience & Resources', body: 'Research into protective factors and resilience resources in M*oC.', pills: ['MEP participants', 'Longitudinal'] },
              { tag: 'Participatory evaluation', title: 'MEP program evaluation', body: 'Joint evaluation and further development of the MEP with all involved.', pills: ['All involved', 'Participatory'] },
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

        <div className="mt-16 rounded-[32px] bg-[#9152FF] px-8 py-12 text-white">
          <h3 className="font-lora text-3xl font-bold">Project progress</h3>
          <p className="mt-2 text-[0.9rem] opacity-72">Building Bridges runs for 36 months, from September 2024 to August 2027.</p>
          <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-3">
            {[
              { n: '1', period: 'Sep 2024 – Aug 2025', title: 'Project launch & MEP development', desc: 'Development of the mentoring program and first cohort.', done: true },
              { n: '2', period: 'Sep 2025 – Aug 2026', title: 'Full implementation & research', desc: 'Full implementation of programs and intensive data collection.', active: true },
              { n: '3', period: 'Sep 2026 – Aug 2027', title: 'Evaluation & sustainability', desc: 'Evaluation, dissemination, and sustainability strategy.', upcoming: true },
            ].map((ph) => (
              <div key={ph.n} className="relative z-[1]">
                <div
                  className={`mb-4 flex h-[52px] w-[52px] items-center justify-center rounded-full border-2 font-lora text-lg font-bold ${
                    ph.done
                      ? 'border-[#6BAA8A] bg-[#6BAA8A] text-white'
                      : ph.active
                        ? 'border-white bg-white/95 font-extrabold text-[#9152FF]'
                        : 'border-white/25 bg-white/10 text-white/45'
                  }`}
                >
                  {ph.n}
                </div>
                <p className="mb-2 text-[0.75rem] font-bold uppercase tracking-[0.08em] text-[#EDE5FF]/85">{ph.period}</p>
                <p className="font-lora text-base font-bold">{ph.title}</p>
                <p className="mt-2 text-[0.84rem] opacity-65 leading-relaxed">{ph.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
