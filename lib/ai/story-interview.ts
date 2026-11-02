import { openStoryAiClient } from '@/lib/ai/story-ai-client';
import { storyInterviewSystemPrompt } from '@/lib/ai/story-interview-prompt';
import { matchesStoryDanger, storyDangerReply } from '@/lib/ai/story-interview-safety';

export type InterviewMessage = {
  role: 'assistant' | 'user';
  content: string;
};

export type InterviewAction = 'start' | 'reply' | 'skip' | 'finish';

export type InterviewTurnResult = {
  reply: string;
  done: boolean;
  paused?: boolean;
  transcript: string;
  source: 'ai' | 'scripted';
};

export type InterviewReplyKind = 'decline' | 'stop' | 'yes' | 'topic' | 'content';

const MAX_MESSAGES = 20;
const MAX_MESSAGE_CHARS = 2000;
const MIN_ANSWERS_TO_FINISH = 2;
const AI_TIMEOUT_MS = 20_000;
const AI_MAX_TOKENS = 280;
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000;
const RATE_LIMIT_MAX = 30;

const rateBuckets = new Map<string, { count: number; windowStart: number }>();

const SCRIPT = {
  en: {
    welcome:
      'I can ask a few gentle questions to help you draft your story. Skip anything you do not want to share. You stay in control, and nothing is published until you submit it for human review.',
    questions: [
      'Would you like to share an experience, a mentoring story, or something about mental health and empowerment? You can also say no.',
      'Where and when did this take place? You can stay as general as you like.',
      'What happened? Share only what feels okay. You can skip anything sensitive.',
      'What would you like others to know? What helped you?',
      'Is there anything else you want to add before we turn this into a story draft?',
    ],
    whichKind:
      'Glad you want to share. Would it be an experience, a mentoring story, or something about mental health and empowerment?',
    declinedOffer:
      'That is completely okay. You do not have to share a story. Would you like to try a different topic, or stop here?',
    declinedClose:
      'Thank you. We will stop here. Nothing has been published. You can come back anytime if you want to share later.',
    skipAck: 'That is completely fine. We can leave that part out.',
    closing:
      'Thank you. I have enough to turn this conversation into a story draft. You can still edit it before review.',
    emptyFinish:
      'Please share at least a little of your story, or skip back and type a short answer, before we continue.',
  },
  de: {
    welcome:
      'Ich kann dir ein paar behutsame Fragen stellen, um deine Story zu entwerfen. Überspringe alles, was du nicht teilen möchtest. Du behältst die Kontrolle, und nichts wird veröffentlicht, bevor du es zur menschlichen Prüfung einreichst.',
    questions: [
      'Möchtest du eine Erfahrung, eine Mentoring-Story oder etwas zu psychischer Gesundheit und Empowerment teilen? Du kannst auch nein sagen.',
      'Wo und wann hat das stattgefunden? Du kannst so allgemein bleiben, wie du möchtest.',
      'Was ist passiert? Teile nur, was sich okay anfühlt. Sensibles kannst du überspringen.',
      'Was sollten andere wissen? Was hat dir geholfen?',
      'Möchtest du noch etwas ergänzen, bevor wir daraus einen Story-Entwurf machen?',
    ],
    whichKind:
      'Schön, dass du teilen möchtest. Soll es eine Erfahrung, eine Mentoring-Story oder etwas zu psychischer Gesundheit und Empowerment sein?',
    declinedOffer:
      'Das ist völlig in Ordnung. Du musst keine Story teilen. Möchtest du ein anderes Thema versuchen, oder hier aufhören?',
    declinedClose:
      'Danke. Wir hören hier auf. Es wurde nichts veröffentlicht. Du kannst jederzeit wiederkommen, wenn du später teilen möchtest.',
    skipAck: 'Das ist völlig in Ordnung. Diesen Teil lassen wir aus.',
    closing:
      'Danke. Damit kann ich aus dem Gespräch einen Story-Entwurf machen. Du kannst ihn vor der Prüfung noch bearbeiten.',
    emptyFinish:
      'Bitte teile zumindest ein wenig deiner Geschichte, oder gehe zurück und schreibe eine kurze Antwort, bevor wir weitergehen.',
  },
} as const;

function getCopy(locale: 'en' | 'de') {
  return SCRIPT[locale];
}

function logInterviewFallback() {
  console.error('Story interview fallback used');
}

function devLogAiCall(details: {
  status: number | null;
  errorType: string | null;
  replyEmpty: boolean;
  parseFailed: boolean;
  ms: number;
}) {
  if (process.env.NODE_ENV !== 'development') return;
  const status = details.status === null ? 'none' : String(details.status);
  const errorType = details.errorType ?? 'none';
  console.error(
    `Story interview AI call: status=${status} errorType=${errorType} replyEmpty=${details.replyEmpty} parseFailed=${details.parseFailed} ms=${details.ms}`
  );
}

