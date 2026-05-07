'use client';

import { useCallback, useRef, useState } from 'react';
import { useLandingLocale } from '@/lib/landing/locale';

type Chapter = { label: string; icon: string; text: string; quote: string };

function parseTranscriptIntoChapters(transcript: string): Chapter[] {
  const sentences = transcript
    .split(/[.!?]+/)
    .map((s) => s.trim())
    .filter((s) => s.length > 20);
  const intervieweeLines = sentences.filter((s) => s.length > 40);
  const totalLines = intervieweeLines.length;
  const chunkSize = Math.max(2, Math.floor(totalLines / 5));
  const chapterLabels = ['Origin', 'The Journey', 'Challenges', 'Turning Point', 'Today'];
  const icons = ['🌍', '✈️', '🔥', '💡', '🌟'];
  const chapters: Chapter[] = [];
  for (let i = 0; i < 5; i++) {
    const start = i * chunkSize;
    const end = Math.min(start + chunkSize, totalLines);
    const chunk = intervieweeLines.slice(start, end).join('. ');
    if (chunk.length > 30) {
      chapters.push({
        label: chapterLabels[i] ?? `Chapter ${i + 1}`,
        icon: icons[i] ?? '✦',
        text: chunk,
        quote: intervieweeLines[start] ?? '',
      });
    }
  }
  if (chapters.length === 0 && transcript.length > 20) {
    chapters.push({
      label: 'Her Story',
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
    return { line1: parts.slice(0, 3).join(' '), em: parts.slice(3).join(' ') };
  }
  return { line1: words, em: '' };
}

export function AiStoryGenerator() {
  const { t, locale } = useLandingLocale();
  const [step, setStep] = useState(1);
  const [transcript, setTranscript] = useState('');
  const [progress, setProgress] = useState(0);
  const [statusIdx, setStatusIdx] = useState(0);
  const [format, setFormat] = useState<'immersive' | 'constellation'>('immersive');
  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [immTitle, setImmTitle] = useState({ line1: 'Her', em: 'Journey' });
  const [immSub, setImmSub] = useState('');
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const statusesEn = [
    'Reading the transcript…',
    'Identifying key moments…',
    'Structuring the story…',
    'Applying privacy settings…',
    'Preparing previews…',
  ];
  const statusesDe = [
    'Transkript wird gelesen…',
    'Schlüsselmomente werden erkannt…',
    'Story wird strukturiert…',
    'Privatsphäre-Einstellungen…',
    'Vorschau wird vorbereitet…',
  ];
  const statuses = locale === 'de' ? statusesDe : statusesEn;

  const goTo = useCallback(
    (s: number) => {
      if (s === 2 && transcript.trim().length < 10) {
        alert(t('Please paste some interview text first.', 'Bitte zuerst Interviewtext einfügen.'));
        return;
      }
      setStep(s);
    },
    [transcript, t]
  );

  const runGenerate = () => {
    const trimmed = transcript.trim();
    if (!trimmed) {
      alert(t('Please paste a transcript first.', 'Bitte zuerst ein Transkript einfügen.'));
      return;
    }
    setStep(3);
    setProgress(0);
    setStatusIdx(0);
    if (timerRef.current) clearInterval(timerRef.current);
    let p = 0;
    let si = 0;
    timerRef.current = setInterval(() => {
      p = Math.min(p + Math.random() * 15, 90);
      setProgress(p);
      if (si < statuses.length && p > (si + 1) * 18) {
        si += 1;
        setStatusIdx(si);
      }
    }, 400);

    setTimeout(() => {
      if (timerRef.current) clearInterval(timerRef.current);
      setProgress(100);
      const storyType = (document.querySelector('input[name="aiStoryType"]:checked') as HTMLInputElement)?.value ?? 'mentor';
      const ch = parseTranscriptIntoChapters(trimmed);
      setChapters(ch);
      const firstWords = trimmed.split(/\s+/).slice(0, 6).join(' ');
      if (firstWords.length > 4) {
        const w = firstWords.split(' ');
        setImmTitle({ line1: w.slice(0, 3).join(' '), em: w.slice(3).join(' ') });
      } else {
        setImmTitle({ line1: 'Her', em: 'Story' });
      }
      setImmSub(
        t('Extracted from the interview transcript · ', 'Aus dem Interview-Transkript · ') + storyType + ' · '
      );
      setTimeout(() => {
        setStep(4);
        setFormat('immersive');
      }, 300);
    }, 1800);
  };

  return (
    <div id="ai-story-tool" className="mt-20 scroll-mt-[90px] border-t border-white/10 pt-16">
      <div className="mb-8">
        <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-[rgba(145,82,255,0.4)] bg-[rgba(145,82,255,0.2)] px-4 py-1.5 text-[0.72rem] font-bold uppercase tracking-[0.08em] text-[#B580FF]">
          ✦ {t('Story Generator — Sample Mode', 'Story-Generator — Demo-Modus')}
        </div>
        <h3 className="font-[family-name:var(--font-lora)] text-[clamp(1.5rem,2.5vw,2rem)] font-semibold leading-tight text-white">
          {t('From interview to ', 'Vom Interview zur ')}
          <span className="italic text-[#B580FF]">{t('published story', 'veröffentlichten Story')}</span>
        </h3>
        <p className="mt-2 max-w-[560px] text-[0.88rem] text-white/50">
          {t(
            'Paste a raw interview transcript, configure the story settings, and preview how it looks in two storytelling formats. API integration coming soon.',
            'Füge ein Transkript ein, konfiguriere die Einstellungen und sieh dir zwei Storytelling-Formate an. API-Anbindung folgt.'
          )}
        </p>
      </div>

      <div className="mb-6 flex flex-wrap items-center gap-1">
        {[1, 2, 3, 4].map((n) => (
          <span key={n} className="flex items-center gap-1">
            <div
              className={`flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-[0.75rem] font-semibold transition ${
                step === n
                  ? 'border-[rgba(145,82,255,0.5)] bg-[rgba(145,82,255,0.2)] text-white'
                  : step > n
                    ? 'border-[rgba(145,82,255,0.25)] text-white/50'
                    : 'border-white/10 bg-white/5 text-white/30'
              }`}
            >
              <span
                className={`flex h-[18px] w-[18px] items-center justify-center rounded-full text-[0.65rem] font-bold ${
                  step === n ? 'bg-[#9152FF] shadow-[0_0_10px_rgba(145,82,255,0.6)]' : step > n ? 'bg-[rgba(145,82,255,0.4)]' : 'bg-white/10'
                }`}
              >
                {n}
              </span>
              <span>
                {n === 1 && t('Paste transcript', 'Transkript einfügen')}
                {n === 2 && t('Configure', 'Konfigurieren')}
                {n === 3 && t('Generate', 'Generieren')}
                {n === 4 && t('Review & use', 'Prüfen & nutzen')}
              </span>
            </div>
            {n < 4 && <span className="mx-1 text-[0.75rem] text-white/15">›</span>}
          </span>
        ))}
      </div>

      <div className="overflow-hidden rounded-[20px] border border-[rgba(145,82,255,0.2)] bg-white/5 shadow-[0_20px_60px_rgba(0,0,0,0.3)]">
        {step === 1 && (
          <div className="p-8">
            <div className="mb-2 text-[0.7rem] font-bold uppercase tracking-[0.1em] text-[#B580FF]">
              {t('Step 1', 'Schritt 1')}
            </div>
            <div className="mb-1 font-[family-name:var(--font-lora)] text-xl font-semibold text-white">
              {t('Paste the interview transcript', 'Interview-Transkript einfügen')}
            </div>
            <p className="mb-4 text-[0.84rem] text-white/45">
              {t(
                "Raw transcript is fine — interviewer questions included. The preview uses the interviewee's answers.",
                'Rohtext ist in Ordnung. Die Vorschau nutzt überwiegend längere Antwortpassagen.'
              )}
            </p>
            <textarea
              value={transcript}
              onChange={(e) => setTranscript(e.target.value)}
              className="min-h-[200px] w-full resize-y rounded-xl border border-white/10 bg-white/5 px-4 py-3 font-[family-name:var(--font-sora)] text-[0.88rem] leading-relaxed text-white outline-none placeholder:text-white/20 focus:border-[rgba(145,82,255,0.5)]"
              placeholder={t('Paste the full interview transcript here…', 'Vollständiges Transkript hier einfügen…')}
            />
            <div className="mt-2 flex items-center justify-between">
              <span className="text-[0.73rem] text-white/25">{transcript.length.toLocaleString()} characters</span>
              <button
                type="button"
                className="rounded-full border border-white/10 bg-transparent px-3 py-1 text-[0.75rem] text-white/40 hover:text-white/70"
                onClick={() => setTranscript('')}
              >
                {t('Clear', 'Leeren')}
              </button>
            </div>
            <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
              <span className="text-[0.76rem] text-white/20">{t('Supports any language', 'Beliebige Sprache')}</span>
              <button
                type="button"
                onClick={() => goTo(2)}
                className="rounded-full bg-gradient-to-br from-[#9152FF] to-[#7339E0] px-5 py-2.5 font-[family-name:var(--font-sora)] text-[0.84rem] font-semibold text-white shadow-[0_4px_18px_rgba(145,82,255,0.4)] hover:shadow-[0_6px_26px_rgba(145,82,255,0.6)]"
              >
                {t('Next → Configure', 'Weiter → Konfigurieren')}
              </button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="p-8">
            <div className="mb-2 text-[0.7rem] font-bold uppercase tracking-[0.1em] text-[#B580FF]">{t('Step 2', 'Schritt 2')}</div>
            <div className="mb-1 font-[family-name:var(--font-lora)] text-xl font-semibold text-white">{t('Configure the story', 'Story konfigurieren')}</div>
            <p className="mb-4 text-[0.84rem] text-white/45">{t('Choose shape, content, privacy, and output format.', 'Form, Inhalt, Privatsphäre und Format wählen.')}</p>
            <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="rounded-[14px] border border-white/10 bg-white/5 p-5">
                <div className="mb-3 text-[0.68rem] font-bold uppercase tracking-[0.1em] text-white/35">{t('Story type', 'Story-Typ')}</div>
                <label className="mb-2 flex cursor-pointer items-start gap-2 text-[0.82rem] text-white/65">
                  <input type="radio" name="aiStoryType" value="mentor" defaultChecked className="mt-0.5 accent-[#9152FF]" />
                  {t('Role model / mentor story', 'Vorbild- / Mentor*innen-Story')}
                </label>
                <label className="mb-2 flex cursor-pointer items-start gap-2 text-[0.82rem] text-white/65">
                  <input type="radio" name="aiStoryType" value="participant" className="mt-0.5 accent-[#9152FF]" />
                  {t('Participant experience story', 'Teilnahme-Erfahrungsstory')}
                </label>
                <label className="flex cursor-pointer items-start gap-2 text-[0.82rem] text-white/65">
                  <input type="radio" name="aiStoryType" value="awareness" className="mt-0.5 accent-[#9152FF]" />
                  {t('Awareness & empowerment story', 'Awareness- & Empowerment-Story')}
                </label>
              </div>
              <div className="rounded-[14px] border border-white/10 bg-white/5 p-5">
                <div className="mb-3 text-[0.68rem] font-bold uppercase tracking-[0.1em] text-white/35">{t('Include in story', 'In die Story')}</div>
                {[
                  ['ai-inc-origin', 'Origin & background', 'Herkunft & Hintergrund'],
                  ['ai-inc-motivation', 'Motivation & field choice', 'Motivation & Feldfokus'],
                  ['ai-inc-challenges', 'Challenges & turning points', 'Herausforderungen & Wendepunkte'],
                  ['ai-inc-message', 'Empowerment message', 'Empowerment-Botschaft'],
                ].map(([id, en, de]) => (
                  <label key={id} className="mb-2 flex cursor-pointer items-start gap-2 text-[0.82rem] text-white/65">
                    <input id={id} type="checkbox" defaultChecked className="mt-0.5 accent-[#9152FF]" />
                    {t(en, de)}
                  </label>
                ))}
              </div>
              <div className="rounded-[14px] border border-white/10 bg-white/5 p-5">
                <div className="mb-3 text-[0.68rem] font-bold uppercase tracking-[0.1em] text-white/35">{t('Privacy level', 'Privatsphäre')}</div>
                <label className="mb-2 flex cursor-pointer items-start gap-2 text-[0.82rem] text-white/65">
                  <input type="radio" name="aiPrivacy" value="strict" defaultChecked className="mt-0.5 accent-[#9152FF]" />
                  {t('Strict — no names, ages or locations', 'Streng — keine Namen, Alter, Orte')}
                </label>
                <label className="mb-2 flex cursor-pointer items-start gap-2 text-[0.82rem] text-white/65">
                  <input type="radio" name="aiPrivacy" value="moderate" className="mt-0.5 accent-[#9152FF]" />
                  {t('Moderate — general age range & country ok', 'Moderat — grobe Altersangabe & Land ok')}
                </label>
                <label className="flex cursor-pointer items-start gap-2 text-[0.82rem] text-white/65">
                  <input type="radio" name="aiPrivacy" value="open" className="mt-0.5 accent-[#9152FF]" />
                  {t('Open — keep demographic details', 'Offen — demografische Details behalten')}
                </label>
              </div>
              <div className="rounded-[14px] border border-white/10 bg-white/5 p-5">
                <div className="mb-3 text-[0.68rem] font-bold uppercase tracking-[0.1em] text-white/35">{t('Output format', 'Ausgabeformat')}</div>
                <label className="mb-2 flex cursor-pointer items-start gap-2 text-[0.82rem] text-white/65">
                  <input type="radio" name="aiFormat" value="narrative" defaultChecked className="mt-0.5 accent-[#9152FF]" />
                  {t('Narrative paragraphs', 'Fließtext-Absätze')}
                </label>
                <label className="mb-2 flex cursor-pointer items-start gap-2 text-[0.82rem] text-white/65">
                  <input type="radio" name="aiFormat" value="chapters" className="mt-0.5 accent-[#9152FF]" />
                  {t('Chapters with headings', 'Kapitel mit Überschriften')}
                </label>
                <label className="flex cursor-pointer items-start gap-2 text-[0.82rem] text-white/65">
                  <input type="radio" name="aiFormat" value="quotes" className="mt-0.5 accent-[#9152FF]" />
                  {t('Key quotes + context', 'Kernzitate + Kontext')}
                </label>
              </div>
            </div>
            <div className="flex flex-wrap items-center justify-between gap-3">
              <button type="button" onClick={() => goTo(1)} className="rounded-full border border-white/10 px-4 py-2 text-[0.84rem] text-white/40 hover:text-white/70">
                ← {t('Back', 'Zurück')}
              </button>
              <button
                type="button"
                onClick={runGenerate}
                className="rounded-full bg-gradient-to-br from-[#9152FF] to-[#7339E0] px-5 py-2.5 font-[family-name:var(--font-sora)] text-[0.84rem] font-semibold text-white shadow-[0_4px_18px_rgba(145,82,255,0.4)]"
              >
                ✨ {t('Generate Story →', 'Story generieren →')}
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="px-8 py-12 text-center">
            <span className="bb-landing-gen-spin mb-4 block text-[2.8rem]">✦</span>
            <div className="mb-2 font-[family-name:var(--font-lora)] text-xl text-white">{t('Shaping your story…', 'Deine Story nimmt Form an…')}</div>
            <div className="mb-6 min-h-[1.3em] text-[0.84rem] text-white/45">{statuses[Math.min(statusIdx, statuses.length - 1)]}</div>
            <div className="mx-auto h-1.5 max-w-[360px] overflow-hidden rounded-full bg-white/10">
              <div className="h-full rounded-full bg-gradient-to-r from-[#9152FF] to-[#B580FF] shadow-[0_0_10px_rgba(145,82,255,0.5)] transition-[width] duration-500" style={{ width: `${progress}%` }} />
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="p-8">
            <div className="mb-2 text-[0.7rem] font-bold uppercase tracking-[0.1em] text-[#B580FF]">{t('Step 4 — Review & use', 'Schritt 4 — Prüfen & nutzen')}</div>
            <div className="mb-1 font-[family-name:var(--font-lora)] text-xl font-semibold text-white">{t('Choose your storytelling format', 'Storytelling-Format wählen')}</div>
            <p className="mb-6 text-[0.84rem] text-white/45">{t('Preview in two formats. More layouts coming with API integration.', 'Zwei Vorschau-Layouts. Weitere Formate folgen mit der API.')}</p>
            <div className="mb-6 flex flex-wrap gap-4">
              <button
                type="button"
                onClick={() => setFormat('immersive')}
                className={`min-w-[180px] flex-1 rounded-[14px] border-[1.5px] p-5 text-center transition ${
                  format === 'immersive' ? 'border-[#9152FF] bg-[rgba(145,82,255,0.18)]' : 'border-white/10 bg-white/5 hover:border-[rgba(145,82,255,0.4)]'
                }`}
              >
                <div className="mb-2 text-[1.8rem]">📜</div>
                <div className="mb-1 font-bold text-[0.9rem] text-white">{t('Immersive Scroll', 'Immersives Scrollen')}</div>
                <div className="text-[0.75rem] text-white/45">{t('Chapter-by-chapter dark narrative', 'Kapitelweise, dunkles Layout')}</div>
              </button>
              <button
                type="button"
                onClick={() => setFormat('constellation')}
                className={`min-w-[180px] flex-1 rounded-[14px] border-[1.5px] p-5 text-center transition ${
                  format === 'constellation' ? 'border-[#9152FF] bg-[rgba(145,82,255,0.18)]' : 'border-white/10 bg-white/5 hover:border-[rgba(145,82,255,0.4)]'
                }`}
              >
                <div className="mb-2 text-[1.8rem]">✦</div>
                <div className="mb-1 font-bold text-[0.9rem] text-white">{t('Constellation', 'Sternbild')}</div>
                <div className="text-[0.75rem] text-white/45">{t('Tap stars for story moments', 'Sterne für Story-Momente')}</div>
              </button>
            </div>

            {format === 'immersive' && (
              <div className="overflow-hidden rounded-2xl bg-[#080808] font-[family-name:var(--font-fraunces)] text-[#f7f2ec]">
                <div className="border-b border-white/10 bg-gradient-to-br from-[#0c0428] to-[#080808] px-8 py-10">
                  <div className="mb-3 font-[family-name:var(--font-dm-mono)] text-[0.6rem] uppercase tracking-[0.2em] text-[rgba(145,82,255,0.7)]">
                    Building Bridges · {t('Role Model Story', 'Vorbild-Story')}
                  </div>
                  <div className="mb-2 text-[clamp(1.8rem,4vw,3rem)] font-extrabold leading-none tracking-tight">
                    {immTitle.line1} {immTitle.em ? <em className="font-extralight italic text-[#818cf8]">{immTitle.em}</em> : null}
                  </div>
                  <p className="max-w-[480px] font-[family-name:var(--font-dm-sans)] text-[0.85rem] font-light leading-relaxed text-[rgba(247,242,236,0.5)]">{immSub}</p>
                </div>
                {chapters.slice(0, 4).map((ch) => {
                  const h = getChapterHeading(ch.text);
                  const bodyText = ch.text.length > 280 ? `${ch.text.slice(0, 280)}…` : ch.text;
                  const quoteText = ch.quote.length > 120 ? `${ch.quote.slice(0, 120)}…` : ch.quote;
                  return (
                    <div key={ch.label} className="border-b border-white/5 px-8 py-7">
                      <div className="mb-2 font-[family-name:var(--font-dm-mono)] text-[0.55rem] uppercase tracking-[0.18em] text-[rgba(196,164,255,0.5)]">
                        {ch.icon} {ch.label}
                      </div>
                      <div className="mb-3 text-[clamp(1.3rem,2.5vw,2rem)] font-extrabold leading-tight tracking-tight">
                        {h.line1}
                        {h.em ? (
                          <>
                            <br />
                            <em className="font-extralight italic text-[#c4a4ff]">{h.em}</em>
                          </>
                        ) : null}
                      </div>
                      <p className="font-[family-name:var(--font-dm-sans)] text-[0.84rem] font-light leading-relaxed text-[rgba(247,242,236,0.65)]">{bodyText}</p>
                      {quoteText.length > 20 ? (
                        <div className="mt-4 border-l-2 border-[#818cf8] pl-3 text-[0.9rem] italic leading-relaxed text-[rgba(247,242,236,0.8)]">&ldquo;{quoteText}&rdquo;</div>
                      ) : null}
                    </div>
                  );
                })}
                <div className="flex items-center justify-center gap-2 rounded-b-2xl border border-t-0 border-[rgba(145,82,255,0.3)] bg-[rgba(145,82,255,0.15)] px-8 py-3 font-[family-name:var(--font-sora)] text-[0.72rem] text-[rgba(145,82,255,0.8)]">
                  📜 {t('Immersive Scroll · sample preview', 'Immersives Scrollen · Demo-Vorschau')}
                </div>
              </div>
            )}

            {format === 'constellation' && (
              <div className="overflow-hidden rounded-2xl bg-[#04020c] font-[family-name:var(--font-fraunces)] text-[#f7f4ff]">
                <div className="border-b border-[rgba(129,140,248,0.1)] px-8 py-6 text-center">
                  <div className="mb-1 text-2xl font-extrabold tracking-tight">
                    {t('Connect the ', 'Verbinde die ')}
                    <em className="font-extralight italic text-[#818cf8]">{t('stars.', 'Sterne.')}</em>
                  </div>
                  <div className="font-[family-name:var(--font-dm-mono)] text-[0.6rem] uppercase tracking-[0.12em] text-[rgba(129,140,248,0.45)]">
                    {t('Click each star to highlight a moment', 'Stern antippen zum Hervorheben')}
                  </div>
                </div>
                <div className="flex flex-col px-6 py-4">
                  {chapters.slice(0, 6).map((ch, i) => (
                    <ConstellationRow key={ch.label} index={i} chapter={ch} />
                  ))}
                </div>
                <div className="flex items-center justify-center gap-2 border border-t-0 border-[rgba(129,140,248,0.15)] bg-[rgba(129,140,248,0.08)] px-8 py-3 font-[family-name:var(--font-sora)] text-[0.72rem] text-[rgba(129,140,248,0.6)]">
                  ✦ {t('Constellation · sample preview', 'Sternbild · Demo-Vorschau')}
                </div>
              </div>
            )}

            <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap gap-2">
                <button type="button" onClick={() => goTo(2)} className="rounded-full border border-[rgba(145,82,255,0.35)] px-3 py-1.5 text-[0.78rem] text-[#B580FF] hover:bg-[rgba(145,82,255,0.1)]">
                  ⚙️ {t('Reconfigure', 'Neu konfigurieren')}
                </button>
                <button type="button" onClick={() => goTo(1)} className="rounded-full border border-white/10 px-3 py-1.5 text-[0.78rem] text-white/40">
                  ↺ {t('New transcript', 'Neues Transkript')}
                </button>
              </div>
              <button
                type="button"
                onClick={() => alert(t('Full page export coming with API integration!', 'Vollansicht-Export folgt mit API!'))}
                className="rounded-full bg-gradient-to-br from-[#9152FF] to-[#7339E0] px-5 py-2.5 text-[0.84rem] font-semibold text-white"
              >
                {t('Open full story ↗', 'Vollständige Story ↗')}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function ConstellationRow({ index, chapter }: { index: number; chapter: Chapter }) {
  const [lit, setLit] = useState(false);
  const snippet = chapter.text.length > 80 ? `${chapter.text.slice(0, 80)}…` : chapter.text;
  return (
    <button
      type="button"
      onClick={() => setLit((l) => !l)}
      className={`flex w-full items-center gap-4 rounded-lg border-0 border-b border-[rgba(129,140,248,0.08)] py-3 pl-2 text-left transition hover:bg-[rgba(129,140,248,0.06)] ${lit ? 'bg-[rgba(129,140,248,0.06)]' : ''}`}
    >
      <span className={`h-2 w-2 shrink-0 rounded-full transition ${lit ? 'bg-[#c4a4ff] shadow-[0_0_12px_#c4a4ff]' : 'bg-[rgba(129,140,248,0.3)]'}`} />
      <span className="w-5 shrink-0 font-[family-name:var(--font-dm-mono)] text-[0.6rem] text-[rgba(129,140,248,0.35)]">{String(index + 1).padStart(2, '0')}</span>
      <span className="shrink-0 text-[0.95rem] font-semibold">
        {chapter.icon} {chapter.label}
      </span>
      <span className="min-w-0 flex-1 truncate font-[family-name:var(--font-dm-sans)] text-[0.75rem] text-[rgba(247,244,255,0.35)]">{snippet}</span>
    </button>
  );
}
