export type TeamMember = {
  slug: string;
  name: string;
  role: string;
  org: string;
  image: string;
  bio?: string;
  email?: string;
  phone?: string;
  address?: string;
  room?: string;
  links?: { label: string; url: string }[];
};

export const teamMembers: TeamMember[] = [
  {
    slug: 'claudia-calvano',
    name: 'Univ.-Prof. Dr. Claudia Calvano',
    role: 'Professorin, Leitung TP1',
    org: 'Freie Universität Berlin',
    image: '/images/placeholder-user.svg',
    email: 'claudia.calvano@fu-berlin.de',
    phone: '+49 30 838 585 70',
    address: 'Habelschwerdter Allee 45, 14195 Berlin',
    room: 'JK27/229',
    links: [
      { label: 'Profil', url: 'https://www.ewi-psy.fu-berlin.de/psychologie/arbeitsbereiche/klinische_kinder_jugend_psy_und-kinder_psytherapie/mitarbeiter/calvanoc/index.html' },
    ],
  },
  {
    slug: 'susanne-birnkammer',
    name: 'M.Sc. Susanne Birnkammer',
    role: 'Wissenschaftliche Mitarbeiterin, Doktorandin',
    org: 'Freie Universität Berlin',
    image: '/images/placeholder-user.svg',
    email: 'susanne.birnkammer@fu-berlin.de',
    phone: '+49 30 838 75634',
    address: 'Habelschwerdter Allee 45, 14195 Berlin',
    room: 'JK27/228',
    links: [
      { label: 'Profil', url: 'https://www.ewi-psy.fu-berlin.de/psychologie/arbeitsbereiche/klinische_kinder_jugend_psy_und-kinder_psytherapie/mitarbeiter/birnkammers/index.html' },
    ],
  },
  {
    slug: 'felicia-boma-lazaridou',
    name: 'Dr. rer. medic. Felicia Boma Lazaridou',
    role: 'Wissenschaftliche Mitarbeiterin (Drittmittelprojekt)',
    org: 'Freie Universität Berlin',
    image: '/images/placeholder-user.svg',
    email: 'felicia.lazaridou@fu-berlin.de',
    address: 'Habelschwerdter Allee 45, 14195 Berlin',
    room: 'JK27/228',
    links: [
      { label: 'Profil', url: 'https://www.ewi-psy.fu-berlin.de/psychologie/arbeitsbereiche/klinische_kinder_jugend_psy_und-kinder_psytherapie/mitarbeiter/FeliciaL/index.html' },
    ],
  },
  {
    slug: 'esther-kipnis',
    name: 'B.Sc. Esther Kipnis',
    role: 'Studentische Hilfskraft (Drittmittelprojekt)',
    org: 'Freie Universität Berlin',
    image: '/images/placeholder-user.svg',
    email: 'e.kipnis@fu-berlin.de',
    phone: '+49 30 838 60184',
    address: 'Habelschwerdter Allee 45, 14195 Berlin',
    room: 'JK27/227',
    links: [
      { label: 'Profil', url: 'https://www.ewi-psy.fu-berlin.de/psychologie/arbeitsbereiche/klinische_kinder_jugend_psy_und-kinder_psytherapie/mitarbeiter/EstherK/index.html' },
    ],
  },
  {
    slug: 'celiana-kiefer',
    name: 'Celiana Kiefer, M.A.',
    role: 'Projektteam TP2',
    org: 'Stiftung SPI / Mädea',
    image: '/images/placeholder-user.svg',
    bio: 'Soziale Arbeit mit Schwerpunkt Kulturelle Bildung; Vorstandsmitglied BAG Mädchen*politik; in Ausbildung zur systemischen Beraterin (GST Berlin). Schwerpunkte: Mädchen*arbeit und -politik, Queerfeminismus, Rassismus, Klassismus, Intersektionalität, jugendpolitische Lobbyarbeit.',
    links: [
      { label: 'Mädea', url: 'https://hausderjugendmitte.de/maedea/' },
    ],
  },
  {
    slug: 'zilan',
    name: 'Zilan',
    role: 'Studentische Hilfskraft',
    org: 'Stiftung SPI / Mädea',
    image: '/images/placeholder-user.svg',
    links: [ { label: 'Mädea', url: 'https://hausderjugendmitte.de/maedea/' } ],
  },
  {
    slug: 'nina',
    name: 'Nina',
    role: 'Studentische Hilfskraft',
    org: 'Stiftung SPI / Mädea',
    image: '/images/placeholder-user.svg',
    links: [ { label: 'Mädea', url: 'https://hausderjugendmitte.de/maedea/' } ],
  },
  {
    slug: 'hannes-rothe',
    name: 'Prof. Dr. Hannes Rothe',
    role: 'Projektleitung Digitale Plattform (TP3), Lehrstuhlinhaber',
    org: 'Universität Duisburg-Essen',
    image: '/images/placeholder-user.svg',
    phone: '+49 201 18-32604',
    address: 'Universitätsstraße 9, 45151 Essen',
    links: [
      { label: 'Profil', url: 'https://sust.ris.uni-due.de/team/hannes-rothe/' },
      { label: 'LinkedIn', url: 'https://www.linkedin.com' },
    ],
  },
  {
    slug: 'elias-jelinek',
    name: 'M.Sc. Elias Jelinek',
    role: 'Wissenschaftlicher Mitarbeiter (TP3)',
    org: 'Universität Duisburg-Essen',
    image: '/images/placeholder-user.svg',
    address: 'Universitätsstraße 9, 45151 Essen',
    links: [
      { label: 'Profil', url: 'https://sust.ris.uni-due.de/team/elias-jelinek/' },
      { label: 'LinkedIn', url: 'https://www.linkedin.com' },
    ],
    bio: 'Forschung zu generativer und agentischer KI; Computer Vision; Peer-to-Peer-Plattformen; Time-to-MVP-Reduktion durch Templating.',
  },
];

export function getMemberBySlug(slug: string) {
  return teamMembers.find((m) => m.slug === slug) || null;
}

