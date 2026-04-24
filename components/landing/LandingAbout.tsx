'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/lib/hooks/useLanguage';

const pillars = [
  {
    icon: '📖',
    title: 'Scientific coordination',
    body:
      'The entire project is being scientifically monitored by the Free University of Berlin. Interviews and questionnaires are being used to assess experiences of discrimination, mental health, stressors, resources, and academic participation among school and university students. The MEP (Measure for Educational Progress) will be evaluated for feasibility and acceptance.',
    cardClass: 'border-[#d8e7df] bg-[#cfe9db]',
    iconClass: 'text-[#2f9a78]',
    chip: 'TP1',
  },
  {
    icon: '🎓',
    title: 'Mentoring & Empowerment',
    body:
      'Development of the Mentoring Empowerment Program (MEP), which supports BIPoC girls and FLINTA* from grade 10 onwards on their academic path into the psychosocial field. The MEP offers mentoring and workshops on empowerment, self-care, and other helpful information on the transition from school to university.',
    cardClass: 'border-[#ddd4ea] bg-[#e8def3]',
    iconClass: 'text-[#7c3aed]',
    chip: 'TP2',
  },
  {
    icon: '💬',
    title: 'Digital platform',
    body:
      'Participatory development of a "living" digital platform for context-sensitive storytelling that enables audiovisual experience reports and promotes sustainable peer-to-peer exchange.',
    cardClass: 'border-[#d3dfef] bg-[#dbe7f6]',
    iconClass: 'text-[#4f7dcf]',
    chip: 'TP3',
  },
] as const;

export function LandingAbout() {
  const [activeCard, setActiveCard] = useState<number>(1);
  const [isPaused, setIsPaused] = useState(false);
  const { isDe } = useLanguage();

  useEffect(() => {
    if (isPaused) return;

    const timer = window.setInterval(() => {
      setActiveCard((prev) => (prev + 1) % pillars.length);
    }, 2800);

    return () => window.clearInterval(timer);
  }, [isPaused]);

  return (
    <section id="about" className="relative overflow-hidden bg-[#f4f2f8] px-6 py-24 sm:px-10 sm:py-28">
      <div className="pointer-events-none absolute -right-20 top-0 h-64 w-64 rounded-full bg-[radial-gradient(circle,rgba(145,82,255,0.18)_0%,rgba(145,82,255,0)_70%)]" />
      <div className="pointer-events-none absolute -left-20 bottom-0 h-64 w-64 rounded-full bg-[radial-gradient(circle,rgba(107,170,138,0.16)_0%,rgba(107,170,138,0)_70%)]" />
      <div className="mx-auto max-w-[1280px]">
        <motion.h2
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.45 }}
          className="text-center font-lora text-[clamp(2rem,3.4vw,3rem)] font-bold text-[#12162b]"
        >
          {isDe ? 'Ueber das Projekt' : 'About the project'}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.45, delay: 0.08 }}
          className="mx-auto mt-4 max-w-4xl text-center text-[clamp(1rem,1.7vw,1.1rem)] leading-relaxed text-[#3f3f52]"
        >
          {isDe
            ? '&quot;Building Bridges&quot; ist ein 36-monatiges interdisziplinaeres Forschungs- und Entwicklungsprojekt zur Staerkung und Begleitung von Girls und FLINTA* of Colour ab der 10. Klasse. Das Projekt wird von der Freien Universitaet Berlin, der Stiftung SPI und der Universitaet Duisburg-Essen umgesetzt.'
            : '&quot;Building Bridges&quot; is a 36-month interdisciplinary research and development project that aims to empower and mentor girls and FLINTA* of color from the 10th grade onwards. The project is being carried out by the Free University of Berlin, the SPI Foundation, and the University of Duisburg-Essen.'}
        </motion.p>

        <div
          className="mx-auto mt-14 grid max-w-5xl grid-cols-1 gap-5 md:grid-cols-3"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {pillars.map((pillar, index) => {
            const isActive = activeCard === index;
            return (
              <motion.article
                key={pillar.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.35, delay: 0.08 * index }}
                onMouseEnter={() => setActiveCard(index)}
                onFocus={() => setActiveCard(index)}
                className={`relative rounded-[14px] border px-6 py-5 shadow-sm transition duration-300 ${pillar.cardClass} ${
                  isActive ? '-translate-y-1 shadow-[0_16px_30px_rgba(26,16,60,0.12)]' : 'hover:-translate-y-1 hover:shadow-md'
                }`}
              >
                <span className="absolute right-4 top-4 rounded-full bg-white/75 px-2.5 py-1 text-[0.68rem] font-bold uppercase tracking-[0.08em] text-[#5f5782]">
                  {pillar.chip}
                </span>
                <div className={`mb-4 text-[2rem] ${pillar.iconClass}`}>{pillar.icon}</div>
                <h3 className="font-lora text-[2rem] font-bold leading-snug text-[#11192a]">
                  {isDe
                    ? pillar.chip === 'TP1'
                      ? 'Wissenschaftliche Koordination'
                      : pillar.chip === 'TP2'
                        ? 'Mentoring & Empowerment'
                        : 'Digitale Plattform'
                    : pillar.title}
                </h3>
                <p className="mt-3 text-[0.98rem] leading-relaxed text-[#30404f]">
                  {isDe
                    ? pillar.chip === 'TP1'
                      ? 'Das Projekt wird wissenschaftlich durch die Freie Universitaet Berlin begleitet. Interviews und Frageboegen erfassen Diskriminierungserfahrungen, mentale Gesundheit, Stressoren, Ressourcen und Bildungsbeteiligung. Das MEP wird hinsichtlich Machbarkeit und Akzeptanz evaluiert.'
                      : pillar.chip === 'TP2'
                        ? 'Entwicklung des Mentoring-Empowerment-Programms (MEP), das BIPoC Girls und FLINTA* ab Klasse 10 auf dem akademischen Weg in psychosoziale Felder begleitet. Das MEP bietet Mentoring und Workshops zu Empowerment, Self-Care und Uebergang Schule-Hochschule.'
                        : 'Partizipative Entwicklung einer lebendigen digitalen Plattform fuer kontextsensitive Erzaehlformate mit audiovisuellen Erfahrungsberichten und nachhaltigem Peer-to-Peer-Austausch.'
                    : pillar.body}
                </p>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
