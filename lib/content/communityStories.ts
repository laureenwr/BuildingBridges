import type { LandingLocale } from '@/lib/landing/locale';

export type StoryType = 'mentor' | 'participant' | 'researcher';

export type StoryChapter = {
  num: string;
  label: string;
  period: string;
  icon: string;
  dotClass: '' | 'red' | 'amber' | 'grey' | 'sage' | 'white';
  heading: string;
  body: string;
  quote: string;
  quoteCaption: string;
  albumBg: string;
  albumDeco: string;
};

export type QuoteColorSpec = { bg: string; border: string; bar: string };

export type CommunityStoryData = {
  id: string;
  name: string;
  origin: string;
  field: string;
  type: StoryType;
  avatar: string;
  avatarBg: string;
  teaser: string;
  headline: string;
  tagline: string;
  tags: string[];
  tagStyles: ('' | 'sage' | 'amber')[];
  cardText: string;
  keyQuote: string;
  timelineDesc: string;
  chapters: StoryChapter[];
  quoteColors: QuoteColorSpec[];
  videoSrc?: string;
};

const QUOTE_COLORS: QuoteColorSpec[] = [
  { bg: 'linear-gradient(135deg,#1a0e38,#0d0a20)', border: 'rgba(145,82,255,0.25)', bar: 'linear-gradient(90deg,#9152FF,transparent)' },
  { bg: 'linear-gradient(135deg,#0d1f18,#080d0b)', border: 'rgba(107,170,138,0.2)', bar: 'linear-gradient(90deg,#6BAA8A,transparent)' },
  { bg: 'linear-gradient(135deg,#1f1400,#0d0a00)', border: 'rgba(192,136,0,0.2)', bar: 'linear-gradient(90deg,#e0a020,transparent)' },
  { bg: 'linear-gradient(135deg,#120828,#0a0514)', border: 'rgba(181,128,255,0.2)', bar: 'linear-gradient(90deg,#B580FF,transparent)' },
  { bg: 'linear-gradient(135deg,#0d1f18,#070e0b)', border: 'rgba(107,170,138,0.18)', bar: 'linear-gradient(90deg,#6BAA8A,transparent)' },
  { bg: 'linear-gradient(135deg,#1a0e38,#0d0a20)', border: 'rgba(145,82,255,0.2)', bar: 'linear-gradient(90deg,#9152FF,transparent)' },
];

const CAIRO_EN: CommunityStoryData = {
  id: 'cairo-to-charite',
  name: 'From Cairo to Charité',
  origin: 'Egypt → Berlin',
  field: 'Psychology',
  type: 'mentor',
  avatar: '🌍',
  avatarBg: 'linear-gradient(135deg,#9152FF,#6BAA8A)',
  teaser: 'She was told she would never get in. She kept the letter.',
  headline: 'From Cairo to <em>Charité</em> — Finding My Voice',
  tagline:
    "A psychology student's journey across continents, classrooms and belonging — navigating barriers with quiet determination.",
  tags: ['Psychology', 'Mentor', 'Egypt → Germany'],
  tagStyles: ['', 'sage', 'amber'],
  videoSrc: '/videos/cairo-to-charite.mp4',
  cardText:
    'Growing up in a German school in Egypt, she dreamed of studying psychology in Berlin. When a university representative told her she would never be admitted, she applied anyway — and was. She arrived late, without housing, without a credit history. She navigated lecture halls where she was one of very few students of colour. She carried the accumulated weight of small comments and large systems. And she discovered, slowly, that her bilingual background was not a burden but a gift the field desperately needed.',
  keyQuote: '"Don\'t rush to prove anything to others — do it for yourself."',
  timelineDesc: 'A journey across continents, classrooms and belonging — told as a timeline of turning points.',
  quoteColors: QUOTE_COLORS,
  chapters: [
    {
      num: '01',
      label: 'The Seed',
      period: 'Early years · Egypt',
      icon: '🌍',
      dotClass: '',
      heading: 'A German school <em>in the desert</em>',
      body: "Growing up in Egypt, she attended a German school — one of the rare windows to a world most of her peers would never see. German was not just a foreign language; it was a door. <strong>That school planted something she didn't yet have a name for</strong> — a sense that there was a place, far away, where psychology and rigour and compassion could live together.",
      quote: '',
      quoteCaption: '',
      albumBg: 'linear-gradient(160deg,#0c0428 0%,#1a0e38 40%,#0e0b1a 100%)',
      albumDeco: 'radial-gradient(circle,#9152FF,transparent 70%)',
    },
    {
      num: '02',
      label: "The Rejection That Wasn't",
      period: 'University application · Berlin visit',
      icon: '🔥',
      dotClass: 'red',
      heading: '"You\'ll never <em>get in."</em>',
      body: 'When she visited the Free University of Berlin, a representative told her directly — someone like her would never be admitted. She stood there and chose not to collapse into that sentence. <strong>She let it sit beside her, not inside her.</strong> She applied anyway. The letter of acceptance arrived months later.',
      quote: 'They told me I would never get in. I kept the letter.',
      quoteCaption: 'On the moment of admission',
      albumBg: 'linear-gradient(160deg,#1f1200 0%,#2a1a00 40%,#0d0b00 100%)',
      albumDeco: 'radial-gradient(circle,#e0a020,transparent 70%)',
    },
    {
      num: '03',
      label: 'Arriving Without a Floor',
      period: 'Arrival · Berlin, late admission',
      icon: '🏙️',
      dotClass: 'amber',
      heading: 'No housing. <em>No credit.</em>',
      body: 'She arrived in Berlin with a late admission — the housing lists already closed, the semester already beginning. No credit history meant no apartment. <strong>Those early months were made of improvisation.</strong> She learned the city through necessity, not tourism.',
      quote: '',
      quoteCaption: '',
      albumBg: 'linear-gradient(160deg,#10001f 0%,#1a0e38 40%,#080510 100%)',
      albumDeco: 'radial-gradient(circle,#9152FF,transparent 70%)',
    },
    {
      num: '04',
      label: 'The Lecture Hall',
      period: 'University · Lecture halls',
      icon: '👁️',
      dotClass: 'grey',
      heading: 'One of the only ones <em>of colour</em>',
      body: 'In the lecture hall, she was often one of very few students of colour. Once, a fellow student asked if she had come to Berlin by camel. The comment was meant lightly — it was received differently. <strong>These are the moments that accumulate.</strong> They build a low-grade weight that you carry, and slowly, imperfectly, learn to set down.',
      quote: 'The comments were small. The accumulation was not.',
      quoteCaption: '',
      albumBg: 'linear-gradient(160deg,#0a1510 0%,#0d2018 40%,#060d09 100%)',
      albumDeco: 'radial-gradient(circle,#6BAA8A,transparent 70%)',
    },
    {
      num: '05',
      label: 'The Turning',
      period: 'Turning point · Clinical work',
      icon: '🌱',
      dotClass: 'sage',
      heading: 'Bilingualism as <em>bridge, not burden</em>',
      body: 'What she had thought of as a complication — her Arabic, her Egyptian context, her non-linear route to Berlin — turned out to be a resource the field desperately needs. <strong>Working with patients in their native language is not just efficient; it is dignifying.</strong> It changes the therapeutic relationship entirely.',
      quote: '',
      quoteCaption: '',
      albumBg: 'linear-gradient(160deg,#1f1200 0%,#0d0800 40%,#0e0b1a 100%)',
      albumDeco: 'radial-gradient(circle,#e0a020,transparent 70%)',
    },
    {
      num: '06',
      label: 'The Message',
      period: 'Today · Message to others',
      icon: '✨',
      dotClass: 'white',
      heading: 'Do it <em>for yourself</em>',
      body: 'If I could speak to the person standing outside that Berlin university, I would say: <strong>the doubt you feel is real, but it is not the truth.</strong> The barriers are real, but they are not the end of the sentence. The proof, if it ever comes, is a side effect — not the purpose.',
      quote: "Don't rush to prove anything to others — do it for yourself.",
      quoteCaption: 'Closing message',
      albumBg: 'linear-gradient(160deg,#0c0428 0%,#1a0438 40%,#060410 100%)',
      albumDeco: 'radial-gradient(circle,#B580FF,transparent 70%)',
    },
  ],
};