function safeErrorToken(value: unknown) {
  return typeof value === 'string' && /^[A-Za-z0-9_.:-]{1,80}$/.test(value) ? value : null;
}

function aiCallErrorFacts(error: unknown) {
  if (!error || typeof error !== 'object') return { status: null as number | null, errorType: 'unknown' };
  const record = error as {
    status?: unknown;
    name?: unknown;
    type?: unknown;
    code?: unknown;
    error?: { type?: unknown; code?: unknown };
  };
  const status = typeof record.status === 'number' ? record.status : null;
  const errorType =
    safeErrorToken(record.name) ||
    safeErrorToken(record.code) ||
    safeErrorToken(record.type) ||
    safeErrorToken(record.error?.code) ||
    safeErrorToken(record.error?.type) ||
    'unknown';
  return { status, errorType };
}

function inspectAiReply(raw: string | null | undefined) {
  const text = raw?.trim() ?? '';
  if (!text) return { replyEmpty: true, parseFailed: false };
  const unfenced = text
    .replace(/^```(?:json)?\s*/i, '')
    .replace(/\s*```$/i, '')
    .trim();
  if (!unfenced) return { replyEmpty: true, parseFailed: false };
  try {
    const parsed = JSON.parse(unfenced) as { reply?: unknown };
    const reply =
      parsed && typeof parsed === 'object' && typeof parsed.reply === 'string' ? parsed.reply.trim() : '';
    return { replyEmpty: false, parseFailed: !reply };
  } catch {
    return { replyEmpty: false, parseFailed: true };
  }
}

export function parseInterviewModelContent(raw: string): { reply: string; done: boolean } | null {
  const trimmed = raw.trim();
  if (!trimmed) return null;

  const unfenced = trimmed
    .replace(/^```(?:json)?\s*/i, '')
    .replace(/\s*```$/i, '')
    .trim();

  try {
    const parsed = JSON.parse(unfenced) as { reply?: unknown; done?: unknown };
    if (parsed && typeof parsed === 'object') {
      const reply = typeof parsed.reply === 'string' ? parsed.reply.trim() : '';
      if (reply) return { reply, done: Boolean(parsed.done) };
    }
  } catch {
    // The model returned plain text. Use it as the reply.
  }

  if (!unfenced) return null;
  return { reply: unfenced, done: false };
}

export function resetStoryInterviewRateLimitForTests() {
  rateBuckets.clear();
}

export function consumeStoryInterviewRateLimit(userId: string, now = Date.now()): { status: 200 | 429 } {
  const key = String(userId);
  const bucket = rateBuckets.get(key);
  if (!bucket || now - bucket.windowStart >= RATE_LIMIT_WINDOW_MS) {
    rateBuckets.set(key, { count: 1, windowStart: now });
    return { status: 200 };
  }
  if (bucket.count >= RATE_LIMIT_MAX) return { status: 429 };
  bucket.count += 1;
  return { status: 200 };
}

export function sanitizeInterviewMessages(raw: unknown): InterviewMessage[] {
  if (!Array.isArray(raw)) return [];
  const cleaned: InterviewMessage[] = [];
  for (const item of raw.slice(-MAX_MESSAGES)) {
    if (!item || typeof item !== 'object') continue;
    const role = (item as { role?: unknown }).role;
    const content = (item as { content?: unknown }).content;
    if ((role !== 'assistant' && role !== 'user') || typeof content !== 'string') continue;
    const text = content.trim().slice(0, MAX_MESSAGE_CHARS);
    if (!text) continue;
    cleaned.push({ role, content: text });
  }
  return cleaned;
}

export function buildInterviewTranscript(messages: InterviewMessage[]): string {
  const lines: string[] = [];
  let pendingQuestion = '';
  const answers: string[] = [];

  for (const message of messages) {
    if (message.role === 'assistant') {
      pendingQuestion = message.content;
      continue;
    }
    lines.push(`Interviewer: ${pendingQuestion || '…'}`);
    lines.push(`Interviewee: ${message.content}`);
    lines.push('');
    answers.push(message.content);
    pendingQuestion = '';
  }

  if (answers.length === 0) return '';
  return `${lines.join('\n').trim()}\n\n---\n\n${answers.join('\n\n')}`;
}

function countUserAnswers(messages: InterviewMessage[]) {
  return messages.filter((message) => message.role === 'user').length;
}

function lastUserText(messages: InterviewMessage[]) {
  for (let index = messages.length - 1; index >= 0; index -= 1) {
    if (messages[index]!.role === 'user') return messages[index]!.content;
  }
  return '';
}

