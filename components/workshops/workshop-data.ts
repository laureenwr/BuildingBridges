export type WorkshopItem = {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  mode: 'Online' | 'In Person' | 'Hybrid';
  category: 'Mentoring' | 'Workshop' | 'Research' | 'Community' | 'Networking';
  image: string;
  tags: string[];
};

export type ArchiveItem = {
  id: string;
  title: string;
  type: string;
  date: string;
  status: 'Past Workshop' | 'Community Event' | 'Flyer' | 'Research Activity';
  image: string;
  href: string;
};

export type ReflectionItem = {
  id: string;
  quote: string;
  role: string;
};

// Future integration point: replace static arrays with CMS/DB workshop uploads.
export const featuredWorkshop: WorkshopItem = {
  id: 'featured-mentor-intro',
  title: 'Online introductions to mentors',
  description:
    'A welcoming online session where participants meet mentors, ask questions, and co-create safer pathways into academic and psychosocial fields.',
  date: '14.01.2026',
  time: '18:00 - 19:30',
  location: 'Online',
  mode: 'Online',
  category: 'Mentoring',
  image: '/workshops/fruehlingsfest-2026.png',
  tags: ['Workshop', 'Mentoring', 'Community', 'Networking'],
};

// Future integration point: feed from workshop management backend.
export const workshopFeed: WorkshopItem[] = [
  {
    id: 'individual-mentoring',
    title: 'Individual mentoring',
    description: 'Ongoing one-to-one support with mentors aligned to participant goals and wellbeing.',
    date: 'Jan-Nov 2026',
    time: 'Flexible',
    location: 'Berlin + Online',
    mode: 'Hybrid',
    category: 'Mentoring',
    image: '/workshops/mentoring-programm-2025.png',
    tags: ['Community'],
  },
  {
    id: 'mentoring-workshop-ii',
    title: 'Mentoring Workshop II - Johanna Eck',
    description: 'Guided workshop focused on reflection, confidence, and practical support strategies.',
    date: '03.2026',
    time: '16:00 - 19:00',
    location: 'Johanna-Eck',
    mode: 'In Person',
    category: 'Workshop',
    image: '/workshops/mentoring-was-tut-mir-gut-2026.png',
    tags: ['Mentoring', 'Community'],
  },
  {
    id: 'digital-storytelling',
    title: 'Digital storytelling workshop',
    description: 'Participants co-create stories and media narratives that center lived experiences.',
    date: '04.2026',
    time: '13:00 - 17:00',
    location: 'UDE + Online',
    mode: 'Hybrid',
    category: 'Research',
    image: '/workshops/kennenlerntreffen-2025.png',
    tags: ['Storytelling', 'Research'],
  },
  {
    id: 'research-exchange',
    title: 'Research exchange session',
    description: 'Collaborative dialogue between participants and researchers on barriers and resilience.',
    date: '05.2026',
    time: '15:00 - 17:00',
    location: 'FU Berlin',
    mode: 'In Person',
    category: 'Research',
    image: '/workshops/perlen-power-2025.png',
    tags: ['Research', 'Exchange'],
  },
  {
    id: 'empowerment-networking',
    title: 'Empowerment & networking event',
    description: 'A warm community space for new connections, peer support, and shared resources.',
    date: '06.2026',
    time: '17:00 - 20:00',
    location: 'Maedea',
    mode: 'In Person',
    category: 'Community',
    image: '/workshops/fruehlingsfest-2026.png',
    tags: ['Networking', 'Community'],
  },
  {
    id: 'fruehlingsfest',
    title: 'Fruehlingsfest',
    description: 'Spring celebration with food, henna, flowers, and community care activities.',
    date: '20.03.2026',
    time: '15:00 - 19:00',
    location: 'Maedea',
    mode: 'In Person',
    category: 'Community',
    image: '/workshops/fruehlingsfest-2026.png',
    tags: ['Self-care'],
  },
];

export const archiveItems: ArchiveItem[] = [
  {
    id: 'archive-fruehlingsfest',
    title: 'Fruehlingsfest',
    type: 'Community Celebration',
    date: '20.03.2026',
    status: 'Community Event',
    image: '/workshops/fruehlingsfest-2026.png',
    href: '/workshops/fruehlingsfest-2026.png',
  },
  {
    id: 'archive-mentoring-wellbeing',
    title: 'Mentoring: Was tut mir gut?',
    type: 'Empowerment Workshop',
    date: '02.03.2026',
    status: 'Past Workshop',
    image: '/workshops/mentoring-was-tut-mir-gut-2026.png',
    href: '/workshops/mentoring-was-tut-mir-gut-2026.png',
  },
  {
    id: 'archive-perlen-power',
    title: 'Perlen & Power',
    type: 'Reflection Event',
    date: '18.12.2025',
    status: 'Flyer',
    image: '/workshops/perlen-power-2025.png',
    href: '/workshops/perlen-power-2025.png',
  },
  {
    id: 'archive-kennenlernen',
    title: 'Kennenlerntreffen',
    type: 'Introduction Session',
    date: '08.10.2025',
    status: 'Past Workshop',
    image: '/workshops/kennenlerntreffen-2025.png',
    href: '/workshops/kennenlerntreffen-2025.png',
  },
  {
    id: 'archive-programm',
    title: 'Mentoring-Programm 2025/26',
    type: 'Program Flyer',
    date: '2025 - 2026',
    status: 'Research Activity',
    image: '/workshops/mentoring-programm-2025.png',
    href: '/workshops/mentoring-programm-2025.png',
  },
];

export const reflections: ReflectionItem[] = [
  {
    id: 'reflection-1',
    quote: 'This workshop helped me feel represented and heard.',
    role: 'Participant',
  },
  {
    id: 'reflection-2',
    quote: 'Meeting mentors with similar experiences inspired me to continue.',
    role: 'Mentee',
  },
  {
    id: 'reflection-3',
    quote: 'I found practical tools for self-care and confidence in academic spaces.',
    role: 'Workshop attendee',
  },
];
