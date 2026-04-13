'use client';

import { useState } from 'react';
import { useLandingLocale } from '@/lib/landing/locale';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

const GLOSSARY: { term: string; en: string; de: string }[] = [
  {
    term: 'FLINTA*',
    en: 'FLINTA* stands for Female, Lesbian, Inter, Non-binary, Trans and Agender. The asterisk (*) signals openness to all gender identities not covered by the binary.',
    de: 'FLINTA* steht für Frauen, Lesben, Intergeschlechtliche, Nicht-binäre, Trans und Agender-Personen. Das Sternchen (*) signalisiert Offenheit für alle nicht-binären Geschlechtsidentitäten.',
  },
  {
    term: 'BIPoC',
    en: 'BIPoC stands for Black, Indigenous and People of Colour. It centres the specific experiences of racialised people and their resistance to racism.',
    de: 'BIPoC steht für Black, Indigenous and People of Colour. Der Begriff rückt die spezifischen Erfahrungen von rassifizierten Menschen und ihren Widerstand gegen Rassismus in den Mittelpunkt.',
  },
  {
    term: 'M*oC',
    en: 'M*oC stands for Mädchen* of Colour — girls and FLINTA* of Colour. The asterisk includes all gender identities beyond the binary.',
    de: 'M*oC steht für Mädchen* of Colour – Mädchen und FLINTA* of Colour. Das Sternchen schließt alle Geschlechtsidentitäten jenseits der Binarität ein.',
  },
  {
    term: 'Intersectionality',
    en: 'Intersectionality describes how different aspects of identity — such as race, gender, class and disability — overlap and create compounding forms of discrimination or privilege.',
    de: 'Intersektionalität beschreibt, wie verschiedene Identitätsmerkmale – wie Herkunft, Geschlecht, Klasse und Behinderung – sich überschneiden und sich gegenseitig verstärkende Formen von Diskriminierung oder Privileg erzeugen.',
  },
  {
    term: 'Empowerment',
    en: 'Empowerment refers to the process of strengthening self-determination, self-confidence and collective agency — especially for marginalised groups.',
    de: 'Empowerment bezeichnet den Prozess der Stärkung von Selbstbestimmung, Selbstvertrauen und kollektiver Handlungsfähigkeit – insbesondere für marginalisierte Gruppen.',
  },
  {
    term: 'Mentoring',
    en: 'Mentoring is a supportive relationship in which a more experienced person guides someone with less experience — sharing knowledge, encouragement and networks.',
    de: 'Mentoring ist eine unterstützende Beziehung, in der eine erfahrenere Person jemanden mit weniger Erfahrung begleitet – durch Wissen, Ermutigung und Netzwerke.',
  },
  {
    term: 'MEP Program',
    en: 'The MEP (Mentoring & Empowerment Program) is the core practical program of Building Bridges — offering workshops, individual mentoring and peer exchange for BIPoC girls and FLINTA*.',
    de: 'Das MEP (Mentoring- & Empowerment-Programm) ist das zentrale Praxisprogramm von Building Bridges – mit Workshops, individuellem Mentoring und Peer-Austausch für BIPoC-Mädchen und FLINTA*.',
  },
  {
    term: 'Resilience',
    en: 'Resilience is the ability to adapt and recover in the face of adversity, stress or discrimination. It is built through individual strengths, community and structural support.',
    de: 'Resilienz ist die Fähigkeit, sich angesichts von Widrigkeiten, Stress oder Diskriminierung anzupassen und zu erholen. Sie entsteht durch individuelle Stärken, Gemeinschaft und strukturelle Unterstützung.',
  },
  {
    term: 'Psychosocial',
    en: 'Psychosocial refers to the interaction between psychological and social factors — covering fields like psychology, social work, counselling and therapy.',
    de: 'Psychosozial bezieht sich auf das Zusammenspiel von psychologischen und sozialen Faktoren – und umfasst Felder wie Psychologie, Soziale Arbeit, Beratung und Therapie.',
  },
  {
    term: 'Discrimination',
    en: 'Discrimination means treating people unfairly based on characteristics like race, gender or origin. It can be individual, institutional or structural.',
    de: 'Diskriminierung bedeutet, Menschen aufgrund von Merkmalen wie Herkunft, Geschlecht oder Identität ungerecht zu behandeln. Sie kann individuell, institutionell oder strukturell sein.',
  },
  {
    term: 'Micro-aggressions',
    en: 'Micro-aggressions are subtle, often unintentional comments or actions that communicate hostility or bias toward marginalised people.',
    de: 'Mikroaggressionen sind subtile, oft unbeabsichtigte Kommentare oder Handlungen, die Feindseligkeit oder Vorurteile gegenüber marginalisierten Menschen ausdrücken.',
  },
  {
    term: 'Safe Space',
    en: 'A safe space is an environment where people can express themselves without fear of judgement, discrimination or harm.',
    de: 'Ein Safe Space ist ein Umfeld, in dem Menschen sich ohne Angst vor Urteilen, Diskriminierung oder Schaden ausdrücken können.',
  },
  {
    term: 'Peer-to-Peer',
    en: 'Peer-to-peer exchange means learning and support between people at a similar stage or with shared experiences.',
    de: 'Peer-to-Peer-Austausch bedeutet Lernen und Unterstützung zwischen Menschen auf ähnlichen Wegen oder mit geteilten Erfahrungen.',
  },
  {
    term: 'WCAG',
    en: 'WCAG stands for Web Content Accessibility Guidelines — international standards that ensure digital content is accessible to people with disabilities.',
    de: 'WCAG steht für Web Content Accessibility Guidelines – internationale Standards, die sicherstellen, dass digitale Inhalte für Menschen mit Behinderungen zugänglich sind.',
  },
];

