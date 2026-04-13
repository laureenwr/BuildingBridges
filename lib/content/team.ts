export type TeamMemberLink = { url: string; labelEn: string; labelDe: string };

export type TeamMember = {
  slug: string;
  firstName: string;
  lastName: string;
  degree?: string;
  degreeEn?: string;
  degreeDe?: string;
  role: string;
  roleEn: string;
  roleDe: string;
  org: string;
  orgEn?: string;
  orgDe?: string;
  bio?: string;
  bioEn?: string;
  bioDe?: string;
  address?: string;
  email?: string;
  phone?: string;
  image: string;
  links?: TeamMemberLink[];
  name?: string;
  room?: string;
};

export type TeamMemberLocalizableField = 'bio' | 'role' | 'degree' | 'org';

/** Resolves EN/DE copy; falls back to legacy single field when bilingual pair is missing. */
export function pickTeamMemberText(
  m: TeamMember,
  field: TeamMemberLocalizableField,
  t: (en: string, de: string) => string
): string | undefined {
  const row = m as unknown as Record<string, string | undefined>;
  const en = row[`${field}En`];
  const de = row[`${field}De`];
  if (en?.trim() && de?.trim()) return t(en.trim(), de.trim());
  const legacy = m[field];
  if (legacy?.trim()) return legacy.trim();
  return undefined;
}

export function pickTeamMemberOrgOrBio(
  m: TeamMember,
  t: (en: string, de: string) => string
): string {
  const bio = pickTeamMemberText(m, 'bio', t);
  if (bio) return bio;
  return pickTeamMemberText(m, 'org', t) ?? m.org;
}

export function teamLinkLabel(link: TeamMemberLink, t: (en: string, de: string) => string): string {
  return t(link.labelEn, link.labelDe);
}