export function classifyInterviewReply(text: string): InterviewReplyKind {
  const value = text.trim().toLowerCase();
  if (!value) return 'content';

  if (
    /\b(stop|stopp|i('?m| am) done|ich bin fertig|nicht weitermachen|möchte nicht weitermachen|moechte nicht weitermachen|aufhören|nicht weiter|end (the )?interview)\b/.test(
      value
    )
  ) {
    return 'stop';
  }

  const shortDecline =
    /^(no|nope|nah|nein|nee|n[öo]|no thanks|no thank you|not really|lieber nicht|keine lust|nichts|nothing)$/i.test(
      value
    );
  const phraseDecline =
    /\b(i don'?t want|do not want|don'?t want to share|nothing to share|möchte nicht|will nicht|nichts teilen|kein interesse|lieber nicht teilen|not sharing)\b/.test(
      value
    );
  const hasStoryIntent =
    /\b(yes|ja|experience|story|mentoring|awareness|empowerment|mental|gesundheit|erfahrung|geschichte)\b/.test(
      value
    );

  if ((shortDecline || phraseDecline) && !hasStoryIntent) {
    return 'decline';
  }

  if (/^(yes|yeah|yep|ja|gern|gerne|okay|ok)$/i.test(value)) {
    return 'yes';
  }

  if (
    /\b(experience|mentoring|awareness|empowerment|mental health|erfahrung|mentoring-story|awareness|empowerment|psychische)\b/.test(
      value
    )
  ) {
    return 'topic';
  }

  return 'content';
}

function countsAsScriptedAnswer(text: string) {
  const kind = classifyInterviewReply(text);
  return kind === 'content' || kind === 'topic';
}

function countScriptedAnswers(messages: InterviewMessage[]) {
  return messages.filter((message) => message.role === 'user' && countsAsScriptedAnswer(message.content)).length;
}

function declineCount(messages: InterviewMessage[]) {
  return messages.filter(
    (message) =>
      message.role === 'user' &&
      (classifyInterviewReply(message.content) === 'decline' ||
        classifyInterviewReply(message.content) === 'stop')
  ).length;
}

function userWantsToStop(messages: InterviewMessage[]) {
  const last = classifyInterviewReply(lastUserText(messages));
  if (last === 'stop') return true;
  return last === 'decline' && declineCount(messages) >= 2;
}

function countLanguageMarks(text: string, pattern: RegExp) {
  return text.match(pattern)?.length ?? 0;
}

export function localeFromLatestMessage(pageLocale: 'en' | 'de', text: string): 'en' | 'de' {
  const value = text.trim().toLowerCase();
  if (!value) return pageLocale;
  if (/[äöüß]/.test(value)) return 'de';
  const german = countLanguageMarks(
    value,
    /\b(ich|nicht|möchte|moechte|kein|keine|nichts|aufhören|aufhoeren|weitermachen|bitte|danke|und|eine|einen|ist|sind|mein|meine|für|fuer|dass|schon|auch|oder|hier|nein|nee|ja|fertig|stopp|wir|du|dir|dich)\b/g
  );
  const english = countLanguageMarks(
    value,
    /\b(i|i'm|im|don't|dont|not|stop|done|want|share|please|yes|no|nothing|the|and|was|were|my|me)\b/g
  );
  if (german > english) return 'de';
  if (english > german) return 'en';
  return pageLocale;
}

export function scriptedInterviewTurn(
  locale: 'en' | 'de',
  action: InterviewAction,
  messages: InterviewMessage[]
): InterviewTurnResult {
  const copy = getCopy(localeFromLatestMessage(locale, lastUserText(messages)));
  const answers = countUserAnswers(messages);
  const answered = countScriptedAnswers(messages);
  const transcript = buildInterviewTranscript(messages);
  const lastKind = classifyInterviewReply(lastUserText(messages));

  if (action === 'start') {
    return {
      reply: `${copy.welcome}\n\n${copy.questions[0]}`,
      done: false,
      transcript: '',
      source: 'scripted',
    };
  }

  if (action === 'finish') {
    if (userWantsToStop(messages) || lastKind === 'decline') {
      return { reply: copy.declinedClose, done: true, transcript, source: 'scripted' };
    }
    if (answers < MIN_ANSWERS_TO_FINISH) {
      return { reply: copy.emptyFinish, done: false, transcript, source: 'scripted' };
    }
    return { reply: copy.closing, done: true, transcript, source: 'scripted' };
  }

  if (lastKind === 'stop' || userWantsToStop(messages)) {
    return { reply: copy.declinedClose, done: true, transcript, source: 'scripted' };
  }

  if (action === 'reply' && lastKind === 'decline') {
    return { reply: copy.declinedOffer, done: false, transcript, source: 'scripted' };
  }

  if (action === 'reply' && lastKind === 'yes' && answered === 0) {
    return { reply: copy.whichKind, done: false, transcript, source: 'scripted' };
  }

  const nextIndex = action === 'skip' ? answered + 1 : answered;
  if (nextIndex >= copy.questions.length) {
    return {
      reply: copy.closing,
      done: true,
      transcript,
      source: 'scripted',
    };
  }

  const prefix = action === 'skip' ? `${copy.skipAck} ` : '';
  return {
    reply: `${prefix}${copy.questions[nextIndex]}`,
    done: false,
    transcript,
    source: 'scripted',
  };
}

async function aiTurn(
  locale: 'en' | 'de',
  action: InterviewAction,
  messages: InterviewMessage[]
): Promise<InterviewTurnResult | null> {
  const ai = openStoryAiClient(AI_TIMEOUT_MS);
  if (!ai) return null;

  const copy = getCopy(locale);
  const lastKind = classifyInterviewReply(lastUserText(messages));
  const openai = ai.client;

  const history = messages.map((message) => ({
    role: message.role,
    content: message.content,
  }));

  if (action === 'start') {
    history.length = 0;
    history.push({
      role: 'user',
      content: locale === 'de' ? 'Bitte starte das Interview behutsam.' : 'Please start the interview gently.',
    });
  } else if (action === 'skip') {
    history.push({
      role: 'user',
      content: locale === 'de' ? 'Bitte diese Frage überspringen.' : 'Please skip this question.',
    });
  } else if (action === 'finish') {
    history.push({
      role: 'user',
      content:
        locale === 'de'
          ? 'Ich bin fertig. Bitte schließe das Gespräch ab.'
          : 'I am done. Please close the interview.',
    });
  }

  const startedAt = Date.now();
  let response;
  try {
    response = await openai.chat.completions.create({
      model: ai.model,
      temperature: 0.3,
      max_tokens: AI_MAX_TOKENS,
      messages: [{ role: 'system', content: storyInterviewSystemPrompt(locale) }, ...history],
    });
  } catch (error) {
    const facts = aiCallErrorFacts(error);
    devLogAiCall({
      status: facts.status,
      errorType: facts.errorType,
      replyEmpty: true,
      parseFailed: false,
      ms: Date.now() - startedAt,
    });
    throw error;
  }

  const content = response.choices[0]?.message?.content;
  const inspected = inspectAiReply(content);
  devLogAiCall({
    status: 200,
    errorType: null,
    replyEmpty: inspected.replyEmpty,
    parseFailed: inspected.parseFailed,
    ms: Date.now() - startedAt,
  });
  if (!content?.trim()) return null;

  const parsed = parseInterviewModelContent(content);
  if (!parsed) return null;

  const answerCount = countUserAnswers(messages);
  const declined = lastKind === 'decline' || lastKind === 'stop' || userWantsToStop(messages);
  const done =
    action === 'finish'
      ? answerCount >= MIN_ANSWERS_TO_FINISH || declined
      : (parsed.done || lastKind === 'stop' || userWantsToStop(messages)) &&
        (answerCount >= MIN_ANSWERS_TO_FINISH || declined);

  return {
    reply: done && (action === 'finish' || lastKind === 'stop') ? copy.declinedClose : parsed.reply,
    done,
    transcript: buildInterviewTranscript(messages),
    source: 'ai',
  };
}

export async function conductStoryInterview(input: {
  locale: 'en' | 'de';
  action: InterviewAction;
  messages: InterviewMessage[];
}): Promise<InterviewTurnResult> {
  const pageLocale = input.locale === 'de' ? 'de' : 'en';
  const action = input.action;
  const messages = sanitizeInterviewMessages(input.messages);
  const lastText = lastUserText(messages);
  const locale = localeFromLatestMessage(pageLocale, lastText);

  if (matchesStoryDanger(lastText)) {
    return {
      reply: storyDangerReply(locale),
      done: false,
      paused: true,
      transcript: buildInterviewTranscript(messages),
      source: 'scripted',
    };
  }

  if (classifyInterviewReply(lastText) === 'stop' || userWantsToStop(messages)) {
    return scriptedInterviewTurn(locale, action === 'start' ? 'reply' : action, messages);
  }

  if (action === 'finish') {
    const scripted = scriptedInterviewTurn(locale, action, messages);
    if (scripted.done) return scripted;
    try {
      const live = await aiTurn(locale, action, messages);
      if (live) {
        return {
          ...live,
          done: false,
          transcript: scripted.transcript,
          reply: live.reply,
        };
      }
    } catch {
      logInterviewFallback();
      return scripted;
    }
    logInterviewFallback();
    return scripted;
  }

  try {
    const live = await aiTurn(locale, action, messages);
    if (live) return live;
  } catch {
    logInterviewFallback();
    return scriptedInterviewTurn(locale, action, messages);
  }

  logInterviewFallback();
  return scriptedInterviewTurn(locale, action, messages);
}
