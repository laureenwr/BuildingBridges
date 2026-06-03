'use client';

import { useCallback, useRef, useState } from 'react';
import { useLanguage } from '@/lib/hooks/useLanguage';

type Chapter = { label: string; icon: string; text: string; quote: string };

function parseTranscriptIntoChapters(
  transcript: string,
  chapterLabels: string[],
  fallbackStoryLabel: string,
  chapterFallback: string
): Chapter[] {
  const sentences = transcript
    .split(/[.!?]+/)
    .map((s) => s.trim())
    .filter((s) => s.length > 20);
  const intervieweeLines = sentences.filter((s) => s.length > 40);
  const totalLines = intervieweeLines.length;
  const chunkSize = Math.max(2, Math.floor(totalLines / 5));
  const icons = ['🌍', '✈️', '🔥', '💡', '🌟'];
  const chapters: Chapter[] = [];
  for (let i = 0; i < 5; i++) {
    const start = i * chunkSize;
    const end = Math.min(start + chunkSize, totalLines);
    const chunk = intervieweeLines.slice(start, end).join('. ');
    if (chunk.length > 30) {
      chapters.push({
        label: chapterLabels[i] ?? `${chapterFallback} ${i + 1}`,
        icon: icons[i] ?? '✦',
        text: chunk,
        quote: intervieweeLines[start] ?? '',
      });
    }
  }
  if (chapters.length === 0 && transcript.length > 20) {
    chapters.push({
      label: fallbackStoryLabel,
      icon: '✦',
      text: transcript.slice(0, 400),
      quote: transcript.slice(0, 100),
    });
  }
  return chapters;
}

function getChapterHeading(text: string) {
  const words = text.trim().split(/\s+/).slice(0, 5).join(' ');
  const parts = words.split(' ');
  if (parts.length >= 4) {
    return `${parts.slice(0, 3).join(' ')} <em>${parts.slice(3).join(' ')}</em>`;
  }
  return words;
}

