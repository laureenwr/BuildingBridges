'use client';

import { useState } from 'react';
import { useLandingLocale } from '@/lib/landing/locale';
import { AiStoryGenerator } from '@/components/landing/AiStoryGenerator';

export function StorytellingSection() {
  const { t } = useLandingLocale();

  return (
    <section
      id="storytelling"
      className="relative scroll-mt-[70px] overflow-hidden px-10 py-28 text-white max-md:px-6 max-md:py-20"
      style={{ background: '#1A1033' }}
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 60% 50% at 80% 50%, rgba(145,82,255,0.18) 0%, transparent 70%), radial-gradient(ellipse 40% 60% at 10% 80%, rgba(107,170,138,0.12) 0%, transparent 70%)',
        }}
      />
      <div className="relative z-[1] mx-auto max-w-[1280px]">
        <div className="mb-16 max-w-[640px]">
          <div className="mb-3 text-[0.72rem] font-bold uppercase tracking-[0.13em] text-[#B580FF]">
            {t('Story Creation Tool — TP3', 'Story-Creation-Tool — TP3')}
          </div>
          <h2 className="font-[family-name:var(--font-lora)] text-[clamp(2rem,3vw,2.8rem)] font-bold leading-tight tracking-tight">
            {t('A co-creative space for ', 'Ein ko-kreativer Raum für ')}
            <em className="font-normal italic text-[#B580FF]">{t('your story', 'deine Geschichte')}</em>
          </h2>
          <p className="mt-4 text-[0.97rem] leading-relaxed text-white/70">
            {t(
              'The core innovation of Building Bridges: a digital storytelling tool where you control how much you share, whether to publish, and how AI assists your creative process. Built with and for the community.',
              'Die zentrale Innovation: ein digitales Storytelling-Tool, in dem du steuerst, wie viel du teilst, ob du veröffentlichst und wie KI deinen Prozess unterstützt — mit und für die Community.'
            )}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          <div>
            <h3 className="mb-1 font-[family-name:var(--font-lora)] text-[1.3rem] font-bold">{t('Story Creation Steps', 'Schritte zur Story-Erstellung')}</h3>
            <p className="mb-6 text-[0.85rem] text-white/60">{t('A guided, safe process — skip any step at any time.', 'Ein geführter, sicherer Prozess — überspringe jederzeit jeden Schritt.')}</p>
            <div className="flex flex-col">
              {[
                {
                  n: '1',
                  title: t('Choose your story type', 'Wähle deinen Story-Typ'),
                  body: t('Select the kind of story you want to tell.', 'Wähle die Art von Geschichte, die du erzählen möchtest.'),
                  opts: ['Experience', 'Mentoring', 'Awareness'],
                },
                {
                  n: '2',
                  title: t('Set the context', 'Setze den Kontext'),
                  body: t('Where and when did this happen?', 'Wo und wann ist das passiert?'),
                  opts: ['School / Uni', 'Online', 'Personal'],
                },
                {
                  n: '3',
                  title: t('Share your experience', 'Teile deine Erfahrung'),
                  body: t('What happened? Use prompts, templates, or free text.', 'Was ist passiert? Nutze Leitfragen oder freien Text.'),
                  opts: [t('⚠️ Skip sensitive sections', '⚠️ Sensible Teile überspringen')],
                },
                {
                  n: '4',
                  title: t('Add your empowerment message', 'Empowerment-Botschaft'),
                  body: t('What would you like others to know?', 'Was sollen andere wissen?'),
                  opts: [],
                },
                {
                  n: '5',
                  title: t('Choose how to publish', 'Veröffentlichung wählen'),
                  body: t('Your story is saved as a private draft by default.', 'Standardmäßig als privater Entwurf gespeichert.'),
                  opts: ['🔒 Private', '👥 Group', '🌐 Public'],
                },
              ].map((step, i, arr) => (
                <div key={step.n} className={`flex gap-4 border-b border-white/10 py-6 ${i === arr.length - 1 ? 'border-b-0' : ''}`}>
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-[1.5px] border-[rgba(145,82,255,0.35)] bg-[rgba(145,82,255,0.18)] text-[0.85rem] font-extrabold text-[#9152FF]">
                    {step.n}
                  </div>
                  <div>
                    <h4 className="mb-1 text-[0.97rem] font-bold">{step.title}</h4>
                    <p className="text-[0.85rem] leading-relaxed text-white/60">{step.body}</p>
                    {step.opts.length > 0 && (
                      <div className="mt-2 flex flex-wrap gap-1.5">
                        {step.opts.map((o) => (
                          <span key={o} className="rounded-full border border-white/15 bg-white/10 px-2.5 py-0.5 text-[0.72rem] font-semibold text-white/70">
                            {o}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <StoryControlsPanel />
        </div>

        <AiStoryGenerator />

        <div className="mt-16">
          <h3 className="mb-1 font-[family-name:var(--font-lora)] text-[1.4rem] font-bold">{t('AI-Supported Technical Toolkit', 'KI-unterstütztes technisches Toolkit')}</h3>
          <p className="mb-8 text-[0.88rem] text-white/60">{t('Manual creativity + responsible AI — optional and transparent.', 'Manuelle Kreativität + verantwortungsvolle KI — optional und transparent.')}</p>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: '✍️', t: t('Text Generation', 'Textgenerierung'), d: t('LLM assistance — you stay the author.', 'LLM-Unterstützung — du bleibst Autor*in.') },
              { icon: '🖼️', t: t('Image Generation', 'Bildgenerierung'), d: t('Illustrations without personal photos.', 'Illustrationen ohne persönliche Fotos.') },
              { icon: '🎙️', t: t('Audio & Voice-over', 'Audio & Voice-over'), d: t('Narration with privacy options.', 'Erzählstimme mit Privatsphäre-Optionen.') },
              { icon: '📝', t: t('Auto-Structuring & Subtitles', 'Struktur & Untertitel'), d: t('Accessibility and multimodal publishing.', 'Barrierefreiheit & multimodales Publizieren.') },
            ].map((x) => (
              <div key={x.t} className="rounded-[18px] border-[1.5px] border-white/10 bg-white/5 p-5 text-center transition hover:bg-white/10">
                <div className="mb-2 text-[1.8rem]">{x.icon}</div>
                <h4 className="mb-1 text-[0.88rem] font-bold">{x.t}</h4>
                <p className="text-[0.78rem] leading-relaxed text-white/55">{x.d}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12">
          <h3 className="mb-1 font-[family-name:var(--font-lora)] text-[1.4rem] font-bold">{t('Design Principles', 'Designprinzipien')}</h3>
          <p className="mb-8 text-[0.88rem] text-white/60">{t('Developed through interviews, workshops, and feedback.', 'Entwickelt durch Interviews, Workshops und Feedback.')}</p>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {[
              { icon: '🔒', t: t('Privacy by default', 'Privatsphäre zuerst'), p: t('Drafts stay private until you choose to publish.', 'Entwürfe bleiben privat, bis du veröffentlichst.') },
              { icon: '⏭️', t: t('Skip anything', 'Alles überspringbar'), p: t('Sensitive prompts can be skipped.', 'Sensible Fragen kannst du überspringen.') },
              { icon: '🕐', t: t('Publish later', 'Später veröffentlichen'), p: t('No pressure to publish immediately.', 'Kein Zwang zur sofortigen Veröffentlichung.') },
              { icon: '🌈', t: t('Inclusive language', 'Inklusive Sprache'), p: t('Gender-inclusive DE/EN platform copy.', 'Geschlechtersensible Texte auf DE/EN.') },
              { icon: '💙', t: t('Emotional safety', 'Emotionale Sicherheit'), p: t('Content notes and pause points.', 'Hinweise und Pausenpunkte.') },
              { icon: '🔍', t: t('Transparency', 'Transparenz'), p: t('Clear AI and data explanations.', 'Klare Erklärungen zu KI und Daten.') },
            ].map((d) => (
              <div key={d.t} className="rounded-[18px] border border-white/10 bg-white/5 p-5">
                <h4 className="mb-2 flex items-center gap-2 text-[0.88rem] font-bold">
                  <span>{d.icon}</span> {d.t}
                </h4>
                <p className="text-[0.8rem] leading-relaxed text-white/55">{d.p}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function StoryControlsPanel() {
  const { t } = useLandingLocale();
  const [ai, setAi] = useState(true);
  const [peer, setPeer] = useState(false);
  const [pub, setPub] = useState(false);
  const [voice, setVoice] = useState(false);
  const [img, setImg] = useState(true);
  const [cc, setCc] = useState(true);

  return (
    <div className="flex flex-col gap-4 rounded-[32px] border-[1.5px] border-white/10 bg-white/5 p-8">
      <div>
        <h3 className="font-[family-name:var(--font-lora)] text-[1.25rem] font-bold">{t('You are always in control', 'Du behältst die Kontrolle')}</h3>
        <p className="mt-2 text-[0.85rem] text-white/60">{t('Adjust these settings anytime.', 'Einstellungen jederzeit anpassbar.')}</p>
      </div>
      {[
        { label: t('Use AI assistance', 'KI-Unterstützung'), on: ai, set: setAi, icon: '🤖' },
        { label: t('Receive peer feedback', 'Peer-Feedback'), on: peer, set: setPeer, icon: '💬' },
        { label: t('Publish publicly', 'Öffentlich veröffentlichen'), on: pub, set: setPub, icon: '🌐' },
        { label: t('Add voice-over / audio', 'Voice-over / Audio'), on: voice, set: setVoice, icon: '🎙️' },
        { label: t('Generate images', 'Bilder generieren'), on: img, set: setImg, icon: '🖼️' },
        { label: t('Add subtitles / captions', 'Untertitel'), on: cc, set: setCc, icon: '♿' },
      ].map((row) => (
        <div key={row.label} className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-4 py-3">
          <span className="flex items-center gap-2 text-[0.88rem] font-semibold">
            <span>{row.icon}</span> {row.label}
          </span>
          <button
            type="button"
            role="switch"
            aria-checked={row.on}
            onClick={() => row.set(!row.on)}
            className={`relative h-[22px] w-10 rounded-full border-0 transition-colors ${row.on ? 'bg-[#6BAA8A]' : 'bg-white/20'}`}
          >
            <span
              className={`absolute top-[3px] h-4 w-4 rounded-full bg-white transition-all ${row.on ? 'left-[21px]' : 'left-[3px]'}`}
            />
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={() => document.getElementById('ai-story-tool')?.scrollIntoView({ behavior: 'smooth' })}
        className="flex w-full items-center justify-center gap-2 rounded-full border-0 bg-[#9152FF] py-4 font-[family-name:var(--font-sora)] text-[0.95rem] font-bold text-white shadow-[0_4px_20px_rgba(145,82,255,0.45)] transition hover:-translate-y-px hover:bg-[#7339E0]"
      >
        ✍️ {t('Try the AI Story Generator ↓', 'KI-Story-Generator ausprobieren ↓')}
      </button>
    </div>
  );
}