type TabId = 'mental-health' | 'barriers' | 'resilience' | 'mep';

export function KnowledgeSection() {
  const [tab, setTab] = useState<TabId>('mental-health');
  const [glossaryOpen, setGlossaryOpen] = useState(false);
  const [glossaryTerm, setGlossaryTerm] = useState<(typeof GLOSSARY)[0] | null>(null);
  const { locale, t } = useLandingLocale();

  const openGlossary = (item: (typeof GLOSSARY)[0]) => {
    setGlossaryTerm(item);
    setGlossaryOpen(true);
  };

  const tabs: { id: TabId; labelEn: string; labelDe: string }[] = [
    { id: 'mental-health', labelEn: '🧠 Mental Health', labelDe: '🧠 Mentale Gesundheit' },
    { id: 'barriers', labelEn: '🚧 Barriers & Discrimination', labelDe: '🚧 Barrieren & Diskriminierung' },
    { id: 'resilience', labelEn: '💪 Resilience & Resources', labelDe: '💪 Resilienz & Ressourcen' },
    { id: 'mep', labelEn: '🤝 MEP Program', labelDe: '🤝 MEP-Programm' },
  ];

  const L = {
    eyebrow: t('Information Platform', 'Informationsplattform'),
    title: t(
      'Knowledge, <em>resources & learning</em>',
      'Wissen, <em>Ressourcen & Lernen</em>'
    ),
    intro: t(
      'A growing, living resource hub with multimodal content — text, video, infographics, and example stories — presented in accessible language in both German and English.',
      'Ein wachsender, lebendiger Ressourcen-Hub mit multimodalen Inhalten – in leicht zugänglicher Sprache auf Deutsch und Englisch.'
    ),
    evolvingLead: t('This section is evolving.', 'Dieser Bereich befindet sich im Aufbau.'),
    evolvingRest: t(
      'Content is being added collaboratively with participants, researchers, and community partners.',
      'Inhalte entstehen kollaborativ mit Teilnehmenden, Forschenden und Community-Partner*innen.'
    ),
    jump: t('Jump ahead →', 'Weiter springen →'),
    contentNote: t('Content note:', 'Hinweis:'),
    mhNote: t(
      'Some content discusses mental health challenges. You can skip at any point.',
      'Einige Inhalte thematisieren psychische Belastungen. Du kannst jederzeit überspringen.'
    ),
    barNote: t(
      'This section covers experiences of discrimination and structural barriers.',
      'Dieser Abschnitt behandelt Diskriminierungserfahrungen und strukturelle Barrieren.'
    ),
    skipRes: t('Skip to Resilience →', 'Zu Resilienz springen →'),
    glossaryTitle: t('📖 Glossary — Key Terms Explained', '📖 Glossar — Zentrale Begriffe erklärt'),
    glossaryIntro: t(
      'Click any term to see its definition. Available in German and English.',
      'Tippe auf einen Begriff für die Erklärung. Verfügbar auf Deutsch und Englisch.'
    ),
    feedbackTitle: t('How helpful was this section?', 'Wie hilfreich war dieser Abschnitt?'),
    feedbackSub: t(
      'Your feedback helps us improve this platform. All responses are anonymous.',
      'Dein Feedback hilft uns, diese Plattform zu verbessern. Alle Rückmeldungen sind anonym.'
    ),
    helpful: t('👍 Helpful', '👍 Hilfreich'),
    notHelpful: t('👎 Not helpful', '👎 Weniger hilfreich'),
    leaveFb: t('📝 Leave feedback', '📝 Feedback geben'),
  };

  const cards = {
    'mental-health': [
      {
        icon: '🧠',
        title: t('Mental Health in the Psychosocial Field', 'Mentale Gesundheit im psychosozialen Feld'),
        body: t(
          'Information about mental health challenges, protective factors, and common experiences of BIPoC students in psychosocial degree programmes.',
          'Informationen zu psychischen Belastungen, Schutzfaktoren und typischen Erfahrungen von BIPoC-Studierenden in psychosozialen Studiengängen.'
        ),
      },
      {
        icon: '📚',
        title: t('Stressors in Studying', 'Belastungen im Studium'),
        body: t(
          'Research-based overview of specific stressors experienced by FLINTA* of Colour in studying and transitioning into psychosocial professions.',
          'Forschungsbasierter Überblick über spezifische Belastungen von FLINTA* of Colour im Studium und beim Übergang in psychosoziale Berufe.'
        ),
      },
      {
        icon: '🌿',
        title: t('Coping Strategies', 'Bewältigungsstrategien'),
        body: t(
          'Evidence-based and community-sourced coping strategies for navigating academic stress, identity-related pressure, and systemic barriers.',
          'Evidenzbasierte und community-sourced Strategien zum Umgang mit Studienstress und strukturellen Barrieren.'
        ),
      },
    ],
    barriers: [
      {
        icon: '🚧',
        title: t('Structural Barriers in Education', 'Strukturelle Bildungsbarrieren'),
        body: t(
          'Overview of systemic barriers affecting BIPoC girls and FLINTA* educational pathways, based on current research findings.',
          'Überblick über systemische Barrieren auf Bildungswegen von BIPoC-Mädchen und FLINTA*.'
        ),
      },
      {
        icon: '🗣️',
        title: t('Experiences of Discrimination', 'Diskriminierungserfahrungen'),
        body: t(
          'Research-based content on everyday and institutional discrimination in academic contexts.',
          'Forschungsbasierte Inhalte zu Diskriminierung in akademischen Kontexten.'
        ),
      },
      {
        icon: '⚖️',
        title: t('Intersectionality & Identity', 'Intersektionalität & Identität'),
        body: t(
          'How overlapping identities interact and create compounding experiences in educational spaces.',
          'Wie sich überlagernde Identitäten in Bildungsräumen auswirken können.'
        ),
      },
    ],
    resilience: [
      {
        icon: '🌱',
        title: t('Protective Factors', 'Schutzfaktoren'),
        body: t(
          'Research on individual, social, and structural protective factors supporting resilience and wellbeing among BIPoC students.',
          'Forschung zu Schutzfaktoren, die Resilienz und Wohlbefinden unterstützen.'
        ),
      },
      {
        icon: '✨',
        title: t('Strengths & Resources', 'Stärken & Ressourcen'),
        body: t(
          'Community-sourced insights on personal strengths and cultural resources that support academic success and wellbeing.',
          'Community-Wissen über Stärken und kulturelle Ressourcen.'
        ),
      },
      {
        icon: '🏆',
        title: t('Success Stories', 'Erfolgsgeschichten'),
        body: t(
          'Inspiring accounts from M*oC who have navigated higher education and entered psychosocial professions.',
          'Inspirierende Berichte von M*oC auf dem Weg in Studium und Beruf.'
        ),
      },
    ],
    mep: [
      {
        icon: '📋',
        title: t('About the MEP Program', 'Über das MEP-Programm'),
        body: t(
          'Comprehensive overview of the Mentoring & Empowerment Program — structure, goals, eligibility, and what to expect.',
          'Überblick über Aufbau, Ziele und Ablauf des Mentoring- & Empowerment-Programms.'
        ),
      },
      {
        icon: '🗓️',
        title: t('Workshops & Activities', 'Workshops & Aktivitäten'),
        body: t(
          'Detailed descriptions of workshop formats including Self-Care, Skills Trainings, Vision workshops, and Networking.',
          'Beschreibungen der Workshop-Formate inkl. Self-Care, Skills, Vision und Networking.'
        ),
      },
      {
        icon: '🔐',
        title: t('Sign In / Login', 'Anmelden / Login'),
        body: t(
          'Registered participants and mentors can log in to access their mentoring dashboard and private story space.',
          'Registrierte Teilnehmende und Mentor*innen können sich für Dashboard und Story-Bereich einloggen.'
        ),
      },
    ],
  };

  return (
    <section id="knowledge" className="scroll-mt-[70px] px-10 py-28 max-md:px-6 max-md:py-20" style={{ background: '#F2EEFF' }}>
      <div className="mx-auto max-w-[1280px]">
        <div className="mb-2 text-left text-[0.72rem] font-bold uppercase tracking-[0.13em] text-[#9152FF]">{L.eyebrow}</div>
        <h2
          className="mb-4 max-w-[680px] text-left font-[family-name:var(--font-lora)] text-[clamp(2rem,3vw,2.6rem)] font-bold leading-tight tracking-tight text-[#1A1033]"
          dangerouslySetInnerHTML={{ __html: L.title }}
        />
        <p className="mb-8 max-w-[680px] text-[0.97rem] text-[#6B5F8A]">{L.intro}</p>

        <div className="mb-8 flex flex-wrap items-center gap-3 rounded-[18px] border-[1.5px] border-[rgba(145,82,255,0.15)] bg-gradient-to-r from-[#EDE5FF] to-[#F5F0FF] px-6 py-4 text-[0.88rem] text-[#6B5F8A]">
          <div className="bb-landing-pulse h-2 w-2 shrink-0 rounded-full bg-[#9152FF]" />
          <div>
            <strong className="text-[#9152FF]">{L.evolvingLead}</strong> {L.evolvingRest}
          </div>
          <button
            type="button"
            className="ml-auto rounded-full border-none bg-[#f0c060] px-4 py-2 font-[family-name:var(--font-sora)] text-[0.8rem] font-bold text-[#5a3e00]"
            onClick={() => document.getElementById('storytelling')?.scrollIntoView({ behavior: 'smooth' })}
          >
            {L.jump}
          </button>
        </div>

        <div className="mb-10 flex flex-wrap gap-2">
          {tabs.map((x) => (
            <button
              key={x.id}
              type="button"
              onClick={() => setTab(x.id)}
              className={`rounded-full border-[1.5px] px-5 py-2 font-[family-name:var(--font-sora)] text-[0.84rem] font-semibold transition-colors ${
                tab === x.id
                  ? 'border-[#9152FF] bg-[#9152FF] text-white'
                  : 'border-[rgba(145,82,255,0.15)] bg-white text-[#6B5F8A] hover:border-[#9152FF] hover:text-[#9152FF]'
              }`}
            >
              {locale === 'de' ? x.labelDe : x.labelEn}
            </button>
          ))}
        </div>

        {(tab === 'mental-health' || tab === 'barriers') && (
          <div className="mb-8 flex flex-wrap items-center gap-4 rounded-[18px] border-[1.5px] border-[#f0c060] bg-[#fffaf0] px-6 py-4">
            <span className="text-xl" aria-hidden>
              ⚠️
            </span>
            <p className="flex-1 text-[0.88rem] leading-relaxed text-[#7a5500]">
              <strong>{L.contentNote}</strong> {tab === 'mental-health' ? L.mhNote : L.barNote}
            </p>
            <button
              type="button"
              className="rounded-full border-none bg-[#f0c060] px-4 py-2 font-[family-name:var(--font-sora)] text-[0.8rem] font-bold text-[#5a3e00]"
              onClick={() => setTab('resilience')}
            >
              {L.skipRes}
            </button>
          </div>
        )}

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {cards[tab].map((c) => (
            <div
              key={c.title}
              className="rounded-[24px] border-[1.5px] border-[rgba(145,82,255,0.15)] bg-white p-8 shadow-[0_2px_12px_rgba(145,82,255,0.08)] transition-all hover:-translate-y-1 hover:shadow-[0_6px_28px_rgba(145,82,255,0.13)]"
            >
              <div className="mb-3 text-[2rem]">{c.icon}</div>
              <h4 className="mb-2 font-[family-name:var(--font-lora)] text-[1.05rem] font-bold text-[#1A1033]">{c.title}</h4>
              <p className="text-[0.875rem] leading-relaxed text-[#6B5F8A]">{c.body}</p>
              <div className="mt-4 flex flex-wrap gap-1.5">
                <span className="rounded-full border-[1.5px] border-[rgba(145,82,255,0.15)] px-2.5 py-0.5 text-[0.68rem] font-bold text-[#6B5F8A]">
                  📄 Text
                </span>
                <span className="rounded-full border-[1.5px] border-[rgba(145,82,255,0.15)] px-2.5 py-0.5 text-[0.68rem] font-bold text-[#6B5F8A]">
                  🎬 Video
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 rounded-[24px] border-[1.5px] border-[rgba(145,82,255,0.15)] bg-[#F5F0FF] p-8">
          <h4 className="mb-3 font-[family-name:var(--font-lora)] text-xl font-bold text-[#1A1033]">{L.glossaryTitle}</h4>
          <p className="mb-4 text-[0.85rem] text-[#6B5F8A]">{L.glossaryIntro}</p>
          <div className="flex flex-wrap gap-2">
            {GLOSSARY.map((g) => (
              <button
                key={g.term}
                type="button"
                onClick={() => openGlossary(g)}
                className="inline-block rounded-xl border-[1.5px] border-[rgba(145,82,255,0.15)] bg-white px-4 py-2 text-[0.83rem] font-semibold text-[#9152FF] transition-colors hover:bg-[#9152FF] hover:text-white"
              >
                {g.term}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-6 rounded-[24px] border-[1.5px] border-[rgba(145,82,255,0.15)] bg-white p-8">
          <div>
            <strong className="mb-1 block text-[0.95rem] text-[#1A1033]">{L.feedbackTitle}</strong>
            <p className="text-[0.9rem] font-medium text-[#6B5F8A]">{L.feedbackSub}</p>
          </div>
          <div className="ml-auto flex flex-wrap gap-2">
            <button
              type="button"
              className="rounded-full border-[1.5px] border-[rgba(145,82,255,0.15)] px-5 py-2 font-[family-name:var(--font-sora)] text-[0.83rem] font-semibold text-[#6B5F8A] hover:border-[#6BAA8A] hover:bg-[rgba(107,170,138,0.15)] hover:text-[#3d7a5c]"
              onClick={(e) => {
                (e.target as HTMLButtonElement).textContent = '✓';
              }}
            >
              {L.helpful}
            </button>
            <button
              type="button"
              className="rounded-full border-[1.5px] border-[rgba(145,82,255,0.15)] px-5 py-2 font-[family-name:var(--font-sora)] text-[0.83rem] font-semibold text-[#6B5F8A] hover:border-[#9152FF] hover:bg-[#F5F0FF] hover:text-[#9152FF]"
            >
              {L.notHelpful}
            </button>
            <button
              type="button"
              className="rounded-full border-[1.5px] border-[rgba(145,82,255,0.15)] px-5 py-2 font-[family-name:var(--font-sora)] text-[0.83rem] font-semibold text-[#6B5F8A]"
              onClick={() => alert(t('Thank you — a short survey will be available soon.', 'Danke — ein kurzes Formular folgt bald.'))}
            >
              {L.leaveFb}
            </button>
          </div>
        </div>
      </div>

      <Dialog open={glossaryOpen} onOpenChange={setGlossaryOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle className="font-[family-name:var(--font-lora)]">{glossaryTerm?.term}</DialogTitle>
          </DialogHeader>
          {glossaryTerm ? (
            <div className="space-y-3 text-sm leading-relaxed">
              <p className="text-[#1A1033]">{locale === 'de' ? glossaryTerm.de : glossaryTerm.en}</p>
              <p className="border-t pt-3 italic text-[#6B5F8A]">🇩🇪 {glossaryTerm.de}</p>
            </div>
          ) : null}
        </DialogContent>
      </Dialog>
    </section>
  );
}
