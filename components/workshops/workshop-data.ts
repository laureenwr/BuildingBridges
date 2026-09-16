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
  date: string | L<string>;
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

const UPDATED_FLYER_BASE = '/workshops/updated';
const UPDATED_FLYERS = {
  offerTemplate: `${UPDATED_FLYER_BASE}/Workshop%20archive%20data%20-%20Classroom_page-0001.jpg`,
  eventTemplate: `${UPDATED_FLYER_BASE}/Workshop%20archive%20data%202-%20Classroom_page-0001.jpg`,
  mentoringProgramme: `${UPDATED_FLYER_BASE}/2025%20Building%20Bridges%20Mentoringprogramm%20f%C3%BCr%20M%C3%A4dchen%20und%20FLINTA%20of%20Colour_page-0001.jpg`,
  johannaEckIntro: `${UPDATED_FLYER_BASE}/20251008%20Flyer%20Workshop%20Johanna%20Eck%20Angebot_page-0001.jpg`,
  perlenPower: `${UPDATED_FLYER_BASE}/20251218%20Flyer%20BB%20und%20JE%20-%20Perlen%20und%20Power_page-0001.jpg`,
  mentoringJohannaEck: `${UPDATED_FLYER_BASE}/2.3.26%20Building%20Bridges%20-%20Johanna%20eck%20Flyer_page-0001.jpg`,
  fruehlingsfest: `${UPDATED_FLYER_BASE}/20260326%20Fr%C3%BChlingsfest%20M%C3%84DEA%20x%20Building%20Bridges%2020.03.2026_page-0001.jpg`,
  selfCare: `${UPDATED_FLYER_BASE}/20260613%20Self%20Care%20Workshop%20Building%20Bridges_page-0001.jpg`,
  juliTp3En: `${UPDATED_FLYER_BASE}/31%20Juli%20eng.jpg`,
  juliTp3De: `${UPDATED_FLYER_BASE}/31%20Juli%20German.jpg`,
  wegeNachDerSchule: `${UPDATED_FLYER_BASE}/20260921%20Wege%20nach%20der%20Schule.png`,
};

