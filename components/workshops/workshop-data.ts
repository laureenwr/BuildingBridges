import type { AppLanguage } from '@/lib/hooks/useLanguage';

type L<T> = { en: T; de: T };

const pick = <T>(value: L<T>, lang: AppLanguage): T => (lang === 'de' ? value.de : value.en);
const pickMaybeLocalized = <T>(value: T | L<T>, lang: AppLanguage): T =>
  typeof value === 'object' && value !== null && 'en' in value && 'de' in value
    ? pick(value as L<T>, lang)
    : (value as T);

export type WorkshopItem = {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  mode: 'Online' | 'In Person' | 'Hybrid';
  modeLabel: string;
  category: 'Mentoring' | 'Workshop' | 'Research' | 'Community' | 'Networking';
  categoryLabel: string;
  image: string;
  registrationUrl?: string;
  tags: string[];
};

export type ArchiveItem = {
  id: string;
  title: string;
  type: string;
  date: string;
  status: string;
  image: string;
  href: string;
};

export type ReflectionItem = {
  id: string;
  quote: string;
  role: string;
};

type WorkshopSource = {
  id: string;
  title: L<string>;
  description: L<string>;
  date: string;
  time: L<string>;
  location: L<string>;
  mode: WorkshopItem['mode'];
  category: WorkshopItem['category'];
  image: string | L<string>;
  registrationUrl?: string;
  tags: L<string[]>;
};

const MODE_LABELS: Record<WorkshopItem['mode'], L<string>> = {
  Online: { en: 'Online', de: 'Online' },
  'In Person': { en: 'In person', de: 'Vor Ort' },
  Hybrid: { en: 'Hybrid', de: 'Hybrid' },
};

const CATEGORY_LABELS: Record<WorkshopItem['category'], L<string>> = {
  Mentoring: { en: 'Mentoring', de: 'Mentoring' },
  Workshop: { en: 'Workshop', de: 'Workshop' },
  Research: { en: 'Research', de: 'Forschung' },
  Community: { en: 'Community', de: 'Community' },
  Networking: { en: 'Networking', de: 'Networking' },
};

function toWorkshopItem(source: WorkshopSource, lang: AppLanguage): WorkshopItem {
  return {
    id: source.id,
    title: pick(source.title, lang),
    description: pick(source.description, lang),
    date: source.date,
    time: pick(source.time, lang),
    location: pick(source.location, lang),
    mode: source.mode,
    modeLabel: pick(MODE_LABELS[source.mode], lang),
    category: source.category,
    categoryLabel: pick(CATEGORY_LABELS[source.category], lang),
    image: pickMaybeLocalized(source.image, lang),
    registrationUrl: source.registrationUrl,
    tags: pick(source.tags, lang),
  };
}

const featuredSource: WorkshopSource = {
  id: 'featured-online-workshop-tp3',
  title: {
    en: 'Online workshop: Evaluating storytelling formats with mentors',
    de: 'Online-Workshop: Storytelling-Formate mit Mentor:innen evaluieren',
  },
  description: {
    en: 'Help shape the future of the Building Bridges storytelling platform: explore five storytelling prototypes, share impressions on comprehensibility, emotional connection and usability, and co-create ideas for an accessible, empowering platform.',
    de: 'Gestalte die Zukunft der Building-Bridges-Storytelling-Plattform mit: Erkunde fünf Storytelling-Prototypen, teile Eindrücke zu Verständlichkeit, emotionaler Verbindung und Nutzbarkeit und entwickle Ideen für eine zugängliche, empowernde Plattform.',
  },
  date: '31.07.2026',
  time: { en: 'TBD · 90 minutes', de: 'Uhrzeit folgt · 90 Minuten' },
  location: { en: 'Zoom + Miro', de: 'Zoom + Miro' },
  mode: 'Online',
  category: 'Research',
  image: {
    en: '/workshops/TP3%20updated%20english.jpg',
    de: '/workshops/TP3%20Updated%20Germna.jpg',
  },
  registrationUrl: 'https://forms.gle/19nHSdjAbFwFXxgq6',
  tags: {
    en: ['Upcoming', 'Online', 'TP3', 'Storytelling'],
    de: ['Bevorstehend', 'Online', 'TP3', 'Storytelling'],
  },
};