const CAIRO_DE: CommunityStoryData = {
  ...CAIRO_EN,
  name: 'Von Kairo zur Charité',
  origin: 'Ägypten → Berlin',
  field: 'Psychologie',
  teaser: 'Man sagte ihr, sie käme nie rein. Sie behielt den Brief.',
  headline: 'Von Kairo zur <em>Charité</em> — Meine Stimme finden',
  tagline:
    'Die Reise einer Psychologiestudentin über Kontinente, Hörsäle und Zugehörigkeit — Barrieren mit stiller Entschlossenheit navigieren.',
  tags: ['Psychologie', 'Mentorin', 'Ägypten → Deutschland'],
  cardText:
    'Auf einer deutschen Schule in Ägypten träumte sie davon, in Berlin Psychologie zu studieren. Als eine Vertreterin der Universität sagte, sie werde nie angenommen, bewarb sie sich trotzdem — und wurde zugelassen. Sie kam zu spät, ohne Wohnung, ohne Kreditgeschichte. Sie navigierte Hörsäle, in denen sie zu den wenigen Studierenden of Colour gehörte. Sie trug das Gewicht kleiner Kommentare und großer Systeme. Und sie entdeckte langsam: Ihr zweisprachiger Hintergrund war keine Last, sondern ein Geschenk, das dem Feld dringend fehlte.',
  keyQuote: '"Übereile dich nicht, anderen etwas zu beweisen — mach es für dich selbst."',
  timelineDesc: 'Eine Reise über Kontinente, Hörsäle und Zugehörigkeit — als Zeitlinie der Wendepunkte erzählt.',
  chapters: [
    {
      num: '01',
      label: 'Der Same',
      period: 'Frühe Jahre · Ägypten',
      icon: '🌍',
      dotClass: '',
      heading: 'Eine deutsche Schule <em>in der Wüste</em>',
      body: 'In Ägypten besuchte sie eine deutsche Schule — ein seltenes Fenster zu einer Welt, die die meisten ihrer Mitschüler*innen nie sehen würden. Deutsch war nicht nur Fremdsprache; es war eine Tür. <strong>Diese Schule pflanzte etwas in ihr, das sie noch nicht benennen konnte</strong> — das Gefühl, es gäbe einen Ort, weit weg, an dem Psychologie, Ernsthaftigkeit und Mitgefühl zusammenleben könnten.',
      quote: '',
      quoteCaption: '',
      albumBg: CAIRO_EN.chapters[0].albumBg,
      albumDeco: CAIRO_EN.chapters[0].albumDeco,
    },
    {
      num: '02',
      label: 'Die Absage, die keine war',
      period: 'Bewerbung · Besuch in Berlin',
      icon: '🔥',
      dotClass: 'red',
      heading: '"Du wirst nie <em>angenommen."</em>',
      body: 'Als sie die Freie Universität Berlin besuchte, sagte ihr eine Vertreterin direkt — jemand wie sie werde nie zugelassen. Sie stand da und wählte, in diesem Satz nicht zusammenzubrechen. <strong>Sie ließ ihn neben sich stehen, nicht in sich.</strong> Sie bewarb sich trotzdem. Monate später kam der Zulassungsbrief.',
      quote: 'Sie sagten, ich käme nie rein. Ich habe den Brief behalten.',
      quoteCaption: 'Zum Moment der Zulassung',
      albumBg: CAIRO_EN.chapters[1].albumBg,
      albumDeco: CAIRO_EN.chapters[1].albumDeco,
    },
    {
      num: '03',
      label: 'Ankommen ohne Boden',
      period: 'Ankunft · Berlin, späte Zulassung',
      icon: '🏙️',
      dotClass: 'amber',
      heading: 'Keine Wohnung. <em>Kein Kredit.</em>',
      body: 'Sie kam mit verspäteter Zulassung in Berlin an — die Wohnungslisten waren zu, das Semester lief schon. Ohne Kreditgeschichte keine Wohnung. <strong>Die ersten Monate bestanden aus Improvisation.</strong> Sie lernte die Stadt aus der Not, nicht aus Tourismus.',
      quote: '',
      quoteCaption: '',
      albumBg: CAIRO_EN.chapters[2].albumBg,
      albumDeco: CAIRO_EN.chapters[2].albumDeco,
    },
    {
      num: '04',
      label: 'Der Hörsaal',
      period: 'Universität · Hörsäle',
      icon: '👁️',
      dotClass: 'grey',
      heading: 'Eine der wenigen <em>of Colour</em>',
      body: 'Im Hörsaal war sie oft eine von sehr wenigen Studierenden of Colour. Einmal fragte eine Kommilitonin, ob sie mit dem Kamel nach Berlin gekommen sei. Der Kommentar war leicht gemeint — anders angekommen. <strong>Solche Momente summieren sich.</strong> Sie werden zu einer Last, die man langsam, unvollkommen ablegt.',
      quote: 'Die Kommentare waren klein. Die Summe war es nicht.',
      quoteCaption: '',
      albumBg: CAIRO_EN.chapters[3].albumBg,
      albumDeco: CAIRO_EN.chapters[3].albumDeco,
    },
    {
      num: '05',
      label: 'Die Wendung',
      period: 'Wendepunkt · Klinische Arbeit',
      icon: '🌱',
      dotClass: 'sage',
      heading: 'Zweisprachigkeit als <em>Brücke, nicht Last</em>',
      body: 'Was sie als Komplikation sah — Arabisch, ägyptischer Kontext, nicht-linearer Weg nach Berlin — erwies sich als Ressource, die dem Feld fehlt. <strong>Mit Patient*innen in der Muttersprache zu arbeiten ist nicht nur effizient; es ist würdevoll.</strong> Es verändert die therapeutische Beziehung grundlegend.',
      quote: '',
      quoteCaption: '',
      albumBg: CAIRO_EN.chapters[4].albumBg,
      albumDeco: CAIRO_EN.chapters[4].albumDeco,
    },
    {
      num: '06',
      label: 'Die Botschaft',
      period: 'Heute · Botschaft an andere',
      icon: '✨',
      dotClass: 'white',
      heading: 'Tu es <em>für dich selbst</em>',
      body: 'Wenn ich zur Person vor dieser Berliner Universität sprechen könnte, würde ich sagen: <strong>Der Zweifel ist real, aber er ist nicht die Wahrheit.</strong> Die Barrieren sind real, aber nicht das Ende des Satzes. Der Beweis, falls er kommt, ist ein Nebeneffekt — nicht der Zweck.',
      quote: 'Übereile dich nicht, anderen etwas zu beweisen — mach es für dich selbst.',
      quoteCaption: 'Schlussbotschaft',
      albumBg: CAIRO_EN.chapters[5].albumBg,
      albumDeco: CAIRO_EN.chapters[5].albumDeco,
    },
  ],
};

