'use client';

import { startTransition, useCallback, useEffect, useRef, useState } from 'react';
import { AiInterviewChat, type InterviewAnswer } from '@/components/landing/AiInterviewChat';
import { submitStoryToolStory } from '@/lib/actions/story-tool';
import { useLanguage } from '@/lib/hooks/useLanguage';
import {
  clampSummary,
  failedPartChapter,
  missingSpeakerShare,
  splitTranscriptParts,
  summaryFromChapter,
  summaryPromptText,
} from '@/lib/ai/story-structure';
import {
  clearStoryToolDraft,
  loadStoryToolDraft,
  saveStoryToolDraft,
} from '@/lib/story-tool-draft';

type CollectMode = 'paste' | 'interview';
type StoryKind = 'mentor' | 'participant' | 'awareness';
type PreviewFormat = 'immersive' | 'constellation' | 'timeline' | 'quotes' | 'card' | 'album';
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
    summary?: string;
    chapters?: { title: string; text: string; fallback?: boolean }[];
    runId?: string;
    message?: string;
    code?: string;
  };
}

async function requestStructure(
  input: {
    locale: 'en' | 'de';
    mode: 'chapters' | 'summary';
    text: string;
    runId?: string;
    partNumber?: number;
  },
  signal: AbortSignal
) {
  const response = await fetch('/api/story-assist', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ action: 'structure', ...input }),
    signal,
  });
  return (await response.json()) as {
    success?: boolean;
    chapters?: { title: string; text: string }[];
    summary?: string;
    runId?: string;
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

function submitErrorCopy(L: (en: string, de: string) => string, message: string) {
  const text = message.trim().toLowerCase();
  if (text.includes('sign in')) {
    return L('Please sign in to submit a story.', 'Bitte melde dich an, um eine Story einzureichen.');
  }
  if (text.includes('consent')) {
    return L(
      'Please confirm consent before submitting this story for review.',
      'Bitte bestätige die Zustimmung, bevor du diese Story zur Prüfung einreichst.'
    );
  }
  return L(
    `${message} Your draft is still saved on this device.`,
    `${message} Dein Entwurf bleibt auf diesem Gerät gespeichert.`
  );
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
  const [format, setFormat] = useState<PreviewFormat>('immersive');
  const [litRow, setLitRow] = useState<number | null>(null);
  const [albumIndex, setAlbumIndex] = useState(0);
  const [storySummary, setStorySummary] = useState('');
  const [consentGiven, setConsentGiven] = useState(false);
  const [subjectConsent, setSubjectConsent] = useState(false);
  const [structureBusy, setStructureBusy] = useState(false);
  const [structureProgress, setStructureProgress] = useState('');
  const [structureError, setStructureError] = useState<string | null>(null);
  const [structureCoverageWarning, setStructureCoverageWarning] = useState(false);
  const [structureLeftOutQuestions, setStructureLeftOutQuestions] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState<SubmissionStatus>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [assistByChapter, setAssistByChapter] = useState<Record<string, ChapterAssist>>({});
  const [titleBusy, setTitleBusy] = useState(false);
  const [titleError, setTitleError] = useState<string | null>(null);
  const [titleSuggestions, setTitleSuggestions] = useState<string[]>([]);
  const [draftBusy, setDraftBusy] = useState(false);
  const [draftError, setDraftError] = useState<string | null>(null);
  const [draftReady, setDraftReady] = useState(false);
  const [draftHydrated, setDraftHydrated] = useState(false);
  const sessionIdRef = useRef('');
  const lastSourceKeyRef = useRef('');
  const chaptersTouchedRef = useRef(false);
  const structureAbortRef = useRef<AbortController | null>(null);

  useEffect(() => {
    const draft = loadStoryToolDraft();
    if (draft) {
      setStep(draft.step);
      setCollectMode(draft.collectMode);
      setTranscript(draft.transcript);
      setAnswers(draft.answers);
      setStoryTitle(draft.storyTitle);
      setStorySummary(draft.storySummary);
      setChapters(draft.chapters);
      if (draft.chapters.length > 0) chaptersTouchedRef.current = true;
      setStoryType(draft.storyType);
      setConsentGiven(draft.consentGiven);
      setSubjectConsent(draft.subjectConsent);
      if (draft.sessionId) sessionIdRef.current = draft.sessionId;
    }
    setDraftHydrated(true);
  }, []);

  useEffect(() => {
    if (!draftHydrated) return;
    if (submissionStatus?.type === 'success') {
      clearStoryToolDraft();
      return;
    }
    saveStoryToolDraft({
      step,
      collectMode,
      transcript,
      answers,
      storyTitle,
      storySummary,
      chapters,
      storyType,
      consentGiven,
      subjectConsent,
      sessionId: sessionIdRef.current,
    });
  }, [
    answers,
    chapters,
    collectMode,
    consentGiven,
    draftHydrated,
    step,
    storySummary,
    subjectConsent,
    storyTitle,
    storyType,
    submissionStatus?.type,
    transcript,
  ]);

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
      if (next === 3 && !chaptersTouchedRef.current && lastSourceKeyRef.current !== sourceKey) {
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

  const markChaptersTouched = () => {
    chaptersTouchedRef.current = true;
  };

  const updateChapter = (id: string, patch: Partial<Chapter>) => {
    markChaptersTouched();
    setChapters((current) => current.map((chapter) => (chapter.id === id ? { ...chapter, ...patch } : chapter)));
  };

  const addChapter = () => {
    markChaptersTouched();
    setChapters((current) => [...current, makeChapter({}, current.length)]);
  };

  const removeChapter = (id: string) => {
    markChaptersTouched();
    setChapters((current) => (current.length <= 1 ? current : current.filter((chapter) => chapter.id !== id)));
  };

  const moveChapter = (id: string, direction: -1 | 1) => {
    markChaptersTouched();
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
      setStorySummary(clampSummary(result.summary || summaryFromChapter(result.draft || '')));
      setDraftReady(true);
    } catch {
      setDraftError(L('AI help is not available right now.', 'KI-Hilfe ist gerade nicht verfügbar.'));
    } finally {
      setDraftBusy(false);
    }
  };

  const mergeWithPrevious = (id: string) => {
    markChaptersTouched();
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

  const structureTranscript = async () => {
    const source = transcript.trim();
    if (source.length < 10) {
      setStructureError(
        L(
          'Paste a transcript first. You can still split it into chapters yourself.',
          'Füge zuerst ein Transkript ein. Du kannst es auch selbst in Kapitel teilen.'
        )
      );
      return;
    }
    if (chaptersTouchedRef.current && chapters.some((chapter) => chapter.text.trim())) {
      const replace = window.confirm(
        L(
          'Replace the chapters you already edited with a new structure?',
          'Die Kapitel, die du schon bearbeitet hast, durch eine neue Gliederung ersetzen?'
        )
      );
      if (!replace) return;
    }

    const parts = splitTranscriptParts(source);
    const controller = new AbortController();
    structureAbortRef.current = controller;
    setStructureBusy(true);
    setStructureError(null);
    setStructureCoverageWarning(false);
    setStructureLeftOutQuestions(false);
    const startedAt = Date.now();
    const collected: { title: string; text: string }[] = [];
    let runId = '';
    let failedPart = false;

    try {
      for (let index = 0; index < parts.length; index += 1) {
        if (controller.signal.aborted) return;
        setStructureProgress(
          L(`Part ${index + 1} of ${parts.length}...`, `Teil ${index + 1} von ${parts.length}...`)
        );
        try {
          const result = await requestStructure(
            {
              locale: isDe ? 'de' : 'en',
              mode: 'chapters',
              text: parts[index],
              runId: runId || undefined,
              partNumber: index + 1,
            },
            controller.signal
          );
          if (controller.signal.aborted) return;
          if (!result.success || !result.chapters?.length) {
            if (index === 0 && !result.runId) {
              setStructureError(
                L(
                  'Structuring is not available right now. You can still split the text into chapters yourself.',
                  'Das Gliedern ist gerade nicht möglich. Du kannst den Text trotzdem selbst in Kapitel teilen.'
                )
              );
              return;
            }
            failedPart = true;
            collected.push(failedPartChapter(index + 1, parts[index]));
            continue;
          }
          runId = result.runId || runId;
          collected.push(...result.chapters);
        } catch (error) {
          if (controller.signal.aborted || (error instanceof DOMException && error.name === 'AbortError')) return;
          if (index === 0 && collected.length === 0 && !runId) {
            setStructureError(
              L(
                'Structuring is not available right now. You can still split the text into chapters yourself.',
                'Das Gliedern ist gerade nicht möglich. Du kannst den Text trotzdem selbst in Kapitel teilen.'
              )
            );
            return;
          }
          failedPart = true;
          collected.push(failedPartChapter(index + 1, parts[index]));
        }
      }

      if (controller.signal.aborted) return;
      if (runId && collected.length > 0) {
        setStructureProgress(L('Writing a short summary...', 'Kurze Zusammenfassung wird geschrieben...'));
        try {
          const summaryResult = await requestStructure(
            {
              locale: isDe ? 'de' : 'en',
              mode: 'summary',
              text: summaryPromptText(collected),
              runId,
            },
            controller.signal
          );
          if (summaryResult.success && summaryResult.summary) {
            setStorySummary(clampSummary(summaryResult.summary));
          } else {
            setStorySummary(summaryFromChapter(collected[0]?.text ?? ''));
          }
        } catch (error) {
          if (controller.signal.aborted || (error instanceof DOMException && error.name === 'AbortError')) return;
          setStorySummary(summaryFromChapter(collected[0]?.text ?? ''));
        }
      }

      const nextChapters = collected.map((chapter, index) =>
        makeChapter({ label: chapter.title, text: chapter.text }, index)
      );
      setChapters(nextChapters);
      chaptersTouchedRef.current = true;
      lastSourceKeyRef.current = sourceKey;
      setStructureLeftOutQuestions(true);
      const missing = missingSpeakerShare(
        source,
        nextChapters.map((chapter) => chapter.text)
      );
      if (missing > 0.15) {
        setStructureCoverageWarning(true);
        setStep(1);
      } else {
        setStep(3);
      }
      if (failedPart) {
        setStructureError(
          L(
            'One part could not be structured, so it was kept in full. You can still split that part yourself.',
            'Ein Teil konnte nicht gegliedert werden und bleibt deshalb vollständig erhalten. Du kannst diesen Teil selbst teilen.'
          )
        );
      }
      if (process.env.NODE_ENV === 'development') {
        console.info(
          `Story structure: parts=${parts.length} chapters=${nextChapters.length} ms=${Date.now() - startedAt}`
        );
      }
    } finally {
      if (structureAbortRef.current === controller) structureAbortRef.current = null;
      setStructureBusy(false);
      setStructureProgress('');
    }
  };

  const cancelStructure = () => {
    structureAbortRef.current?.abort();
    setStructureError(
      L(
        'Stopped. You can still split the text into chapters yourself.',
        'Angehalten. Du kannst den Text trotzdem selbst in Kapitel teilen.'
      )
    );
  };

  const resetCollectedStory = () => {
    structureAbortRef.current?.abort();
    setTranscript('');
    setAnswers([]);
    setChapters([]);
    chaptersTouchedRef.current = false;
    setAssistByChapter({});
    setTitleSuggestions([]);
    setTitleError(null);
    setDraftError(null);
    setDraftReady(false);
    setStorySummary('');
    setStructureError(null);
    setStructureCoverageWarning(false);
    setStructureLeftOutQuestions(false);
    setStructureBusy(false);
    setStructureProgress('');
    setConsentGiven(false);
    setSubjectConsent(false);
    setSubmissionStatus(null);
    sessionIdRef.current = '';
    lastSourceKeyRef.current = '';
    clearStoryToolDraft();
  };

  const handleSubmitForReview = useCallback(() => {
    if (isSubmitting || submissionStatus?.type === 'success') return;

    if (!consentGiven || !subjectConsent) {
      setSubmissionStatus({
        type: 'error',
        message: L(
          'Please confirm both consent boxes before submitting this story for review.',
          'Bitte bestätige beide Zustimmungskästchen, bevor du diese Story zur Prüfung einreichst.'
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

    const summary = clampSummary(storySummary) || summaryFromChapter(readyChapters[0].text);
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
          if (result.success) {
            clearStoryToolDraft();
            setSubmissionStatus({
              type: 'success',
              message: L(
                'Your story has been submitted for human review. It is not public yet.',
                'Deine Story wurde zur menschlichen Prüfung eingereicht. Sie ist noch nicht öffentlich.'
              ),
            });
            return;
          }
          saveStoryToolDraft({
            step: 4,
            collectMode,
            transcript,
            answers,
            storyTitle,
            storySummary,
            chapters,
            storyType,
            consentGiven: true,
            subjectConsent: true,
            sessionId: sessionIdRef.current,
          });
          setSubmissionStatus({
            type: 'error',
            message: submitErrorCopy(L, result.message),
          });
        })
        .catch((error) => {
          console.error('Story tool submission failed:', error);
          saveStoryToolDraft({
            step: 4,
            collectMode,
            transcript,
            answers,
            storyTitle,
            storySummary,
            chapters,
            storyType,
            consentGiven: true,
            subjectConsent: true,
            sessionId: sessionIdRef.current,
          });
          setSubmissionStatus({
            type: 'error',
            message: L(
              'We could not submit the story right now. Your draft is still saved on this device — try again without leaving this page.',
              'Die Story konnte gerade nicht eingereicht werden. Dein Entwurf bleibt auf diesem Gerät gespeichert — versuche es erneut, ohne die Seite zu verlassen.'
            ),
          });
        })
        .finally(() => {
          setIsSubmitting(false);
        });
    });
  }, [answers, chapters, collectMode, consentGiven, isDe, isSubmitting, storySummary, storyTitle, storyType, subjectConsent, submissionStatus?.type, transcript]);

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
                <p className="mt-2 text-[0.76rem] text-white/45">
                  {L(
                    'Do not use the real names of other people.',
                    'Bitte schreib keine echten Namen von anderen Menschen.'
                  )}
                </p>
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
                <div className="mt-4 flex flex-wrap items-center gap-3">
                  <button
                    type="button"
                    onClick={() => void structureTranscript()}
                    disabled={structureBusy}
                    className="rounded-full border border-[rgba(145,82,255,0.35)] px-4 py-2 text-[0.82rem] font-semibold text-[#B580FF] hover:bg-[rgba(145,82,255,0.1)] disabled:opacity-50"
                  >
                    {structureBusy
                      ? structureProgress || L('Structuring...', 'Wird gegliedert...')
                      : L('Structure my transcript', 'Transkript gliedern')}
                  </button>
                  {structureBusy ? (
                    <button
                      type="button"
                      onClick={cancelStructure}
                      className="rounded-full border border-white/15 px-3 py-2 text-[0.78rem] text-white/60 hover:text-white"
                    >
                      {L('Cancel', 'Abbrechen')}
                    </button>
                  ) : null}
                </div>
                {structureCoverageWarning ? (
                  <p className="mt-3 text-[0.8rem] text-amber-100">
                    {L(
                      'Some parts of your text were not placed in chapters. Please check.',
                      'Einige Teile deines Textes wurden nicht in Kapitel eingeordnet. Bitte prüfe das.'
                    )}
                  </p>
                ) : null}
                {structureLeftOutQuestions ? (
                  <p className="mt-2 text-[0.78rem] text-white/55">
                    {L(
                      'Questions from the interviewer were left out. Please check that nothing important is missing.',
                      'Fragen der interviewenden Person wurden weggelassen. Bitte prüfe, ob nichts Wichtiges fehlt.'
                    )}
                  </p>
                ) : null}
                {structureError ? <p className="mt-2 text-[0.78rem] text-rose-200/80">{structureError}</p> : null}
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
                'Give the story a name and say whose story it is. Optional AI can fill the title, the type, and a short summary. It will not replace your chapters.',
                'Gib der Story einen Namen und sage, wessen Geschichte es ist. Optional kann die KI Titel, Typ und eine kurze Zusammenfassung ausfüllen. Deine Kapitel werden nicht ersetzt.'
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
                    'Title, story type, and the short summary are filled in. Your chapters were not replaced.',
                    'Titel, Story-Typ und die kurze Zusammenfassung sind ausgefüllt. Deine Kapitel wurden nicht ersetzt.'
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
            {structureCoverageWarning ? (
              <p className="mt-3 text-[0.8rem] text-amber-100">
                {L(
                  'Some parts of your text were not placed in chapters. Please check.',
                  'Einige Teile deines Textes wurden nicht in Kapitel eingeordnet. Bitte prüfe das.'
                )}
              </p>
            ) : null}
            {structureLeftOutQuestions ? (
              <p className="mt-2 text-[0.78rem] text-white/55">
                {L(
                  'Questions from the interviewer were left out. Please check that nothing important is missing.',
                  'Fragen der interviewenden Person wurden weggelassen. Bitte prüfe, ob nichts Wichtiges fehlt.'
                )}
              </p>
            ) : null}
            <p className="mb-6 mt-1 text-[0.84rem] text-white/45">
              {L(
                collectMode === 'interview'
                  ? 'Each answer is one chapter. Rename, edit, merge, or delete. Optional AI can fix grammar or suggest names. You choose what to keep. Review every chapter before you submit.'
                  : 'Rename, edit, merge, or delete. If structuring was unavailable, the paste stays as one chapter and you can split it yourself. Review every chapter before you submit.',
                collectMode === 'interview'
                  ? 'Jede Antwort ist ein Kapitel. Benenne um, bearbeite, führe zusammen oder lösche. Optional kann KI Grammatik korrigieren oder Namen vorschlagen. Du entscheidest, was bleibt. Prüfe jedes Kapitel, bevor du einreichst.'
                  : 'Benenne um, bearbeite, führe zusammen oder lösche. Wenn das Gliedern nicht möglich war, bleibt der Text ein Kapitel und du kannst ihn selbst teilen. Prüfe jedes Kapitel, bevor du einreichst.'
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
                'This is your wording in the story layouts. Globe and video views stay on Community stories after a story is published.',
                'Das ist dein Wortlaut in den Story-Layouts. Globus und Video bleiben nach der Veröffentlichung unter Community-Stories.'
              )}
            </p>
            <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
              {(
                [
                  ['immersive', '📜', 'Immersive Scroll', 'Immersives Scrollen', 'Narrative blocks', 'Erzählblöcke'],
                  ['constellation', '✦', 'Constellation', 'Konstellation', 'Highlight moments', 'Momente hervorheben'],
                  ['timeline', '⏱', 'Timeline', 'Zeitleiste', 'Chapter path', 'Kapitelpfad'],
                  ['quotes', '💬', 'Quotes', 'Zitate', 'Stand-out lines', 'Hervorgehobene Zeilen'],
                  ['card', '🗂️', 'Story card', 'Story-Karte', 'Compact preview', 'Kompakte Vorschau'],
                  ['album', '🖼️', 'Album', 'Album', 'Chapter by chapter', 'Kapitel für Kapitel'],
                ] as const
              ).map(([id, icon, en, de, enHint, deHint]) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => setFormat(id)}
                  className={`rounded-[14px] border-[1.5px] p-4 text-center transition ${
                    format === id
                      ? 'border-[#9152FF] bg-[rgba(145,82,255,0.18)]'
                      : 'border-white/10 bg-white/[0.04] hover:border-[rgba(145,82,255,0.4)]'
                  }`}
                >
                  <div className="mb-1 text-2xl">{icon}</div>
                  <div className="text-[0.84rem] font-bold text-white">{L(en, de)}</div>
                  <p className="mt-1 text-[0.7rem] text-white/45">{L(enHint, deHint)}</p>
                </button>
              ))}
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

            {format === 'timeline' && (
              <div className="overflow-hidden rounded-2xl bg-[#07060d] px-6 py-8 text-[#f7f4ff]">
                <div className="mb-6">
                  <div className="font-dmMono text-[0.6rem] uppercase tracking-[0.18em] text-[rgba(145,82,255,0.7)]">
                    {L('Timeline', 'Zeitleiste')} · {storyTypeLabel}
                  </div>
                  <h5 className="font-fraunces mt-2 text-2xl font-extrabold">
                    {storyTitle.trim() || L('Untitled story', 'Unbenannte Story')}
                  </h5>
                </div>
                <ol className="relative ml-3 space-y-6 border-l border-[rgba(145,82,255,0.35)] pl-6">
                  {usableChapters.map((ch, index) => (
                    <li key={ch.id}>
                      <span className="absolute -left-[7px] mt-1.5 h-3.5 w-3.5 rounded-full border-2 border-[#9152FF] bg-[#07060d]" />
                      <p className="font-dmMono text-[0.6rem] uppercase tracking-[0.14em] text-white/45">
                        {ch.icon} {ch.label.trim() || `${L('Chapter', 'Kapitel')} ${index + 1}`}
                      </p>
                      <p className="mt-2 text-[0.84rem] leading-relaxed text-white/70">
                        {ch.text.length > 220 ? `${ch.text.slice(0, 220)}…` : ch.text}
                      </p>
                    </li>
                  ))}
                </ol>
              </div>
            )}

            {format === 'quotes' && (
              <div className="overflow-hidden rounded-2xl bg-[#0a0814] px-6 py-8 text-[#f7f4ff]">
                <div className="mb-6">
                  <div className="font-dmMono text-[0.6rem] uppercase tracking-[0.18em] text-[rgba(145,82,255,0.7)]">
                    {L('Quotes', 'Zitate')} · {storyTypeLabel}
                  </div>
                  <h5 className="font-fraunces mt-2 text-2xl font-extrabold">
                    {storyTitle.trim() || L('Untitled story', 'Unbenannte Story')}
                  </h5>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  {usableChapters.map((ch, index) => {
                    const line = ch.quote.trim() || ch.text.trim().split(/(?<=[.!?])\s+/)[0] || ch.text.trim();
                    return (
                      <blockquote
                        key={ch.id}
                        className="rounded-2xl border border-[rgba(145,82,255,0.25)] bg-[rgba(145,82,255,0.08)] p-4"
                      >
                        <p className="font-fraunces text-[1.05rem] italic leading-relaxed">
                          &ldquo;{line.length > 180 ? `${line.slice(0, 180)}…` : line}&rdquo;
                        </p>
                        <footer className="mt-3 text-[0.72rem] uppercase tracking-[0.08em] text-white/40">
                          {ch.label.trim() || `${L('Chapter', 'Kapitel')} ${index + 1}`}
                        </footer>
                      </blockquote>
                    );
                  })}
                </div>
              </div>
            )}

            {format === 'card' && (
              <div className="mx-auto max-w-md overflow-hidden rounded-2xl border border-[rgba(145,82,255,0.28)] bg-gradient-to-br from-[#1a1033] to-[#08060f] p-6 text-[#f7f4ff] shadow-[0_18px_40px_rgba(20,8,40,0.45)]">
                <div className="mb-3 inline-flex rounded-full bg-[rgba(145,82,255,0.2)] px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.08em] text-[#d4c2ff]">
                  {storyTypeLabel}
                </div>
                <h5 className="font-fraunces text-2xl font-extrabold leading-tight">
                  {storyTitle.trim() || L('Untitled story', 'Unbenannte Story')}
                </h5>
                <p className="mt-3 text-[0.86rem] leading-relaxed text-white/65">
                  {(usableChapters[0]?.text || '').length > 240
                    ? `${usableChapters[0].text.slice(0, 240)}…`
                    : usableChapters[0]?.text}
                </p>
                {usableChapters.length > 1 ? (
                  <p className="mt-4 border-t border-white/10 pt-4 text-[0.78rem] italic text-white/50">
                    {usableChapters[usableChapters.length - 1].text.length > 140
                      ? `${usableChapters[usableChapters.length - 1].text.slice(0, 140)}…`
                      : usableChapters[usableChapters.length - 1].text}
                  </p>
                ) : null}
                <p className="mt-4 text-[0.68rem] uppercase tracking-[0.1em] text-white/35">
                  {L(`${usableChapters.length} chapters`, `${usableChapters.length} Kapitel`)}
                </p>
              </div>
            )}

            {format === 'album' && (
              <div className="overflow-hidden rounded-2xl bg-[#09070f] px-6 py-8 text-[#f7f4ff]">
                {(() => {
                  const safeIndex = usableChapters.length
                    ? Math.min(albumIndex, usableChapters.length - 1)
                    : 0;
                  const chapter = usableChapters[safeIndex];
                  if (!chapter) return null;
                  return (
                    <>
                      <div className="mb-5 flex items-center justify-between gap-3">
                        <div>
                          <div className="font-dmMono text-[0.6rem] uppercase tracking-[0.18em] text-[rgba(145,82,255,0.7)]">
                            {L('Album', 'Album')} · {storyTypeLabel}
                          </div>
                          <h5 className="font-fraunces mt-2 text-xl font-extrabold">
                            {storyTitle.trim() || L('Untitled story', 'Unbenannte Story')}
                          </h5>
                        </div>
                        <p className="text-[0.72rem] text-white/40">
                          {safeIndex + 1} / {usableChapters.length}
                        </p>
                      </div>
                      <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
                        <p className="text-[0.75rem] font-semibold uppercase tracking-[0.08em] text-[#d4c2ff]">
                          {chapter.icon} {chapter.label.trim() || `${L('Chapter', 'Kapitel')} ${safeIndex + 1}`}
                        </p>
                        <p className="mt-3 text-[0.9rem] leading-relaxed text-white/75">{chapter.text}</p>
                        {chapter.quote.trim() ? (
                          <blockquote className="font-fraunces mt-4 border-l-2 border-[#818cf8] pl-3 italic text-white/80">
                            &ldquo;{chapter.quote.trim()}&rdquo;
                          </blockquote>
                        ) : null}
                      </div>
                      <div className="mt-4 flex justify-between">
                        <button
                          type="button"
                          onClick={() => setAlbumIndex((current) => Math.max(0, current - 1))}
                          disabled={safeIndex === 0}
                          className="rounded-full border border-white/15 px-3 py-1.5 text-[0.78rem] text-white/70 disabled:opacity-30"
                        >
                          {L('Previous', 'Zurück')}
                        </button>
                        <button
                          type="button"
                          onClick={() =>
                            setAlbumIndex((current) => Math.min(usableChapters.length - 1, current + 1))
                          }
                          disabled={safeIndex >= usableChapters.length - 1}
                          className="rounded-full border border-white/15 px-3 py-1.5 text-[0.78rem] text-white/70 disabled:opacity-30"
                        >
                          {L('Next', 'Weiter')}
                        </button>
                      </div>
                    </>
                  );
                })()}
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
              <label className="mt-4 flex cursor-pointer items-start gap-3 text-[0.82rem] leading-relaxed text-white/65 hover:text-white/80">
                <input
                  type="checkbox"
                  checked={subjectConsent}
                  onChange={(event) => {
                    setSubjectConsent(event.target.checked);
                    setSubmissionStatus(null);
                  }}
                  disabled={submissionStatus?.type === 'success'}
                  className="mt-1 accent-[#9152FF]"
                />
                <span>
                  {L(
                    'I confirm that the person whose story this is has agreed to its publication.',
                    'Ich bestätige, dass die Person, um deren Geschichte es geht, der Veröffentlichung zugestimmt hat.'
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