const feedSources: WorkshopSource[] = [
  featuredSource,
  {
    id: 'individual-mentoring',
    title: { en: 'Individual mentoring', de: 'Individuelles Mentoring' },
    description: {
      en: 'Ongoing one-to-one support with mentors aligned to participant goals and wellbeing.',
      de: 'Fortlaufende 1:1-Begleitung durch Mentor:innen — abgestimmt auf Ziele und Wohlbefinden der Teilnehmenden.',
    },
    date: 'Jan-Nov 2026',
    time: { en: 'Flexible', de: 'Flexibel' },
    location: { en: 'Berlin + Online', de: 'Berlin + Online' },
    mode: 'Hybrid',
    category: 'Mentoring',
    image: '/workshops/mentoring-programm-2025.png',
    tags: { en: ['Community'], de: ['Community'] },
  },
  {
    id: 'mentoring-workshop-ii',
    title: { en: 'Mentoring Workshop II — Johanna-Eck', de: 'Mentoring-Workshop II — Johanna-Eck' },
    description: {
      en: 'Guided workshop focused on reflection, confidence, and practical support strategies.',
      de: 'Geführter Workshop zu Reflexion, Selbstvertrauen und praktischen Unterstützungsstrategien.',
    },
    date: '03.2026',
    time: { en: '16:00 - 19:00', de: '16:00 - 19:00 Uhr' },
    location: { en: 'Johanna-Eck', de: 'Johanna-Eck' },
    mode: 'In Person',
    category: 'Workshop',
    image: '/workshops/mentoring-was-tut-mir-gut-2026.png',
    tags: { en: ['Mentoring', 'Community'], de: ['Mentoring', 'Community'] },
  },
  {
    id: 'digital-storytelling',
    title: { en: 'Digital storytelling workshop', de: 'Digital-Storytelling-Workshop' },
    description: {
      en: 'Participants co-create stories and media narratives that center lived experiences.',
      de: 'Gemeinsames Erzählen von Stories und Medienformaten, die gelebte Erfahrungen in den Mittelpunkt stellen.',
    },
    date: '04.2026',
    time: { en: '13:00 - 17:00', de: '13:00 - 17:00 Uhr' },
    location: { en: 'UDE + Online', de: 'UDE + Online' },
    mode: 'Hybrid',
    category: 'Research',
    image: '/workshops/kennenlerntreffen-2025.png',
    tags: { en: ['Storytelling', 'Research'], de: ['Storytelling', 'Forschung'] },
  },
  {
    id: 'research-exchange',
    title: { en: 'Research exchange session', de: 'Forschungsaustausch' },
    description: {
      en: 'Collaborative dialogue between participants and researchers on barriers and resilience.',
      de: 'Gemeinsamer Austausch zwischen Teilnehmenden und Forschenden zu Barrieren und Resilienz.',
    },
    date: '05.2026',
    time: { en: '15:00 - 17:00', de: '15:00 - 17:00 Uhr' },
    location: { en: 'FU Berlin', de: 'FU Berlin' },
    mode: 'In Person',
    category: 'Research',
    image: '/workshops/perlen-power-2025.png',
    tags: { en: ['Research', 'Exchange'], de: ['Forschung', 'Austausch'] },
  },
  {
    id: 'empowerment-networking',
    title: { en: 'Empowerment & networking event', de: 'Empowerment- & Networking-Event' },
    description: {
      en: 'A warm community space for new connections, peer support, and shared resources.',
      de: 'Ein warmer Community-Raum für neue Kontakte, Peer-Support und geteilte Ressourcen.',
    },
    date: '06.2026',
    time: { en: '17:00 - 20:00', de: '17:00 - 20:00 Uhr' },
    location: { en: 'Mädea', de: 'Mädea' },
    mode: 'In Person',
    category: 'Community',
    image: '/workshops/fruehlingsfest-2026.png',
    tags: { en: ['Networking', 'Community'], de: ['Networking', 'Community'] },
  },
  {
    id: 'fruehlingsfest',
    title: { en: 'Frühlingsfest', de: 'Frühlingsfest' },
    description: {
      en: 'Spring celebration with food, henna, flowers, and community care activities.',
      de: 'Frühlingsfest mit Essen, Henna, Blumen und gemeinschaftlichen Care-Aktivitäten.',
    },
    date: '20.03.2026',
    time: { en: '15:00 - 19:00', de: '15:00 - 19:00 Uhr' },
    location: { en: 'Mädea', de: 'Mädea' },
    mode: 'In Person',
    category: 'Community',
    image: '/workshops/fruehlingsfest-2026.png',
    tags: { en: ['Self-care'], de: ['Self-Care'] },
  },
];