const BERLIN_EN: CommunityStoryData = {
  id: 'finding-my-people-berlin',
  name: 'Finding My People in Berlin',
  origin: 'Berlin — Germany',
  field: 'Psychology',
  type: 'participant',
  avatar: '💜',
  avatarBg: 'linear-gradient(135deg,#7339E0,#B580FF)',
  teaser: 'She always knew she wanted to do something social. It just took time to name it.',
  headline: 'Finding My People in Berlin',
  tagline:
    'A third-semester psychology student navigating a non-diverse lecture hall, a packed calendar, and the slow work of building community on her own terms.',
  tags: ['Psychology', 'Participant', 'Berlin'],
  tagStyles: ['', 'amber', ''],
  cardText:
    'She always knew she wanted to do something social. By her teenage years, she realized it was psychology. Her parents nudged her away from social work for financial reasons, and she chose empirical grounding over pure philosophy. Now in her third semester, she is one of very few students of color in her lecture hall, and she finds support through political organizing, a mutual aid therapy circle, and suicide prevention volunteering.',
  keyQuote: '"Listen to yourself on every step of the way — and never be too scared to change."',
  timelineDesc:
    'A journey of slow decisions, political awakening, and finding community outside the classroom.',
  quoteColors: QUOTE_COLORS,
  chapters: [
    {
      num: '01',
      label: 'Always Something Social',
      period: 'Childhood and teenage years · Berlin',
      icon: '🌱',
      dotClass: '',
      heading: 'She always knew — <em>just not quite what</em>',
      body: 'From an early age she knew she wanted to do something social. Nursing, medicine, therapy — something where people matter. In her teenage years, people around her kept saying she was good at emotionally supporting others, and <strong>psychology slowly came into focus.</strong>',
      quote: '',
      quoteCaption: '',
      albumBg: 'linear-gradient(160deg,#0c0428 0%,#1a0e38 40%,#0e0b1a 100%)',
      albumDeco: 'radial-gradient(circle,#9152FF,transparent 70%)',
    },
    {
      num: '02',
      label: 'The Compromise',
      period: 'Late high school · decision time',
      icon: '⚖️',
      dotClass: 'amber',
      heading: 'Psychology as <em>compromise and conviction</em>',
      body: 'She first wanted social work, but her parents were concerned about financial precarity. She chose psychology and leaned into its empirical grounding, <strong>wanting evidence to support the political and philosophical knowledge she already carried.</strong>',
      quote: 'I wanted empirical evidence for my knowledge — philosophy alone was not enough.',
      quoteCaption: 'On choosing psychology',
      albumBg: 'linear-gradient(160deg,#1f1200 0%,#2a1a00 40%,#0d0b00 100%)',
      albumDeco: 'radial-gradient(circle,#e0a020,transparent 70%)',
    },
    {
      num: '03',
      label: 'The Lecture Hall',
      period: 'First semesters · university life',
      icon: '👁️',
      dotClass: 'grey',
      heading: 'One of the only ones <em>in the room</em>',
      body: 'At university she was often one of very few students of color. Growing up in a diverse school environment, this was a shock. She also expected more political awareness among peers and <strong>found it harder than expected to locate shared perspectives.</strong>',
      quote: '',
      quoteCaption: '',
      albumBg: 'linear-gradient(160deg,#0a1510 0%,#0d2018 40%,#060d09 100%)',
      albumDeco: 'radial-gradient(circle,#6BAA8A,transparent 70%)',
    },
    {
      num: '04',
      label: 'No Mentor in the Room',
      period: 'University · daily reality',
      icon: '🪟',
      dotClass: 'grey',
      heading: 'No professor who <em>looks like me</em>',
      body: 'In large lecture settings, she felt structurally anonymous. She had no one-on-one relationships with professors and did not see people of color among instructors, tutors, or supervisors. <strong>The distance was not personal — it was structural.</strong>',
      quote: 'No one knows my name. And even if they did, I fear that would not mean anything great.',
      quoteCaption: 'On anonymity in the lecture hall',
      albumBg: 'linear-gradient(160deg,#10001f 0%,#1a0e38 40%,#080510 100%)',
      albumDeco: 'radial-gradient(circle,#9152FF,transparent 70%)',
    },
    {
      num: '05',
      label: 'Finding Community Outside',
      period: 'Ongoing · organizing and volunteering',
      icon: '🤝',
      dotClass: 'sage',
      heading: 'Her people <em>outside the classroom</em>',
      body: 'She volunteers in digital suicide prevention, organizes politically, and attends mutual aid circles. <strong>These spaces gave her the sense of belonging she could not find in formal university structures.</strong>',
      quote: '',
      quoteCaption: '',
      albumBg: 'linear-gradient(160deg,#0a1510 0%,#0d2018 40%,#060d09 100%)',
      albumDeco: 'radial-gradient(circle,#6BAA8A,transparent 70%)',
    },
    {
      num: '06',
      label: 'The Advice',
      period: 'Today · message to others',
      icon: '✨',
      dotClass: 'white',
      heading: 'Listen to yourself <em>and allow change</em>',
      body: 'Her advice is simple: keep listening to yourself, build peer connections early, and do not fear changing direction. <strong>Passion pursued later is still better than staying in something that drains you.</strong>',
      quote: 'Listen to yourself on every step of the way — and never be too scared to change.',
      quoteCaption: 'Closing message',
      albumBg: 'linear-gradient(160deg,#0c0428 0%,#1a0438 40%,#060410 100%)',
      albumDeco: 'radial-gradient(circle,#B580FF,transparent 70%)',
    },
  ],
};

