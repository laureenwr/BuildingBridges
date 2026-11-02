// verify before launch
// Germany only. Update these lines here if the numbers change. Do not add other numbers in code.
export const STORY_DANGER_HELP = {
  telefonseelsorgePrimary: '0800 111 0 111',
  telefonseelsorgeAlternate: '0800 111 0 222',
  nummerGegenKummer: '116 111',
} as const;

const DANGER_PHRASES = [
  'kill myself',
  'killing myself',
  'end my life',
  'take my life',
  'want to die',
  'wanna die',
  'suicidal',
  'suicide',
  'self-harm',
  'self harm',
  'hurt myself',
  'harm myself',
  'cut myself',
  "don't want to live",
  'do not want to live',
  'i am in danger',
  "i'm in danger",
  'someone is hurting me',
  'ich will sterben',
  'ich möchte sterben',
  'will nicht mehr leben',
  'möchte nicht mehr leben',
  'bringe mich um',
  'bring mich um',
  'mich umbringen',
  'selbstmord',
  'suizid',
  'suizidal',
  'selbstverletzung',
  'selbst verletzen',
  'mich verletzen',
  'ich bin in gefahr',
  'jemand tut mir weh',
];

function normalizeDangerText(text: string) {
  return text
    .toLowerCase()
    .replace(/[’‘]/g, "'")
    .replace(/\s+/g, ' ')
    .trim();
}

export function matchesStoryDanger(text: string) {
  const value = normalizeDangerText(text);
  if (!value) return false;
  return DANGER_PHRASES.some((phrase) => value.includes(phrase));
}

export function storyDangerReply(locale: 'en' | 'de') {
  const primary = STORY_DANGER_HELP.telefonseelsorgePrimary;
  const alternate = STORY_DANGER_HELP.telefonseelsorgeAlternate;
  const youth = STORY_DANGER_HELP.nummerGegenKummer;

  if (locale === 'de') {
    return `Danke, dass du das sagst. Ich pausiere die Story hier. Du musst nicht weitermachen. Hilfe ist da, und du kannst mit einer Person sprechen, der du vertraust. Die Telefonseelsorge ist kostenlos und rund um die Uhr erreichbar: ${primary} oder ${alternate}. Für junge Menschen gibt es die Nummer gegen Kummer: ${youth}. Dein Entwurf bleibt gespeichert. Du kannst ihn bearbeiten, zurückgehen oder gehen. Es wurde nichts eingereicht.`;
  }

  return `Thank you for telling me. I am pausing the story here. You do not have to keep going. Support is available, and you can talk to someone you trust. In Germany, Telefonseelsorge is free and open 24 hours on ${primary} or ${alternate}. Young people can call Nummer gegen Kummer on ${youth}. Your draft is still saved. You can edit it, go back, or leave. Nothing has been submitted.`;
}
