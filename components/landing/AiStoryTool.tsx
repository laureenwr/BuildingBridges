'use client';

import { startTransition, useCallback, useRef, useState } from 'react';
import { AiInterviewChat, type InterviewAnswer } from '@/components/landing/AiInterviewChat';
import { submitStoryToolStory } from '@/lib/actions/story-tool';
import { useLanguage } from '@/lib/hooks/useLanguage';

type CollectMode = 'paste' | 'interview';
type StoryKind = 'mentor' | 'participant' | 'awareness';
type Chapter = { id: string; label: string; icon: string; text: string; quote: string };
type SubmissionStatus = { type: 'success' | 'error'; message: string } | null;
type ChapterAssist = {
  busy: 'grammar' | 'titles' | null;
  error: string | null;
  grammarDraft: string | null;
  titles: string[];
};

async function requestStoryAssist(input: {
  locale: 'en' | 'de';
  action: 'grammar' | 'titles' | 'story-title' | 'draft';
  text: string;
  currentLabel?: string;
}) {
  const response = await fetch('/api/story-assist', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(input),
  });
  return (await response.json()) as {
    success?: boolean;
    text?: string;
    titles?: string[];
    title?: string;
    category?: StoryKind;
    draft?: string;
    message?: string;
    code?: string;
  };
}

function assistErrorCopy(
  L: (en: string, de: string) => string,
  result: { code?: string; message?: string },
  forTitle = false
) {
  if (result.code === 'missing-key') {
    return forTitle
      ? L(
          'AI writing help is not set up yet. You can type the title yourself.',
          'KI-Schreibhilfe ist noch nicht eingerichtet. Du kannst den Titel selbst eingeben.'
        )
      : L(
          'AI writing help is not set up yet. You can keep editing yourself.',
          'KI-Schreibhilfe ist noch nicht eingerichtet. Du kannst selbst weiterbearbeiten.'
        );
  }
  if (result.code === 'no-credits') {
    return L(
      'The OpenAI account has no remaining credits. Add credits, then try AI help again. You can keep editing yourself.',
      'Das OpenAI-Konto hat keine Credits mehr. Lade Credits auf und versuche die KI-Hilfe danach erneut. Du kannst selbst weiterbearbeiten.'
    );
  }
  return result.message || L('AI help is not available right now.', 'KI-Hilfe ist gerade nicht verfügbar.');
}

const CHAPTER_ICONS = ['📖', '🌍', '✈️', '🔥', '💡', '🌟'];

