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

const ALL_STORIES_EN: CommunityStoryData[] = [CAIRO_EN];
const ALL_STORIES_DE: CommunityStoryData[] = [CAIRO_DE];

export function getAllCommunityStories(locale: LandingLocale): CommunityStoryData[] {
  return locale === 'de' ? ALL_STORIES_DE : ALL_STORIES_EN;
}

export function getCommunityStoryById(locale: LandingLocale, id: string): CommunityStoryData | undefined {
  return getAllCommunityStories(locale).find((s) => s.id === id);
}

export function stripHtml(html: string): string {
  return html.replace(/<[^>]+>/g, '');
}
