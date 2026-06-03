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

const ALL_STORIES_EN: CommunityStoryData[] = [CAIRO_EN, BERLIN_EN, BTF_EN];
const ALL_STORIES_DE: CommunityStoryData[] = [CAIRO_DE, BERLIN_DE, BTF_DE];

export function getAllCommunityStories(locale: LandingLocale): CommunityStoryData[] {
  return locale === 'de' ? ALL_STORIES_DE : ALL_STORIES_EN;
}

export function getCommunityStoryById(locale: LandingLocale, id: string): CommunityStoryData | undefined {
  return getAllCommunityStories(locale).find((s) => s.id === id);
}

export function stripHtml(html: string): string {
  return html.replace(/<[^>]+>/g, '');
}
