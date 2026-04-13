'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import type { TeamMember } from '@/lib/content/team';
import { pickTeamMemberOrgOrBio, pickTeamMemberText } from '@/lib/content/team';
import { KnowledgeSection } from '@/components/landing/KnowledgeSection';
import { StorytellingSection } from '@/components/landing/StorytellingSection';
import { useLandingLocale } from '@/lib/landing/locale';
import { FundingBanner } from '@/components/partners/FundingBanner';

const TP1_SLUGS = ['claudia-calvano', 'susanne-birnkammer', 'felicia-boma-lazaridou', 'esther-kipnis'];
const TP2_SLUGS = ['celiana-kiefer', 'dilara-yildirim'];
const TP3_SLUGS = ['hannes-rothe', 'daniel-courtney', 'laureen-warikoru', 'sumera-sajid'];

function pickMembers(all: TeamMember[], slugs: string[]) {
  const map = new Map(all.map((m) => [m.slug, m]));
  return slugs.map((s) => map.get(s)).filter((m): m is TeamMember => Boolean(m));
}

export function LandingExperience({ members }: { members: TeamMember[] }) {
  const { t } = useLandingLocale();
  const [pastOpen, setPastOpen] = useState(false);
  const tp1 = pickMembers(members, TP1_SLUGS);
  const tp2 = pickMembers(members, TP2_SLUGS);
  const tp3 = pickMembers(members, TP3_SLUGS);

  const displayName = (m: TeamMember) => m.name ?? `${m.firstName} ${m.lastName}`;

  return (
    <div className="min-h-screen bg-[#F2EEFF] font-[family-name:var(--font-sora)] text-[#1A1033] antialiased">
      <section id="home" className="relative flex min-h-screen items-center overflow-hidden scroll-mt-[70px] px-10 pb-20 pt-28 max-md:px-6 max-md:pb-16 max-md:pt-24">
        <div className="pointer-events-none absolute inset-0 z-0">
          <Image
            src="/coverimage.png"
            alt=""
            fill
            className="object-cover object-center"
            priority
            sizes="100vw"
          />
        </div>
        <div
          className="pointer-events-none absolute inset-0 z-[1]"
          style={{
            background:
              'linear-gradient(105deg, rgba(245,240,255,0.94) 0%, rgba(237,229,255,0.82) 42%, rgba(232,220,255,0.45) 68%, rgba(232,220,255,0.2) 100%)',
          }}
        />
        <div className="hero-blob pointer-events-none absolute -right-[200px] -top-[200px] z-[1] h-[700px] w-[700px] rounded-full" style={{ background: 'radial-gradient(circle, rgba(145,82,255,0.14) 0%, transparent 68%)' }} />
        <div className="hero-blob pointer-events-none absolute bottom-[-60px] left-[3%] z-[1] h-[420px] w-[420px] rounded-full" style={{ background: 'radial-gradient(circle, rgba(181,128,255,0.12) 0%, transparent 68%)' }} />
        <div className="relative z-[2] mx-auto w-full max-w-[1280px]">
          <div className="max-w-[640px]">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-[#9152FF] px-[1.1rem] py-[0.38rem] text-[0.72rem] font-bold uppercase tracking-[0.09em] text-white shadow-[0_3px_14px_rgba(145,82,255,0.35)]">
              <span className="text-[0.45rem] opacity-60">●</span>
              {t('Research Project 2024–2027 · Berlin · Duisburg-Essen', 'Forschungsprojekt 2024–2027 · Berlin · Duisburg-Essen')}
            </div>
            <h1 className="font-[family-name:var(--font-lora)] text-[clamp(2.6rem,4.5vw,4rem)] font-bold leading-[1.08] tracking-tight text-[#1A1033] drop-shadow-[0_1px_2px_rgba(255,255,255,0.8)]">
              {t('Mentoring & empowerment for girls and ', 'Mentoring & Empowerment für Mädchen und ')}
              <em className="font-normal italic text-[#9152FF]">FLINTA* of Colour</em>
            </h1>
            <p className="mt-5 max-w-[500px] text-base leading-relaxed text-[#4a3d66]">
              {t(
                'An interdisciplinary research and development project to empower girls and FLINTA* of color from the 10th grade onwards to participate in higher education and academic careers in the psychosocial field.',
                'Ein interdisziplinäres Forschungs- und Entwicklungsprojekt zur Stärkung von Mädchen und FLINTA* of Colour ab der 10. Klasse für Hochschule und akademische Laufbahnen im psychosozialen Bereich.'
              )}
            </p>
            <div className="mt-9 flex flex-wrap gap-4">
              <Link
                href="/sign-up"
                className="rounded-full bg-[#9152FF] px-9 py-[0.9rem] text-[0.95rem] font-semibold text-white shadow-[0_6px_24px_rgba(145,82,255,0.4)] transition hover:-translate-y-0.5 hover:bg-[#7339E0] hover:shadow-[0_10px_32px_rgba(145,82,255,0.5)]"
              >
                {t('Register Now', 'Jetzt anmelden')}
              </Link>
              <Link
                href="/#about"
                className="rounded-full border-[1.5px] border-[#9152FF] bg-white/95 px-9 py-[0.9rem] text-[0.95rem] font-semibold text-[#9152FF] shadow-sm backdrop-blur-[2px] transition hover:bg-[#9152FF] hover:text-white"
              >
                {t('Discover the Project', 'Projekt entdecken')}
              </Link>
            </div>
            <div className="mt-12 flex flex-wrap gap-10">
              {[
                { n: '36', l: t('Months project duration', 'Monate Projektlaufzeit') },
                { n: '3', l: t('Universities involved', 'Beteiligte Hochschulen') },
                { n: '10+', l: t('Network partners', 'Netzwerkpartner*innen') },
              ].map((s) => (
                <div key={s.l}>
                  <div className="font-[family-name:var(--font-lora)] text-[2.1rem] font-bold text-[#9152FF]">{s.n}</div>
                  <div className="mt-0.5 text-[0.8rem] font-medium text-[#5c4d78]">{s.l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="about" className="bb-about-curve relative scroll-mt-[70px] overflow-hidden bg-[#9152FF] px-10 py-28 text-white max-md:px-6 max-md:py-20">
        <div className="relative z-[1] mx-auto grid max-w-[1280px] grid-cols-1 items-start gap-20 lg:grid-cols-2">
          <div>
            <div className="mb-3 text-[0.72rem] font-bold uppercase tracking-[0.13em] text-white/65">{t('About the Project', 'Über das Projekt')}</div>
            <h2 className="font-[family-name:var(--font-lora)] text-[clamp(2rem,3vw,2.8rem)] font-bold leading-tight tracking-tight">
              {t('Building ', 'Brücken ')}
              <em className="font-normal italic text-[#EDE5FF]">{t('bridges', 'bauen')}</em> {t('to academic futures', 'zu akademischen Zukünften')}
            </h2>
            <p className="mt-5 text-[0.97rem] leading-relaxed text-white/80">
              {t(
                '"Building Bridges" is a 36-month interdisciplinary research and development project that aims to empower and mentor girls and FLINTA* of color from the 10th grade onwards. The project is being carried out by the Free University of Berlin, the SPI Foundation, and the University of Duisburg-Essen.',
                '„Building Bridges“ ist ein 36-monatiges interdisziplinäres Projekt für Mädchen und FLINTA* of Colour ab der 10. Klasse — durchgeführt von FU Berlin, Stiftung SPI und Universität Duisburg-Essen.'
              )}
            </p>
            <p className="mt-4 text-[0.97rem] leading-relaxed text-white/80">
              {t(
                'The entire project is scientifically monitored by the Free University of Berlin. Interviews and questionnaires assess experiences of discrimination, mental health, stressors, resources, and academic participation.',
                'Wissenschaftlich begleitet von der FU Berlin — mit Interviews und Fragebögen zu Diskriminierung, psychischer Gesundheit, Ressourcen und akademischer Teilhabe.'
              )}
            </p>
          </div>
          <div>
            <div className="mb-6 grid grid-cols-2 gap-4">
              {[
                { n: '36', l: t('Months project duration', 'Monate Laufzeit') },
                { n: '3', l: t('Universities involved', 'Hochschulen') },
                { n: '10+', l: t('Network partners', 'Netzwerk') },
                { n: '2027', l: t('Project end date', 'Projektende') },
              ].map((x) => (
                <div key={x.l} className="rounded-[18px] border border-white/20 bg-white/10 p-5 transition hover:bg-white/15">
                  <div className="font-[family-name:var(--font-lora)] text-[2.4rem] font-bold text-[#EDE5FF]">{x.n}</div>
                  <div className="mt-1 text-[0.83rem] opacity-65">{x.l}</div>
                </div>
              ))}
            </div>
            <div className="flex flex-col gap-4">
              {[
                { icon: '🔬', title: t('Scientific Coordination (TP1)', 'Wissenschaftliche Koordination (TP1)'), desc: t('Interviews & questionnaires on discrimination, mental health, and participation.', 'Interviews & Fragebögen zu Diskriminierung, Gesundheit und Teilhabe.') },
                { icon: '🤝', title: t('Mentoring & Empowerment (TP2)', 'Mentoring & Empowerment (TP2)'), desc: t('Workshops and mentoring from grade 10 — empowerment and transitions.', 'Workshops und Mentoring ab Klasse 10 — Empowerment und Übergänge.') },
                { icon: '💻', title: t('Digital Platform (TP3)', 'Digitale Plattform (TP3)'), desc: t('Participatory platform for storytelling and peer exchange.', 'Partizipative Plattform für Storytelling und Peer-Austausch.') },
              ].map((p) => (
                <div key={p.title} className="flex gap-4 rounded-[18px] border border-white/10 bg-white/10 p-5 transition hover:bg-white/15">
                  <span className="mt-0.5 text-[1.55rem]">{p.icon}</span>
                  <div>
                    <div className="mb-1 text-[0.97rem] font-bold">{p.title}</div>
                    <div className="text-[0.86rem] leading-relaxed opacity-75">{p.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="program" className="scroll-mt-[70px] px-10 py-28 max-md:px-6 max-md:py-20" style={{ background: '#F2EEFF' }}>
        <div className="mx-auto max-w-[1280px]">
          <div className="mb-2 text-center text-[0.72rem] font-bold uppercase tracking-[0.13em] text-[#9152FF]">{t('Project Goals', 'Projektziele')}</div>
          <h2 className="mb-14 text-center font-[family-name:var(--font-lora)] text-[clamp(2rem,3vw,2.6rem)] font-bold leading-tight tracking-tight text-[#1A1033]">
            {t('Our main goals are to ', 'Unsere Hauptziele: ')}
            <em className="font-normal italic text-[#9152FF]">{t('promote & empower', 'Förderung & Empowerment')}</em>
          </h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[
              { icon: '📋', title: t('Developing an MEP Program', 'MEP-Programm entwickeln'), body: t('Intersectionality-sensitive mentoring for BIPoC girls and FLINTA*.', 'Intersektional sensibles Mentoring für BIPoC-Mädchen und FLINTA*.') },
              { icon: '🎓', title: t('Promoting Academic Careers', 'Akademische Laufbahnen fördern'), body: t('Psychosocial fields and resources for M*oC entering science.', 'Psychosoziale Felder und Ressourcen für M*oC auf dem Weg in die Wissenschaft.') },
              { icon: '⭐', title: t('Creating Role Models', 'Vorbilder sichtbar machen'), body: t('Mentors and role models of colour in the programme.', 'Mentor*innen und Vorbilder of Colour im Programm.') },
              { icon: '🌐', title: t('Digital Platform', 'Digitale Plattform'), body: t('Participatory storytelling and peer-to-peer exchange.', 'Partizipatives Storytelling und Peer-to-Peer-Austausch.') },
              { icon: '🔍', title: t('Research Barriers', 'Barrieren erforschen'), body: t('Discrimination, barriers, and conditions for participation.', 'Diskriminierung, Barrieren und Teilhabebedingungen.') },
              { icon: '💪', title: t('Strengthening Resilience', 'Resilienz stärken'), body: t('Talents and resources for wellbeing and performance.', 'Talente und Ressourcen für Wohlbefinden und Leistung.') },
            ].map((g) => (
              <div
                key={g.title}
                className="group relative overflow-hidden rounded-[24px] border-[1.5px] border-[rgba(145,82,255,0.15)] bg-white p-8 shadow-[0_2px_12px_rgba(145,82,255,0.08)] transition hover:-translate-y-1 hover:shadow-[0_6px_28px_rgba(145,82,255,0.13)]"
              >
                <div className="absolute bottom-0 left-0 right-0 h-[3px] origin-left scale-x-0 bg-gradient-to-r from-[#9152FF] to-[#B580FF] transition-transform group-hover:scale-x-100" />
                <div className="mb-4 text-[2rem]">{g.icon}</div>
                <h3 className="mb-2 font-[family-name:var(--font-lora)] text-[1.1rem] font-bold text-[#1A1033]">{g.title}</h3>
                <p className="text-[0.875rem] leading-relaxed text-[#6B5F8A]">{g.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="team" className="scroll-mt-[70px] bg-white px-10 py-28 max-md:px-6 max-md:py-20">
        <div className="mx-auto max-w-[1280px]">
          <div className="mb-2 text-left text-[0.72rem] font-bold uppercase tracking-[0.13em] text-[#9152FF]">{t('Project Team', 'Projektteam')}</div>
          <h2 className="mb-4 max-w-[640px] text-left font-[family-name:var(--font-lora)] text-[clamp(2rem,3vw,2.6rem)] font-bold leading-tight tracking-tight text-[#1A1033]">
            {t('Meet the ', 'Die ')}
            <em className="font-normal italic text-[#9152FF]">{t('people', 'Menschen')}</em> {t('behind Building Bridges', 'hinter Building Bridges')}
          </h2>
          <p className="mb-14 max-w-[640px] text-[0.97rem] text-[#6B5F8A]">{t('Three partner institutions – one shared mission.', 'Drei Partner — eine gemeinsame Mission.')}</p>

          <TeamTpBlock
            variant="tp1"
            badge="TP1"
            title={t('Free University of Berlin – Scientific Coordination & Research', 'FU Berlin – Wissenschaftliche Koordination & Forschung')}
            subtitle={t('Educational Science & Psychology · Project management & evaluation', 'Erziehungswissenschaft & Psychologie · Management & Evaluation')}
            members={tp1}
            displayName={displayName}
          />
          <TeamTpBlock
            variant="tp2"
            badge="TP2"
            title={t('SPI Foundation – Mentoring & Empowerment Program', 'Stiftung SPI – Mentoring & Empowerment')}
            subtitle={t('Social Pedagogical Institute Berlin · MEP development', 'Sozialpädagogisches Institut Berlin · MEP-Entwicklung')}
            members={tp2}
            displayName={displayName}
          />
          <TeamTpBlock
            variant="tp3"
            badge="TP3"
            title={t('University of Duisburg-Essen – Digital Platform & Research', 'Universität Duisburg-Essen – Digitale Plattform')}
            subtitle={t('Faculty of Computer Science · Participatory development', 'Informatik · Partizipative Entwicklung')}
            members={tp3}
            displayName={displayName}
          />
        </div>
      </section>

      <KnowledgeSection />
      <StorytellingSection />

      <section id="partners" className="scroll-mt-[70px] bg-white px-10 py-28 max-md:px-6 max-md:py-20">
        <div className="mx-auto max-w-[1280px]">
          <div className="mb-2 text-[0.72rem] font-bold uppercase tracking-[0.13em] text-[#9152FF]">{t('Project Partners', 'Projektpartner')}</div>
          <h2 className="mb-12 text-center font-[family-name:var(--font-lora)] text-[clamp(2rem,3vw,2.6rem)] font-bold leading-tight tracking-tight text-[#1A1033]">
            {t('A strong ', 'Ein starkes ')}
            <em className="font-normal italic text-[#9152FF]">{t('alliance', 'Bündnis')}</em> {t('of universities & foundations', 'aus Hochschulen & Stiftungen')}
          </h2>
          <div className="mb-10 grid grid-cols-1 gap-8 md:grid-cols-3">
            {[
              {
                tag: t('Network Coordination · TP1', 'Netzwerk · TP1'),
                name: 'Freie Universität Berlin',
                role: t('Project Management & Research', 'Projektleitung & Forschung'),
                body: t('Overall coordination under Prof. Dr. Claudia Calvano.', 'Gesamtkoordination unter Prof. Dr. Claudia Calvano.'),
                logo: '/Projektpartner Logos/FU Berlin logo.png',
                href: 'https://www.fu-berlin.de',
              },
              {
                tag: t('MEP Development · TP2', 'MEP · TP2'),
                name: 'Stiftung SPI',
                role: t('Mentoring & Empowerment Program', 'Mentoring- & Empowerment-Programm'),
                body: t('Practice-oriented MEP under M.A. Celiana Kiefer.', 'Praxisnahes MEP unter M.A. Celiana Kiefer.'),
                logo: '/Projektpartner Logos/Stiftung SPI Logo.png',
                href: 'https://www.stiftung-spi.de',
              },
              {
                tag: t('Digital Platform · TP3', 'Plattform · TP3'),
                name: 'Universität Duisburg-Essen',
                role: t('Digital Platform & Research', 'Digitale Plattform & Forschung'),
                body: t('Storytelling platform under Prof. Dr. Hannes Rothe.', 'Storytelling-Plattform unter Prof. Dr. Hannes Rothe.'),
                logo: '/Projektpartner Logos/UDE_Logo.png',
                href: 'https://www.uni-due.de',
              },
            ].map((p) => (
              <div key={p.name} className="rounded-[24px] border-[1.5px] border-[rgba(145,82,255,0.15)] p-8 transition hover:-translate-y-1 hover:shadow-[0_6px_28px_rgba(145,82,255,0.13)]">
                <div className="mb-2 text-[0.72rem] font-bold uppercase tracking-[0.1em] text-[#9152FF]">{p.tag}</div>
                <div className="mb-2 flex items-center gap-3">
                  <div className="relative h-10 w-20 shrink-0">
                    <Image src={p.logo} alt="" fill className="object-contain" />
                  </div>
                  <h3 className="font-[family-name:var(--font-lora)] text-[1.15rem] font-bold text-[#1A1033]">{p.name}</h3>
                </div>
                <div className="mb-3 text-[0.83rem] font-semibold text-[#6B5F8A]">{p.role}</div>
                <p className="text-[0.875rem] leading-relaxed text-[#888]">{p.body}</p>
                <a href={p.href} target="_blank" rel="noopener noreferrer" className="mt-4 inline-block text-[0.84rem] font-bold text-[#9152FF] hover:underline">
                  {t('Visit website →', 'Website →')}
                </a>
              </div>
            ))}
          </div>
          <div className="flex flex-wrap items-center gap-8 rounded-[24px] border-[1.5px] border-[rgba(145,82,255,0.15)] bg-[#F5F0FF] px-10 py-8">
            <span className="text-[0.8rem] font-bold uppercase tracking-[0.09em] text-[#6B5F8A]">{t('Funded by', 'Gefördert durch')}</span>
            <div className="flex flex-wrap items-center gap-4">
              {['BMBF & BMFSJ', 'European Social Fund Plus (ESF+)', t('Framework Programme Empirical Educational Research', 'Rahmenprogramm Empirische Bildungsforschung')].map((x) => (
                <div key={x} className="rounded-xl border-[1.5px] border-[rgba(145,82,255,0.15)] bg-white px-5 py-2.5 text-[0.82rem] font-semibold text-[#6B5F8A]">
                  {x}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="events" className="scroll-mt-[70px] bg-white px-10 py-28 max-md:px-6 max-md:py-20">
        <div className="mx-auto max-w-[1280px]">
          <div className="mb-12 grid grid-cols-1 items-start gap-16 lg:grid-cols-2">
            <div>
              <div className="mb-2 text-[0.72rem] font-bold uppercase tracking-[0.13em] text-[#9152FF]">{t('Training & Events', 'Trainings & Veranstaltungen')}</div>
              <h2 className="text-left font-[family-name:var(--font-lora)] text-[clamp(2rem,3vw,2.6rem)] font-bold leading-tight tracking-tight text-[#1A1033]">
                {t('Workshops & ', 'Workshops & ')}
                <em className="font-normal italic text-[#9152FF]">{t('program activities', 'Programmaktivitäten')}</em>
              </h2>
              <p className="mt-4 max-w-[420px] text-base leading-relaxed text-[#6B5F8A]">
                {t(
                  'Programs and research activities to empower girls and FLINTA* of Colour in academic careers.',
                  'Programme und Forschung zur Stärkung von Mädchen und FLINTA* of Colour auf akademischen Wegen.'
                )}
              </p>
            </div>
            <div className="rounded-[24px] bg-[#9152FF] p-8 text-white shadow-[0_12px_48px_rgba(145,82,255,0.18)]">
              <div className="mb-2 text-[0.72rem] font-bold uppercase tracking-[0.12em] text-white/65">{t('Next up', 'Als Nächstes')}</div>
              <div className="mb-1 font-[family-name:var(--font-lora)] text-[1.25rem] font-bold">{t('Networking & Exchange', 'Networking & Austausch')}</div>
              <div className="mb-3 text-[0.84rem] opacity-80">{t('Wednesday, January 14, 2026 · 6:00 PM · Online', 'Mittwoch, 14. Jan. 2026 · 18:00 Uhr · Online')}</div>
              <p className="text-[0.88rem] leading-relaxed opacity-90">
                {t('Online introductions to mentors.', 'Online-Vorstellung der Mentor*innen.')}
              </p>
              <Link href="/workshops" className="mt-4 inline-block text-[0.84rem] font-bold text-[#EDE5FF] hover:underline">
                {t('Read more →', 'Mehr →')}
              </Link>
            </div>
          </div>
          <div className="mb-2 text-[0.72rem] font-bold uppercase tracking-[0.13em] text-[#9152FF]">{t('Workshop Offerings', 'Workshop-Angebote')}</div>
          <p className="mb-8 text-[0.95rem] text-[#6B5F8A]">{t('Upcoming workshop and event dates.', 'Kommende Termine für Workshops und Veranstaltungen.')}</p>
          <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {EVENTS.map((e) => (
              <div key={e.title} className="flex flex-col gap-2 rounded-[18px] border-[1.5px] border-[rgba(145,82,255,0.15)] bg-white p-6 shadow-[0_2px_12px_rgba(145,82,255,0.08)] transition hover:-translate-y-1 hover:shadow-[0_6px_28px_rgba(145,82,255,0.13)]">
                <span className="w-fit rounded-full bg-[#EDE5FF] px-3 py-1 text-[0.69rem] font-bold uppercase tracking-[0.09em] text-[#9152FF]">{e.badge}</span>
                <span className="text-[0.72rem] font-semibold uppercase tracking-[0.07em] text-[#aaa]">{t('For participants', 'Für Teilnehmende')}</span>
                <span className="text-[0.82rem] font-semibold text-[#7339E0]">{e.date}</span>
                <span className="font-[family-name:var(--font-lora)] text-base font-bold text-[#1A1033]">{e.title}</span>
                <Link href="/workshops" className="mt-auto text-[0.82rem] font-bold text-[#9152FF] hover:underline">
                  {t('Read more →', 'Mehr →')}
                </Link>
              </div>
            ))}
          </div>
          <button
            type="button"
            onClick={() => setPastOpen((o) => !o)}
            className="mb-6 flex items-center gap-2 rounded-full border-[1.5px] border-[rgba(145,82,255,0.15)] bg-transparent px-6 py-2.5 font-[family-name:var(--font-sora)] text-[0.875rem] font-semibold text-[#6B5F8A] transition hover:border-[#9152FF] hover:bg-[#F5F0FF] hover:text-[#9152FF]"
          >
            📋 {pastOpen ? t('Hide past workshops', 'Weniger') : t('View past workshops', 'Vergangene Workshops')}
          </button>
          {pastOpen && (
            <div className="mb-12 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              {PAST_EVENTS.map((e) => (
                <div key={e.title} className="flex flex-col gap-2 rounded-[18px] border-[1.5px] border-[rgba(145,82,255,0.15)] bg-[#F5F0FF] p-5">
                  <span className="w-fit text-[0.69rem] font-bold uppercase tracking-[0.08em] text-[#6BAA8A]">✓ {t('Completed', 'Abgeschlossen')}</span>
                  <span className="text-[0.8rem] font-medium text-[#6B5F8A]">{e.date}</span>
                  <span className="font-[family-name:var(--font-lora)] text-[0.98rem] font-bold text-[#666]">{e.title}</span>
                </div>
              ))}
            </div>
          )}
          <div className="mt-12">
            <div className="mb-2 text-[0.72rem] font-bold uppercase tracking-[0.13em] text-[#9152FF]">{t('Research Activities', 'Forschungsaktivitäten')}</div>
            <h3 className="mb-6 font-[family-name:var(--font-lora)] text-[1.8rem] font-bold tracking-tight text-[#1A1033]">
              {t('Scientific studies on ', 'Studien zu ')}
              <em className="font-normal italic text-[#9152FF]">{t('barriers & resilience', 'Barrieren & Resilienz')}</em>
            </h3>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {[
                { tag: t('Discrimination Research', 'Diskriminierungsforschung'), title: t('Discrimination & Barriers', 'Diskriminierung & Barrieren'), body: t('Experiences and barriers in education.', 'Erfahrungen und Barrieren im Bildungssystem.') },
                { tag: t('Resilience Studies', 'Resilienz'), title: t('Resilience & Resources', 'Resilienz & Ressourcen'), body: t('Protective factors for M*oC.', 'Schutzfaktoren für M*oC.') },
                { tag: t('Participatory Evaluation', 'Partizipative Evaluation'), title: t('MEP Program Evaluation', 'MEP-Evaluation'), body: t('Joint development with all stakeholders.', 'Gemeinsame Weiterentwicklung mit allen Beteiligten.') },
              ].map((r) => (
                <div key={r.title} className="rounded-[24px] border-[1.5px] border-[rgba(145,82,255,0.15)] bg-white p-7 shadow-[0_2px_12px_rgba(145,82,255,0.08)]">
                  <div className="mb-3 text-[0.7rem] font-bold uppercase tracking-[0.09em] text-[#9152FF]">{r.tag}</div>
                  <h4 className="mb-2 font-[family-name:var(--font-lora)] text-[1.1rem] font-bold text-[#1A1033]">{r.title}</h4>
                  <p className="text-[0.875rem] leading-relaxed text-[#6B5F8A]">{r.body}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-16 rounded-[32px] bg-[#9152FF] p-10 text-white md:p-12">
            <h3 className="mb-2 font-[family-name:var(--font-lora)] text-[1.65rem] font-bold">{t('Project Progress', 'Projektfortschritt')}</h3>
            <p className="mb-8 text-[0.9rem] opacity-75">{t('36 months: September 2024 to August 2027.', '36 Monate: September 2024 bis August 2027.')}</p>
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
              {[
                { n: '1', period: 'Sep 2024 – Aug 2025', title: t('Project Launch & MEP Development', 'Start & MEP-Entwicklung'), desc: t('First cohort and programme design.', 'Erste Kohorte und Programmentwicklung.') },
                { n: '2', period: 'Sep 2025 – Aug 2026', title: t('Full Implementation & Research', 'Umsetzung & Forschung'), desc: t('Full programmes and data collection.', 'Volle Umsetzung und Datenerhebung.'), active: true },
                { n: '3', period: 'Sep 2026 – Aug 2027', title: t('Evaluation & Sustainability', 'Evaluation & Verstetigung'), desc: t('Results, dissemination, sustainability.', 'Ergebnisse, Verbreitung, Verstetigung.') },
              ].map((ph) => (
                <div key={ph.n} className="relative z-[1]">
                  <div
                    className={`mb-4 flex h-[52px] w-[52px] items-center justify-center rounded-full border-2 font-[family-name:var(--font-lora)] text-base font-bold ${
                      ph.active
                        ? 'border-white bg-white text-[#9152FF]'
                        : Number(ph.n) === 1
                          ? 'border-[#6BAA8A] bg-[#6BAA8A] text-white'
                          : 'border-white/25 bg-white/10 text-white/45'
                    }`}
                  >
                    {ph.n}
                  </div>
                  <div className="mb-2 text-[0.75rem] font-bold uppercase tracking-[0.08em] text-[#EDE5FF]/85">{ph.period}</div>
                  <div className="mb-2 font-[family-name:var(--font-lora)] text-base font-bold">{ph.title}</div>
                  <p className="text-[0.84rem] leading-relaxed opacity-65">{ph.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="register" className="relative scroll-mt-[70px] overflow-hidden bg-[#9152FF] px-10 py-24 max-md:px-6">
        <span className="pointer-events-none absolute left-4 top-[-4rem] font-[family-name:var(--font-lora)] text-[22rem] font-bold leading-none text-white/[0.06]" aria-hidden>
          &ldquo;
        </span>
        <div className="relative z-[1] mx-auto grid max-w-[1280px] grid-cols-1 items-center gap-16 lg:grid-cols-2">
          <div>
            <h2 className="font-[family-name:var(--font-lora)] text-[2.8rem] font-bold leading-tight tracking-tight text-white">
              {t('Become part of ', 'Werde Teil von ')}
              <em className="font-normal italic">Building Bridges</em>
            </h2>
            <p className="mt-4 text-base leading-relaxed text-white/80">
              {t(
                'As a participant, mentor, or partner — together we build bridges to an inclusive academic future. September 2024 – August 2027.',
                'Als Teilnehmer*in, Mentor*in oder Partner*in — gemeinsam für eine inklusive akademische Zukunft. Sep 2024 – Aug 2027.'
              )}
            </p>
          </div>
          <div className="flex flex-col gap-4">
            <Link href="/sign-up" className="flex items-center gap-5 rounded-[18px] border-[1.5px] border-white/20 bg-white/15 p-6 text-white no-underline transition hover:translate-x-1 hover:bg-white/20">
              <span className="text-[1.8rem]">👩‍🎓</span>
              <span className="min-w-0 flex-1">
                <span className="block text-base font-bold">{t('For Participants', 'Für Teilnehmende')}</span>
                <span className="mt-1 block text-[0.84rem] opacity-80">{t('Girls and FLINTA* of Colour from grade 10', 'Mädchen und FLINTA* of Colour ab Klasse 10')}</span>
              </span>
              <span className="ml-auto text-xl opacity-60">→</span>
            </Link>
            <Link href="/mentors" className="flex items-center gap-5 rounded-[18px] border-[1.5px] border-white/20 bg-white/15 p-6 text-white no-underline transition hover:translate-x-1 hover:bg-white/20">
              <span className="text-[1.8rem]">🌟</span>
              <span className="min-w-0 flex-1">
                <span className="block text-base font-bold">{t('For Mentors', 'Für Mentor*innen')}</span>
                <span className="mt-1 block text-[0.84rem] opacity-80">{t('Students and role models of colour', 'Studierende und Vorbilder of Colour')}</span>
              </span>
              <span className="ml-auto text-xl opacity-60">→</span>
            </Link>
            <Link href="/contact" className="flex items-center gap-5 rounded-[18px] border-[1.5px] border-white/20 bg-white/15 p-6 text-white no-underline transition hover:translate-x-1 hover:bg-white/20">
              <span className="text-[1.8rem]">🏫</span>
              <span className="min-w-0 flex-1">
                <span className="block text-base font-bold">{t('For Partners', 'Für Partner')}</span>
                <span className="mt-1 block text-[0.84rem] opacity-80">{t('Schools, organisations, institutions', 'Schulen, Organisationen, Institutionen')}</span>
              </span>
              <span className="ml-auto text-xl opacity-60">→</span>
            </Link>
          </div>
        </div>
      </section>

      <section id="contact" className="scroll-mt-[70px] px-10 py-28 max-md:px-6 max-md:py-20" style={{ background: '#F2EEFF' }}>
        <div className="mx-auto grid max-w-[1280px] grid-cols-1 items-start gap-20 lg:grid-cols-[1fr_1.4fr]">
          <div>
            <div className="mb-2 text-[0.72rem] font-bold uppercase tracking-[0.13em] text-[#9152FF]">{t('Contact', 'Kontakt')}</div>
            <h2 className="mb-4 font-[family-name:var(--font-lora)] text-[2.2rem] font-bold leading-tight tracking-tight text-[#1A1033]">
              {t('Get in ', 'Kontakt ')}
              <em className="font-normal italic text-[#9152FF]">{t('touch', 'aufnehmen')}</em>
            </h2>
            <p className="text-[0.97rem] leading-relaxed text-[#6B5F8A]">{t('Questions about Building Bridges? We look forward to hearing from you.', 'Fragen zu Building Bridges? Wir freuen uns auf deine Nachricht.')}</p>
            <div className="mt-8 flex flex-col gap-5">
              <div className="rounded-[18px] border-[1.5px] border-[rgba(145,82,255,0.15)] bg-white p-5 shadow-[0_2px_12px_rgba(145,82,255,0.08)]">
                <div className="mb-2 flex items-center gap-3">
                  <div className="relative h-[34px] w-[70px] shrink-0">
                    <Image src="/Projektpartner Logos/FU Berlin logo.png" alt="" fill className="object-contain object-left" />
                  </div>
                  <div className="text-[0.9rem] font-bold text-[#1A1033]">{t('Project Management – FU Berlin (TP1)', 'Projektleitung – FU Berlin (TP1)')}</div>
                </div>
                <p className="text-[0.85rem] leading-relaxed text-[#6B5F8A]">
                  Univ.-Prof. Dr. Claudia Calvano
                  <br />
                  Habelschwerdter Allee 45, 14195 Berlin
                  <br />
                  <a href="mailto:claudia.calvano@fu-berlin.de" className="font-semibold text-[#9152FF] hover:underline">
                    claudia.calvano@fu-berlin.de
                  </a>
                </p>
              </div>
              <div className="rounded-[18px] border-[1.5px] border-[rgba(145,82,255,0.15)] bg-white p-5 shadow-[0_2px_12px_rgba(145,82,255,0.08)]">
                <div className="mb-2 flex items-center gap-3">
                  <div className="relative h-[34px] w-[70px] shrink-0">
                    <Image src="/Projektpartner Logos/Stiftung SPI Logo.png" alt="" fill className="object-contain object-left" />
                  </div>
                  <div className="text-[0.9rem] font-bold text-[#1A1033]">{t('SPI Foundation – MEP (TP2)', 'Stiftung SPI – MEP (TP2)')}</div>
                </div>
                <p className="text-[0.85rem] leading-relaxed text-[#6B5F8A]">
                  M.A. Celiana Kiefer
                  <br />
                  Building Bridges c/o MÄDEA, Grüntaler Straße 21, 13357 Berlin
                  <br />
                  <a href="mailto:celiana.kiefer@lvs.stiftung-spi.de" className="font-semibold text-[#9152FF] hover:underline">
                    celiana.kiefer@lvs.stiftung-spi.de
                  </a>
                </p>
              </div>
              <div className="rounded-[18px] border-[1.5px] border-[rgba(145,82,255,0.15)] bg-white p-5 shadow-[0_2px_12px_rgba(145,82,255,0.08)]">
                <div className="mb-2 flex items-center gap-3">
                  <div className="relative h-[34px] w-[70px] shrink-0">
                    <Image src="/Projektpartner Logos/UDE_Logo.png" alt="" fill className="object-contain object-left" />
                  </div>
                  <div className="text-[0.9rem] font-bold text-[#1A1033]">{t('University of Duisburg-Essen – TP3', 'Universität Duisburg-Essen – TP3')}</div>
                </div>
                <p className="text-[0.85rem] leading-relaxed text-[#6B5F8A]">
                  Prof. Dr. Hannes Rothe · {t('Faculty of Computer Science', 'Fakultät für Informatik')}
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-[32px] border-[1.5px] border-[rgba(145,82,255,0.15)] bg-white p-10 shadow-[0_6px_28px_rgba(145,82,255,0.13)]">
            <h3 className="mb-6 font-[family-name:var(--font-lora)] text-[1.55rem] font-bold text-[#1A1033]">{t('Send a Message', 'Nachricht senden')}</h3>
            <p className="mb-6 text-[0.9rem] text-[#6B5F8A]">{t('Use our contact page for a full form and routing.', 'Nutze unsere Kontaktseite für das vollständige Formular.')}</p>
            <Link
              href="/contact"
              className="inline-flex w-full items-center justify-center rounded-full bg-[#9152FF] py-4 font-[family-name:var(--font-sora)] text-[0.95rem] font-bold text-white shadow-[0_4px_18px_rgba(145,82,255,0.35)] transition hover:-translate-y-px hover:bg-[#7339E0]"
            >
              {t('Go to contact form →', 'Zum Kontaktformular →')}
            </Link>
          </div>
        </div>
      </section>

      <div className="bg-white">
        <FundingBanner
          heading={t('Official funding partners', 'Offizielle Förderlogos')}
          logos={[
            { src: '/BMBF/LOGO%20Kit_BMBFSFJ/BMBFSFJ_gefoerdert_vom_deutsch_Web.svg', alt: 'BMBFSFJ', width: 220, height: 70, scale: 0.95 },
            { src: '/BMBF/EBF-Publikations-Kit/BG-EBF_Wortmarke.svg', alt: 'EBF', width: 220, height: 70, scale: 0.9 },
            { src: '/BMBF/image copy 3.png', alt: 'EU', width: 220, height: 70, scale: 0.6 },
          ]}
        />
      </div>
    </div>
  );
}

const EVENTS = [
  { badge: 'Networking & Exchange', date: 'Jan 14, 2026 · 6 PM · Online', title: 'Online introductions to mentors' },
  { badge: 'Individual Mentoring', date: 'Jan – Nov 2026', title: 'Individual Mentoring' },
  { badge: 'Workshop', date: 'Mar 2026', title: 'Mentoring Workshop II – Johanna Eck' },
  { badge: 'Self-care', date: 'Apr 2026', title: 'SELF CARE I' },
  { badge: 'Vision & Goals', date: 'Apr 25, 2026 · All day', title: 'Mentoring Workshop II – Vision' },
  { badge: 'Self-care', date: 'May 15, 2026', title: 'Self Care II' },
  { badge: 'Skills', date: 'Jun 12, 2026', title: 'Skills Training I' },
  { badge: 'Skills', date: 'Aug 3, 2026', title: 'Skills Training II' },
  { badge: 'Skills', date: 'Oct 9, 2026', title: 'Skills Training III' },
];

const PAST_EVENTS = [
  { date: 'Jun 20–22, 2025', title: 'Basic Training Group I' },
  { date: 'Oct 8, 2025', title: 'Introductory Workshop with Johanna Eck' },
  { date: 'Nov 22, 2025', title: 'Opening Event' },
  { date: 'Dec 9, 2025', title: 'Get-together' },
  { date: 'Dec 18, 2025', title: 'Pearls & Power Workshop – Johanna Eck' },
];

function TeamTpBlock({
  variant,
  badge,
  title,
  subtitle,
  members,
  displayName,
}: {
  variant: 'tp1' | 'tp2' | 'tp3';
  badge: string;
  title: string;
  subtitle: string;
  members: TeamMember[];
  displayName: (m: TeamMember) => string;
}) {
  const { t } = useLandingLocale();
  const badgeBg =
    variant === 'tp1' ? 'bg-[#9152FF]' : variant === 'tp2' ? 'bg-[#6BAA8A]' : 'bg-[#c08800]';
  const titleColor = variant === 'tp1' ? 'text-[#9152FF]' : variant === 'tp2' ? 'text-[#6BAA8A]' : 'text-[#c08800]';
  const bar =
    variant === 'tp1'
      ? 'from-[#9152FF] to-[#B580FF]'
      : variant === 'tp2'
        ? 'from-[#6BAA8A] to-[#8FC9AB]'
        : 'from-[#c08800] to-[#e6b030]';
  const photoBorder =
    variant === 'tp1' ? 'border-[#EDE5FF]' : variant === 'tp2' ? 'border-[rgba(107,170,138,0.4)]' : 'border-[rgba(192,136,0,0.35)]';
  const contactBg =
    variant === 'tp1' ? 'bg-[#F5F0FF]' : variant === 'tp2' ? 'bg-[rgba(107,170,138,0.15)]' : 'bg-[rgba(240,165,0,0.12)]';

  return (
    <div className="mb-16">
      <div className="mb-8 flex items-center gap-5 border-b-[1.5px] border-[rgba(145,82,255,0.15)] pb-5">
        <div className={`flex h-[52px] w-[52px] shrink-0 items-center justify-center rounded-[14px] text-[0.8rem] font-extrabold tracking-wide text-white ${badgeBg}`}>
          {badge}
        </div>
        <div>
          <h3 className="font-[family-name:var(--font-lora)] text-[1.3rem] font-bold text-[#1A1033]">{title}</h3>
          <span className="text-[0.83rem] font-medium text-[#6B5F8A]">{subtitle}</span>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {members.map((m) => (
          <div
            key={m.slug}
            className={`overflow-hidden rounded-[24px] border-[1.5px] border-[rgba(145,82,255,0.15)] bg-white shadow-[0_2px_12px_rgba(145,82,255,0.08)] transition hover:-translate-y-1 hover:shadow-[0_6px_28px_rgba(145,82,255,0.13)]`}
          >
            <Link
              href={`/team/${m.slug}`}
              className={`relative block p-7 pb-4 no-underline outline-none ring-offset-2 focus-visible:ring-2 focus-visible:ring-[#9152FF]`}
            >
              <div className={`absolute left-0 right-0 top-0 h-1 bg-gradient-to-r ${bar}`} />
              <div
                className={`mb-4 aspect-[4/5] w-full overflow-hidden rounded-2xl border-[3px] border-solid shadow-[0_2px_12px_rgba(145,82,255,0.18)] ${photoBorder}`}
              >
                <Image
                  src={m.image}
                  alt={displayName(m)}
                  width={400}
                  height={500}
                  className="h-full w-full object-cover object-top"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
              <h4 className="mb-1 font-[family-name:var(--font-lora)] text-[1.05rem] font-bold text-[#1A1033]">{displayName(m)}</h4>
              <div className={`mb-2 text-[0.8rem] font-bold uppercase tracking-[0.07em] ${titleColor}`}>
                {pickTeamMemberText(m, 'role', t) ?? m.role}
              </div>
              <p className="text-[0.83rem] leading-relaxed text-[#6B5F8A]">{pickTeamMemberOrgOrBio(m, t)}</p>
            </Link>
            {m.email ? (
              <div className={`mx-7 mb-4 rounded-xl border border-[rgba(145,82,255,0.15)] px-3 py-2.5 text-[0.78rem] ${contactBg}`}>
                <a href={`mailto:${m.email}`} className="font-semibold text-[#9152FF] hover:underline">
                  ✉ {m.email}
                </a>
                {m.address ? <div className="mt-1 text-[0.75rem] text-[#6B5F8A]">📍 {m.address}</div> : null}
              </div>
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
}