const BERLIN_DE: CommunityStoryData = {
  ...BERLIN_EN,
  name: 'Meine Menschen in Berlin finden',
  origin: 'Berlin — Deutschland',
  field: 'Psychologie',
  teaser: 'Sie wusste schon früh, dass sie etwas Soziales machen will. Es dauerte nur, bis sie es benennen konnte.',
  headline: 'Meine Menschen in Berlin finden',
  tagline:
    'Eine Psychologiestudentin im dritten Semester navigiert einen wenig diversen Hörsaal, einen vollen Kalender und die langsame Arbeit, sich Gemeinschaft in eigenen Begriffen aufzubauen.',
  tags: ['Psychologie', 'Teilnehmerin', 'Berlin'],
  cardText:
    'Sie wusste schon früh, dass sie etwas Soziales machen will. In der Jugend wurde klar: Psychologie. Die Eltern lenkten sie aus finanziellen Gründen von Sozialer Arbeit weg; sie wählte die empirische Fundierung statt reiner Philosophie. Im dritten Semester ist sie eine von wenigen Studierenden of Colour im Hörsaal und findet Halt in politischer Organisation, einem solidarischen Therapiekreis und ehrenamtlicher Suizidprävention.',
  keyQuote: '"Hör auf jedem Schritt auf dich selbst — und hab keine Angst vor Veränderung."',
  timelineDesc:
    'Eine Reise langsamer Entscheidungen, politischem Erwachen und Gemeinschaft außerhalb des Hörsaals.',
  chapters: [
    {
      num: '01',
      label: 'Immer etwas Soziales',
      period: 'Kindheit und Jugend · Berlin',
      icon: '🌱',
      dotClass: '',
      heading: 'Sie wusste es schon — <em>nur noch nicht genau was</em>',
      body: 'Schon früh wusste sie, dass sie etwas Soziales machen will. Pflege, Medizin, Therapie — irgendetwas, bei dem Menschen zählen. In der Jugend sagten ihr viele, sie könne andere emotional gut stützen, und <strong>Psychologie rückte langsam in den Fokus.</strong>',
      quote: '',
      quoteCaption: '',
      albumBg: BERLIN_EN.chapters[0].albumBg,
      albumDeco: BERLIN_EN.chapters[0].albumDeco,
    },
    {
      num: '02',
      label: 'Der Kompromiss',
      period: 'Späte Schulzeit · Entscheidungszeit',
      icon: '⚖️',
      dotClass: 'amber',
      heading: 'Psychologie als <em>Kompromiss und Überzeugung</em>',
      body: 'Zuerst wollte sie Soziale Arbeit, doch die Eltern sorgten sich um die finanzielle Absicherung. Sie wählte Psychologie und die empirische Fundierung, <strong>um das politische und philosophische Wissen, das sie schon hatte, mit Evidenz zu stützen.</strong>',
      quote: 'Ich wollte empirische Belege für mein Wissen — Philosophie allein reichte nicht.',
      quoteCaption: 'Zur Wahl der Psychologie',
      albumBg: BERLIN_EN.chapters[1].albumBg,
      albumDeco: BERLIN_EN.chapters[1].albumDeco,
    },
    {
      num: '03',
      label: 'Der Hörsaal',
      period: 'Erste Semester · Studienalltag',
      icon: '👁️',
      dotClass: 'grey',
      heading: 'Eine von wenigen <em>im Raum</em>',
      body: 'An der Uni war sie oft eine von sehr wenigen Studierenden of Colour. Aufgewachsen in einem diversen Schulumfeld, war das ein Schock. Sie erwartete mehr politisches Bewusstsein unter Kommiliton*innen und <strong>fand es schwerer als gedacht, gemeinsame Perspektiven zu finden.</strong>',
      quote: '',
      quoteCaption: '',
      albumBg: BERLIN_EN.chapters[2].albumBg,
      albumDeco: BERLIN_EN.chapters[2].albumDeco,
    },
    {
      num: '04',
      label: 'Keine Mentorin im Raum',
      period: 'Universität · Alltag',
      icon: '🪟',
      dotClass: 'grey',
      heading: 'Keine Professorin, <em>die mir ähnelt</em>',
      body: 'In großen Vorlesungen fühlte sie sich strukturell anonym. Sie hatte keine persönlichen Beziehungen zu Professor*innen und sah keine People of Colour unter Lehrenden, Tutor*innen oder Supervisor*innen. <strong>Die Distanz war nicht persönlich — sie war strukturell.</strong>',
      quote: 'Niemand kennt meinen Namen. Und selbst wenn — ich befürchte, das würde nicht viel bedeuten.',
      quoteCaption: 'Zur Anonymität im Hörsaal',
      albumBg: BERLIN_EN.chapters[3].albumBg,
      albumDeco: BERLIN_EN.chapters[3].albumDeco,
    },
    {
      num: '05',
      label: 'Gemeinschaft draußen finden',
      period: 'Laufend · Organisation und Ehrenamt',
      icon: '🤝',
      dotClass: 'sage',
      heading: 'Ihre Menschen <em>außerhalb des Hörsaals</em>',
      body: 'Sie engagiert sich in digitaler Suizidprävention, organisiert politisch und nimmt an solidarischen Therapiekreisen teil. <strong>Diese Räume gaben ihr das Gefühl von Zugehörigkeit, das die Universität ihr nicht bot.</strong>',
      quote: '',
      quoteCaption: '',
      albumBg: BERLIN_EN.chapters[4].albumBg,
      albumDeco: BERLIN_EN.chapters[4].albumDeco,
    },
    {
      num: '06',
      label: 'Der Rat',
      period: 'Heute · Botschaft an andere',
      icon: '✨',
      dotClass: 'white',
      heading: 'Auf dich hören <em>und Veränderung zulassen</em>',
      body: 'Ihr Rat ist einfach: Hör auf dich, baue früh Verbindungen zu Peers auf und hab keine Angst, die Richtung zu wechseln. <strong>Leidenschaft, die später kommt, ist besser als in etwas zu bleiben, das einen auslaugt.</strong>',
      quote: 'Hör auf jedem Schritt auf dich selbst — und hab keine Angst vor Veränderung.',
      quoteCaption: 'Schlussbotschaft',
      albumBg: BERLIN_EN.chapters[5].albumBg,
      albumDeco: BERLIN_EN.chapters[5].albumDeco,
    },
  ],
};