type ArchiveSource = {
  id: string;
  title: L<string>;
  type: L<string>;
  date: string;
  status: L<string>;
  image: string;
  href: string;
};

const archiveSources: ArchiveSource[] = [
  {
    id: 'archive-self-care',
    title: { en: 'Self-Care Workshop', de: 'Self-Care-Workshop' },
    type: { en: 'Self-Care Workshop', de: 'Self-Care-Workshop' },
    date: '13.06.2026',
    status: { en: 'Past workshop', de: 'Vergangener Workshop' },
    image: '/workshops/Self-care.jpeg',
    href: '/workshops/Self-care.jpeg',
  },
  {
    id: 'archive-fruehlingsfest',
    title: { en: 'Frühlingsfest', de: 'Frühlingsfest' },
    type: { en: 'Community celebration', de: 'Community-Fest' },
    date: '20.03.2026',
    status: { en: 'Community event', de: 'Community-Event' },
    image: '/workshops/fruehlingsfest-2026.png',
    href: '/workshops/fruehlingsfest-2026.png',
  },
  {
    id: 'archive-mentoring-wellbeing',
    title: { en: 'Mentoring: Was tut mir gut?', de: 'Mentoring: Was tut mir gut?' },
    type: { en: 'Empowerment workshop', de: 'Empowerment-Workshop' },
    date: '02.03.2026',
    status: { en: 'Past workshop', de: 'Vergangener Workshop' },
    image: '/workshops/mentoring-was-tut-mir-gut-2026.png',
    href: '/workshops/mentoring-was-tut-mir-gut-2026.png',
  },
  {
    id: 'archive-perlen-power',
    title: { en: 'Perlen & Power', de: 'Perlen & Power' },
    type: { en: 'Reflection event', de: 'Reflexions-Event' },
    date: '18.12.2025',
    status: { en: 'Flyer', de: 'Flyer' },
    image: '/workshops/perlen-power-2025.png',
    href: '/workshops/perlen-power-2025.png',
  },
  {
    id: 'archive-kennenlernen',
    title: { en: 'Kennenlerntreffen', de: 'Kennenlerntreffen' },
    type: { en: 'Introduction session', de: 'Kennenlernen' },
    date: '08.10.2025',
    status: { en: 'Past workshop', de: 'Vergangener Workshop' },
    image: '/workshops/kennenlerntreffen-2025.png',
    href: '/workshops/kennenlerntreffen-2025.png',
  },
  {
    id: 'archive-programm',
    title: { en: 'Mentoring programme 2025/26', de: 'Mentoring-Programm 2025/26' },
    type: { en: 'Programme flyer', de: 'Programm-Flyer' },
    date: '2025 - 2026',
    status: { en: 'Programme', de: 'Programm' },
    image: '/workshops/mentoring-programm-2025.png',
    href: '/workshops/mentoring-programm-2025.png',
  },
];

const reflectionSources: { id: string; quote: L<string>; role: L<string> }[] = [
  {
    id: 'reflection-1',
    quote: {
      en: 'This workshop helped me feel represented and heard.',
      de: 'Durch diesen Workshop habe ich mich gesehen und gehört gefühlt.',
    },
    role: { en: 'Participant', de: 'Teilnehmerin' },
  },
  {
    id: 'reflection-2',
    quote: {
      en: 'Meeting mentors with similar experiences inspired me to continue.',
      de: 'Mentor:innen mit ähnlichen Erfahrungen haben mich inspiriert, weiterzumachen.',
    },
    role: { en: 'Mentee', de: 'Mentee' },
  },
  {
    id: 'reflection-3',
    quote: {
      en: 'I found practical tools for self-care and confidence in academic spaces.',
      de: 'Ich habe praktische Tools für Self-Care und Selbstvertrauen im Studium gefunden.',
    },
    role: { en: 'Workshop attendee', de: 'Workshop-Teilnehmerin' },
  },
];