function toWorkshopItem(source: WorkshopSource, lang: AppLanguage): WorkshopItem {
  return {
    id: source.id,
    title: pick(source.title, lang),
    description: pick(source.description, lang),
    date: pickMaybeLocalized(source.date, lang),
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

/** Set when a new upcoming workshop should be featured as “Next up”. */
const featuredSource: WorkshopSource | null = {
  id: 'wege-nach-der-schule',
  title: {
    en: 'Paths after school',
    de: 'Wege nach der Schule',
  },
  description: {
    en: 'Online workshop for girls and young FLINTA* of Colour from 9th grade. We talk about self-organisation and self-care without burning out; paths after school such as a year abroad, internships and university; how to start making the right decision for your future; finding community and friends, especially at university; jobs and pay in social professions; and how much school grades really count.',
    de: 'Online-Workshop für Mädchen und junge FLINTA* of Color ab der 9. Klasse: Selbstorganisation & Selbstfürsorge, Wege nach der Schule (Auslandsjahr, Praktikum, Studium), Anschluss & Freundschaft, Jobs in sozialen Berufen und wie viel Schulnoten wirklich zählen.',
  },
  date: { en: 'Monday, 21 September 2026', de: 'Montag, 21. September 2026' },
  time: { en: '18:00 – 20:00', de: '18:00 – 20:00 Uhr' },
  location: { en: 'Online', de: 'Online' },
  mode: 'Online',
  category: 'Workshop',
  image: UPDATED_FLYERS.wegeNachDerSchule,
  registrationUrl: 'mailto:buildingbridges@lvs.stiftung-spi.de',
  tags: {
    en: ['Upcoming', 'Online', 'Empowerment'],
    de: ['Bevorstehend', 'Online', 'Empowerment'],
  },
};

const feedSources: WorkshopSource[] = featuredSource ? [featuredSource] : [];

type ArchiveSource = {
  id: string;
  title: L<string>;
  type: L<string>;
  date: string;
  status: L<string>;
  image: string | L<string>;
  href: string | L<string>;
};

const archiveSources: ArchiveSource[] = [
  {
    id: 'archive-online-workshop-tp3',
    title: {
      en: 'Online workshop: Evaluating storytelling formats with mentors',
      de: 'Online-Workshop: Storytelling-Formate mit Mentor:innen evaluieren',
    },
    type: { en: 'Research workshop', de: 'Forschungs-Workshop' },
    date: '31.07.2026',
    status: { en: 'Past workshop', de: 'Vergangener Workshop' },
    image: { en: UPDATED_FLYERS.juliTp3En, de: UPDATED_FLYERS.juliTp3De },
    href: { en: UPDATED_FLYERS.juliTp3En, de: UPDATED_FLYERS.juliTp3De },
  },
  {
    id: 'archive-self-care',
    title: { en: 'Self-Care Workshop', de: 'Self-Care-Workshop' },
    type: { en: 'Self-Care Workshop', de: 'Self-Care-Workshop' },
    date: '13.06.2026',
    status: { en: 'Past workshop', de: 'Vergangener Workshop' },
    image: UPDATED_FLYERS.selfCare,
    href: UPDATED_FLYERS.selfCare,
  },
  {
    id: 'archive-fruehlingsfest',
    title: { en: 'Frühlingsfest', de: 'Frühlingsfest' },
    type: { en: 'Community celebration', de: 'Community-Fest' },
    date: '20.03.2026',
    status: { en: 'Community event', de: 'Community-Event' },
    image: UPDATED_FLYERS.fruehlingsfest,
    href: UPDATED_FLYERS.fruehlingsfest,
  },
  {
    id: 'archive-mentoring-wellbeing',
    title: { en: 'Mentoring workshop — Johanna-Eck', de: 'Mentoring-Workshop — Johanna-Eck' },
    type: { en: 'Empowerment workshop', de: 'Empowerment-Workshop' },
    date: '02.03.2026',
    status: { en: 'Past workshop', de: 'Vergangener Workshop' },
    image: UPDATED_FLYERS.mentoringJohannaEck,
    href: UPDATED_FLYERS.mentoringJohannaEck,
  },
  {
    id: 'archive-perlen-power',
    title: { en: 'Perlen & Power', de: 'Perlen & Power' },
    type: { en: 'Reflection event', de: 'Reflexions-Event' },
    date: '18.12.2025',
    status: { en: 'Flyer', de: 'Flyer' },
    image: UPDATED_FLYERS.perlenPower,
    href: UPDATED_FLYERS.perlenPower,
  },
  {
    id: 'archive-johanna-eck-intro',
    title: { en: 'Kick-off workshop — Johanna-Eck', de: 'Auftaktworkshop — Johanna-Eck' },
    type: { en: 'Introduction workshop', de: 'Kennenlern-Workshop' },
    date: '08.10.2025',
    status: { en: 'Past workshop', de: 'Vergangener Workshop' },
    image: UPDATED_FLYERS.johannaEckIntro,
    href: UPDATED_FLYERS.johannaEckIntro,
  },
  {
    id: 'archive-programm',
    title: { en: 'Mentoring programme 2025/26', de: 'Mentoring-Programm 2025/26' },
    type: { en: 'Programme flyer', de: 'Programm-Flyer' },
    date: '2025 - 2026',
    status: { en: 'Programme', de: 'Programm' },
    image: UPDATED_FLYERS.mentoringProgramme,
    href: UPDATED_FLYERS.mentoringProgramme,
  },
  {
    id: 'archive-basic-training',
    title: { en: 'Basis Training', de: 'Basis-Training' },
    type: { en: 'Mentor training', de: 'Mentor:innen-Training' },
    date: '20.06.2025 - 22.06.2025',
    status: { en: 'Training', de: 'Training' },
    image: UPDATED_FLYERS.offerTemplate,
    href: UPDATED_FLYERS.offerTemplate,
  },
  {
    id: 'archive-basic-training-ii',
    title: { en: 'Basis Training II', de: 'Basis-Training II' },
    type: { en: 'Mentor training', de: 'Mentor:innen-Training' },
    date: '30.01.2026',
    status: { en: 'Training', de: 'Training' },
    image: UPDATED_FLYERS.offerTemplate,
    href: UPDATED_FLYERS.offerTemplate,
  },
  {
    id: 'archive-get-together',
    title: { en: 'Get Together', de: 'Get Together' },
    type: { en: 'Mentoring kick-off', de: 'Mentoring-Auftakt' },
    date: '09.12.2025',
    status: { en: 'Community event', de: 'Community-Event' },
    image: UPDATED_FLYERS.eventTemplate,
    href: UPDATED_FLYERS.eventTemplate,
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

export function getFeaturedWorkshop(lang: AppLanguage): WorkshopItem | null {
  return featuredSource ? toWorkshopItem(featuredSource, lang) : null;
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

/** Copy for the upcoming-workshop alert. Returns null when nothing is featured. */
export function getUpcomingWorkshopAlert(lang: AppLanguage): UpcomingWorkshopAlertData | null {
  if (!featuredSource) return null;
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
    image: pickMaybeLocalized(s.image, lang),
    href: pickMaybeLocalized(s.href, lang),
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
  feedEmptyTitle: string;
  feedEmptyBody: string;
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
        feedEyebrow: 'Kommende Termine',
        feedTitle: 'Bevorstehende Workshops',
        feedEmptyTitle: 'Zurzeit keine kommenden Workshops',
        feedEmptyBody:
          'Neue Termine erscheinen hier, sobald sie feststehen. Vergangene Workshops findest du im Archiv.',
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
        feedEyebrow: 'Upcoming',
        feedTitle: 'Upcoming sessions',
        feedEmptyTitle: 'No upcoming workshops right now',
        feedEmptyBody: 'New dates will be announced here. You can browse past workshops in the archive below.',
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
