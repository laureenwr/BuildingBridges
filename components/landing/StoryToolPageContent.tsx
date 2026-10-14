'use client';

import { useState } from 'react';
import { AiStoryTool } from './AiStoryTool';
import { CommunityStories } from './CommunityStories';
import { mapApprovedStoryToCommunityStory } from '@/lib/content/communityStories';
import type { PublicApprovedStory } from '@/lib/actions/stories';
import { useLanguage } from '@/lib/hooks/useLanguage';
import { cn } from '@/lib/utils';

const STEP_COLORS = [
  {
    ring: 'border-[#4EE1D6] text-[#4EE1D6]',
    glow: 'shadow-[0_0_0_6px_rgba(78,225,214,0.22)]',
    fill: 'bg-[#4EE1D6] text-[#10261F]',
  },
  {
    ring: 'border-[#B580FF] text-[#B580FF]',
    glow: 'shadow-[0_0_0_6px_rgba(181,128,255,0.22)]',
    fill: 'bg-[#B580FF] text-white',
  },
  {
    ring: 'border-[#FF8FB1] text-[#FF8FB1]',
    glow: 'shadow-[0_0_0_6px_rgba(255,143,177,0.22)]',
    fill: 'bg-[#FF8FB1] text-[#2A1020]',
  },
  {
    ring: 'border-[#FFC078] text-[#FFC078]',
    glow: 'shadow-[0_0_0_6px_rgba(255,192,120,0.22)]',
    fill: 'bg-[#FFC078] text-[#2A1A08]',
  },
  {
    ring: 'border-[#7FB1FF] text-[#7FB1FF]',
    glow: 'shadow-[0_0_0_6px_rgba(127,177,255,0.22)]',
    fill: 'bg-[#7FB1FF] text-[#10203A]',
  },
] as const;

function ToggleChip({
  label,
  initialOn = false,
  variant = 'purple',
}: {
  label: string;
  initialOn?: boolean;
  variant?: 'purple' | 'teal';
}) {
  const [on, setOn] = useState(initialOn);
  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      onClick={() => setOn(!on)}
      className={cn(
        'flex items-center gap-1.5 rounded-full border px-2.5 py-1.5 transition',
        'border-white/[0.09] bg-white/[0.04] hover:border-white/18 hover:bg-white/[0.07]',
        on ? 'text-white/80' : 'text-white/60'
      )}
    >
      <span
        className={cn(
          'relative h-[15px] w-[26px] shrink-0 rounded-full',
          on ? (variant === 'teal' ? 'bg-[#4EE1D6]' : 'bg-[#B580FF]') : 'bg-white/15'
        )}
      >
        <span
          className={cn(
            'absolute top-0.5 h-[11px] w-[11px] rounded-full',
            on ? 'right-0.5' : 'left-0.5',
            on ? (variant === 'teal' ? 'bg-[#10261F]' : 'bg-white') : 'bg-white/70'
          )}
        />
      </span>
      <span className="whitespace-nowrap text-[11px] font-medium">{label}</span>
    </button>
  );
}

