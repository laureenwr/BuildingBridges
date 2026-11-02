'use client';

import Link from 'next/link';
import { useLanguage } from '@/lib/hooks/useLanguage';

export function LandingContactTeaser() {
  const { isDe } = useLanguage();

  return (
    <section
      id="contact"
      className="relative overflow-hidden px-6 py-24 sm:px-10 sm:py-28"
      style={
        {
          backgroundColor: 'var(--purple-bg)',
          '--purple': '#7c3aed',
          '--purple-light': '#a78bfa',
          '--purple-bg': '#f0ebff',
          '--navy': '#1a103c',
          '--text-body': '#4b4570',
          '--border': '#e2daf8',
        } as React.CSSProperties
      }
    >
      <div
        className="pointer-events-none absolute right-[-140px] top-[-120px] h-[360px] w-[360px] rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(167,139,250,0.32) 0%, transparent 68%)' }}
        aria-hidden
      />
      <p className="pointer-events-none absolute bottom-6 right-8 select-none font-lora text-6xl font-bold tracking-[0.08em] text-[#7c3aed]/[0.06] sm:text-8xl">
        {isDe ? 'KONTAKT' : 'CONTACT'}
      </p>

      <div className="relative z-[1] mx-auto max-w-[1280px]">
        <div className="grid grid-cols-1 gap-6 border-b border-[var(--border)] pb-8 lg:grid-cols-[1fr_1.2fr] lg:items-end">
          <h2 className="font-lora text-[clamp(2.2rem,4vw,3.3rem)] font-bold leading-none text-[var(--navy)]">
            {isDe ? (
              <>Nimm <em className="font-normal not-italic text-[var(--purple)]">Kontakt</em> auf</>
            ) : (
              <>Get in <em className="font-normal not-italic text-[var(--purple)]">touch</em></>
            )}
          </h2>
          <p className="max-w-xl text-[0.98rem] leading-relaxed text-[var(--text-body)]">
            {isDe
              ? 'Hast du Fragen zu Building Bridges? Sende uns eine Nachricht über das Kontaktformular.'
              : 'Have questions about Building Bridges? Send us a message via the contact form.'}
          </p>
        </div>

        <div className="relative mt-10 overflow-hidden rounded-[26px] border border-[var(--purple)]/20 bg-[var(--navy)] px-6 py-7 text-white shadow-[0_12px_34px_rgba(26,16,60,0.35)] sm:px-8 sm:py-8">
          <span className="absolute left-0 top-0 h-full w-[2px] bg-[var(--purple)]" aria-hidden />
          <span className="absolute -right-8 -top-8 h-20 w-20 rounded-full border border-[var(--purple-light)]/30" aria-hidden />
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-[1fr_auto] sm:items-center">
            <div>
              <h3 className="font-lora text-[1.6rem] font-bold leading-tight text-white">
                {isDe ? (
                  <>Nachricht <em className="font-normal not-italic text-[#c4b5fd]">senden</em></>
                ) : (
                  <>Send a <em className="font-normal not-italic text-[#c4b5fd]">Message</em></>
                )}
              </h3>
              <p className="mt-2 text-[0.92rem] text-[#c8c2e5]">
                {isDe
                  ? 'Nutze das vollständige Kontaktformular, und wir leiten deine Anfrage an die passende Ansprechperson weiter.'
                  : 'Use the full contact form and we will route your request to the right team member.'}
              </p>
            </div>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-full bg-[var(--purple)] px-7 py-3 text-sm font-semibold text-white shadow-[0_8px_20px_rgba(124,58,237,0.4)] transition hover:bg-[#6d28d9]"
            >
              {isDe ? 'Zum Kontaktformular →' : 'Go to contact form →'}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