function createStorySessionId() {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
    return `story-tool-${crypto.randomUUID()}`;
  }
  return `story-tool-${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

function createChapterId() {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
    return crypto.randomUUID();
  }
  return `chapter-${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

function makeChapter(partial?: Partial<Chapter>, index = 0): Chapter {
  return {
    id: partial?.id ?? createChapterId(),
    label: partial?.label ?? '',
    icon: partial?.icon ?? CHAPTER_ICONS[index % CHAPTER_ICONS.length],
    text: partial?.text ?? '',
    quote: partial?.quote ?? '',
  };
}

export function AiStoryTool() {
  const { isDe } = useLanguage();
  const L = (en: string, de: string) => (isDe ? de : en);
  const interviewLabels = isDe
    ? ['Art der Geschichte', 'Ort und Zeit', 'Was passiert ist', 'Was andere wissen sollen', 'Sonstiges']
    : ['Kind of story', 'Where and when', 'What happened', 'What others should know', 'Anything else'];

  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [collectMode, setCollectMode] = useState<CollectMode>('paste');
  const [transcript, setTranscript] = useState('');
  const [answers, setAnswers] = useState<InterviewAnswer[]>([]);
  const [storyTitle, setStoryTitle] = useState('');
  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [storyType, setStoryType] = useState<StoryKind>('mentor');
  const [format, setFormat] = useState<'immersive' | 'constellation'>('immersive');
  const [litRow, setLitRow] = useState<number | null>(null);
  const [consentGiven, setConsentGiven] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState<SubmissionStatus>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [assistByChapter, setAssistByChapter] = useState<Record<string, ChapterAssist>>({});
  const [titleBusy, setTitleBusy] = useState(false);
  const [titleError, setTitleError] = useState<string | null>(null);
  const [titleSuggestions, setTitleSuggestions] = useState<string[]>([]);
  const [draftBusy, setDraftBusy] = useState(false);
  const [draftError, setDraftError] = useState<string | null>(null);
  const [draftReady, setDraftReady] = useState(false);
  const sessionIdRef = useRef('');
  const lastSourceKeyRef = useRef('');

  const sourceKey = `${collectMode}::${transcript}::${answers.map((answer) => answer.text).join('\n---\n')}`;
  const charLabel = L(`${transcript.length.toLocaleString()} characters`, `${transcript.length.toLocaleString()} Zeichen`);
  const storyTypeLabel =
    storyType === 'mentor'
      ? L('Mentor', 'Mentorin')
      : storyType === 'awareness'
        ? L('Awareness', 'Awareness')
        : L('Participant', 'Teilnehmerin');

  const usableChapters = chapters.filter((chapter) => chapter.text.trim());

  const buildChaptersFromSource = useCallback((): Chapter[] => {
    if (collectMode === 'interview' && answers.length > 0) {
      return answers.map((answer, index) =>
        makeChapter(
          {
            label: interviewLabels[index] ?? `${L('Chapter', 'Kapitel')} ${index + 1}`,
            text: answer.text,
          },
          index
        )
      );
    }

    const pasted = transcript.trim();
    return [
      makeChapter(
        {
          label: L('Story', 'Geschichte'),
          text: pasted,
        },
        0
      ),
    ];
  }, [answers, collectMode, interviewLabels, transcript, isDe]);

  const goTo = useCallback(
    (next: 1 | 2 | 3 | 4) => {
      if (next >= 2 && transcript.trim().length < 10) {
        window.alert(
          L(
            'Please share some of your story first. Paste a transcript or talk with AI.',
            'Bitte teile zuerst etwas von deiner Geschichte. Füge ein Transkript ein oder sprich mit der KI.'
          )
        );
        return;
      }
      if (next >= 3 && !storyTitle.trim()) {
        window.alert(L('Please add a title for this story.', 'Bitte gib dieser Story einen Titel.'));
        return;
      }
      if (next === 3 && lastSourceKeyRef.current !== sourceKey) {
        setChapters(buildChaptersFromSource());
        lastSourceKeyRef.current = sourceKey;
      }
      setStep(next);
      document.getElementById('ai-story-tool')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    },
    [buildChaptersFromSource, sourceKey, storyTitle, transcript, isDe]
  );

  const goToReview = () => {
    if (usableChapters.length === 0) {
      window.alert(L('Please add at least one chapter with text.', 'Bitte füge mindestens ein Kapitel mit Text hinzu.'));
      return;
    }
    setFormat('immersive');
    setStep(4);
    document.getElementById('ai-story-tool')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const updateChapter = (id: string, patch: Partial<Chapter>) => {
    setChapters((current) => current.map((chapter) => (chapter.id === id ? { ...chapter, ...patch } : chapter)));
  };

  const addChapter = () => {
    setChapters((current) => [...current, makeChapter({}, current.length)]);
  };

  const removeChapter = (id: string) => {
    setChapters((current) => (current.length <= 1 ? current : current.filter((chapter) => chapter.id !== id)));
  };

  const moveChapter = (id: string, direction: -1 | 1) => {
    setChapters((current) => {
      const index = current.findIndex((chapter) => chapter.id === id);
      const next = index + direction;
      if (index < 0 || next < 0 || next >= current.length) return current;
      const copy = [...current];
      const [item] = copy.splice(index, 1);
      copy.splice(next, 0, item);
      return copy;
    });
  };

  const emptyAssist = (): ChapterAssist => ({ busy: null, error: null, grammarDraft: null, titles: [] });

  const patchAssist = (id: string, patch: Partial<ChapterAssist>) => {
    setAssistByChapter((current) => {
      const prev = current[id] ?? emptyAssist();
      return { ...current, [id]: { ...prev, ...patch } };
    });
  };

  const runChapterAssist = async (chapter: Chapter, action: 'grammar' | 'titles') => {
    const text = chapter.text.trim();
    if (!text) {
      patchAssist(chapter.id, {
        error: L('Add some chapter text first.', 'Bitte schreibe zuerst etwas Kapiteltext.'),
      });
      return;
    }
    patchAssist(chapter.id, { busy: action, error: null });
    try {
      const result = await requestStoryAssist({
        locale: isDe ? 'de' : 'en',
        action,
        text,
        currentLabel: chapter.label,
      });
      if (!result.success) {
        patchAssist(chapter.id, {
          busy: null,
          error: assistErrorCopy(L, result),
        });
        return;
      }
      if (action === 'grammar') {
        patchAssist(chapter.id, { busy: null, grammarDraft: result.text || '' });
        return;
      }
      patchAssist(chapter.id, { busy: null, titles: result.titles ?? [] });
    } catch {
      patchAssist(chapter.id, {
        busy: null,
        error: L('AI help is not available right now.', 'KI-Hilfe ist gerade nicht verfügbar.'),
      });
    }
  };

  const suggestStoryTitle = async () => {
    const source =
      collectMode === 'interview'
        ? answers.map((answer) => answer.text).join('\n\n').trim()
        : transcript.trim();
    if (!source) {
      setTitleError(L('Add some of your story first.', 'Bitte teile zuerst etwas von deiner Geschichte.'));
      return;
    }
    setTitleBusy(true);
    setTitleError(null);
    try {
      const result = await requestStoryAssist({
        locale: isDe ? 'de' : 'en',
        action: 'story-title',
        text: source,
      });
      if (!result.success) {
        setTitleError(assistErrorCopy(L, result, true));
        return;
      }
      setTitleSuggestions(result.titles ?? []);
    } catch {
      setTitleError(L('AI help is not available right now.', 'KI-Hilfe ist gerade nicht verfügbar.'));
    } finally {
      setTitleBusy(false);
    }
  };

  const generateFirstDraft = async () => {
    const source =
      collectMode === 'interview'
        ? answers.map((answer) => answer.text).join('\n\n').trim()
        : transcript.trim();
    if (!source) {
      setDraftError(L('Add some of your story first.', 'Bitte teile zuerst etwas von deiner Geschichte.'));
      return;
    }
    setDraftBusy(true);
    setDraftError(null);
    try {
      const result = await requestStoryAssist({
        locale: isDe ? 'de' : 'en',
        action: 'draft',
        text: source,
      });
      if (!result.success || !result.title || !result.draft || !result.category) {
        setDraftError(assistErrorCopy(L, result));
        return;
      }
      setStoryTitle(result.title);
      setStoryType(result.category);
      setChapters([
        makeChapter(
          {
            label: L('First draft', 'Erster Entwurf'),
            text: result.draft,
          },
          0
        ),
      ]);
      lastSourceKeyRef.current = sourceKey;
      setDraftReady(true);
    } catch {
      setDraftError(L('AI help is not available right now.', 'KI-Hilfe ist gerade nicht verfügbar.'));
    } finally {
      setDraftBusy(false);
    }
  };

  const mergeWithPrevious = (id: string) => {
    setChapters((current) => {
      const index = current.findIndex((chapter) => chapter.id === id);
      if (index <= 0) return current;
      const prev = current[index - 1];
      const curr = current[index];
      const merged = {
        ...prev,
        text: [prev.text.trim(), curr.text.trim()].filter(Boolean).join('\n\n'),
        quote: prev.quote.trim() || curr.quote.trim(),
      };
      return [...current.slice(0, index - 1), merged, ...current.slice(index + 1)];
    });
  };

  const resetCollectedStory = () => {
    setTranscript('');
    setAnswers([]);
    setChapters([]);
    setAssistByChapter({});
    setTitleSuggestions([]);
    setTitleError(null);
    setDraftError(null);
    setDraftReady(false);
    setConsentGiven(false);
    setSubmissionStatus(null);
    sessionIdRef.current = '';
    lastSourceKeyRef.current = '';
  };

  const handleSubmitForReview = useCallback(() => {
    if (isSubmitting || submissionStatus?.type === 'success') return;

    if (!consentGiven) {
      setSubmissionStatus({
        type: 'error',
        message: L(
          'Please confirm consent before submitting this story for review.',
          'Bitte bestätige die Zustimmung, bevor du diese Story zur Prüfung einreichst.'
        ),
      });
      return;
    }

    const title = storyTitle.trim();
    const readyChapters = chapters.filter((chapter) => chapter.text.trim());
    if (!title) {
      setSubmissionStatus({ type: 'error', message: L('Please add a title for this story.', 'Bitte gib dieser Story einen Titel.') });
      return;
    }
    if (readyChapters.length === 0) {
      setSubmissionStatus({
        type: 'error',
        message: L('Please add at least one chapter with text.', 'Bitte füge mindestens ein Kapitel mit Text hinzu.'),
      });
      return;
    }

    const summary = readyChapters[0].text.trim();
    const empowermentMessage = readyChapters[readyChapters.length - 1].text.trim();
    const trimmedTranscript = transcript.trim() || readyChapters.map((chapter) => chapter.text.trim()).join('\n\n');

    if (!sessionIdRef.current) {
      sessionIdRef.current = createStorySessionId();
    }

    const payload = {
      sessionId: sessionIdRef.current,
      consent: true,
      story: {
        title,
        summary,
        timeline: readyChapters.map((chapter, index) => ({
          order: index + 1,
          label: chapter.label.trim() || `${L('Chapter', 'Kapitel')} ${index + 1}`,
          icon: chapter.icon,
          text: chapter.text.trim(),
          quote: chapter.quote.trim(),
        })),
        quotes: readyChapters
          .map((chapter) => ({
            label: chapter.label.trim(),
            text: chapter.quote.trim(),
          }))
          .filter((quote) => quote.text.length > 0),
        empowermentMessage,
      },
      conversation: [
        {
          type: collectMode === 'interview' ? 'ai-interview' : 'transcript',
          storyType,
          text: trimmedTranscript,
        },
      ],
    };

    setIsSubmitting(true);
    setSubmissionStatus(null);

    startTransition(() => {
      void submitStoryToolStory(payload)
        .then((result) => {
          setSubmissionStatus({
            type: result.success ? 'success' : 'error',
            message: result.success
              ? L(
                  'Your story has been submitted for human review. It is not public yet.',
                  'Deine Story wurde zur menschlichen Prüfung eingereicht. Sie ist noch nicht öffentlich.'
                )
              : result.message,
          });
        })
        .catch((error) => {
          console.error('Story tool submission failed:', error);
          setSubmissionStatus({
            type: 'error',
            message: L(
              'We could not submit the story right now. Please try again later.',
              'Die Story konnte gerade nicht eingereicht werden. Bitte versuche es später erneut.'
            ),
          });
        })
        .finally(() => {
          setIsSubmitting(false);
        });
    });
  }, [chapters, collectMode, consentGiven, isDe, isSubmitting, storyTitle, storyType, submissionStatus?.type, transcript]);

  return (
    <div className="ai-gen-wrapper mt-20 border-t border-white/10 pt-16" id="ai-story-tool">
      <div className="mb-8">
        <div className="mb-3 flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-2 rounded-full border border-amber-400/35 bg-amber-400/10 px-4 py-1.5 text-[0.72rem] font-bold uppercase tracking-[0.08em] text-amber-200">
            {L('Under development', 'In Entwicklung')}
          </span>
        </div>
        <h3 className="font-lora text-[clamp(1.5rem,2.5vw,2rem)] font-semibold leading-tight text-white">
          {isDe ? (
            <>
              Vom Interview zur <span className="italic text-[#B580FF]">veröffentlichten Story</span>
            </>
          ) : (
            <>
              From interview to <span className="italic text-[#B580FF]">published story</span>
            </>
          )}
        </h3>
        <p className="mt-2 max-w-[560px] text-[0.88rem] leading-relaxed text-white/50">
          {L(
            'You write the chapters. The designs only display what you enter. Nothing is published until human review.',
            'Du schreibst die Kapitel. Die Designs zeigen nur, was du eingibst. Nichts wird vor der menschlichen Prüfung veröffentlicht.'
          )}
        </p>
      </div>

      <div className="mb-8 flex flex-wrap items-center gap-1 text-[0.75rem] font-semibold">
        {([1, 2, 3, 4] as const).map((n, i) => (
          <span key={n} className="flex items-center gap-1">
            {i > 0 && <span className="mx-1 text-white/15">›</span>}
            <span
              className={`flex items-center gap-1.5 rounded-full border px-3 py-1.5 transition ${
                step === n
                  ? 'border-[rgba(145,82,255,0.5)] bg-[rgba(145,82,255,0.2)] text-white'
                  : step > n
                    ? 'border-[rgba(145,82,255,0.25)] text-white/50'
                    : 'border-white/10 bg-white/[0.04] text-white/30'
              }`}
            >
              <span
                className={`flex h-[18px] w-[18px] items-center justify-center rounded-full text-[0.65rem] font-bold ${
                  step === n ? 'bg-[#9152FF] shadow-[0_0_10px_rgba(145,82,255,0.6)]' : step > n ? 'bg-[rgba(145,82,255,0.4)]' : 'bg-white/10'
                }`}
              >
                {n}
              </span>
              {n === 1 && L('Collect', 'Sammeln')}
              {n === 2 && L('Details', 'Details')}
              {n === 3 && L('Chapters', 'Kapitel')}
              {n === 4 && L('Review', 'Prüfen')}
            </span>
          </span>
        ))}
      </div>

      <div className="overflow-hidden rounded-[20px] border border-[rgba(145,82,255,0.2)] bg-white/[0.05] shadow-[0_20px_60px_rgba(0,0,0,0.3)]">
        {step === 1 && (
          <div className="p-8">
            <p className="mb-2 text-[0.7rem] font-bold uppercase tracking-[0.1em] text-[#B580FF]">{L('Step 1', 'Schritt 1')}</p>
            <h4 className="font-lora text-xl font-semibold text-white">
              {L('Collect your story', 'Deine Geschichte sammeln')}
            </h4>
            <p className="mb-4 mt-1 text-[0.84rem] text-white/45">
              {L(
                'Talk with AI in a private drafting chat, or paste a transcript you already have. You stay in control, and nothing is published until human review.',
                'Sprich mit der KI in einem privaten Entwurfsgespräch, oder füge ein Transkript ein, das du schon hast. Du behältst die Kontrolle, und nichts wird vor der menschlichen Prüfung veröffentlicht.'
              )}
            </p>
            <div className="mb-5 flex flex-wrap gap-2">
              {(
                [
                  ['paste', L('Paste transcript', 'Transkript einfügen')],
                  ['interview', L('Talk with AI', 'Mit KI sprechen')],
                ] as const
              ).map(([mode, label]) => (
                <button
                  key={mode}
                  type="button"
                  onClick={() => setCollectMode(mode)}
                  className={`rounded-full border px-4 py-1.5 text-[0.8rem] font-semibold transition ${
                    collectMode === mode
                      ? 'border-[rgba(145,82,255,0.5)] bg-[rgba(145,82,255,0.2)] text-white'
                      : 'border-white/10 bg-white/[0.04] text-white/45 hover:text-white/75'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>

            {collectMode === 'interview' ? (
              <AiInterviewChat
                isDe={isDe}
                onTranscriptChange={(next) => {
                  setTranscript(next);
                  setConsentGiven(false);
                  setSubmissionStatus(null);
                  sessionIdRef.current = '';
                }}
                onAnswersChange={setAnswers}
                onReady={() => goTo(2)}
              />
            ) : (
              <>
                <textarea
                  className="min-h-[200px] w-full resize-y rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 font-primary text-[0.88rem] leading-relaxed text-white outline-none placeholder:text-white/20 focus:border-[rgba(145,82,255,0.5)]"
                  placeholder={L('Paste the full interview transcript here…', 'Vollständiges Interview-Transkript hier einfügen…')}
                  value={transcript}
                  onChange={(e) => {
                    setTranscript(e.target.value);
                    setConsentGiven(false);
                    setSubmissionStatus(null);
                    sessionIdRef.current = '';
                  }}
                />
                <div className="mt-2 flex items-center justify-between">
                  <span className="text-[0.73rem] text-white/25">{charLabel}</span>
                  <button
                    type="button"
                    className="rounded-full border border-white/10 px-3 py-1 text-[0.75rem] text-white/40 hover:text-white/70"
                    onClick={resetCollectedStory}
                  >
                    {L('Clear', 'Leeren')}
                  </button>
                </div>
                <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
                  <span className="text-[0.76rem] text-white/20">{L('Supports any language', 'Unterstützt jede Sprache')}</span>
                  <button
                    type="button"
                    onClick={() => goTo(2)}
                    className="rounded-full bg-gradient-to-br from-[#9152FF] to-[#7339E0] px-5 py-2.5 text-[0.84rem] font-semibold text-white shadow-[0_4px_18px_rgba(145,82,255,0.4)] hover:shadow-[0_6px_26px_rgba(145,82,255,0.6)]"
                  >
                    {L('Next → Details', 'Weiter → Details')}
                  </button>
                </div>
              </>
            )}
          </div>
        )}

        {step === 2 && (
          <div className="p-8">
            <p className="mb-2 text-[0.7rem] font-bold uppercase tracking-[0.1em] text-[#B580FF]">{L('Step 2', 'Schritt 2')}</p>
            <h4 className="font-lora text-xl font-semibold text-white">{L('Title and story type', 'Titel und Story-Typ')}</h4>
            <p className="mb-6 mt-1 text-[0.84rem] text-white/45">
              {L(
                'Give the story a name and say whose story it is. Optional AI can draft a title, type, and first-person text from the full interview. You can edit everything. Nothing is published until an admin reviews it.',
                'Gib der Story einen Namen und sage, wessen Geschichte es ist. Optional kann die KI aus dem ganzen Interview einen Titel, Typ und Ich-Entwurf vorschlagen. Du kannst alles ändern. Nichts wird veröffentlicht, bevor eine Admin-Person prüft.'
              )}
            </p>
            <label className="mb-3 block">
              <span className="mb-2 block text-[0.68rem] font-bold uppercase tracking-[0.1em] text-white/35">
                {L('Story title', 'Story-Titel')}
              </span>
              <input
                type="text"
                value={storyTitle}
                onChange={(event) => setStoryTitle(event.target.value)}
                placeholder={L('e.g. Finding my place in Berlin', 'z. B. Meinen Platz in Berlin finden')}
                className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-[0.92rem] text-white outline-none placeholder:text-white/20 focus:border-[rgba(145,82,255,0.5)]"
              />
            </label>
            <div className="mb-6">
              <button
                type="button"
                onClick={() => void suggestStoryTitle()}
                disabled={titleBusy}
                className="rounded-full border border-[rgba(145,82,255,0.35)] px-3 py-1.5 text-[0.78rem] font-semibold text-[#B580FF] hover:bg-[rgba(145,82,255,0.1)] disabled:opacity-50"
              >
                {titleBusy ? L('Suggesting…', 'Vorschläge werden geladen…') : L('✦ Suggest titles', '✦ Titel vorschlagen')}
              </button>
              {titleError ? <p className="mt-2 text-[0.78rem] text-rose-200/80">{titleError}</p> : null}
              {titleSuggestions.length > 0 ? (
                <div className="mt-3 flex flex-wrap gap-2">
                  {titleSuggestions.map((suggestion) => (
                    <button
                      key={suggestion}
                      type="button"
                      onClick={() => setStoryTitle(suggestion)}
                      className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-[0.78rem] text-white/75 hover:border-[rgba(145,82,255,0.45)] hover:text-white"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              ) : null}
            </div>
            <div className="mb-6 rounded-[14px] border border-white/10 bg-white/[0.03] p-5">
              <p className="mb-3 text-[0.68rem] font-bold uppercase tracking-[0.1em] text-white/35">{L('Story type', 'Story-Typ')}</p>
              {(
                [
                  ['mentor', L('Role model / mentor story', 'Role Model / Mentorinnen-Story')],
                  ['participant', L('Participant experience story', 'Teilnehmerinnen-Erfahrungsstory')],
                  ['awareness', L('Awareness & empowerment story', 'Awareness- & Empowerment-Story')],
                ] as const
              ).map(([value, label]) => (
                <label key={value} className="mb-2 flex cursor-pointer items-start gap-2 text-[0.82rem] text-white/65 hover:text-white">
                  <input
                    type="radio"
                    name="aiStoryType"
                    className="mt-0.5 accent-[#9152FF]"
                    checked={storyType === value}
                    onChange={() => setStoryType(value)}
                  />
                  {label}
                </label>
              ))}
            </div>
            <div className="mb-6">
              <button
                type="button"
                onClick={() => void generateFirstDraft()}
                disabled={draftBusy}
                className="rounded-full border border-[rgba(145,82,255,0.35)] px-3 py-1.5 text-[0.78rem] font-semibold text-[#B580FF] hover:bg-[rgba(145,82,255,0.1)] disabled:opacity-50"
              >
                {draftBusy
                  ? L('Reading the full interview…', 'Das ganze Interview wird gelesen…')
                  : L('✦ Generate first draft', '✦ Ersten Entwurf erzeugen')}
              </button>
              {draftError ? <p className="mt-2 text-[0.78rem] text-rose-200/80">{draftError}</p> : null}
              {draftReady && !draftError ? (
                <p className="mt-2 text-[0.78rem] text-[#C9A6FF]">
                  {L(
                    'Draft ready. Title and type are filled in. Open the next step to edit the narrative. This stays a draft until an admin approves it.',
                    'Entwurf bereit. Titel und Typ sind ausgefüllt. Im nächsten Schritt kannst du den Text bearbeiten. Das bleibt ein Entwurf, bis eine Admin-Person zustimmt.'
                  )}
                </p>
              ) : null}
            </div>
            <div className="flex flex-wrap justify-between gap-4">
              <button
                type="button"
                onClick={() => goTo(1)}
                className="rounded-full border border-white/10 px-4 py-2 text-[0.84rem] text-white/40 hover:border-white/25 hover:text-white/70"
              >
                {L('← Back', '← Zurück')}
              </button>
              <button
                type="button"
                onClick={() => goTo(3)}
                className="rounded-full bg-gradient-to-br from-[#9152FF] to-[#7339E0] px-5 py-2.5 text-[0.84rem] font-semibold text-white shadow-[0_4px_18px_rgba(145,82,255,0.4)]"
              >
                {L('Next → Chapters', 'Weiter → Kapitel')}
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="p-8">
            <p className="mb-2 text-[0.7rem] font-bold uppercase tracking-[0.1em] text-[#B580FF]">{L('Step 3', 'Schritt 3')}</p>
            <h4 className="font-lora text-xl font-semibold text-white">{L('Shape the chapters', 'Kapitel formen')}</h4>
            <p className="mb-6 mt-1 text-[0.84rem] text-white/45">
              {L(
                collectMode === 'interview'
                  ? 'Each answer is one chapter. Rename, edit, merge, or delete. Optional AI can fix grammar or suggest names. You choose what to keep.'
                  : 'Your paste starts as one chapter. Split it yourself. Optional AI can fix grammar or suggest names. You choose what to keep.',
                collectMode === 'interview'
                  ? 'Jede Antwort ist ein Kapitel. Benenne um, bearbeite, führe zusammen oder lösche. Optional kann KI Grammatik korrigieren oder Namen vorschlagen. Du entscheidest, was bleibt.'
                  : 'Dein eingefügter Text startet als ein Kapitel. Teile ihn selbst. Optional kann KI Grammatik korrigieren oder Namen vorschlagen. Du entscheidest, was bleibt.'
              )}
            </p>

            <div className="space-y-4">
              {chapters.map((chapter, index) => {
                const assist = assistByChapter[chapter.id] ?? emptyAssist();
                return (
                <div key={chapter.id} className="rounded-[14px] border border-white/10 bg-white/[0.03] p-5">
                  <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                    <span className="text-[0.68rem] font-bold uppercase tracking-[0.1em] text-white/35">
                      {L('Chapter', 'Kapitel')} {index + 1}
                    </span>
                    <div className="flex flex-wrap gap-2">
                      <button
                        type="button"
                        onClick={() => moveChapter(chapter.id, -1)}
                        disabled={index === 0}
                        className="rounded-full border border-white/10 px-2.5 py-1 text-[0.72rem] text-white/45 hover:text-white/75 disabled:opacity-30"
                      >
                        {L('Up', 'Hoch')}
                      </button>
                      <button
                        type="button"
                        onClick={() => moveChapter(chapter.id, 1)}
                        disabled={index === chapters.length - 1}
                        className="rounded-full border border-white/10 px-2.5 py-1 text-[0.72rem] text-white/45 hover:text-white/75 disabled:opacity-30"
                      >
                        {L('Down', 'Runter')}
                      </button>
                      <button
                        type="button"
                        onClick={() => mergeWithPrevious(chapter.id)}
                        disabled={index === 0}
                        className="rounded-full border border-white/10 px-2.5 py-1 text-[0.72rem] text-white/45 hover:text-white/75 disabled:opacity-30"
                      >
                        {L('Merge up', 'Nach oben mergen')}
                      </button>
                      <button
                        type="button"
                        onClick={() => removeChapter(chapter.id)}
                        disabled={chapters.length <= 1}
                        className="rounded-full border border-white/10 px-2.5 py-1 text-[0.72rem] text-rose-200/70 hover:text-rose-100 disabled:opacity-30"
                      >
                        {L('Delete', 'Löschen')}
                      </button>
                    </div>
                  </div>
                  <div className="mb-3 grid gap-3 sm:grid-cols-[auto_1fr]">
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/5 text-lg" aria-hidden>
                      {chapter.icon}
                    </span>
                    <input
                      type="text"
                      value={chapter.label}
                      onChange={(event) => updateChapter(chapter.id, { label: event.target.value })}
                      placeholder={L('Chapter name', 'Kapitelname')}
                      className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2.5 text-[0.88rem] text-white outline-none placeholder:text-white/20 focus:border-[rgba(145,82,255,0.5)]"
                    />
                  </div>
                  <textarea
                    value={chapter.text}
                    onChange={(event) => updateChapter(chapter.id, { text: event.target.value })}
                    placeholder={L('Chapter text…', 'Kapiteltext…')}
                    className="mb-3 min-h-[120px] w-full resize-y rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-[0.88rem] leading-relaxed text-white outline-none placeholder:text-white/20 focus:border-[rgba(145,82,255,0.5)]"
                  />
                  <div className="mb-3 flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={() => void runChapterAssist(chapter, 'grammar')}
                      disabled={assist.busy !== null}
                      className="rounded-full border border-[rgba(145,82,255,0.35)] px-3 py-1.5 text-[0.75rem] font-semibold text-[#B580FF] hover:bg-[rgba(145,82,255,0.1)] disabled:opacity-50"
                    >
                      {assist.busy === 'grammar'
                        ? L('Fixing grammar…', 'Grammatik wird korrigiert…')
                        : L('Fix grammar', 'Grammatik korrigieren')}
                    </button>
                    <button
                      type="button"
                      onClick={() => void runChapterAssist(chapter, 'titles')}
                      disabled={assist.busy !== null}
                      className="rounded-full border border-[rgba(145,82,255,0.35)] px-3 py-1.5 text-[0.75rem] font-semibold text-[#B580FF] hover:bg-[rgba(145,82,255,0.1)] disabled:opacity-50"
                    >
                      {assist.busy === 'titles'
                        ? L('Suggesting names…', 'Namen werden vorgeschlagen…')
                        : L('Suggest chapter names', 'Kapitelnamen vorschlagen')}
                    </button>
                  </div>
                  {assist.error ? <p className="mb-3 text-[0.78rem] text-rose-200/80">{assist.error}</p> : null}
                  {assist.grammarDraft ? (
                    <div className="mb-3 rounded-xl border border-[rgba(145,82,255,0.25)] bg-[rgba(145,82,255,0.08)] p-3">
                      <p className="mb-2 text-[0.68rem] font-bold uppercase tracking-[0.1em] text-[#B580FF]">
                        {L('Suggested wording. You choose', 'Vorgeschlagener Wortlaut. Du entscheidest')}
                      </p>
                      <p className="text-[0.84rem] leading-relaxed text-white/80">{assist.grammarDraft}</p>
                      <div className="mt-3 flex flex-wrap gap-2">
                        <button
                          type="button"
                          onClick={() => {
                            updateChapter(chapter.id, { text: assist.grammarDraft || '' });
                            patchAssist(chapter.id, { grammarDraft: null });
                          }}
                          className="rounded-full bg-[#9152FF] px-3 py-1.5 text-[0.75rem] font-semibold text-white"
                        >
                          {L('Use this', 'Übernehmen')}
                        </button>
                        <button
                          type="button"
                          onClick={() => patchAssist(chapter.id, { grammarDraft: null })}
                          className="rounded-full border border-white/10 px-3 py-1.5 text-[0.75rem] text-white/55 hover:text-white/80"
                        >
                          {L('Keep mine', 'Meinen behalten')}
                        </button>
                      </div>
                    </div>
                  ) : null}
                  {assist.titles.length > 0 ? (
                    <div className="mb-3 flex flex-wrap gap-2">
                      {assist.titles.map((title) => (
                        <button
                          key={title}
                          type="button"
                          onClick={() => updateChapter(chapter.id, { label: title })}
                          className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-[0.78rem] text-white/75 hover:border-[rgba(145,82,255,0.45)] hover:text-white"
                        >
                          {title}
                        </button>
                      ))}
                    </div>
                  ) : null}
                  <input
                    type="text"
                    value={chapter.quote}
                    onChange={(event) => updateChapter(chapter.id, { quote: event.target.value })}
                    placeholder={L('Optional quote', 'Optionales Zitat')}
                    className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2.5 text-[0.88rem] text-white outline-none placeholder:text-white/20 focus:border-[rgba(145,82,255,0.5)]"
                  />
                </div>
                );
              })}
            </div>

            <button
              type="button"
              onClick={addChapter}
              className="mt-4 rounded-full border border-[rgba(145,82,255,0.35)] px-4 py-2 text-[0.8rem] font-semibold text-[#B580FF] hover:bg-[rgba(145,82,255,0.1)]"
            >
              {L('+ Add chapter', '+ Kapitel hinzufügen')}
            </button>

            <div className="mt-6 flex flex-wrap justify-between gap-4">
              <button
                type="button"
                onClick={() => goTo(2)}
                className="rounded-full border border-white/10 px-4 py-2 text-[0.84rem] text-white/40 hover:border-white/25 hover:text-white/70"
              >
                {L('← Back', '← Zurück')}
              </button>
              <button
                type="button"
                onClick={goToReview}
                className="rounded-full bg-gradient-to-br from-[#9152FF] to-[#7339E0] px-5 py-2.5 text-[0.84rem] font-semibold text-white shadow-[0_4px_18px_rgba(145,82,255,0.4)]"
              >
                {L('Next → Review', 'Weiter → Prüfen')}
              </button>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="p-8">
            <p className="mb-2 text-[0.7rem] font-bold uppercase tracking-[0.1em] text-[#B580FF]">{L('Step 4: Review', 'Schritt 4: Prüfen')}</p>
            <h4 className="font-lora text-xl font-semibold text-white">
              {L('See how the designs use your chapters', 'So nutzen die Designs deine Kapitel')}
            </h4>
            <p className="mb-6 mt-1 text-[0.84rem] text-white/45">
              {L(
                'This is your wording in the story layouts. Nothing new is written here.',
                'Das ist dein Wortlaut in den Story-Layouts. Hier wird nichts Neues geschrieben.'
              )}
            </p>
            <div className="mb-6 flex flex-col gap-4 sm:flex-row">
              <button
                type="button"
                onClick={() => setFormat('immersive')}
                className={`flex-1 rounded-[14px] border-[1.5px] p-5 text-center transition ${
                  format === 'immersive'
                    ? 'border-[#9152FF] bg-[rgba(145,82,255,0.18)]'
                    : 'border-white/10 bg-white/[0.04] hover:border-[rgba(145,82,255,0.4)]'
                }`}
              >
                <div className="mb-2 text-3xl">📜</div>
                <div className="font-bold text-white">{L('Immersive Scroll', 'Immersives Scrollen')}</div>
                <p className="mt-1 text-[0.75rem] text-white/45">{L('Dark narrative blocks', 'Dunkle Erzählblöcke')}</p>
              </button>
              <button
                type="button"
                onClick={() => setFormat('constellation')}
                className={`flex-1 rounded-[14px] border-[1.5px] p-5 text-center transition ${
                  format === 'constellation'
                    ? 'border-[#9152FF] bg-[rgba(145,82,255,0.18)]'
                    : 'border-white/10 bg-white/[0.04] hover:border-[rgba(145,82,255,0.4)]'
                }`}
              >
                <div className="mb-2 text-3xl">✦</div>
                <div className="font-bold text-white">{L('Constellation', 'Konstellation')}</div>
                <p className="mt-1 text-[0.75rem] text-white/45">{L('Click rows to highlight moments', 'Zeilen anklicken, um Momente hervorzuheben')}</p>
              </button>
            </div>

            {format === 'immersive' && (
              <div className="overflow-hidden rounded-2xl bg-[#080808] font-fraunces text-[#f7f2ec]">
                <div className="border-b border-white/[0.06] bg-gradient-to-br from-[#0c0428] to-[#080808] px-6 py-8">
                  <div className="font-dmMono text-[0.6rem] uppercase tracking-[0.2em] text-[rgba(145,82,255,0.7)]">
                    Building Bridges · {storyTypeLabel}
                  </div>
                  <div className="mt-2 text-[clamp(1.8rem,4vw,2.5rem)] font-extrabold leading-none tracking-tight">
                    {storyTitle.trim() || L('Untitled story', 'Unbenannte Story')}
                  </div>
                  <p className="font-dmSans mt-3 max-w-md text-[0.85rem] font-light leading-relaxed text-[#f7f2ec]/50">
                    {L(
                      `Your chapters · ${storyTypeLabel} story`,
                      `Deine Kapitel · ${storyTypeLabel}-Story`
                    )}
                  </p>
                </div>
                {usableChapters.map((ch, index) => (
                  <div key={ch.id} className="border-b border-white/[0.04] px-6 py-6">
                    <div className="font-dmMono text-[0.55rem] uppercase tracking-[0.18em] text-[rgba(196,164,255,0.5)]">
                      {ch.icon} {ch.label.trim() || `${L('Chapter', 'Kapitel')} ${index + 1}`}
                    </div>
                    <p className="font-dmSans mt-3 text-[0.84rem] font-light leading-relaxed text-[#f7f2ec]/65">
                      {ch.text.length > 280 ? `${ch.text.slice(0, 280)}…` : ch.text}
                    </p>
                    {ch.quote.trim() ? (
                      <blockquote className="font-fraunces mt-4 border-l-2 border-[#818cf8] pl-3 text-[0.9rem] italic text-[#f7f2ec]/80">
                        &ldquo;{ch.quote.trim()}&rdquo;
                      </blockquote>
                    ) : null}
                  </div>
                ))}
                <div className="flex items-center justify-center gap-2 border-t border-[rgba(145,82,255,0.3)] bg-[rgba(145,82,255,0.15)] px-6 py-3 font-primary text-[0.72rem] text-[rgba(145,82,255,0.8)]">
                  {L('Your wording in the immersive layout', 'Dein Wortlaut im immersiven Layout')}
                </div>
              </div>
            )}

            {format === 'constellation' && (
              <div className="overflow-hidden rounded-2xl bg-[#04020c] font-dmSans text-[#f7f4ff]">
                <div className="border-b border-[rgba(129,140,248,0.1)] px-6 py-6 text-center">
                  <div className="font-fraunces text-2xl font-extrabold tracking-tight">
                    {storyTitle.trim() || L('Untitled story', 'Unbenannte Story')}
                  </div>
                  <p className="font-dmMono mt-2 text-[0.6rem] uppercase tracking-[0.12em] text-[rgba(129,140,248,0.45)]">
                    {L('Tap a row to highlight', 'Zeile antippen zum Hervorheben')}
                  </p>
                </div>
                <div className="px-4 py-2">
                  {usableChapters.map((ch, i) => (
                    <button
                      key={ch.id}
                      type="button"
                      onClick={() => setLitRow(litRow === i ? null : i)}
                      className={`flex w-full items-center gap-4 rounded-lg border-b border-[rgba(129,140,248,0.08)] py-3 pl-2 text-left transition hover:bg-[rgba(129,140,248,0.06)] ${
                        litRow === i ? 'bg-[rgba(129,140,248,0.06)]' : ''
                      }`}
                    >
                      <span
                        className={`h-2 w-2 shrink-0 rounded-full ${litRow === i ? 'bg-[#c4a4ff] shadow-[0_0_12px_#c4a4ff]' : 'bg-[rgba(129,140,248,0.3)]'}`}
                      />
                      <span className="font-dmMono w-5 shrink-0 text-[0.6rem] text-[rgba(129,140,248,0.35)]">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <span className="font-fraunces shrink-0 text-[0.95rem] font-semibold">
                        {ch.icon} {ch.label.trim() || `${L('Chapter', 'Kapitel')} ${i + 1}`}
                      </span>
                      <span className="min-w-0 flex-1 truncate text-[0.75rem] text-[#f7f4ff]/35">
                        {ch.text.length > 80 ? `${ch.text.slice(0, 80)}…` : ch.text}
                      </span>
                    </button>
                  ))}
                </div>
                <div className="flex items-center justify-center gap-2 border-t border-[rgba(129,140,248,0.15)] bg-[rgba(129,140,248,0.08)] px-6 py-3 font-primary text-[0.72rem] text-[rgba(129,140,248,0.6)]">
                  {L('Your wording in the constellation layout', 'Dein Wortlaut im Konstellations-Layout')}
                </div>
              </div>
            )}

            <div className="mt-6 rounded-[14px] border border-white/10 bg-white/[0.04] p-4">
              <label className="flex cursor-pointer items-start gap-3 text-[0.82rem] leading-relaxed text-white/65 hover:text-white/80">
                <input
                  type="checkbox"
                  checked={consentGiven}
                  onChange={(event) => {
                    setConsentGiven(event.target.checked);
                    setSubmissionStatus(null);
                  }}
                  disabled={submissionStatus?.type === 'success'}
                  className="mt-1 accent-[#9152FF]"
                />
                <span>
                  {L(
                    'I confirm that I have consent to submit this story for human review by Building Bridges. I understand it will not be published automatically.',
                    'Ich bestätige, dass ich die Zustimmung habe, diese Story zur menschlichen Prüfung durch Building Bridges einzureichen. Mir ist bewusst, dass sie nicht automatisch veröffentlicht wird.'
                  )}
                </span>
              </label>
              {submissionStatus ? (
                <p
                  className={`mt-3 rounded-xl px-3 py-2 text-[0.8rem] font-semibold ${
                    submissionStatus.type === 'success'
                      ? 'bg-emerald-400/10 text-emerald-200 ring-1 ring-emerald-300/25'
                      : 'bg-rose-400/10 text-rose-200 ring-1 ring-rose-300/25'
                  }`}
                >
                  {submissionStatus.message}
                </p>
              ) : null}
            </div>

            <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => goTo(3)}
                  className="rounded-full border border-[rgba(145,82,255,0.35)] px-3 py-1.5 text-[0.78rem] text-[#B580FF] hover:bg-[rgba(145,82,255,0.1)]"
                >
                  {L('✎ Edit chapters', '✎ Kapitel bearbeiten')}
                </button>
                <button
                  type="button"
                  onClick={() => goTo(1)}
                  className="rounded-full border border-white/10 px-3 py-1.5 text-[0.78rem] text-white/40 hover:text-white/70"
                >
                  {L('↺ New transcript', '↺ Neues Transkript')}
                </button>
              </div>
              <button
                type="button"
                onClick={handleSubmitForReview}
                disabled={isSubmitting || submissionStatus?.type === 'success'}
                className="rounded-full bg-gradient-to-br from-[#9152FF] to-[#7339E0] px-5 py-2.5 text-[0.84rem] font-semibold text-white disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isSubmitting
                  ? L('Submitting…', 'Wird eingereicht…')
                  : submissionStatus?.type === 'success'
                    ? L('Submitted for review', 'Zur Prüfung eingereicht')
                    : L('Submit for review', 'Zur Prüfung einreichen')}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