export function getFeaturedWorkshop(lang: AppLanguage): WorkshopItem {
  return toWorkshopItem(featuredSource, lang);
}

export type UpcomingWorkshopAlertData = {
  badge: string;
  headline: string;
  title: string;
  dateLine: string;
  location: string;
  cta: string;
  dismissLabel: string;
};

/** Copy for the upcoming-workshop alert. */
export function getUpcomingWorkshopAlert(lang: AppLanguage): UpcomingWorkshopAlertData {
  const w = toWorkshopItem(featuredSource, lang);
  if (lang === 'de') {
    return {
      badge: 'Neu im Kalender',
      headline: 'Bevorstehender Workshop',
      title: w.title,
      dateLine: `${w.date} · ${w.time}`,
      location: w.location,
      cta: 'Details ansehen',
      dismissLabel: 'Schließen',
    };
  }
  return {
    badge: 'New on the calendar',
    headline: 'Upcoming workshop',
    title: w.title,
    dateLine: `${w.date} · ${w.time}`,
    location: w.location,
    cta: 'View details',
    dismissLabel: 'Dismiss',
  };
}

export function getWorkshopFeed(lang: AppLanguage): WorkshopItem[] {
  return feedSources.map((s) => toWorkshopItem(s, lang));
}

export function getArchiveItems(lang: AppLanguage): ArchiveItem[] {
  return archiveSources.map((s) => ({
    id: s.id,
    title: pick(s.title, lang),
    type: pick(s.type, lang),
    date: s.date,
    status: pick(s.status, lang),
    image: s.image,
    href: s.href,
  }));
}

export function getReflections(lang: AppLanguage): ReflectionItem[] {
  return reflectionSources.map((s) => ({
    id: s.id,
    quote: pick(s.quote, lang),
    role: pick(s.role, lang),
  }));
}

export type WorkshopPageLabels = {
  eyebrow: string;
  title: string;
  intro: string;
  feedEyebrow: string;
  feedTitle: string;
  archiveEyebrow: string;
  archiveTitle: string;
  reflectionEyebrow: string;
  reflectionTitle: string;
};

export function getWorkshopPageLabels(lang: AppLanguage): WorkshopPageLabels {
  return lang === 'de'
    ? {
        eyebrow: 'Angebote & Veranstaltungen',
        title: 'Workshops & Community-Lernen',
        intro:
          'Mentoring, Empowerment, Forschungsaustausch und inklusives Community-Lernen — mit Storytelling im Mittelpunkt.',
        feedEyebrow: 'Workshop-Übersicht',
        feedTitle: 'Bevorstehende & laufende Formate',
        archiveEyebrow: 'Archiv',
        archiveTitle: 'Workshop-Archiv',
        reflectionEyebrow: 'Stimmen aus der Community',
        reflectionTitle: 'Momente aus unseren Workshops',
      }
    : {
        eyebrow: 'Training & Events',
        title: 'Workshops & Community Learning',
        intro:
          'A storytelling-focused space for mentoring, empowerment, research exchange, and inclusive community building.',
        feedEyebrow: 'Workshop feed',
        feedTitle: 'Browse upcoming sessions',
        archiveEyebrow: 'Archive',
        archiveTitle: 'Curated workshop archive',
        reflectionEyebrow: 'Community reflection',
        reflectionTitle: 'Moments from our workshops',
      };
}

/** @deprecated Use getFeaturedWorkshop(lang) */
export const featuredWorkshop = getFeaturedWorkshop('en');
/** @deprecated Use getWorkshopFeed(lang) */
export const workshopFeed = getWorkshopFeed('en');
/** @deprecated Use getArchiveItems(lang) */
export const archiveItems = getArchiveItems('en');
/** @deprecated Use getReflections(lang) */
export const reflections = getReflections('en');
