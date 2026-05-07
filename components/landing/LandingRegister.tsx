'use client';

import Link from 'next/link';
import { useLanguage } from '@/lib/hooks/useLanguage';

export function LandingRegister() {
  const { isDe } = useLanguage();
  const cards = [
    {
      href: '/sign-up',
      icon: '👩‍🎓',
      title: isDe ? 'Fuer Teilnehmende' : 'For participants',
      desc: isDe ? 'Girls und FLINTA* of Colour ab der 10. Klasse' : 'Girls and FLINTA* of Colour from 10th grade onwards',
    },
    { href: '/mentors', icon: '🌟', title: isDe ? 'Fuer Mentor:innen' : 'For mentors', desc: isDe ? 'Studierende und Role Models of Colour' : 'Students and role models of Colour' },
    { href: '/contact', icon: '🏫', title: isDe ? 'Fuer Partner' : 'For partners', desc: isDe ? 'Schulen, Organisationen und Institutionen' : 'Schools, organizations and institutions' },
  ];
  return (
    <section id="register" className="relative overflow-hidden bg-[#9152FF] px-6 py-20 sm:px-10 sm:py-24">
      <span
        className="pointer-events-none absolute -top-16 left-4 font-lora text-[22rem] font-bold leading-none text-white/[0.06]"
        aria-hidden
      >
        &ldquo;
      </span>
      <div className="relative z-[1] mx-auto grid max-w-[1280px] grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <div>
          <h2 className="font-lora text-[clamp(2rem,4vw,2.8rem)] font-bold leading-tight tracking-tight text-white">
            {isDe ? (
              <>Werde Teil von <em className="font-normal not-italic">Building Bridges</em></>
            ) : (
              <>Become part of <em className="font-normal not-italic">Building Bridges</em></>
            )}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-white/80">
            {isDe
              ? 'Ob als Teilnehmende, Mentor:in oder Kooperationspartner - gemeinsam bauen wir Bruecken zu einer vielfaeltigen und inklusiven akademischen Zukunft. Das Projekt laeuft von September 2024 bis August 2027.'
              : 'Whether as a participant, mentor or cooperation partner - together we build bridges to a diverse and inclusive academic future. The project runs from September 2024 to August 2027.'}
          </p>
        </div>
        <div className="flex flex-col gap-4">
          {cards.map((c) => (
            <Link
              key={c.href}
              href={c.href}
              className="flex items-center gap-5 rounded-[18px] border-[1.5px] border-white/20 bg-white/10 px-6 py-5 text-white no-underline transition hover:translate-x-1 hover:bg-white/20"
            >
              <span className="text-3xl">{c.icon}</span>
              <div className="min-w-0 flex-1">
                <div className="font-bold">{c.title}</div>
                <div className="mt-1 text-[0.84rem] opacity-78">{c.desc}</div>
              </div>
              <span className="text-xl opacity-60">→</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