export function AiStoryTool() {
  const { isDe } = useLanguage();
  const L = (en: string, de: string) => (isDe ? de : en);
  const chapterLabels = isDe
    ? ['Herkunft', 'Die Reise', 'Herausforderungen', 'Wendepunkt', 'Heute']
    : ['Origin', 'The Journey', 'Challenges', 'Turning Point', 'Today'];

  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [transcript, setTranscript] = useState('');
  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [storyType, setStoryType] = useState('mentor');
  const [format, setFormat] = useState<'immersive' | 'constellation'>('immersive');
  const [litRow, setLitRow] = useState<number | null>(null);
  const progressRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const charLabel = L(`${transcript.length.toLocaleString()} characters`, `${transcript.length.toLocaleString()} Zeichen`);

  const goTo = useCallback(
    (s: 1 | 2 | 3 | 4) => {
      if (s === 2 && transcript.trim().length < 10) {
        window.alert(L('Please paste some interview text first.', 'Bitte zuerst Interviewtext einfügen.'));
        return;
      }
      setStep(s);
      document.getElementById('ai-story-tool')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    },
    [transcript, isDe]
  );

  const runGenerate = useCallback(() => {
    const t = transcript.trim();
    if (!t) {
      window.alert(L('Please paste a transcript first.', 'Bitte zuerst ein Transkript einfügen.'));
      return;
    }
    setStep(3);
    const bar = document.getElementById('ai-gen-bar');
    const statusEl = document.getElementById('ai-gen-status');
    const statuses = isDe
      ? [
          'Transkript wird gelesen…',
          'Schlüsselmomente werden erkannt…',
          'Story wird strukturiert…',
          'Datenschutzeinstellungen werden angewendet…',
          'Vorschau wird vorbereitet…',
        ]
      : [
          'Reading the transcript…',
          'Identifying key moments…',
          'Structuring the story…',
          'Applying privacy settings…',
          'Preparing previews…',
        ];
    let progress = 0;
    let si = 0;
    if (bar) bar.style.width = '0%';
    if (progressRef.current) clearInterval(progressRef.current);
    progressRef.current = setInterval(() => {
      progress = Math.min(progress + Math.random() * 15, 90);
      if (bar) bar.style.width = `${progress}%`;
      if (statusEl && si < statuses.length && progress > (si + 1) * 18) {
        statusEl.textContent = statuses[si];
        si += 1;
      }
    }, 400);

    setTimeout(() => {
      if (progressRef.current) clearInterval(progressRef.current);
      if (bar) bar.style.width = '100%';
      const ch = parseTranscriptIntoChapters(
        t,
        chapterLabels,
        L('Her Story', 'Ihre Geschichte'),
        L('Chapter', 'Kapitel')
      );
      setChapters(ch);
      setTimeout(() => {
        setStep(4);
        setFormat('immersive');
      }, 300);
    }, 1800);
  }, [transcript, isDe, chapterLabels]);

  const immTitleHtml = () => {
    const firstWords = transcript.trim().split(/\s+/).slice(0, 6).join(' ');
    if (firstWords.length > 4) {
      const w = firstWords.split(' ');
      return `${w.slice(0, 3).join(' ')}<br/><em>${w.slice(3).join(' ')}</em>`;
    }
    return L('Her <em>Story</em>', 'Ihre <em>Story</em>');
  };

  return (
    <div className="ai-gen-wrapper mt-20 border-t border-white/10 pt-16" id="ai-story-tool">
      <div className="mb-8">
        <div className="mb-3 flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-2 rounded-full border border-amber-400/35 bg-amber-400/10 px-4 py-1.5 text-[0.72rem] font-bold uppercase tracking-[0.08em] text-amber-200">
            {L('Under development', 'In Entwicklung')}
          </span>
          <span className="inline-flex items-center gap-2 rounded-full border border-[rgba(145,82,255,0.4)] bg-[rgba(145,82,255,0.2)] px-4 py-1.5 text-[0.72rem] font-bold uppercase tracking-[0.08em] text-[#B580FF]">
            {L('✦ Sample preview', '✦ Vorschau (Beispiel)')}
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
            'Paste a raw interview transcript, configure the story settings, and preview how it looks in two storytelling formats. API integration coming soon.',
            'Füge ein Interview-Transkript ein, konfiguriere die Story-Einstellungen und sieh dir zwei Storytelling-Formate in der Vorschau an. API-Anbindung folgt in Kürze.'
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
              {n === 1 && L('Paste', 'Einfügen')}
              {n === 2 && L('Configure', 'Konfigurieren')}
              {n === 3 && L('Generate', 'Generieren')}
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
              {L('Paste the interview transcript', 'Interview-Transkript einfügen')}
            </h4>
            <p className="mb-4 mt-1 text-[0.84rem] text-white/45">
              {L(
                'Raw transcript is fine — interviewer questions included. The preview uses interviewee lines only.',
                'Rohtranskript reicht – Fragen der Interviewer:in können enthalten sein. Die Vorschau nutzt nur die Antwortzeilen.'
              )}
            </p>
            <textarea
              className="min-h-[200px] w-full resize-y rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 font-primary text-[0.88rem] leading-relaxed text-white outline-none placeholder:text-white/20 focus:border-[rgba(145,82,255,0.5)]"
              placeholder={L('Paste the full interview transcript here…', 'Vollständiges Interview-Transkript hier einfügen…')}
              value={transcript}
              onChange={(e) => setTranscript(e.target.value)}
            />
            <div className="mt-2 flex items-center justify-between">
              <span className="text-[0.73rem] text-white/25">{charLabel}</span>
              <button
                type="button"
                className="rounded-full border border-white/10 px-3 py-1 text-[0.75rem] text-white/40 hover:text-white/70"
                onClick={() => setTranscript('')}
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
                {L('Next → Configure', 'Weiter → Konfigurieren')}
              </button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="p-8">
            <p className="mb-2 text-[0.7rem] font-bold uppercase tracking-[0.1em] text-[#B580FF]">{L('Step 2', 'Schritt 2')}</p>
            <h4 className="font-lora text-xl font-semibold text-white">{L('Configure the story', 'Story konfigurieren')}</h4>
            <p className="mb-6 mt-1 text-[0.84rem] text-white/45">
              {L(
                'Choose story type and output shape (sample — not sent to a server).',
                'Story-Typ und Ausgabeform wählen (Beispiel – wird nicht an einen Server gesendet).'
              )}
            </p>
            <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="rounded-[14px] border border-white/10 bg-white/[0.03] p-5">
                <p className="mb-3 text-[0.68rem] font-bold uppercase tracking-[0.1em] text-white/35">{L('Story type', 'Story-Typ')}</p>
                {[
                  ['mentor', L('Role model / mentor story', 'Role Model / Mentorinnen-Story')],
                  ['participant', L('Participant experience story', 'Teilnehmerinnen-Erfahrungsstory')],
                  ['awareness', L('Awareness & empowerment story', 'Awareness- & Empowerment-Story')],
                ].map(([v, label]) => (
                  <label key={v} className="mb-2 flex cursor-pointer items-start gap-2 text-[0.82rem] text-white/65 hover:text-white">
                    <input
                      type="radio"
                      name="aiStoryType"
                      className="mt-0.5 accent-[#9152FF]"
                      checked={storyType === v}
                      onChange={() => setStoryType(v)}
                    />
                    {label}
                  </label>
                ))}
              </div>
              <div className="rounded-[14px] border border-white/10 bg-white/[0.03] p-5">
                <p className="mb-3 text-[0.68rem] font-bold uppercase tracking-[0.1em] text-white/35">{L('Output format', 'Ausgabeformat')}</p>
                {[
                  ['narrative', L('Narrative paragraphs', 'Erzählende Absätze')],
                  ['chapters', L('Chapters with headings', 'Kapitel mit Überschriften')],
                  ['quotes', L('Key quotes + context', 'Kernzitate + Kontext')],
                ].map(([v, label]) => (
                  <label key={v} className="mb-2 flex cursor-pointer items-start gap-2 text-[0.82rem] text-white/65 hover:text-white">
                    <input type="radio" name="aiFormat" className="mt-0.5 accent-[#9152FF]" defaultChecked={v === 'narrative'} />
                    {label}
                  </label>
                ))}
              </div>
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
                onClick={runGenerate}
                className="rounded-full bg-gradient-to-br from-[#9152FF] to-[#7339E0] px-5 py-2.5 text-[0.84rem] font-semibold text-white shadow-[0_4px_18px_rgba(145,82,255,0.4)]"
              >
                {L('✨ Generate Story →', '✨ Story generieren →')}
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="px-8 py-12 text-center">
            <span className="mb-4 inline-block animate-pulse text-4xl text-[#B580FF]" aria-hidden>
              ✦
            </span>
            <div className="font-lora text-xl text-white">{L('Shaping your story…', 'Deine Story wird gestaltet…')}</div>
            <div id="ai-gen-status" className="mt-2 min-h-[1.3em] text-[0.84rem] text-white/45">
              {L('Reading the transcript…', 'Transkript wird gelesen…')}
            </div>
            <div className="mx-auto mt-6 h-1 max-w-[360px] overflow-hidden rounded-full bg-white/10">
              <div id="ai-gen-bar" className="h-full w-0 rounded-full bg-gradient-to-r from-[#9152FF] to-[#B580FF] shadow-[0_0_10px_rgba(145,82,255,0.5)] transition-[width] duration-500" />
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="p-8">
            <p className="mb-2 text-[0.7rem] font-bold uppercase tracking-[0.1em] text-[#B580FF]">{L('Step 4 — Review', 'Schritt 4 — Prüfen')}</p>
            <h4 className="font-lora text-xl font-semibold text-white">
              {L('Choose your storytelling format', 'Storytelling-Format wählen')}
            </h4>
            <p className="mb-6 mt-1 text-[0.84rem] text-white/45">
              {L('Preview sample layout from your pasted text.', 'Beispiel-Layout aus deinem eingefügten Text.')}
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
                    {L('Building Bridges · Sample', 'Building Bridges · Beispiel')}
                  </div>
                  <div
                    className="mt-2 text-[clamp(1.8rem,4vw,2.5rem)] font-extrabold leading-none tracking-tight"
                    dangerouslySetInnerHTML={{ __html: immTitleHtml() }}
                  />
                  <p className="font-dmSans mt-3 max-w-md text-[0.85rem] font-light leading-relaxed text-[#f7f2ec]/50">
                    {L(
                      `Extracted from the interview transcript · ${storyType} format`,
                      `Aus dem Interview-Transkript extrahiert · ${storyType}-Format`
                    )}
                  </p>
                </div>
                {chapters.slice(0, 4).map((ch) => (
                  <div key={ch.label} className="border-b border-white/[0.04] px-6 py-6">
                    <div className="font-dmMono text-[0.55rem] uppercase tracking-[0.18em] text-[rgba(196,164,255,0.5)]">
                      {ch.icon} {ch.label}
                    </div>
                    <div
                      className="font-fraunces mt-2 text-[clamp(1.2rem,2.5vw,1.75rem)] font-extrabold leading-tight tracking-tight"
                      dangerouslySetInnerHTML={{ __html: getChapterHeading(ch.text) }}
                    />
                    <p className="font-dmSans mt-3 text-[0.84rem] font-light leading-relaxed text-[#f7f2ec]/65">
                      {ch.text.length > 280 ? `${ch.text.slice(0, 280)}…` : ch.text}
                    </p>
                    {ch.quote.length > 20 && (
                      <blockquote className="font-fraunces mt-4 border-l-2 border-[#818cf8] pl-3 text-[0.9rem] italic text-[#f7f2ec]/80">
                        &ldquo;{ch.quote.length > 120 ? `${ch.quote.slice(0, 120)}…` : ch.quote}&rdquo;
                      </blockquote>
                    )}
                  </div>
                ))}
                <div className="flex items-center justify-center gap-2 border-t border-[rgba(145,82,255,0.3)] bg-[rgba(145,82,255,0.15)] px-6 py-3 font-primary text-[0.72rem] text-[rgba(145,82,255,0.8)]">
                  {L('📜 Immersive preview · sample only', '📜 Immersive Vorschau · nur Beispiel')}
                </div>
              </div>
            )}

            {format === 'constellation' && (
              <div className="overflow-hidden rounded-2xl bg-[#04020c] font-dmSans text-[#f7f4ff]">
                <div className="border-b border-[rgba(129,140,248,0.1)] px-6 py-6 text-center">
                  <div className="font-fraunces text-2xl font-extrabold tracking-tight">
                    {isDe ? (
                      <>
                        Verbinde die <em className="font-light not-italic text-[#818cf8]">Sterne.</em>
                      </>
                    ) : (
                      <>
                        Connect the <em className="font-light not-italic text-[#818cf8]">stars.</em>
                      </>
                    )}
                  </div>
                  <p className="font-dmMono mt-2 text-[0.6rem] uppercase tracking-[0.12em] text-[rgba(129,140,248,0.45)]">
                    {L('Tap a row to highlight', 'Zeile antippen zum Hervorheben')}
                  </p>
                </div>
                <div className="px-4 py-2">
                  {chapters.slice(0, 6).map((ch, i) => (
                    <button
                      key={`${ch.label}-${i}`}
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
                        {ch.icon} {ch.label}
                      </span>
                      <span className="min-w-0 flex-1 truncate text-[0.75rem] text-[#f7f4ff]/35">
                        {ch.text.length > 80 ? `${ch.text.slice(0, 80)}…` : ch.text}
                      </span>
                    </button>
                  ))}
                </div>
                <div className="flex items-center justify-center gap-2 border-t border-[rgba(129,140,248,0.15)] bg-[rgba(129,140,248,0.08)] px-6 py-3 font-primary text-[0.72rem] text-[rgba(129,140,248,0.6)]">
                  {L('✦ Constellation preview · sample only', '✦ Konstellations-Vorschau · nur Beispiel')}
                </div>
              </div>
            )}

            <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => goTo(2)}
                  className="rounded-full border border-[rgba(145,82,255,0.35)] px-3 py-1.5 text-[0.78rem] text-[#B580FF] hover:bg-[rgba(145,82,255,0.1)]"
                >
                  {L('⚙️ Reconfigure', '⚙️ Neu konfigurieren')}
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
                onClick={() =>
                  window.alert(
                    L('Full page export coming with API integration!', 'Vollständiger Export folgt mit API-Anbindung!')
                  )
                }
                className="rounded-full bg-gradient-to-br from-[#9152FF] to-[#7339E0] px-5 py-2.5 text-[0.84rem] font-semibold text-white"
              >
                {L('Open full story ↗', 'Vollständige Story öffnen ↗')}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
