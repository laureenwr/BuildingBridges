'use client';

import Link from 'next/link';
import { ArrowUpRight, Clock3, MapPin, Sparkles } from 'lucide-react';
import { useLanguage } from '@/lib/hooks/useLanguage';

const homepageWorkshopTeasers = [
  {
    title: 'Fruehlingsfest',
    date: '20.03.2026',
    time: '15:00-19:00',
    location: 'Maedea',
    description: 'Spring celebration with food, henna, self-care impulses, flowers, and community activities.',
    category: 'Community Event',
    href: '/workshops',
  },
  {
    title: 'Mentoring: Was tut mir gut?',
    date: '02.03.2026',
    time: '16:00-19:00',
    location: 'Johanna-Eck',
    description: 'Empowerment workshop for Maedchen* with racism experiences, focused on wellbeing and reflection.',
    category: 'Mentoring',
    href: '/workshops',
  },
  {
    title: 'Perlen & Power',
    date: '18.12.2025',
    time: '13:00-16:00',
    location: 'Johanna-Eck',
    description: 'Reflection, exchange, pearl necklaces, pizza, snacks, and community connection.',
    category: 'Empowerment',
    href: '/workshops',
  },
];

export function LandingEvents() {
  const { isDe } = useLanguage();

  return (
    <section id="events" className="bg-white px-6 py-24 sm:px-10 sm:py-28">
      <div className="mx-auto max-w-[1280px]">
        <div className="mb-16 overflow-hidden rounded-[30px] border border-[rgba(145,82,255,0.14)] bg-[#F7F2FF] px-5 py-7 shadow-[0_10px_30px_rgba(145,82,255,0.1)] sm:px-7 sm:py-8">
          <div className="relative grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.15fr)] lg:gap-8">
            <div className="pointer-events-none absolute -left-16 top-12 h-36 w-36 rounded-full bg-gradient-to-br from-[#DCCBFF] to-transparent blur-2xl" />
            <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-gradient-to-br from-[#B98DFF] to-transparent opacity-50 blur-2xl" />

            <div className="relative z-[1]">
              <p className="mb-3 inline-flex items-center gap-1 rounded-full border border-[#D8CAFB] bg-white px-3 py-1 text-[0.66rem] font-bold uppercase tracking-[0.11em] text-[#7443D4]">
                <Sparkles className="h-3 w-3" />
                Community Program
              </p>
              <h2 className="font-lora text-[clamp(1.75rem,2.8vw,2.35rem)] font-bold tracking-tight text-[#1A1033]">
                Workshops &amp; Events
              </h2>
              <p className="mt-3 max-w-md text-[0.95rem] leading-relaxed text-[#5F4F84]">
                Safe spaces for exchange, mentoring, empowerment, and shared learning.
              </p>

              <div className="mt-5">
                <Link
                  href="/workshops"
                  className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-[#9152FF] to-[#7339E0] px-4 py-2 text-sm font-semibold text-white shadow-[0_4px_14px_rgba(145,82,255,0.33)] transition hover:brightness-[1.03]"
                >
                  {isDe ? 'Workshop-Archiv erkunden' : 'Explore workshop archive'}
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>

            <div className="relative z-[1] space-y-3">
              {homepageWorkshopTeasers.map((workshop) => (
                <article
                  key={workshop.title}
                  className="rounded-2xl border border-[rgba(145,82,255,0.18)] bg-white/95 p-3.5 shadow-[0_6px_18px_rgba(145,82,255,0.09)]"
                >
                  <div className="mb-2 flex flex-wrap items-center gap-2">
                    <span className="rounded-full bg-[#F1E8FF] px-2 py-0.5 text-[0.7rem] font-semibold text-[#6D40C9]">
                      {workshop.date}
                    </span>
                    <span className="rounded-full border border-[#DDCCFF] bg-white px-2 py-0.5 text-[0.7rem] font-semibold text-[#6B5F8A]">
                      {workshop.category}
                    </span>
                  </div>
                  <h3 className="font-lora text-[1.05rem] font-bold text-[#1A1033]">{workshop.title}</h3>
                  <div className="mt-1 flex flex-wrap items-center gap-3 text-[0.78rem] text-[#705B9A]">
                    <span className="inline-flex items-center gap-1">
                      <Clock3 className="h-3.5 w-3.5 text-[#9152FF]" />
                      {workshop.time}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <MapPin className="h-3.5 w-3.5 text-[#9152FF]" />
                      {workshop.location}
                    </span>
                  </div>
                  <p className="mt-2 text-[0.84rem] leading-relaxed text-[#5E5677]">{workshop.description}</p>
                  <Link
                    href={workshop.href}
                    className="mt-2 inline-flex items-center gap-1 text-[0.8rem] font-semibold text-[#6D40C9] transition hover:text-[#5E33BC]"
                  >
                    View details
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </div>

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

      </div>
    </section>
  );
}