export const teamMembers: TeamMember[] = [
  {
    slug: 'claudia-calvano',
    firstName: 'Claudia',
    lastName: 'Calvano',
    name: 'Univ.-Prof. Dr. Claudia Calvano',
    degree: 'Diplom-Psychologin, Kinder- und Jugendlichenpsychotherapeutin',
    degreeDe: 'Diplom-Psychologin, Kinder- und Jugendlichenpsychotherapeutin',
    degreeEn: 'Diploma psychologist, child and adolescent psychotherapist',
    role: 'Verbundleitung und Leitung Teilprojekt 1',
    roleDe: 'Verbundleitung und Leitung Teilprojekt 1',
    roleEn: 'Consortium lead and head of Subproject 1',
    org: 'Freie Universität Berlin',
    bioDe:
      'Claudia studierte Psychologie an den Unis in Tübingen, Oslo und Potsdam und absolvierte parallel zur Promotion ihre Ausbildung als Psychotherapeutin für Kinder und Jugendliche. Seit 2007 lebt und arbeitet sie in Berlin bzw. Potsdam und ist seit 2023 an der Freien Universität Berlin, wo sie neben Forschung und Lehre auch in der Praxis tätig ist. Schwerpunkte ihrer Arbeit sind die psychische Gesundheit von Kindern und Jugendlichen und ihren Eltern, mit besonderem Blick auf marginalisierte Gruppen und der Entwicklung von diversitätssensiblem Empowerment und Psychotherapieansätzen, in einem partizipativen Rahmen.',
    bioEn:
      'Claudia studied psychology at the universities of Tübingen, Oslo, and Potsdam and completed her training as a psychotherapist for children and adolescents alongside her doctorate. Since 2007 she has lived and worked in Berlin and Potsdam and has been at Freie Universität Berlin since 2023, where she is active in research, teaching, and clinical practice. Her work focuses on the mental health of children and adolescents and their parents, with particular attention to marginalised groups and the development of diversity-sensitive empowerment and psychotherapy approaches within a participatory framework.',
    address:
      'Freie Universität Berlin, Fachbereich Erziehungswissenschaft und Psychologie, Arbeitsbereich Klinische Kinder- und Jugendpsychologie und -psychotherapie, Habelschwerdter Allee 45, 14195 Berlin',
    email: 'claudia.calvano@fu-berlin.de',
    image: '/Team/ClaudiaCalvano.png',
    links: [
      {
        labelEn: 'Profile',
        labelDe: 'Profil',
        url: 'https://www.ewi-psy.fu-berlin.de/psychologie/arbeitsbereiche/klinische_kinder_jugend_psy_und-kinder_psytherapie/mitarbeiter/calvanoc/index.html',
      },
    ],
  },
  {
    slug: 'esther-kipnis',
    firstName: 'Esther',
    lastName: 'Kipnis',
    name: 'B.Sc. Esther Kipnis',
    degree: 'B.Sc. Psychologie mit Profil Klinische Psychologie und Psychotherapie',
    degreeDe: 'B.Sc. Psychologie mit Profil Klinische Psychologie und Psychotherapie',
    degreeEn: 'B.Sc. Psychology with focus on Clinical Psychology and Psychotherapy',
    role: 'Studentische Hilfskraft im Teilprojekt 1',
    roleDe: 'Studentische Hilfskraft im Teilprojekt 1',
    roleEn: 'Student assistant in Subproject 1',
    org: 'Freie Universität Berlin',
    bioDe:
      'Sie ist derzeit im Master of Science Psychologie mit Schwerpunkt Klinische Psychologie und Psychotherapie an der FU Berlin eingeschrieben.',
    bioEn:
      'She is currently enrolled in the Master of Science in Psychology with a focus on Clinical Psychology and Psychotherapy at Freie Universität Berlin.',
    address: 'Habelschwerdter Allee 45, Raum JK27/227, 14195 Berlin',
    email: 'e.kipnis@fu-berlin.de',
    room: 'JK27/227',
    image: '/Team/EstherKipnis.png',
    links: [
      {
        labelEn: 'Profile',
        labelDe: 'Profil',
        url: 'https://www.ewi-psy.fu-berlin.de/psychologie/arbeitsbereiche/klinische_kinder_jugend_psy_und-kinder_psytherapie/mitarbeiter/EstherK/index.html',
      },
    ],
  },
  {
    slug: 'celiana-kiefer',
    firstName: 'Celiana',
    lastName: 'Kiefer',
    name: 'M.A. Celiana Kiefer',
    degree: 'M.A. Soziale Arbeit',
    degreeDe: 'M.A. Soziale Arbeit',
    degreeEn: 'M.A. Social Work',
    role: 'Teilprojektleitung von Teilprojekt 2 „Ment2Power" (Mentoringprogramm)',
    roleDe: 'Teilprojektleitung von Teilprojekt 2 „Ment2Power" (Mentoringprogramm)',
    roleEn: 'Subproject lead for Subproject 2 “Ment2Power” (mentoring programme)',
    org: 'Stiftung SPI',
    bioDe:
      'Celiana hat Soziale Arbeit studiert, im Master mit dem Forschungsschwerpunkt Kulturelle Bildung. Seit mehreren Jahren ist sie in der Mädchen*arbeit tätig, u. a. durch die Leitung von MÄDEA – Mädchen*zentrum für Empowerment und Feminismus in Berlin sowie durch ehrenamtliche Vorstandsarbeit in der Bundesarbeitsgemeinschaft Mädchen*politik. Sie befindet sich in Ausbildung zur systemischen Beratung. Sie beschäftigt sich mit Mädchen*arbeit und -politik, Empowerment, Rassismus, Feminismus, Intersektionalität, Queerness und diversen Beziehungsformen. Sie positioniert sich als Schwarze Person, queer und Arbeiterinnenkind.',
    bioEn:
      'Celiana studied social work, with a master’s research focus on cultural education. For several years she has worked in girls* work, including leading MÄDEA – a girls* centre for empowerment and feminism in Berlin and serving on the board of the federal girls* politics association. She is training in systemic counselling. Her themes include girls* work and politics, empowerment, racism, feminism, intersectionality, queerness, and diverse relationship forms. She positions herself as a Black person, queer, and from a working-class background.',
    address: 'Building Bridges c/o MÄDEA, Grüntaler Straße 21, 13357 Berlin',
    email: 'celiana.kiefer@lvs.stiftung-spi.de',
    image: '/Team/CelianaKiefer.png',
    links: [{ labelEn: 'Mädea', labelDe: 'Mädea', url: 'https://hausderjugendmitte.de/maedea/' }],
  },
  {
    slug: 'susanne-birnkammer',
    firstName: 'Susanne',
    lastName: 'Birnkammer',
    name: 'M.Sc. Susanne Birnkammer',
    degree: 'M.Sc.',
    degreeDe: 'M.Sc.',
    degreeEn: 'M.Sc.',
    role: 'Wissenschaftliche Mitarbeiterin, Doktorandin',
    roleDe: 'Wissenschaftliche Mitarbeiterin, Doktorandin',
    roleEn: 'Research associate, doctoral candidate',
    org: 'Freie Universität Berlin',
    email: 'susanne.birnkammer@fu-berlin.de',
    address: 'Habelschwerdter Allee 45, 14195 Berlin',
    room: 'JK27/228',
    image: '/Team/SusanneBirnkammer.png',
    links: [
      {
        labelEn: 'Profile',
        labelDe: 'Profil',
        url: 'https://www.ewi-psy.fu-berlin.de/psychologie/arbeitsbereiche/klinische_kinder_jugend_psy_und-kinder_psytherapie/mitarbeiter/birnkammers/index.html',
      },
    ],
  },
  {
    slug: 'felicia-boma-lazaridou',
    firstName: 'Felicia',
    lastName: 'Boma Lazaridou',
    name: 'Dr. rer. medic. Felicia Boma Lazaridou',
    degree: 'Dr. rer. medic.',
    degreeDe: 'Dr. rer. medic.',
    degreeEn: 'Dr. rer. medic.',
    role: 'Wissenschaftliche Mitarbeiterin (Drittmittelprojekt)',
    roleDe: 'Wissenschaftliche Mitarbeiterin (Drittmittelprojekt)',
    roleEn: 'Research associate (third-party funded project)',
    org: 'Freie Universität Berlin',
    email: 'felicia.lazaridou@fu-berlin.de',
    address: 'Habelschwerdter Allee 45, 14195 Berlin',
    room: 'JK27/228',
    image: '/Team/FeliciaLazaridou.png',
    links: [
      {
        labelEn: 'Profile',
        labelDe: 'Profil',
        url: 'https://www.ewi-psy.fu-berlin.de/psychologie/arbeitsbereiche/klinische_kinder_jugend_psy_und-kinder_psytherapie/mitarbeiter/FeliciaL/index.html',
      },
    ],
  },
  {
    slug: 'dilara-yildirim',
    firstName: 'Dilara',
    lastName: 'Yildirim',
    name: 'Dilara Yildirim',
    degree: 'Im Studium B.A. Erziehung und Bildung in der Kindheit',
    degreeDe: 'Im Studium B.A. Erziehung und Bildung in der Kindheit',
    degreeEn: 'B.A. Education and Childhood Studies (in progress)',
    role: 'Studentische Hilfskraft',
    roleDe: 'Studentische Hilfskraft',
    roleEn: 'Student assistant',
    org: 'Stiftung SPI / Mädea',
    orgDe: 'Stiftung SPI / Mädea',
    orgEn: 'Stiftung SPI / Mädea',
    bioDe: 'Kurzinfo/Bio folgt in Kürze.',
    bioEn: 'Bio coming soon.',
    address: 'Building Bridges c/o MÄDEA, Grüntaler Straße 21, 13357 Berlin',
    email: 'dilara.yildirim@lvs.stiftung-spi.de',
    image: '/images/placeholder-user.svg',
    links: [{ labelEn: 'Mädea', labelDe: 'Mädea', url: 'https://hausderjugendmitte.de/maedea/' }],
  },
  {
    slug: 'hannes-rothe',
    firstName: 'Hannes',
    lastName: 'Rothe',
    name: 'Prof. Dr. Hannes Rothe',
    degree: 'Prof. Dr.',
    degreeDe: 'Prof. Dr.',
    degreeEn: 'Prof. Dr.',
    role: 'Projektleitung Digitale Plattform (TP3), Lehrstuhlinhaber',
    roleDe: 'Projektleitung Digitale Plattform (TP3), Lehrstuhlinhaber',
    roleEn: 'Digital platform project lead (TP3), chair holder',
    org: 'Universität Duisburg-Essen',
    image: '/Team/HannesRothe.png',
    address: 'Universitätsstraße 9, 45151 Essen',
    email: 'hannes.rothe@ris.uni-due.de',
    bioDe:
      'Er ist Vater von zwei Kindern, Professor und Inhaber des Lehrstuhls für Nachhaltigkeit und Innovation in digitalen Ökosystemen an der Universität Duisburg-Essen und Leiter von Place Beyond Bytes. Er lehrt zu digitaler Innovation, Entrepreneurship und maschinellem Lernen. Seine Forschung liegt an der Schnittstelle von digitaler Innovation und Entrepreneurship, dem Management digitaler Ökosysteme sowie der Organisation von Daten und Wissen.',
    bioEn:
      'He is a father of two, professor and Chair of Sustainability and Innovation in Digital Ecosystems at the University of Duisburg-Essen, and head of Place Beyond Bytes. He teaches digital innovation, entrepreneurship, and machine learning. His research sits at the intersection of digital innovation and entrepreneurship, managing digital ecosystems, and organizing data and knowledge.',
    links: [
      {
        labelEn: 'Profile',
        labelDe: 'Profil',
        url: 'https://sust.ris.uni-due.de/team/hannes-rothe/',
      },
      { labelEn: 'LinkedIn', labelDe: 'LinkedIn', url: 'https://www.linkedin.com' },
    ],
  },
  {
    slug: 'daniel-courtney',
    firstName: 'Daniel',
    lastName: 'Courtney',
    name: 'Daniel Courtney',
    role: 'HCI-Forscher (TP3)',
    roleDe: 'HCI-Forscher (TP3)',
    roleEn: 'HCI researcher (TP3)',
    org: 'Universität Duisburg-Essen',
    image: '/daniel.jpg',
    address: 'Universitätsstraße 9, 45151 Essen',
    links: [],
    bioDe:
      'Er ist HCI-Forscher mit Hintergrund in Psychologie und Mensch-Computer-Interaktion. Seine Arbeit fokussiert User Experience (UX), Service Design und Usability – getrieben vom Interesse daran, wie Menschen mit Technologie interagieren.',
    bioEn:
      'He is an HCI researcher with a background in psychology and human–computer interaction. His work focuses on user experience (UX), service design, and usability—driven by a passion for understanding how people interact with technology.',
  },
  {
    slug: 'laureen-warikoru',
    firstName: 'Laureen',
    lastName: 'Warikoru',
    name: 'M.Sc. Laureen Warikoru',
    degree: 'M.Sc.',
    degreeDe: 'M.Sc.',
    degreeEn: 'M.Sc.',
    role: 'Wissenschaftliche Mitarbeiterin (TP3)',
    roleDe: 'Wissenschaftliche Mitarbeiterin (TP3)',
    roleEn: 'Research associate (TP3)',
    org: 'Universität Duisburg-Essen',
    bioDe:
      'Sie ist wissenschaftliche Mitarbeiterin im Team der digitalen Plattform (TP3) an der Universität Duisburg-Essen.',
    bioEn:
      'She is a research associate on the digital platform team (TP3) at the University of Duisburg-Essen.',
    image: '/Team/LaureenWarikoru.png',
    address: 'Universitätsstraße 9, 45151 Essen',
    email: 'laureen.warikoru@uni-due.de',
    links: [],
  },
  {
    slug: 'sumera-sajid',
    firstName: 'Sumera',
    lastName: 'Sajid',
    name: 'Sumera Sajid',
    role: 'Studentische Hilfskraft (TP3)',
    roleDe: 'Studentische Hilfskraft (TP3)',
    roleEn: 'Student assistant (TP3)',
    org: 'Universität Duisburg-Essen',
    bioDe:
      'Sie ist studentische Hilfskraft an der Universität Duisburg-Essen und unterstützt das Team der digitalen Plattform im Projekt Building Bridges.',
    bioEn:
      'She is a student assistant at the University of Duisburg-Essen, supporting the digital platform team within the Building Bridges project.',
    address: 'Universitätsstraße 9, 45151 Essen',
    image: '/Team/SumeraSajid.jpg',
    links: [],
  },
];

export function getMemberBySlug(slug: string) {
  return teamMembers.find((m) => m.slug === slug) || null;
}
