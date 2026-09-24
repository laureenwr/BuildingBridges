'use client';

import { Mic } from 'lucide-react';
import { useRef, useState } from 'react';
import { useVoiceDraft } from '@/components/landing/useVoiceDraft';

type InterviewMessage = {
  role: 'assistant' | 'user';
  content: string;
};

type ChatProps = {
  isDe: boolean;
  onTranscriptChange: (transcript: string) => void;
  onReady: () => void;
};

export function AiInterviewChat({ isDe, onTranscriptChange, onReady }: ChatProps) {
  const L = (en: string, de: string) => (isDe ? de : en);
  const [consented, setConsented] = useState(false);
  const [started, setStarted] = useState(false);
  const [messages, setMessages] = useState<InterviewMessage[]>([]);
  const [draft, setDraft] = useState('');
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const { recording, transcribing, voiceError, toggleListening } = useVoiceDraft(
    draft,
    setDraft,
    isDe,
    busy || done
  );

  const scrollToEnd = () => {
    requestAnimationFrame(() => {
      listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: 'smooth' });
    });
  };

  const sendTurn = async (action: 'start' | 'reply' | 'skip' | 'finish', nextMessages: InterviewMessage[]) => {
    setBusy(true);
    setError(null);
    try {
      const response = await fetch('/api/story-interview', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          locale: isDe ? 'de' : 'en',
          action,
          messages: nextMessages,
        }),
      });
      const result = (await response.json()) as {
        success?: boolean;
        reply?: string;
        done?: boolean;
        transcript?: string;
        message?: string;
      };
      if (!response.ok || !result.success || !result.reply) {
        throw new Error(result.message || 'Interview request failed');
      }

      const withReply = [...nextMessages, { role: 'assistant' as const, content: result.reply }];
      setMessages(withReply);
      if (result.transcript) onTranscriptChange(result.transcript);
      if (result.done) {
        setDone(true);
        if (result.transcript) onTranscriptChange(result.transcript);
      }
      scrollToEnd();
    } catch (err) {
      console.error(err);
      setError(
        L(
          'The interview could not continue right now. You can try again or paste a transcript instead.',
          'Das Interview konnte gerade nicht fortgesetzt werden. Versuche es erneut oder füge stattdessen ein Transkript ein.'
        )
      );
    } finally {
      setBusy(false);
    }
  };

  const startInterview = () => {
    if (!consented || busy) return;
    setStarted(true);
    setDone(false);
    setMessages([]);
    void sendTurn('start', []);
  };

  const sendReply = () => {
    const text = draft.trim();
    if (!text || busy || done) return;
    const next = [...messages, { role: 'user' as const, content: text }];
    setDraft('');
    setMessages(next);
    void sendTurn('reply', next);
  };

  const skipQuestion = () => {
    if (busy || done) return;
    void sendTurn('skip', messages);
  };

  const finishInterview = () => {
    if (busy) return;
    void sendTurn('finish', messages);
  };

  if (!started) {
    return (
      <div>
        <label className="flex cursor-pointer items-start gap-3 rounded-[14px] border border-white/10 bg-white/[0.04] p-4 text-[0.82rem] leading-relaxed text-white/65 hover:text-white/80">
          <input
            type="checkbox"
            checked={consented}
            onChange={(event) => setConsented(event.target.checked)}
            className="mt-1 accent-[#9152FF]"
          />
          <span>
            {L(
              'I understand this is a private drafting conversation. I can skip or stop anytime. Nothing is published until I submit the story for human review.',
              'Ich verstehe, dass dies ein privates Entwurfsgespräch ist. Ich kann jederzeit überspringen oder aufhören. Nichts wird veröffentlicht, bevor ich die Story zur menschlichen Prüfung einreiche.'
            )}
          </span>
        </label>
        <div className="mt-5">
          <button
            type="button"
            onClick={startInterview}
            disabled={!consented || busy}
            className="rounded-full bg-gradient-to-br from-[#9152FF] to-[#7339E0] px-5 py-2.5 text-[0.84rem] font-semibold text-white disabled:cursor-not-allowed disabled:opacity-50"
          >
            {L('Start the AI interview', 'KI-Interview starten')}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div
        ref={listRef}
        className="flex max-h-[360px] min-h-[220px] flex-col gap-3 overflow-y-auto rounded-xl border border-white/10 bg-black/20 p-4"
      >
        {messages.map((message, index) => (
          <div
            key={`${message.role}-${index}`}
            className={
              message.role === 'assistant'
                ? 'max-w-[90%] rounded-2xl rounded-tl-sm border border-[rgba(145,82,255,0.25)] bg-[rgba(145,82,255,0.14)] px-3.5 py-2.5 text-[0.84rem] leading-relaxed text-white/90'
                : 'ml-auto max-w-[90%] rounded-2xl rounded-tr-sm bg-white/10 px-3.5 py-2.5 text-[0.84rem] leading-relaxed text-white'
            }
          >
            {message.content}
          </div>
        ))}
        {busy ? (
          <p className="text-[0.78rem] text-[#B580FF]">{L('Thinking…', 'Ich denke nach…')}</p>
        ) : null}
      </div>

      {error || voiceError ? (
        <p className="mt-3 rounded-xl bg-rose-400/10 px-3 py-2 text-[0.8rem] font-semibold text-rose-200 ring-1 ring-rose-300/25">
          {error || voiceError}
        </p>
      ) : null}

      {done ? (
        <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
          <p className="text-[0.82rem] text-white/55">
            {L(
              'The interview is saved as a draft transcript. You can still edit it after this step.',
              'Das Interview ist als Transkript-Entwurf gespeichert. Du kannst es danach noch bearbeiten.'
            )}
          </p>
          <button
            type="button"
            onClick={onReady}
            className="rounded-full bg-gradient-to-br from-[#9152FF] to-[#7339E0] px-5 py-2.5 text-[0.84rem] font-semibold text-white"
          >
            {L('Next → Configure', 'Weiter → Konfigurieren')}
          </button>
        </div>
      ) : (
        <div className="mt-4">
          <div className="relative">
            <textarea
              className="min-h-[88px] w-full resize-y rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 pr-14 font-primary text-[0.88rem] leading-relaxed text-white outline-none placeholder:text-white/20 focus:border-[rgba(145,82,255,0.5)]"
              placeholder={L('Type or speak your answer…', 'Tippe oder sprich deine Antwort…')}
              value={draft}
              disabled={busy || transcribing}
              onChange={(event) => setDraft(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === 'Enter' && !event.shiftKey) {
                  event.preventDefault();
                  sendReply();
                }
              }}
            />
            <button
              type="button"
              onClick={toggleListening}
              disabled={busy || transcribing}
              aria-pressed={recording}
              aria-label={
                recording
                  ? L('Stop recording', 'Aufnahme beenden')
                  : L('Speak your answer', 'Antwort sprechen')
              }
              className={`absolute bottom-3 right-3 inline-flex h-10 w-10 items-center justify-center rounded-full transition disabled:cursor-not-allowed disabled:opacity-50 ${
                recording
                  ? 'bg-[#E24B4A] text-white shadow-[0_0_0_4px_rgba(226,75,74,0.2)]'
                  : 'bg-[#9152FF] text-white hover:bg-[#7339E0]'
              }`}
            >
              <Mic className="h-4 w-4" />
            </button>
          </div>
          <p className="mt-2 text-[0.75rem] text-white/40">
            {transcribing
              ? L('Turning your voice into text…', 'Deine Stimme wird in Text umgewandelt…')
              : recording
                ? L('Listening. Tap the microphone to stop.', 'Ich höre zu. Tippe auf das Mikrofon zum Stoppen.')
                : L('Tap the microphone to speak. You can edit the text before sending.', 'Tippe auf das Mikrofon zum Sprechen. Du kannst den Text vor dem Senden noch ändern.')}
          </p>
          <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={skipQuestion}
                disabled={busy || recording || transcribing}
                className="rounded-full border border-white/10 px-3 py-1.5 text-[0.78rem] text-white/45 hover:text-white/75 disabled:opacity-50"
              >
                {L('Skip this question', 'Diese Frage überspringen')}
              </button>
              <button
                type="button"
                onClick={finishInterview}
                disabled={busy || recording || transcribing}
                className="rounded-full border border-[rgba(145,82,255,0.35)] px-3 py-1.5 text-[0.78rem] text-[#B580FF] hover:bg-[rgba(145,82,255,0.1)] disabled:opacity-50"
              >
                {L('I am done', 'Ich bin fertig')}
              </button>
            </div>
            <button
              type="button"
              onClick={sendReply}
              disabled={busy || recording || transcribing || !draft.trim()}
              className="rounded-full bg-gradient-to-br from-[#9152FF] to-[#7339E0] px-5 py-2.5 text-[0.84rem] font-semibold text-white disabled:cursor-not-allowed disabled:opacity-50"
            >
              {L('Send', 'Senden')}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
