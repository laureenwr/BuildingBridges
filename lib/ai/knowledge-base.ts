/**
 * Knowledge base for RAG system
 * This contains curated information about scholarships, resources, and opportunities
 * In production, this could be stored in a vector database or loaded from external sources
 */

export interface Scholarship {
  title: string;
  description: string;
  eligibility: string;
  url: string;
  amount?: string;
  deadline?: string;
}

export interface Resource {
  title: string;
  description: string;
  type: string;
  url: string;
  topics: string[];
}

export interface Workshop {
  title: string;
  description: string;
  topics: string[];
  duration?: string;
}

export const scholarships: Scholarship[] = [
  {
    title: 'Rosa Luxemburg Stiftung Studienwerk',
    description: 'Stipendium für gesellschaftlich engagierte Studierende mit Interesse an sozialer Gerechtigkeit',
    eligibility: 'Studierende aller Fachrichtungen, besonders aus unterrepräsentierten Gruppen',
    url: 'https://www.rosalux.de/stiftung/studienwerk',
    amount: 'Bis zu 934€/Monat',
  },
  {
    title: 'Heinrich Böll Stiftung',
    description: 'Stipendium für politisch und gesellschaftlich engagierte Studierende',
    eligibility: 'Studierende mit Engagement für Demokratie, Menschenrechte und Nachhaltigkeit',
    url: 'https://www.boell.de/de/stiftung/stipendien',
    amount: 'Bis zu 934€/Monat',
  },
  {
    title: 'Avicenna Studienwerk',
    description: 'Begabtenförderung für muslimische Studierende und Promovierende',
    eligibility: 'Muslimische Studierende aller Fachrichtungen',
    url: 'https://www.avicenna-studienwerk.de',
  },
  {
    title: 'Deutschlandstipendium',
    description: 'Leistungsstipendium für begabte und engagierte Studierende',
    eligibility: 'Studierende an deutschen Hochschulen',
    url: 'https://www.deutschlandstipendium.de',
    amount: '300€/Monat',
  },
  {
    title: 'Studienstiftung des deutschen Volkes',
    description: 'Deutschlands größtes und ältestes Begabtenförderungswerk',
    eligibility: 'Studierende mit herausragenden Leistungen',
    url: 'https://www.studienstiftung.de',
  },
];

export const resources: Resource[] = [
  {
    title: 'Bundeszentrale für politische Bildung',
    description: 'Umfangreiche Materialien zu Politik, Gesellschaft und Bildung',
    type: 'Educational Platform',
    url: 'https://www.bpb.de',
    topics: ['politics', 'society', 'education', 'democracy'],
  },
  {
    title: 'IQ Netzwerk - Integration durch Qualifizierung',
    description: 'Unterstützung bei beruflicher Integration und Anerkennung ausländischer Abschlüsse',
    type: 'Career Support',
    url: 'https://www.netzwerk-iq.de',
    topics: ['career', 'integration', 'qualification', 'recognition'],
  },
  {
    title: 'MiGAZIN',
    description: 'Fachmagazin für Migration und Integration in Deutschland',
    type: 'News & Information',
    url: 'https://www.migazin.de',
    topics: ['migration', 'integration', 'diversity', 'society'],
  },
  {
    title: 'Each One Teach One (EOTO)',
    description: 'Bildungs- und Empowerment-Arbeit von und für Schwarze Menschen',
    type: 'Community Organization',
    url: 'https://www.eoto-archiv.de',
    topics: ['empowerment', 'education', 'community', 'black-community'],
  },
  {
    title: 'Neue deutsche Medienmacher*innen',
    description: 'Netzwerk für Medienschaffende mit Migrationsgeschichte',
    type: 'Professional Network',
    url: 'https://neuemedienmacher.de',
    topics: ['media', 'journalism', 'representation', 'diversity'],
  },
  {
    title: 'Intersektionale Pädagogik',
    description: 'Ressourcen zu intersektionaler und diskriminierungskritischer Bildungsarbeit',
    type: 'Educational Resource',
    url: 'https://www.intersektionale-paedagogik.de',
    topics: ['pedagogy', 'intersectionality', 'anti-discrimination', 'education'],
  },
];

export const workshops: Workshop[] = [
  {
    title: 'Empowerment & Selbstfürsorge',
    description: 'Workshop zu Empowerment-Strategien und Selbstfürsorge für FLINTA* of Colour',
    topics: ['empowerment', 'self-care', 'mental-health', 'community'],
    duration: '4 Stunden',
  },
  {
    title: 'Bewerbungstraining',
    description: 'Professionelles Bewerbungstraining mit Fokus auf diskriminierungssensible Bewerbungsstrategien',
    topics: ['career', 'applications', 'job-search', 'skills'],
    duration: '3 Stunden',
  },
  {
    title: 'Netzwerken & Community Building',
    description: 'Strategien für erfolgreiches Netzwerken und Community-Aufbau',
    topics: ['networking', 'community', 'professional-development'],
    duration: '2 Stunden',
  },
  {
    title: 'Finanzielle Bildung',
    description: 'Grundlagen der finanziellen Bildung: Budgetplanung, Sparen, Investieren',
    topics: ['finance', 'budgeting', 'financial-literacy'],
    duration: '3 Stunden',
  },
  {
    title: 'Intersektionalität im Alltag',
    description: 'Workshop zu intersektionalen Perspektiven und deren Anwendung im Alltag',
    topics: ['intersectionality', 'diversity', 'inclusion', 'social-justice'],
    duration: '4 Stunden',
  },
  {
    title: 'Digitale Kompetenzen',
    description: 'Einführung in wichtige digitale Tools und Online-Kompetenzen',
    topics: ['digital-skills', 'technology', 'online-tools'],
    duration: '3 Stunden',
  },
];

/**
 * Get knowledge base for AI recommendations
 */
export function getKnowledgeBase() {
  return {
    scholarships,
    resources,
    workshops,
  };
}

/**
 * Search knowledge base by keywords
 */
export function searchKnowledgeBase(query: string) {
  const lowerQuery = query.toLowerCase();

  const matchedScholarships = scholarships.filter(s =>
    s.title.toLowerCase().includes(lowerQuery) ||
    s.description.toLowerCase().includes(lowerQuery) ||
    s.eligibility.toLowerCase().includes(lowerQuery)
  );

  const matchedResources = resources.filter(r =>
    r.title.toLowerCase().includes(lowerQuery) ||
    r.description.toLowerCase().includes(lowerQuery) ||
    r.topics.some(t => t.includes(lowerQuery))
  );

  const matchedWorkshops = workshops.filter(w =>
    w.title.toLowerCase().includes(lowerQuery) ||
    w.description.toLowerCase().includes(lowerQuery) ||
    w.topics.some(t => t.includes(lowerQuery))
  );

  return {
    scholarships: matchedScholarships,
    resources: matchedResources,
    workshops: matchedWorkshops,
  };
}