export function StoryToolPageContent({
  approvedStories = [],
  canCreateStories = false,
}: {
  approvedStories?: PublicApprovedStory[];
  canCreateStories?: boolean;
}) {
  const { isDe } = useLanguage();
  const [activeStep, setActiveStep] = useState(0);

  const scrollAi = () => document.getElementById('ai-story-tool')?.scrollIntoView({ behavior: 'smooth' });
  const scrollStories = () =>
    document.getElementById('community-stories')?.scrollIntoView({ behavior: 'smooth' });

  const steps = isDe
    ? [
        {
          t: 'Story-Typ wählen',
          d: 'Eine Erfahrung, eine Mentoring-Geschichte oder eine Awareness-Geschichte. Alle sind gültig.',
        },
        {
          t: 'Kontext setzen',
          d: 'Wo, wann und für wen. Ein paar Details reichen, um die Geschichte zu verankern.',
        },
        {
          t: 'Erfahrung teilen',
          d: 'Schreibe in eigenen Worten, füge ein Interview ein oder starte mit einem Impuls. Teile nur, was sich richtig anfühlt.',
        },
        {
          t: 'Empowerment-Botschaft hinzufügen',
          d: 'Was sollen andere mitnehmen? Eine Hoffnung, eine Lehre oder ein Aufruf, zusammenzubleiben.',
        },
        {
          t: 'Veröffentlichung wählen',
          d: 'Privat halten, mit Peers teilen oder veröffentlichen, wenn du bereit bist. Nichts geht live, solange du nicht entscheidest.',
        },
      ]
    : [
        {
          t: 'Choose your story type',
          d: 'An experience, a mentoring story or an awareness story. All are valid.',
        },
        {
          t: 'Set the context',
          d: 'Where, when, and who this is for. A few details are enough to ground the story.',
        },
        {
          t: 'Share your experience',
          d: 'Write it in your own words, paste an interview, or speak from a prompt. Share only what feels right.',
        },
        {
          t: 'Add your empowerment message',
          d: 'What do you want others to take away? A hope, a lesson, or a call to stay together.',
        },
        {
          t: 'Choose how to publish',
          d: 'Keep it private, share with peers, or publish when you are ready. Nothing goes live unless you decide.',
        },
      ];

  const current = steps[activeStep];
  const currentColor = STEP_COLORS[activeStep];

  return (
    <>
      <section
        id="story-tool-preview"
        className="relative -mx-6 mb-4 scroll-mt-24 overflow-hidden bg-[radial-gradient(120%_160%_at_12%_-15%,#2E1E4D_0%,#1A1129_42%,#100A1C_100%)] px-5 py-10 sm:-mx-10 sm:px-10 sm:py-12"
      >
        <div
          className="pointer-events-none absolute -right-20 -top-[120px] h-[380px] w-[380px] rounded-full bg-[radial-gradient(circle,rgba(181,128,255,0.30)_0%,rgba(181,128,255,0)_70%)] blur-[10px]"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute -bottom-[140px] left-[10%] h-[320px] w-[320px] rounded-full bg-[radial-gradient(circle,rgba(255,143,177,0.16)_0%,rgba(255,143,177,0)_70%)] blur-[10px]"
          aria-hidden
        />

        <div className="relative z-[1] mx-auto flex max-w-[820px] flex-col items-center text-center">
          <p
            id="story-tool-notice"
            role="status"
            className="mb-5 max-w-[640px] text-[11px] leading-relaxed text-white/45"
          >
            <span className="font-bold uppercase tracking-[0.14em] text-amber-200/90">
              {isDe ? 'In Entwicklung' : 'Under development'}
            </span>
            <span className="mx-1.5 text-white/25">·</span>
            {isDe
              ? 'Die Vorschau ist verfügbar. Der KI-Story-Generator läuft im Beispielmodus.'
              : 'The preview is available. The AI story generator runs in sample mode.'}
          </p>

          <p className="mb-2.5 text-[11px] font-bold uppercase tracking-[0.16em] text-[#C9A2FF]">
            {isDe ? 'Story-Werkzeug · TP3' : 'Story Creation Tool · TP3'}
          </p>

          <h1 className="font-lora text-[clamp(1.7rem,3.4vw,2.25rem)] font-bold leading-[1.18] text-white">
            {isDe ? (
              <>
                Wandle deine Erfahrung in{' '}
                <em className="not-italic text-[#B580FF]">eine Geschichte</em>
              </>
            ) : (
              <>
                Turn your experience into{' '}
                <em className="not-italic text-[#B580FF]">a story</em>
              </>
            )}
          </h1>

          <p className="mt-3 max-w-[640px] text-[14px] leading-[1.55] text-white/60">
            {isDe
              ? 'Schreibe sie, füge ein Interview ein oder starte mit einem Impuls. Du entscheidest, was du teilst – und nichts wird veröffentlicht, solange du nicht zustimmst.'
              : 'Write it, paste an interview, or start from a prompt. You choose what to share, and nothing is published unless you decide.'}
          </p>

          <p className="mt-7 text-[12.5px] text-white/50">
            {isDe
              ? 'Fünf Schritte, keiner ist Pflicht. Tippe einen Schritt an, um zu sehen, was dazugehört.'
              : 'Five steps, none required. Tap a step to see what it involves.'}
          </p>

          <div
            className="mt-4 flex max-w-[680px] flex-wrap items-center justify-center gap-x-2 gap-y-2.5"
            role="tablist"
            aria-label={isDe ? 'Story-Schritte' : 'Story steps'}
          >
            {steps.map((step, idx) => {
              const color = STEP_COLORS[idx];
              const selected = idx === activeStep;
              return (
                <button
                  key={step.t}
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  aria-controls="story-step-detail"
                  id={`story-step-${idx + 1}`}
                  onClick={() => setActiveStep(idx)}
                  className={cn(
                    'inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-left transition duration-[180ms]',
                    selected
                      ? 'border-white/20 bg-white/[0.08] text-white'
                      : 'border-white/[0.08] bg-white/[0.03] text-white/70 hover:border-white/16 hover:bg-white/[0.06] hover:text-white'
                  )}
                >
                  <span
                    className={cn(
                      'flex h-6 w-6 shrink-0 items-center justify-center rounded-full border text-[11px] font-bold',
                      selected ? `${color.fill} border-transparent ${color.glow}` : `bg-[#1A1129] ${color.ring}`
                    )}
                  >
                    {idx + 1}
                  </span>
                  <span className="text-[12.5px] font-medium leading-none">{step.t}</span>
                </button>
              );
            })}
          </div>

          <div
            id="story-step-detail"
            role="tabpanel"
            aria-labelledby={`story-step-${activeStep + 1}`}
            className="mt-6 w-full max-w-[680px] rounded-2xl border border-white/10 bg-white/[0.045] px-6 py-5 text-left sm:px-7 sm:py-6"
          >
            <p className={cn('text-[10.5px] font-bold uppercase tracking-[0.14em]', currentColor.ring.split(' ')[1])}>
              {isDe ? `Schritt ${activeStep + 1} von 5` : `Step ${activeStep + 1} of 5`}
            </p>
            <h2 className="mt-1.5 font-lora text-[1.15rem] font-bold leading-snug text-white sm:text-[1.25rem]">
              {current.t}
            </h2>
            <p className="mt-2 text-[13.5px] leading-relaxed text-white/65">{current.d}</p>
          </div>

          <div className="mt-7 flex flex-col items-center gap-3">
            <p className="text-[12px] font-medium text-white/45">
              {isDe ? 'Optionale Helfer' : 'Optional helpers'}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-2">
              <ToggleChip label={isDe ? 'KI-Unterstützung' : 'AI assistance'} initialOn />
              <ToggleChip label={isDe ? 'Peer-Feedback' : 'Peer feedback'} />
            </div>
          </div>

          <div className="mt-6 flex w-full flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
            <button
              type="button"
              onClick={scrollAi}
              className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full bg-gradient-to-r from-[#8B5CF6] to-[#B580FF] px-5 py-2.5 text-[13px] font-bold text-white transition hover:-translate-y-px hover:brightness-110"
            >
              {isDe ? 'KI-Story-Generator ausprobieren' : 'Try the AI story generator'}
            </button>
            <button
              type="button"
              onClick={scrollStories}
              className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full border border-white/15 bg-white/[0.05] px-5 py-2.5 text-[13px] font-bold text-white/90 transition hover:-translate-y-px hover:border-white/25 hover:bg-white/[0.08]"
            >
              {isDe ? 'Veröffentlichte Stories lesen' : 'Read published stories'}
            </button>
          </div>
        </div>
      </section>

      {canCreateStories ? (
        <AiStoryTool />
      ) : (
        <section
          id="ai-story-tool"
          className="scroll-mt-24 rounded-[28px] border border-white/10 bg-white/[0.05] px-6 py-10 sm:px-10"
        >
          <p className="text-[0.72rem] font-bold uppercase tracking-[0.14em] text-[#C9A2FF]">
            {isDe ? 'Anmeldung nötig' : 'Sign in required'}
          </p>
          <h2 className="mt-2 font-lora text-[clamp(1.4rem,2.2vw,1.8rem)] font-bold text-white">
            {isDe
              ? 'Das Story-Werkzeug ist für angemeldete Nutzer:innen'
              : 'The story tool is for signed-in users'}
          </h2>
          <p className="mt-3 max-w-[640px] text-[0.95rem] leading-relaxed text-white/70">
            {isDe
              ? 'Du kannst veröffentlichte Community-Stories weiter unten lesen. Zum Erstellen und Einreichen bitte anmelden.'
              : 'You can still read published community stories below. Sign in to create and submit a story.'}
          </p>
          <a
            href="/sign-in?redirect=/story-tool"
            className="mt-6 inline-flex items-center justify-center rounded-full bg-gradient-to-r from-[#8B5CF6] to-[#B580FF] px-5 py-2.5 text-[13px] font-bold text-white"
          >
            {isDe ? 'Anmelden' : 'Sign in'}
          </a>
        </section>
      )}

      <CommunityStories extraStories={approvedStories.map(mapApprovedStoryToCommunityStory)} />
    </>
  );
}
