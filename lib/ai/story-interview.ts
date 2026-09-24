import OpenAI from 'openai';

export type InterviewMessage = {
  role: 'assistant' | 'user';
  content: string;
};

export type InterviewAction = 'start' | 'reply' | 'skip' | 'finish';

export type InterviewTurnResult = {
  reply: string;
  done: boolean;
  transcript: string;
  source: 'openai' | 'scripted';
};

const MAX_MESSAGES = 20;
const MAX_MESSAGE_CHARS = 2000;
const MIN_ANSWERS_TO_FINISH = 2;

const SCRIPT = {
  en: {
    welcome:
      'I can ask a few gentle questions to help you draft your story. Skip anything you do not want to share. You stay in control, and nothing is published until you submit it for human review.',
    questions: [
      'What kind of story would you like to share — an experience, a mentoring story, or something about awareness and empowerment?',
      'Where and when did this take place? You can stay as general as you like.',
      'What happened? Share only what feels okay. You can skip anything sensitive.',
      'What would you like others to know? What helped you?',
      'Is there anything else you want to add before we turn this into a story draft?',
    ],
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
      'Welche Art von Geschichte möchtest du teilen — eine Erfahrung, eine Mentoring-Story oder etwas zu Awareness und Empowerment?',
      'Wo und wann hat das stattgefunden? Du kannst so allgemein bleiben, wie du möchtest.',
      'Was ist passiert? Teile nur, was sich okay anfühlt. Sensibles kannst du überspringen.',
      'Was sollten andere wissen? Was hat dir geholfen?',
      'Möchtest du noch etwas ergänzen, bevor wir daraus einen Story-Entwurf machen?',
    ],
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

function scriptedTurn(
  locale: 'en' | 'de',
  action: InterviewAction,
  messages: InterviewMessage[]
): InterviewTurnResult {
  const copy = getCopy(locale);
  const answers = countUserAnswers(messages);
  const asked = messages.filter((message) => message.role === 'assistant').length;
  const nextQuestion = copy.questions[Math.min(asked, copy.questions.length - 1)];

  if (action === 'start') {
    return {
      reply: `${copy.welcome}\n\n${copy.questions[0]}`,
      done: false,
      transcript: '',
      source: 'scripted',
    };
  }

  if (action === 'finish') {
    const transcript = buildInterviewTranscript(messages);
    if (answers < MIN_ANSWERS_TO_FINISH) {
      return { reply: copy.emptyFinish, done: false, transcript, source: 'scripted' };
    }
    return { reply: copy.closing, done: true, transcript, source: 'scripted' };
  }

  if (asked >= copy.questions.length) {
    return {
      reply: copy.closing,
      done: true,
      transcript: buildInterviewTranscript(messages),
      source: 'scripted',
    };
  }

  const prefix = action === 'skip' ? `${copy.skipAck} ` : '';
  return {
    reply: `${prefix}${nextQuestion}`,
    done: false,
    transcript: buildInterviewTranscript(messages),
    source: 'scripted',
  };
}

async function openaiTurn(
  locale: 'en' | 'de',
  action: InterviewAction,
  messages: InterviewMessage[]
): Promise<InterviewTurnResult | null> {
  if (!process.env.OPENAI_API_KEY) return null;

  const copy = getCopy(locale);
  const language = locale === 'de' ? 'German' : 'English';
  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

  const system = `You are a careful story interviewer for Building Bridges, a mentoring project for girls and FLINTA* of Colour.

Rules:
- Speak ${language} only.
- Ask one short question at a time.
- Be warm, trauma-aware, and never push. If they skip or hesitate, accept it and move on.
- Do not give advice, diagnoses, or interpretations.
- Do not invent facts about their life.
- Never ask for full names, addresses, school names, or other identifying details.
- After about 4–6 answered questions, or if they say they are done, wrap up.
- If they want to stop, thank them and set done=true.

Return JSON only: {"reply":"your next message","done":false}`;

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

  const response = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    temperature: 0.5,
    max_tokens: 280,
    response_format: { type: 'json_object' },
    messages: [
      { role: 'system', content: system },
      ...history,
    ],
  });

  const content = response.choices[0]?.message?.content;
  if (!content) return null;

  const parsed = JSON.parse(content) as { reply?: unknown; done?: unknown };
  const reply = typeof parsed.reply === 'string' && parsed.reply.trim() ? parsed.reply.trim() : '';
  if (!reply) return null;

  const answers = countUserAnswers(messages);
  const done =
    action === 'finish'
      ? answers >= MIN_ANSWERS_TO_FINISH
      : Boolean(parsed.done) && answers >= MIN_ANSWERS_TO_FINISH;

  return {
    reply: done && action === 'finish' ? copy.closing : reply,
    done,
    transcript: buildInterviewTranscript(messages),
    source: 'openai',
  };
}

export async function conductStoryInterview(input: {
  locale: 'en' | 'de';
  action: InterviewAction;
  messages: InterviewMessage[];
}): Promise<InterviewTurnResult> {
  const locale = input.locale === 'de' ? 'de' : 'en';
  const action = input.action;
  const messages = sanitizeInterviewMessages(input.messages);

  if (action === 'finish') {
    const scripted = scriptedTurn(locale, action, messages);
    try {
      const live = await openaiTurn(locale, action, messages);
      if (live) return { ...live, done: scripted.done, transcript: scripted.transcript, reply: scripted.done ? scripted.reply : live.reply };
    } catch (error) {
      console.error('Story interview finish fallback:', error);
    }
    return scripted;
  }

  try {
    const live = await openaiTurn(locale, action, messages);
    if (live) return live;
  } catch (error) {
    console.error('Story interview OpenAI fallback:', error);
  }

  return scriptedTurn(locale, action, messages);
}