const MENTEE_ONE_EN: CommunityStoryData = {
  id: 'mentee-one-school-strength',
  name: 'Holding on to my own measure',
  origin: 'School · Berlin',
  field: 'Mentoring & empowerment',
  type: 'participant',
  avatar: '🌟',
  avatarBg: 'linear-gradient(135deg,#9152FF,#B580FF)',
  teaser: 'She knows her abilities — even when school does not always reflect them back.',
  headline: 'Holding on to <em>my own measure</em>',
  tagline:
    'A mentee reflects on unfair treatment at school, family support, future dreams, representation, and the practice of believing in herself.',
  tags: ['Mentee', 'School', 'Empowerment'],
  tagStyles: ['sage', '', 'amber'],
  cardText:
    'In her interview, Mentee 1 describes school as mostly manageable, but also names moments where teachers and peers make her feel unseen or unfairly judged. Instead of letting those judgments define her, she returns to what she knows about herself: her abilities, her multilingual strengths, and the support of family members who taught her not to shrink because of a name, hair colour, skin tone, migration history, or religion. Her goals are clear: finish school well, study, make her parents proud, and one day help others access education and support.',
  keyQuote: '"An erster Stelle helfe ich mir selber, an mich selbst zu glauben."',
  timelineDesc:
    'A school story about unfair treatment, family messages, future plans, representation, and self-belief.',
  quoteColors: QUOTE_COLORS,
  chapters: [
    {
      num: '01',
      label: 'School Right Now',
      period: 'Present · school everyday life',
      icon: '🏫',
      dotClass: '',
      heading: 'Doing okay — and still <em>not always seen</em>',
      body: 'She describes school as “quite okay” right now, but also names situations where she feels treated unfairly, especially by teachers and sometimes by classmates. <strong>The difficult part is not only one comment, but the pattern of being measured through assumptions instead of ability.</strong>',
      quote: 'I know my competencies, and I know what I am capable of.',
      quoteCaption: 'On trusting her own assessment',
      albumBg: 'linear-gradient(160deg,#0c0428 0%,#1a0e38 40%,#0e0b1a 100%)',
      albumDeco: 'radial-gradient(circle,#9152FF,transparent 70%)',
    },
    {
      num: '02',
      label: 'The Moving Standard',
      period: 'School · grading and feedback',
      icon: '🧭',
      dotClass: 'amber',
      heading: 'When the reasons <em>keep changing</em>',
      body: 'She describes a teacher whose feedback feels shifting and unfair: once one expectation is met, a new reason appears. The experience makes her sad because it clashes with what she knows she has given. <strong>Her response is not resignation, but a strategy: keep fighting, keep showing what she can do, and protect her own sense of worth.</strong>',
      quote: 'If I know I gave my maximum, sometimes I still have to give more than my maximum.',
      quoteCaption: 'On navigating unfair expectations',
      albumBg: 'linear-gradient(160deg,#1f1200 0%,#2a1a00 40%,#0d0b00 100%)',
      albumDeco: 'radial-gradient(circle,#e0a020,transparent 70%)',
    },
    {
      num: '03',
      label: 'Family Messages',
      period: 'Growing up · family support',
      icon: '🤲',
      dotClass: 'sage',
      heading: 'Do not let them <em>bring you down</em>',
      body: 'Support came especially from her mother and women and girls in her family, including cousins who had lived through similar experiences. Their message stayed with her: a different surname, hair colour, skin tone, culture, or religion does not make you less capable. <strong>Over time, that message shifted her priorities away from needing other people’s acceptance.</strong>',
      quote: 'Just because your surname sounds different does not mean you are worse.',
      quoteCaption: 'A family message she carries',
      albumBg: 'linear-gradient(160deg,#0a1510 0%,#0d2018 40%,#060d09 100%)',
      albumDeco: 'radial-gradient(circle,#6BAA8A,transparent 70%)',
    },
    {
      num: '04',
      label: 'Future Plans',
      period: 'Looking ahead · education and work',
      icon: '🎓',
      dotClass: '',
      heading: 'Studying, helping, <em>opening access</em>',
      body: 'Her first goal is to finish her Abitur with a very good grade and go on to study. She wants to make her parents proud and continue what migration, war, and interrupted educational paths made difficult for parts of her family. <strong>Beyond personal success, she hopes to help people who do not have the same access to education and self-development.</strong>',
      quote: 'I hope for a successful future in my field — and to help people.',
      quoteCaption: 'On why education matters',
      albumBg: 'linear-gradient(160deg,#10001f 0%,#1a0e38 40%,#080510 100%)',
      albumDeco: 'radial-gradient(circle,#9152FF,transparent 70%)',
    },
    {
      num: '05',
      label: 'Representation',
      period: 'School system · role models',
      icon: '🪞',
      dotClass: 'grey',
      heading: 'Seeing teachers who <em>reflect many realities</em>',
      body: 'When asked what should change, she names racism directly and asks for more visible diversity among teachers: different religions, cultures, skin colours, and migration histories. For her, representation is not symbolic. <strong>It helps students imagine themselves in roles that may otherwise feel far away.</strong>',
      quote: 'Children need role models they see every day.',
      quoteCaption: 'On representation in schools',
      albumBg: 'linear-gradient(160deg,#1f1200 0%,#0d0800 40%,#0e0b1a 100%)',
      albumDeco: 'radial-gradient(circle,#e0a020,transparent 70%)',
    },
    {
      num: '06',
      label: 'Self-Belief',
      period: 'Today · what keeps her strong',
      icon: '✨',
      dotClass: 'white',
      heading: 'No limits <em>before trying</em>',
      body: 'What helps her feel strong is first herself, then family, faith, important people around her, and role models beyond her immediate circle. The message she returns to is clear: believe in yourself first, set no limits too early, and keep going until you reach what matters to you.',
      quote: 'First of all, I help myself believe in myself.',
      quoteCaption: 'Closing message',
      albumBg: 'linear-gradient(160deg,#0c0428 0%,#1a0438 40%,#060410 100%)',
      albumDeco: 'radial-gradient(circle,#B580FF,transparent 70%)',
    },
  ],
};

const MENTEE_ONE_DE: CommunityStoryData = {
  ...MENTEE_ONE_EN,
  name: 'An meinem eigenen Maßstab festhalten',
  origin: 'Schule · Berlin',
  field: 'Mentoring & Empowerment',
  teaser: 'Sie kennt ihre Fähigkeiten — auch wenn Schule sie nicht immer zurückspiegelt.',
  headline: 'An meinem <em>eigenen Maßstab</em> festhalten',
  tagline:
    'Eine Mentee spricht über unfaire Behandlung in der Schule, familiären Rückhalt, Zukunftswünsche, Repräsentation und den Glauben an sich selbst.',
  tags: ['Mentee', 'Schule', 'Empowerment'],
  cardText:
    'Im Interview beschreibt Mentee 1 die Schule als grundsätzlich in Ordnung, benennt aber auch Situationen, in denen sie sich durch Lehrkräfte und Mitschüler*innen unfair behandelt oder nicht richtig gesehen fühlt. Statt diese Zuschreibungen über sich bestimmen zu lassen, hält sie an dem fest, was sie über sich weiß: ihre Kompetenzen, ihre Mehrsprachigkeit und den Rückhalt von Familienmitgliedern, die ihr früh mitgegeben haben, sich nicht wegen eines Namens, einer Haarfarbe, Hautfarbe, Migrationsgeschichte oder Religion kleiner machen zu lassen. Ihre Ziele sind klar: ein gutes Abitur, studieren, ihre Eltern stolz machen und später anderen Menschen Zugang zu Bildung und Unterstützung ermöglichen.',
  keyQuote: '"An erster Stelle helfe ich mir selber, an mich selbst zu glauben."',
  timelineDesc:
    'Eine Schulgeschichte über unfaire Behandlung, familiäre Botschaften, Zukunftspläne, Repräsentation und Selbstvertrauen.',
  chapters: [
    {
      num: '01',
      label: 'Schule gerade',
      period: 'Gegenwart · Schulalltag',
      icon: '🏫',
      dotClass: '',
      heading: 'Eigentlich okay — und trotzdem <em>nicht immer gesehen</em>',
      body: 'Sie beschreibt die Schule gerade als „ganz in Ordnung“, benennt aber auch Situationen, in denen sie sich unfair behandelt fühlt — besonders durch Lehrkräfte, manchmal auch durch Mitschüler*innen. <strong>Schwierig ist nicht nur ein einzelner Kommentar, sondern das Muster, nach Annahmen statt nach Fähigkeiten bewertet zu werden.</strong>',
      quote: 'Ich kenne meine Kompetenzen und ich weiß, wozu ich fähig bin.',
      quoteCaption: 'Über Vertrauen in die eigene Einschätzung',
      albumBg: MENTEE_ONE_EN.chapters[0].albumBg,
      albumDeco: MENTEE_ONE_EN.chapters[0].albumDeco,
    },
    {
      num: '02',
      label: 'Der bewegliche Maßstab',
      period: 'Schule · Noten und Feedback',
      icon: '🧭',
      dotClass: 'amber',
      heading: 'Wenn Begründungen <em>immer wechseln</em>',
      body: 'Sie beschreibt eine Lehrkraft, deren Rückmeldungen sich für sie verschiebend und unfair anfühlen: Wird eine Erwartung erfüllt, taucht eine neue Begründung auf. Das macht sie traurig, weil es nicht zu dem passt, was sie selbst geleistet hat. <strong>Ihre Antwort ist nicht Aufgeben, sondern eine Strategie: weiterkämpfen, weiter zeigen, was sie kann, und das eigene Wertgefühl schützen.</strong>',
      quote: 'Auch wenn ich weiß, dass ich mein Maximum gegeben habe, muss ich manchmal mehr als mein Maximum geben.',
      quoteCaption: 'Über den Umgang mit unfairen Erwartungen',
      albumBg: MENTEE_ONE_EN.chapters[1].albumBg,
      albumDeco: MENTEE_ONE_EN.chapters[1].albumDeco,
    },
    {
      num: '03',
      label: 'Familiäre Botschaften',
      period: 'Aufwachsen · Rückhalt in der Familie',
      icon: '🤲',
      dotClass: 'sage',
      heading: 'Lass dich nicht <em>runterbringen</em>',
      body: 'Unterstützung kam vor allem von ihrer Mutter und von Mädchen und Frauen in ihrer Familie, auch von Cousinen, die Ähnliches erlebt haben. Ihre Botschaft blieb: Ein anderer Nachname, eine andere Haarfarbe, Hautfarbe, Kultur oder Religion machen dich nicht schlechter. <strong>Mit der Zeit verschob diese Botschaft ihre Prioritäten weg von der Anerkennung durch andere.</strong>',
      quote: 'Nur weil du einen anderen Nachnamen hast, heißt das nicht, dass du schlechter bist.',
      quoteCaption: 'Eine familiäre Botschaft, die sie trägt',
      albumBg: MENTEE_ONE_EN.chapters[2].albumBg,
      albumDeco: MENTEE_ONE_EN.chapters[2].albumDeco,
    },
    {
      num: '04',
      label: 'Zukunftspläne',
      period: 'Blick nach vorn · Bildung und Beruf',
      icon: '🎓',
      dotClass: '',
      heading: 'Studieren, helfen, <em>Zugänge öffnen</em>',
      body: 'Ihr erstes Ziel ist, das Abitur mit einem sehr guten Schnitt zu schaffen und studieren zu können. Sie möchte ihre Eltern stolz machen und etwas fortsetzen, das Migration, Krieg und unterbrochene Bildungswege in Teilen ihrer Familie erschwert haben. <strong>Über den eigenen Erfolg hinaus möchte sie später Menschen helfen, die keinen selbstverständlichen Zugang zu Bildung und Entfaltung haben.</strong>',
      quote: 'Ich erhoffe mir eine erfolgreiche Zukunft — und Menschen helfen zu können.',
      quoteCaption: 'Warum Bildung für sie wichtig ist',
      albumBg: MENTEE_ONE_EN.chapters[3].albumBg,
      albumDeco: MENTEE_ONE_EN.chapters[3].albumDeco,
    },
    {
      num: '05',
      label: 'Repräsentation',
      period: 'Schulsystem · Vorbilder',
      icon: '🪞',
      dotClass: 'grey',
      heading: 'Lehrkräfte sehen, die <em>viele Realitäten spiegeln</em>',
      body: 'Auf die Frage, was sich ändern müsste, benennt sie Rassismus direkt und wünscht sich mehr sichtbare Vielfalt unter Lehrkräften: verschiedene Religionen, Kulturen, Hautfarben und Migrationsgeschichten. Für sie ist Repräsentation nicht nur symbolisch. <strong>Sie hilft Schüler*innen, sich selbst in Rollen vorzustellen, die sonst weit entfernt wirken können.</strong>',
      quote: 'Kinder brauchen Vorbilder, die sie täglich sehen.',
      quoteCaption: 'Über Repräsentation in Schulen',
      albumBg: MENTEE_ONE_EN.chapters[4].albumBg,
      albumDeco: MENTEE_ONE_EN.chapters[4].albumDeco,
    },
    {
      num: '06',
      label: 'Selbstvertrauen',
      period: 'Heute · was sie stark hält',
      icon: '✨',
      dotClass: 'white',
      heading: 'Keine Grenzen setzen, <em>bevor man es versucht</em>',
      body: 'Stark fühlt sie sich zuerst durch sich selbst, dann durch Familie, Religion, wichtige Menschen in ihrem Umfeld und Vorbilder außerhalb der eigenen Familie. Ihre Botschaft bleibt klar: zuerst an sich selbst glauben, sich keine Grenzen setzen und weitermachen, bis man erreicht, was einem wichtig ist.',
      quote: 'An erster Stelle helfe ich mir selber, an mich selbst zu glauben.',
      quoteCaption: 'Schlussbotschaft',
      albumBg: MENTEE_ONE_EN.chapters[5].albumBg,
      albumDeco: MENTEE_ONE_EN.chapters[5].albumDeco,
    },
  ],
};

