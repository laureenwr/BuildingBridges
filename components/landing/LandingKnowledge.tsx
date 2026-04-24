'use client';

import { useState } from 'react';

const tabs = [
  { id: 'mental-health' as const, label: '🧠 Mental Health' },
  { id: 'barriers' as const, label: '🚧 Barriers & Discrimination' },
  { id: 'resilience' as const, label: '💪 Resilience & Resources' },
  { id: 'mep' as const, label: '🤝 MEP Program' },
];

const panels: Record<
  (typeof tabs)[number]['id'],
  { warn?: string; cards: { icon: string; title: string; body: string; chips: string[] }[] }
> = {
  'mental-health': {
    warn: 'Some content discusses mental health challenges. You can skip at any point.',
    cards: [
      {
        icon: '🧠',
        title: 'Mental Health in the Psychosocial Field',
        body: 'Information about mental health challenges, protective factors, and common experiences of BIPoC students in psychosocial degree programmes.',
        chips: ['📄 Text', '🎬 Video', '📊 Infographic'],
      },
      {
        icon: '📚',
        title: 'Stressors in Studying',
        body: 'Research-based overview of specific stressors experienced by FLINTA* of Colour in studying and transitioning into psychosocial professions.',
        chips: ['📄 Text', '💬 Example Stories'],
      },
      {
        icon: '🌿',
        title: 'Coping Strategies',
        body: 'Evidence-based and community-sourced coping strategies for navigating academic stress, identity-related pressure, and systemic barriers.',
        chips: ['📄 Text', '🎬 Video', '🎧 Audio'],
      },
    ],
  },
  barriers: {
    warn: 'This section covers experiences of discrimination and structural barriers.',
    cards: [
      {
        icon: '🚧',
        title: 'Structural Barriers in Education',
        body: 'Overview of systemic barriers affecting BIPoC girls and FLINTA* educational pathways, based on current research findings.',
        chips: ['📄 Text', '📊 Infographic'],
      },
      {
        icon: '🗣️',
        title: 'Experiences of Discrimination',
        body: 'Research-based content on everyday and institutional discrimination in academic contexts — including micro-aggressions and racial bias.',
        chips: ['💬 Example Stories', '📄 Text'],
      },
      {
        icon: '⚖️',
        title: 'Intersectionality & Identity',
        body: 'How overlapping identities — race, gender, class, disability — interact and create compounding experiences in educational spaces.',
        chips: ['📄 Text', '🎬 Video'],
      },
    ],
  },
  resilience: {
    cards: [
      {
        icon: '🌱',
        title: 'Protective Factors',
        body: 'Research on individual, social, and structural protective factors supporting resilience and wellbeing among BIPoC students.',
        chips: ['📄 Text', '📊 Infographic'],
      },
      {
        icon: '✨',
        title: 'Strengths & Resources',
        body: 'Community-sourced insights on personal strengths and cultural resources that support academic success and wellbeing.',
        chips: ['💬 Example Stories', '🎬 Video'],
      },
      {
        icon: '🏆',
        title: 'Success Stories',
        body: 'Inspiring accounts from M*oC who have navigated higher education and entered psychosocial professions.',
        chips: ['💬 Stories', '🎬 Video Portraits'],
      },
    ],
  },
  mep: {
    cards: [
      {
        icon: '📋',
        title: 'About the MEP Program',
        body: 'Comprehensive overview of the Mentoring & Empowerment Program — structure, goals, eligibility, and what to expect.',
        chips: ['📄 Text', '📊 Infographic'],
      },
      {
        icon: '🗓️',
        title: 'Workshops & Activities',
        body: 'Detailed descriptions of all workshop formats including Self-Care sessions, Skills Trainings, Vision workshops, and Networking events.',
        chips: ['📄 Text', '🎬 Video'],
      },
      {
        icon: '🔐',
        title: 'Sign In / Login',
        body: 'Registered participants and mentors can log in to access their personal mentoring dashboard and private story creation space.',
        chips: ['🔒 Members only', '🌐 Online'],
      },
    ],
  },
};

