'use client';

import Link from 'next/link';
import { useLanguage } from '@/lib/hooks/useLanguage';

export function LandingHero() {
  const { isDe } = useLanguage();
  const stats = [
    { n: '36', l: isDe ? 'Monate Projektlaufzeit' : 'Months project duration' },
    { n: '3', l: isDe ? 'Beteiligte Hochschulen' : 'Universities involved' },
    { n: '10+', l: isDe ? 'Netzwerkpartner' : 'Network partners' },
  ];

  return (
    <section id="home" className="relative min-h-[calc(100dvh-70px)] overflow-hidden">
      <div className="absolute inset-0 bg-[url('/coverimage.png')] bg-cover bg-center" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-black/25 to-black/45" />

      <div className="relative z-[1] mx-auto flex min-h-[calc(100dvh-70px)] max-w-[1280px] flex-col items-center justify-center px-6 py-16 text-center sm:px-10">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-[#9152FF]/90 px-4 py-1.5 text-[0.72rem] font-bold uppercase tracking-[0.09em] text-white shadow-[0_3px_14px_rgba(145,82,255,0.35)]">
          <span className="text-[0.45rem] opacity-60" aria-hidden>
            ●
          </span>
          {isDe ? 'Forschungsprojekt 2024-2027 · Berlin · Duisburg-Essen' : 'Research Project 2024-2027 · Berlin · Duisburg-Essen'}
        </div>
        <h1 className="font-lora text-[clamp(3rem,8vw,4.4rem)] font-bold leading-none text-white [text-shadow:0_3px_10px_rgba(0,0,0,0.55)]">
          Building Bridges
        </h1>
        <p className="mt-4 max-w-3xl text-[clamp(1.1rem,2.8vw,1.6rem)] font-semibold leading-snug text-white">
          {isDe ? 'Mentoring & Empowerment fuer Girls und ' : 'Mentoring & empowerment for girls and '}
          <span className="text-[#d8c4ff]">FLINTA* of Colour</span>
        </p>
        <p className="mt-2 max-w-3xl text-[clamp(1rem,2.2vw,1.35rem)] text-white/95">
          {isDe ? 'Ein interdisziplinaeres Forschungsprojekt fuer Bildungsgerechtigkeit' : 'An interdisciplinary research project for educational equity'}
        </p>
        <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/90">
          {isDe
            ? 'Ein interdisziplinaeres Forschungs- und Entwicklungsprojekt zur Staerkung von Girls und FLINTA* of Colour fuer Teilhabe an Hochschulbildung und akademischen Wegen im psychosozialen Feld.'
            : 'An interdisciplinary research and development project to empower girls and FLINTA* of Colour to participate in higher education and academic careers in the psychosocial field.'}
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/workshops"
            className="rounded-full bg-[#9152FF] px-8 py-3 text-sm font-semibold text-white shadow-[0_8px_24px_rgba(145,82,255,0.45)] transition hover:bg-[#7d41eb]"
          >
            {isDe ? 'Angebote entdecken ↓' : 'Discover offers ↓'}
          </Link>
          <Link
            href="/sign-up"
            className="rounded-full bg-[#9152FF] px-8 py-3 text-sm font-semibold text-white shadow-[0_8px_24px_rgba(145,82,255,0.45)] transition hover:bg-[#7d41eb]"
          >
            {isDe ? 'Jetzt registrieren' : 'Register now'}
          </Link>
        </div>

        <div className="mt-10 grid w-full max-w-3xl gap-3 sm:grid-cols-3">
          {stats.map((s) => (
            <div
              key={s.l}
              className="rounded-2xl border border-white/25 bg-white/15 px-6 py-4 backdrop-blur-sm"
            >
              <div className="text-4xl font-bold text-white">{s.n}</div>
              <div className="mt-1 text-sm text-white/90">{s.l}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