const BTF_EN: CommunityStoryData = {
  id: 'black-therapists-fund',
  name: 'Black Therapists Fund',
  origin: 'Collective initiative · Germany',
  field: 'Psychology',
  type: 'researcher',
  avatar: '🖤',
  avatarBg: 'linear-gradient(135deg,#1A1033,#9152FF)',
  teaser: 'Care is not equally distributed — access often depends on identity, language, and privilege.',
  headline: 'Black Therapists Fund — <em>Care, Access & Structural Gaps</em>',
  tagline:
    'A collective response to a mental health system where care, representation, and cultural understanding are still exceptions rather than defaults.',
  tags: ['Psychology', 'Collective initiative', 'Access & care'],
  tagStyles: ['', 'sage', 'amber'],
  cardText:
    'A collective initiative responding to a system where access to therapy often depends on identity, language, and privilege rather than need. Across training and practice, Black therapists and therapists of color named what was missing in the room — and built the Black Therapists Fund as both financial support and structural critique.',
  keyQuote: '"Care should not depend on access luck."',
  timelineDesc:
    'From absence in the training room to collective care — six chapters on representation, access, and the Black Therapists Fund.',
  quoteColors: QUOTE_COLORS,
  chapters: [
    {
      num: '01',
      label: 'The Absence in the Room',
      period: 'Training · lecture halls & clinics',
      icon: '🪞',
      dotClass: '',
      heading: 'A profession <em>without mirrors</em>',
      body: 'In psychology training spaces, the absence was not always spoken — it was visible. In lecture halls, supervision rooms, and clinical settings, Black therapists and therapists of color were often missing entirely. <strong>For those entering the field, this absence became part of the learning experience itself:</strong> not just studying psychology, but studying who psychology is built for.',
      quote: '',
      quoteCaption: '',
      albumBg: 'linear-gradient(160deg,#0c0428 0%,#1a0e38 40%,#0e0b1a 100%)',
      albumDeco: 'radial-gradient(circle,#9152FF,transparent 70%)',
    },
    {
      num: '02',
      label: 'The Question That Repeats',
      period: 'Training & practice · across settings',
      icon: '❓',
      dotClass: 'grey',
      heading: 'Who is therapy <em>actually for?</em>',
      body: 'Across training, practice, and lived experience, the same pattern emerged again and again: patients and trainees encountering systems that do not fully reflect their realities. <strong>Racism, migration, and structural inequality were often present in clients’ lives</strong> — but not consistently present in the curriculum meant to prepare therapists to work with them.',
      quote: 'Who is therapy actually for?',
      quoteCaption: 'The question that kept returning',
      albumBg: 'linear-gradient(160deg,#0a1510 0%,#0d2018 40%,#060d09 100%)',
      albumDeco: 'radial-gradient(circle,#6BAA8A,transparent 70%)',
    },
    {
      num: '03',
      label: 'The Gap Becomes Visible',
      period: 'Collective observation · access & representation',
      icon: '👁️',
      dotClass: 'amber',
      heading: 'When experience <em>meets system</em>',
      body: 'The idea for the Black Therapists Fund did not emerge from theory alone. It emerged from repetition: noticing who could access therapy, who could not, and who was expected to bridge the gap without support. <strong>Financial barriers, cultural mismatch, and lack of representation created a pattern that could not be ignored.</strong>',
      quote: '',
      quoteCaption: '',
      albumBg: 'linear-gradient(160deg,#1f1200 0%,#2a1a00 40%,#0d0b00 100%)',
      albumDeco: 'radial-gradient(circle,#e0a020,transparent 70%)',
    },
    {
      num: '04',
      label: 'A Form of Response',
      period: 'Black Therapists Fund · care & critique',
      icon: '🤝',
      dotClass: 'sage',
      heading: 'Support and critique <em>at once</em>',
      body: 'The Black Therapists Fund functions in two directions at once: it provides financial and structural support for access to therapy and training, and it simultaneously questions why such a fund is necessary in the first place. <strong>It is both care and critique — built inside the system it is responding to.</strong>',
      quote: 'It is both care and critique — built inside the system it is responding to.',
      quoteCaption: 'On the fund’s dual role',
      albumBg: 'linear-gradient(160deg,#10001f 0%,#1a0e38 40%,#080510 100%)',
      albumDeco: 'radial-gradient(circle,#9152FF,transparent 70%)',
    },
    {
      num: '05',
      label: 'What Changes When You Are Seen',
      period: 'Therapy · recognition in practice',
      icon: '🌱',
      dotClass: 'sage',
      heading: 'Therapy as <em>recognition</em>',
      body: 'Across the conversations, one idea returns: being understood without explanation changes what therapy feels like. Not having to translate your background. Not having to justify your context. Not having to shrink parts of yourself to be understood. <strong>Representation becomes not symbolic — but clinical, emotional, and practical.</strong>',
      quote: 'Being understood without explanation changes what therapy feels like.',
      quoteCaption: 'On representation in care',
      albumBg: 'linear-gradient(160deg,#0a1510 0%,#0d2018 40%,#060d09 100%)',
      albumDeco: 'radial-gradient(circle,#6BAA8A,transparent 70%)',
    },
    {
      num: '06',
      label: 'The Message Forward',
      period: 'Today · structural question',
      icon: '✨',
      dotClass: 'white',
      heading: 'Care should not depend <em>on access luck</em>',
      body: 'The Black Therapists Fund raises a simple but structural question: what would mental health care look like if access, representation, and cultural understanding were not exceptions, but defaults? <strong>Until then, collective care becomes both necessity and resistance.</strong>',
      quote: 'Care should not depend on access luck.',
      quoteCaption: 'Closing message',
      albumBg: 'linear-gradient(160deg,#0c0428 0%,#1a0438 40%,#060410 100%)',
      albumDeco: 'radial-gradient(circle,#B580FF,transparent 70%)',
    },
  ],
};