const glossary: { term: string; en: string; de: string }[] = [
  {
    term: 'FLINTA*',
    en: 'Female, Lesbian, Inter, Non-binary, Trans and Agender — the asterisk signals openness beyond the binary.',
    de: 'Frauen, Lesben, Inter, Nicht-binäre, Trans und Agender — das * steht für Offenheit jenseits der Binärkeit.',
  },
  {
    term: 'BIPoC',
    en: 'Black, Indigenous and People of Colour — centres racialised experiences and resistance to racism.',
    de: 'Black, Indigenous and People of Colour — rückt rassifizierte Erfahrungen und Widerstand gegen Rassismus in den Mittelpunkt.',
  },
  {
    term: 'M*oC',
    en: 'Mädchen* of Colour — girls and FLINTA* of Colour; the asterisk includes non-binary identities.',
    de: 'Mädchen* of Colour — das * schließt nicht-binäre Identitäten ein.',
  },
  { term: 'MEP Program', en: 'Mentoring & Empowerment Program — workshops, mentoring, peer exchange.', de: 'Mentoring- & Empowerment-Programm.' },
];

export function LandingKnowledge() {
  const [active, setActive] = useState<(typeof tabs)[number]['id']>('mental-health');
  const [glossaryOpen, setGlossaryOpen] = useState<{ term: string; en: string; de: string } | null>(null);

  const scrollToStory = () => document.getElementById('storytelling')?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section id="knowledge" className="bg-[#F2EEFF] px-6 py-24 sm:px-10 sm:py-28">
      <div className="mx-auto max-w-[1280px]">
        <p className="mb-3 text-[0.72rem] font-bold uppercase tracking-[0.13em] text-[#9152FF]">Information Platform</p>
        <h2 className="mb-3 max-w-[720px] font-lora text-[clamp(2rem,3vw,2.6rem)] font-bold leading-tight tracking-tight text-[#1A1033]">
          Knowledge, <em className="font-normal not-italic text-[#9152FF]">resources &amp; learning</em>
        </h2>
        <p className="mb-8 max-w-[680px] text-[0.97rem] text-[#6B5F8A]">
          A growing, living resource hub with multimodal content — text, video, infographics, and example stories — in
          accessible language in both German and English.
        </p>

        <div className="mb-10 flex flex-wrap items-center gap-4 rounded-[18px] border-[1.5px] border-[rgba(145,82,255,0.15)] bg-gradient-to-r from-[#EDE5FF] to-[#F5F0FF] px-5 py-4 text-[0.88rem] text-[#6B5F8A]">
          <span className="relative flex h-2 w-2 shrink-0">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#9152FF] opacity-40" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-[#9152FF]" />
          </span>
          <p>
            <strong className="text-[#9152FF]">This section is evolving.</strong> Content is being added collaboratively
            with participants, researchers, and community partners.
          </p>
          <button
            type="button"
            onClick={scrollToStory}
            className="ml-auto shrink-0 rounded-full bg-[#f0c060] px-4 py-1.5 text-[0.8rem] font-bold text-[#5a3e00]"
          >
            Jump ahead →
          </button>
        </div>

        <div className="mb-10 flex flex-wrap gap-2">
          {tabs.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setActive(t.id)}
              className={`rounded-full border-[1.5px] px-5 py-2 text-[0.84rem] font-semibold transition ${
                active === t.id
                  ? 'border-[#9152FF] bg-[#9152FF] text-white'
                  : 'border-[rgba(145,82,255,0.15)] bg-white text-[#6B5F8A] hover:border-[#9152FF] hover:text-[#9152FF]'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {tabs.map((t) => {
          const panel = panels[t.id];
          if (active !== t.id) return null;
          return (
            <div key={t.id}>
              {panel.warn && (
                <div className="mb-8 flex flex-wrap items-center gap-4 rounded-[18px] border-[1.5px] border-[#f0c060] bg-[#fffaf0] px-5 py-4">
                  <span className="text-xl" aria-hidden>
                    ⚠️
                  </span>
                  <p className="flex-1 text-[0.88rem] leading-relaxed text-[#7a5500]">
                    <strong>Content note:</strong> {panel.warn}
                  </p>
                  <button
                    type="button"
                    onClick={() => setActive('resilience')}
                    className="rounded-full bg-[#f0c060] px-4 py-1.5 text-[0.8rem] font-bold text-[#5a3e00]"
                  >
                    Skip to Resilience →
                  </button>
                </div>
              )}
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {panel.cards.map((c) => (
                  <article
                    key={c.title}
                    className="rounded-[24px] border-[1.5px] border-[rgba(145,82,255,0.15)] bg-white p-7 shadow-[0_2px_12px_rgba(145,82,255,0.08)] transition hover:-translate-y-1 hover:shadow-[0_6px_28px_rgba(145,82,255,0.13)]"
                  >
                    <div className="mb-3 text-3xl">{c.icon}</div>
                    <h4 className="font-lora text-[1.05rem] font-bold text-[#1A1033]">{c.title}</h4>
                    <p className="mt-2 text-[0.875rem] leading-relaxed text-[#6B5F8A]">{c.body}</p>
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {c.chips.map((ch) => (
                        <span
                          key={ch}
                          className="rounded-full border-[1.5px] border-[rgba(145,82,255,0.15)] px-2 py-0.5 text-[0.68rem] font-bold text-[#6B5F8A]"
                        >
                          {ch}
                        </span>
                      ))}
                    </div>
                  </article>
                ))}
              </div>
            </div>
          );
        })}

        <div className="mt-12 rounded-[24px] border-[1.5px] border-[rgba(145,82,255,0.15)] bg-[#F5F0FF] p-8">
          <h4 className="font-lora text-xl font-bold text-[#1A1033]">📖 Glossary — Key Terms</h4>
          <p className="mb-4 mt-1 text-[0.85rem] text-[#6B5F8A]">Tap a term for a short definition (EN + DE).</p>
          <div className="flex flex-wrap gap-2">
            {glossary.map((g) => (
              <button
                key={g.term}
                type="button"
                onClick={() => setGlossaryOpen(g)}
                className="rounded-xl border-[1.5px] border-[rgba(145,82,255,0.15)] bg-white px-4 py-2 text-[0.83rem] font-semibold text-[#9152FF] transition hover:bg-[#9152FF] hover:text-white"
              >
                {g.term}
              </button>
            ))}
            <a
              href="/glossary"
              className="rounded-xl border-[1.5px] border-dashed border-[#9152FF]/40 px-4 py-2 text-[0.83rem] font-semibold text-[#6B5F8A] hover:text-[#9152FF]"
            >
              Full glossary →
            </a>
          </div>
          {glossaryOpen && (
            <div className="relative mt-6 rounded-[18px] border-[1.5px] border-[rgba(145,82,255,0.15)] bg-white p-6 shadow-md">
              <button
                type="button"
                className="absolute right-3 top-3 text-[#6B5F8A] hover:text-[#1A1033]"
                aria-label="Close"
                onClick={() => setGlossaryOpen(null)}
              >
                ✕
              </button>
              <p className="mb-2 text-[0.7rem] font-bold uppercase tracking-[0.1em] text-[#9152FF]">{glossaryOpen.term}</p>
              <p className="text-[0.9rem] leading-relaxed text-[#1A1033]">{glossaryOpen.en}</p>
              <p className="mt-3 border-t border-[rgba(145,82,255,0.15)] pt-3 text-[0.85rem] italic leading-relaxed text-[#6B5F8A]">
                🇩🇪 {glossaryOpen.de}
              </p>
            </div>
          )}
        </div>

        <div className="mt-6 flex flex-col flex-wrap items-start justify-between gap-4 rounded-[24px] border-[1.5px] border-[rgba(145,82,255,0.15)] bg-white p-8 sm:flex-row sm:items-center">
          <div>
            <strong className="block text-[0.95rem] text-[#1A1033]">How helpful was this section?</strong>
            <p className="text-[0.9rem] font-medium text-[#6B5F8A]">Your feedback helps us improve. Responses are anonymous.</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              className="rounded-full border-[1.5px] border-[rgba(145,82,255,0.15)] px-4 py-2 text-[0.83rem] font-semibold text-[#6B5F8A] hover:border-[#6BAA8A] hover:bg-[rgba(107,170,138,0.15)] hover:text-[#3d7a5c]"
            >
              👍 Helpful
            </button>
            <button
              type="button"
              className="rounded-full border-[1.5px] border-[rgba(145,82,255,0.15)] px-4 py-2 text-[0.83rem] font-semibold text-[#6B5F8A] hover:border-[#9152FF] hover:bg-[#F5F0FF] hover:text-[#9152FF]"
            >
              👎 Not helpful
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
