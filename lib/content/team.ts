export type TeamMember = {
  slug: string;
  firstName: string;
  lastName: string;
  degree?: string; // Abschluss
  role: string; // Rolle im Projekt
  org: string;
  bio?: string; // Kurzinfo/Bio
  address?: string; // Anschrift
  email?: string;
  phone?: string;
  image: string;
  links?: { label: string; url: string }[]; // weitere Links
  // Legacy support
  name?: string; // Computed from firstName + lastName
  room?: string; // Keep for backwards compatibility
};

export const teamMembers: TeamMember[] = [
  {
    slug: 'claudia-calvano',
    firstName: 'Claudia',
    lastName: 'Calvano',
    name: 'Univ.-Prof. Dr. Claudia Calvano',
    degree: 'Diplom-Psychologin, Kinder- und Jugendlichenpsychotherapeutin',
    role: 'Verbundleitung und Leitung Teilprojekt 1',
    org: 'Freie Universität Berlin',
    bio: 'Claudia studierte Psychologie an den Unis in Tübingen, Oslo und Potsdam und absolvierte parallel zur Promotion ihre Ausbildung als Psychotherapeutin für Kinder und Jugendliche. Seit 2007 lebt und arbeitet sie in Berlin bzw Potsdam und ist seit 2023 an der Freien Universität Berlin, wo sie neben Forschung und Lehre auch in der Praxis tätig ist. Schwerpunkte ihrer Arbeit sind die psychische Gesundheit von Kindern und Jugendlichen und ihren Eltern, mit besonderem Blick auf marginalisierte Gruppen und der Entwicklung von diversitätssensiblem Empowerment und Psychotherapieansätzen, in einem partizipativen Rahmen.',
    address: 'Freie Universität Berlin, Fachbereich Erziehungswissenschaft und Psychologie, Arbeitsbereich Klinische Kinder- und Jugendpsychologie und -psychotherapie, Habelschwerdter Allee 45, 14195 Berlin',
    email: 'claudia.calvano@fu-berlin.de',
    image: '/Team/ClaudiaCalvano.png',
    links: [
      { label: 'Profil', url: 'https://www.ewi-psy.fu-berlin.de/psychologie/arbeitsbereiche/klinische_kinder_jugend_psy_und-kinder_psytherapie/mitarbeiter/calvanoc/index.html' },
    ],
  },
  {
    slug: 'esther-kipnis',
    firstName: 'Esther',
    lastName: 'Kipnis',
    name: 'B.Sc. Esther Kipnis',
    degree: 'B.Sc. Psychologie mit Profil Klinische Psychologie und Psychotherapie',
    role: 'Studentische Hilfskraft im Teilprojekt 1',
    org: 'Freie Universität Berlin',
    bio: 'Gerade im Master of Science Psychologie mit Schwerpunkt Klinische Psychologie und Psychotherapie an der FU Berlin',
    address: 'Habelschwerdter Allee 45, Raum JK27/227, 14195 Berlin',
    email: 'e.kipnis@fu-berlin.de',
    room: 'JK27/227',
    image: '/Team/EstherKipnis.png',
    links: [
      { label: 'Profil', url: 'https://www.ewi-psy.fu-berlin.de/psychologie/arbeitsbereiche/klinische_kinder_jugend_psy_und-kinder_psytherapie/mitarbeiter/EstherK/index.html' },
    ],
  },
  {
    slug: 'celiana-kiefer',
    firstName: 'Celiana',
    lastName: 'Kiefer',
    name: 'M.A. Celiana Kiefer',
    degree: 'M.A. Soziale Arbeit',
    role: 'Teilprojektleitung von Teilprojekt 2 „Ment2Power" (Mentoringprogramm)',
    org: 'Stiftung SPI',
    bio: 'hatte Soziale Arbeit studiert, im Masterstudium mit dem Forschungsschwerpunkt Kulturelle Bildung, ist seit mehreren Jahren in der Mädchen*arbeit tätig, sowohl durch das vorherige Leiten von MÄDEA – Mädchen*zentrum für Empowerment und Feminismus in Berlin, als auch durch die ehrenamtliche Vorstandsarbeit in der Bundesarbeitsgemeinschaft Mädchen*politik. Befindet sich aktuell in Ausbildung zur systemischen Beratung. Beschäftigt sich mit den Themen: Mädchen*arbeit und -politik, Empowerment, Rassismus, Feminismus, Intersektionalität, Queereness, diverse Beziehungsformen. Positioniert als Schwarze Person, Queer, Arbeiterinnenkind.',
    address: 'Building Bridges c/o MÄDEA, Grüntaler Straße 21, 13357 Berlin',
    email: 'celiana.kiefer@lvs.stiftung-spi.de',
    image: '/Team/CelianaKiefer.png',
    links: [
      { label: 'Mädea', url: 'https://hausderjugendmitte.de/maedea/' },
    ],
  },
  {
    slug: 'susanne-birnkammer',
    firstName: 'Susanne',
    lastName: 'Birnkammer',
    name: 'M.Sc. Susanne Birnkammer',
    degree: 'M.Sc.',
    role: 'Wissenschaftliche Mitarbeiterin, Doktorandin',
    org: 'Freie Universität Berlin',
    email: 'susanne.birnkammer@fu-berlin.de',
    address: 'Habelschwerdter Allee 45, 14195 Berlin',
    room: 'JK27/228',
    image: '/Team/SusanneBirnkammer.png',
    links: [
      { label: 'Profil', url: 'https://www.ewi-psy.fu-berlin.de/psychologie/arbeitsbereiche/klinische_kinder_jugend_psy_und-kinder_psytherapie/mitarbeiter/birnkammers/index.html' },
    ],
  },
  {
    slug: 'felicia-boma-lazaridou',
    firstName: 'Felicia',
    lastName: 'Boma Lazaridou',
    name: 'Dr. rer. medic. Felicia Boma Lazaridou',
    degree: 'Dr. rer. medic.',
    role: 'Wissenschaftliche Mitarbeiterin (Drittmittelprojekt)',
    org: 'Freie Universität Berlin',
    email: 'felicia.lazaridou@fu-berlin.de',
    address: 'Habelschwerdter Allee 45, 14195 Berlin',
    room: 'JK27/228',
    image: '/Team/FeliciaLazaridou.png',
    links: [
      { label: 'Profile', url: 'https://www.ewi-psy.fu-berlin.de/psychologie/arbeitsbereiche/klinische_kinder_jugend_psy_und-kinder_psytherapie/mitarbeiter/FeliciaL/index.html' },
    ],
  },
  {
    slug: 'dilara-yildirim',
    firstName: 'Dilara',
    lastName: 'Yildirim',
    name: 'Dilara Yildirim',
    degree: 'Im Studium B.A. Erziehung und Bildung in der Kindheit',
    role: 'Studentische Hilfskraft',
    org: 'Stiftung SPI / Mädea',
    bio: 'Kurzinfo/Bio folgt in Kürze.',
    address: 'Building Bridges c/o MÄDEA, Grüntaler Straße 21, 13357 Berlin',
    email: 'dilara.yildirim@lvs.stiftung-spi.de',
    image: '/images/placeholder-user.svg',
    links: [ { label: 'Mädea', url: 'https://hausderjugendmitte.de/maedea/' } ],
  },
  {
    slug: 'hannes-rothe',
    firstName: 'Hannes',
    lastName: 'Rothe',
    name: 'Prof. Dr. Hannes Rothe',
    degree: 'Prof. Dr.',
    role: 'Projektleitung Digitale Plattform (TP3), Lehrstuhlinhaber',
    org: 'Universität Duisburg-Essen',
    image: '/Team/HannesRothe.png',
    address: 'Universitätsstraße 9, 45151 Essen',
    email: 'hannes.rothe@ris.uni-due.de',
    bio: 'Professor and Chair of Sustainability and Innovation in Digital Ecosystems at the University of Duisburg-Essen, and head of the Place Beyond Bytes. His work focuses on teaching Digital Innovation, Entrepreneurship, and Machine Learning. His research explores the intersection of digital innovation and entrepreneurship, the management of digital ecosystems, and the organization of data and knowledge.',
    links: [
      { label: 'Profil', url: 'https://sust.ris.uni-due.de/team/hannes-rothe/' },
      { label: 'LinkedIn', url: 'https://www.linkedin.com' },
    ],
  },
  {
    slug: 'daniel-courtney',
    firstName: 'Daniel',
    lastName: 'Courtney',
    name: 'Daniel Courtney',
    role: 'Wissenschaftlicher Mitarbeiter (TP3)',
    org: 'Universität Duisburg-Essen',
    image: '/Team/daniel.jpg',
    bio: 'Research Associate at the University of Duisburg-Essen, working at the Chair of Sustainability and Innovation in Digital Ecosystems. He contributes to projects such as Building Bridges and "EHDS for All." With a background in Human-Computer Interaction and Psychology, his work focuses on user experience, human-centered design, and the interaction between people and digital technologies. His research interests include UX design and research, human factors, and behavioral science.',
    address: 'Universitätsstraße 9, 45151 Essen',
    email: 'daniel.courtney@uni-due.de',
    links: [
      { label: 'Profile', url: 'https://www.ris.uni-due.de/über-uns/personen/detailansicht/daniel-courtney/' },
    ],
  },
  {
    slug: 'sumera-sajid',
    firstName: 'Sumera',
    lastName: 'Sajid',
    name: 'Sumera Sajid',
    role: 'Studentische Hilfskraft (TP3)',
    org: 'Universität Duisburg-Essen',
    image: '/Team/SumeraSajid.jpg',
    bio: "Master's student in Web & Data Science at the University of Koblenz. Contributing to the Building Bridges platform with a focus on user experience, storytelling, and inclusive digital design. Her work brings together data-driven thinking and user-centered design to support accessible and meaningful digital experiences. She is particularly interested in how technology can empower communities, amplify diverse voices, and create inclusive spaces for learning and exchange.",
    address: 'Universitätsstraße 9, 45151 Essen',
    email: 'sumera.sajid@uni-due.de',
    links: [
      { label: 'LinkedIn', url: 'https://www.linkedin.com/in/sumera56' },
    ],
  },
  {
    slug: 'laureen-warikoru',
    firstName: 'Laureen',
    lastName: 'Warikoru',
    name: 'M.Sc. Laureen Warikoru',
    degree: 'M.Sc.',
    role: 'Wissenschaftliche Mitarbeiterin (TP3)',
    org: 'Universität Duisburg-Essen',
    image: '/Team/LaureenWarikoru.png',
    bio: 'Research Associate at the University of Duisburg-Essen, working at the Chair of Sustainability and Innovation in Digital Ecosystems. Her work focuses on Human-Computer Interaction, cognitive psychology, and behavioral science, with an interest in understanding how people interact with digital systems and how these experiences can be designed in a more intuitive and user-centered way.',
    address: 'Universitätsstraße 9, 45151 Essen',
    email: 'laureen.warikoru@uni-due.de',
    links: [
      { label: 'Profile', url: 'https://www.ris.uni-due.de/über-uns/personen/detailansicht/laureen-warikoru/#research' },
    ],
  },
];

export function getMemberBySlug(slug: string) {
  return teamMembers.find((m) => m.slug === slug) || null;
}