const BTF_DE: CommunityStoryData = {
  ...BTF_EN,
  name: 'Black Therapists Fund',
  origin: 'Kollektive Initiative · Deutschland',
  field: 'Psychologie',
  teaser: 'Versorgung ist nicht gleich verteilt — Zugang hängt oft von Identität, Sprache und Privileg ab.',
  headline: 'Black Therapists Fund — <em>Versorgung, Zugang & strukturelle Lücken</em>',
  tagline:
    'Eine kollektive Antwort auf ein System, in dem Versorgung, Repräsentation und kulturelles Verstehen noch Ausnahmen sind — nicht Standard.',
  tags: ['Psychologie', 'Kollektive Initiative', 'Zugang & Versorgung'],
  cardText:
    'Eine kollektive Initiative als Antwort auf ein System, in dem Therapiezugang oft von Identität, Sprache und Privileg abhängt — nicht vom Bedarf. In Ausbildung und Praxis benannten Schwarze Therapeut*innen und Therapeut*innen of Colour, was im Raum fehlte — und schufen den Black Therapists Fund als finanzielle Unterstützung und strukturelle Kritik zugleich.',
  keyQuote: '"Versorgung sollte nicht vom Zugangsglück abhängen."',
  timelineDesc:
    'Von der Abwesenheit im Hörsaal zur kollektiven Versorgung — sechs Kapitel zu Repräsentation, Zugang und dem Black Therapists Fund.',
  chapters: [
    {
      num: '01',
      label: 'Die Abwesenheit im Raum',
      period: 'Ausbildung · Hörsäle & Klinik',
      icon: '🪞',
      dotClass: '',
      heading: 'Ein Beruf <em>ohne Spiegel</em>',
      body: 'In psychologischen Ausbildungsräumen wurde die Abwesenheit nicht immer ausgesprochen — sie war sichtbar. In Hörsälen, Supervision und Klinik fehlten Schwarze Therapeut*innen und Therapeut*innen of Colour oft vollständig. <strong>Für Einsteigende wurde diese Abwesenheit Teil des Lernens selbst:</strong> nicht nur Psychologie studieren, sondern studieren, für wen Psychologie gebaut ist.',
      quote: '',
      quoteCaption: '',
      albumBg: BTF_EN.chapters[0].albumBg,
      albumDeco: BTF_EN.chapters[0].albumDeco,
    },
    {
      num: '02',
      label: 'Die Frage, die wiederkehrt',
      period: 'Ausbildung & Praxis · überall',
      icon: '❓',
      dotClass: 'grey',
      heading: 'Für wen ist Therapie <em>wirklich da?</em>',
      body: 'In Ausbildung, Praxis und gelebter Erfahrung zeigte sich immer wieder dasselbe Muster: Patient*innen und Auszubildende treffen auf Systeme, die ihre Realitäten nicht vollständig abbilden. <strong>Rassismus, Migration und strukturelle Ungleichheit waren im Leben von Klient*innen oft präsent</strong> — im Curriculum, das Therapeut*innen vorbereiten soll, nicht konsequent.',
      quote: 'Für wen ist Therapie wirklich da?',
      quoteCaption: 'Die Frage, die immer wieder auftauchte',
      albumBg: BTF_EN.chapters[1].albumBg,
      albumDeco: BTF_EN.chapters[1].albumDeco,
    },
    {
      num: '03',
      label: 'Die Lücke wird sichtbar',
      period: 'Kollektive Beobachtung · Zugang & Repräsentation',
      icon: '👁️',
      dotClass: 'amber',
      heading: 'Wenn Erfahrung <em>auf System trifft</em>',
      body: 'Die Idee für den Black Therapists Fund entstand nicht nur aus Theorie. Sie entstand aus Wiederholung: Wer konnte Therapie nutzen, wer nicht — und wer sollte die Lücke ohne Unterstützung überbrücken? <strong>Finanzielle Barrieren, kulturelle Passung und fehlende Repräsentation bildeten ein Muster, das nicht ignoriert werden konnte.</strong>',
      quote: '',
      quoteCaption: '',
      albumBg: BTF_EN.chapters[2].albumBg,
      albumDeco: BTF_EN.chapters[2].albumDeco,
    },
    {
      num: '04',
      label: 'Eine Form der Antwort',
      period: 'Black Therapists Fund · Versorgung & Kritik',
      icon: '🤝',
      dotClass: 'sage',
      heading: 'Unterstützung und Kritik <em>zugleich</em>',
      body: 'Der Black Therapists Fund wirkt in zwei Richtungen: Er bietet finanzielle und strukturelle Unterstützung für Zugang zu Therapie und Ausbildung — und fragt zugleich, warum ein solcher Fonds überhaupt nötig ist. <strong>Er ist Versorgung und Kritik — gebaut im System, auf das er antwortet.</strong>',
      quote: 'Er ist Versorgung und Kritik — gebaut im System, auf das er antwortet.',
      quoteCaption: 'Zur doppelten Rolle des Fonds',
      albumBg: BTF_EN.chapters[3].albumBg,
      albumDeco: BTF_EN.chapters[3].albumDeco,
    },
    {
      num: '05',
      label: 'Was sich ändert, wenn du gesehen wirst',
      period: 'Therapie · Anerkennung in der Praxis',
      icon: '🌱',
      dotClass: 'sage',
      heading: 'Therapie als <em>Anerkennung</em>',
      body: 'In den Gesprächen kehrt eine Idee zurück: Verstanden werden ohne Erklärung verändert, wie Therapie sich anfühlt. Nicht den eigenen Hintergrund übersetzen müssen. Den eigenen Kontext nicht rechtfertigen müssen. Nicht Teile von sich verkleinern, um verstanden zu werden. <strong>Repräsentation wird nicht symbolisch — sondern klinisch, emotional und praktisch.</strong>',
      quote: 'Verstanden werden ohne Erklärung verändert, wie Therapie sich anfühlt.',
      quoteCaption: 'Zur Repräsentation in der Versorgung',
      albumBg: BTF_EN.chapters[4].albumBg,
      albumDeco: BTF_EN.chapters[4].albumDeco,
    },
    {
      num: '06',
      label: 'Die Botschaft nach vorn',
      period: 'Heute · strukturelle Frage',
      icon: '✨',
      dotClass: 'white',
      heading: 'Versorgung soll nicht vom <em>Zugangsglück</em> abhängen',
      body: 'Der Black Therapists Fund stellt eine einfache, aber strukturelle Frage: Wie sähe psychische Versorgung aus, wenn Zugang, Repräsentation und kulturelles Verstehen nicht Ausnahmen, sondern Standard wären? <strong>Bis dahin ist kollektive Versorgung zugleich Notwendigkeit und Widerstand.</strong>',
      quote: 'Versorgung sollte nicht vom Zugangsglück abhängen.',
      quoteCaption: 'Schlussbotschaft',
      albumBg: BTF_EN.chapters[5].albumBg,
      albumDeco: BTF_EN.chapters[5].albumDeco,
    },
  ],
};

const ALL_STORIES_EN: CommunityStoryData[] = [CAIRO_EN, BERLIN_EN, MENTEE_ONE_EN, BTF_EN];
const ALL_STORIES_DE: CommunityStoryData[] = [CAIRO_DE, BERLIN_DE, MENTEE_ONE_DE, BTF_DE];

export function getAllCommunityStories(locale: LandingLocale): CommunityStoryData[] {
  return locale === 'de' ? ALL_STORIES_DE : ALL_STORIES_EN;
}

export function getCommunityStoryById(locale: LandingLocale, id: string): CommunityStoryData | undefined {
  return getAllCommunityStories(locale).find((s) => s.id === id);
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

const APPROVED_ALBUM = [
  { bg: 'linear-gradient(160deg,#0c0428 0%,#1a0e38 40%,#0e0b1a 100%)', deco: 'radial-gradient(circle,#9152FF,transparent 70%)' },
  { bg: 'linear-gradient(160deg,#0d1f18 0%,#082016 40%,#070e0b 100%)', deco: 'radial-gradient(circle,#6BAA8A,transparent 70%)' },
  { bg: 'linear-gradient(160deg,#1f1400 0%,#2a1a00 40%,#0d0b00 100%)', deco: 'radial-gradient(circle,#e0a020,transparent 70%)' },
];

export function mapApprovedStoryToCommunityStory(story: {
  id: number;
  title: string;
  summary: string;
  empowermentMessage: string;
  timeline: { label: string; text: string; quote: string; icon: string }[];
  quotes: { label: string; text: string }[];
}): CommunityStoryData {
  const chaptersSource =
    story.timeline.length > 0
      ? story.timeline
      : [{ label: 'Story', text: story.summary, quote: story.quotes[0]?.text ?? '', icon: '📖' }];

  const chapters: StoryChapter[] = chaptersSource.map((chapter, index) => {
    const album = APPROVED_ALBUM[index % APPROVED_ALBUM.length];
    return {
      num: String(index + 1).padStart(2, '0'),
      label: chapter.label || `Chapter ${index + 1}`,
      period: chapter.label || `Chapter ${index + 1}`,
      icon: chapter.icon || '📖',
      dotClass: index === 0 ? '' : 'sage',
      heading: escapeHtml(chapter.label || story.title),
      body: escapeHtml(chapter.text || story.summary),
      quote: chapter.quote || story.quotes[index]?.text || '',
      quoteCaption: '',
      albumBg: album.bg,
      albumDeco: album.deco,
    };
  });

  if (story.empowermentMessage) {
    chapters.push({
      num: String(chapters.length + 1).padStart(2, '0'),
      label: 'Empowerment',
      period: 'Closing',
      icon: '✨',
      dotClass: 'white',
      heading: 'Empowerment',
      body: escapeHtml(story.empowermentMessage),
      quote: '',
      quoteCaption: '',
      albumBg: APPROVED_ALBUM[0].bg,
      albumDeco: APPROVED_ALBUM[0].deco,
    });
  }

  return {
    id: `submitted-${story.id}`,
    name: story.title,
    origin: 'Community submission',
    field: 'Co-Creation',
    type: 'participant',
    avatar: '✍️',
    avatarBg: 'linear-gradient(135deg,#9152FF,#6BAA8A)',
    teaser: story.summary,
    headline: escapeHtml(story.title),
    tagline: story.summary,
    tags: ['Community', 'Co-Creation', 'Participant'],
    tagStyles: ['', 'sage', 'amber'],
    cardText: story.summary,
    keyQuote: story.quotes[0]?.text || story.empowermentMessage || story.summary,
    timelineDesc: story.summary,
    chapters,
    quoteColors: QUOTE_COLORS,
  };
}

export function stripHtml(html: string): string {
  return html.replace(/<[^>]+>/g, '');
}

export type GlobeStop = {
  lat: number;
  lng: number;
  color: number;
};

const GLOBE_COLORS = [0x6baa8a, 0xb580ff, 0x9152ff, 0x6baa8a, 0xb580ff, 0x6baa8a];

const GLOBE_COORDS: Record<string, { lat: number; lng: number }[]> = {
  'cairo-to-charite': [
    { lat: 30.04, lng: 31.24 },
    { lat: 52.455, lng: 13.295 },
    { lat: 52.52, lng: 13.405 },
    { lat: 52.448, lng: 13.29 },
    { lat: 52.526, lng: 13.378 },
    { lat: 52.51, lng: 13.41 },
  ],
  'finding-my-people-berlin': [
    { lat: 52.52, lng: 13.405 },
    { lat: 52.49, lng: 13.39 },
    { lat: 52.448, lng: 13.29 },
    { lat: 52.51, lng: 13.38 },
    { lat: 52.53, lng: 13.42 },
    { lat: 52.52, lng: 13.41 },
  ],
  'mentee-one-school-strength': [
    { lat: 52.52, lng: 13.405 },
    { lat: 52.51, lng: 13.39 },
    { lat: 52.53, lng: 13.38 },
    { lat: 52.49, lng: 13.42 },
    { lat: 52.47, lng: 13.35 },
    { lat: 52.52, lng: 13.41 },
  ],
  'black-therapists-fund': [
    { lat: 52.52, lng: 13.405 },
    { lat: 50.11, lng: 8.68 },
    { lat: 48.14, lng: 11.58 },
    { lat: 53.55, lng: 9.99 },
    { lat: 52.52, lng: 13.38 },
    { lat: 52.51, lng: 13.41 },
  ],
};

export function getGlobeStops(storyId: string, chapterCount: number): GlobeStop[] {
  const coords = GLOBE_COORDS[storyId];
  return Array.from({ length: chapterCount }, (_, i) => ({
    lat: coords?.[i]?.lat ?? 52.52 + (i - 2) * 0.03,
    lng: coords?.[i]?.lng ?? 13.4 + (i - 2) * 0.025,
    color: GLOBE_COLORS[i % GLOBE_COLORS.length],
  }));
}
