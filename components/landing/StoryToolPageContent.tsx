'use client';

import { useEffect, useState, type MouseEvent } from 'react';
import { AiStoryTool } from './AiStoryTool';
import { CommunityStories } from './CommunityStories';
import { mapApprovedStoryToCommunityStory } from '@/lib/content/communityStories';
import type { PublicApprovedStory } from '@/lib/actions/stories';
import { useLanguage } from '@/lib/hooks/useLanguage';

const BRIDGE_STEPS = [
  {
    en: 'Collect',
    de: 'Sammeln',
    enDetail: 'Talk with the guide, or paste a transcript you already have.',
    deDetail: 'Sprich mit der Anleitung, oder füge ein Transkript ein, das du schon hast.',
  },
  {
    en: 'Details',
    de: 'Details',
    enDetail: 'Give your story a title and say what kind of story it is.',
    deDetail: 'Gib deiner Geschichte einen Titel und sag, welche Art von Geschichte es ist.',
  },
  {
    en: 'Chapters',
    de: 'Kapitel',
    enDetail: 'Shape the chapters and edit the wording yourself.',
    deDetail: 'Forme die Kapitel und bearbeite die Formulierungen selbst.',
  },
  {
    en: 'Review',
    de: 'Prüfen',
    enDetail: 'A person reads it before anything is published.',
    deDetail: 'Ein Mensch liest sie, bevor etwas veröffentlicht wird.',
  },
] as const;

const BRIDGE_REACH = [0.14, 0.4, 0.66, 0.9] as const;

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const apply = () => setReduced(media.matches);
    apply();
    media.addEventListener('change', apply);
    return () => media.removeEventListener('change', apply);
  }, []);
  return reduced;
}

function scrollToSection(id: string, moveFocus: boolean) {
  return (event: MouseEvent<HTMLAnchorElement>) => {
    const target = document.getElementById(id);
    if (!target) return;
    event.preventDefault();
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const top = target.getBoundingClientRect().top + window.scrollY - 78;
    window.scrollTo({ top: Math.max(0, top), behavior: reduced ? 'auto' : 'smooth' });
    if (!moveFocus) return;
    if (!target.hasAttribute('tabindex')) target.tabIndex = -1;
    target.focus({ preventScroll: true });
  };
}

export function StoryToolPageContent({
  approvedStories = [],
  canCreateStories = false,
}: {
  approvedStories?: PublicApprovedStory[];
  canCreateStories?: boolean;
}) {
  const { isDe } = useLanguage();
  const reducedMotion = usePrefersReducedMotion();
  const [activeStep, setActiveStep] = useState(0);
  const [bridgePaused, setBridgePaused] = useState(false);

  useEffect(() => {
    if (bridgePaused || reducedMotion) return;
    const timer = window.setInterval(() => {
      setActiveStep((current) => (current + 1) % BRIDGE_STEPS.length);
    }, 3500);
    return () => window.clearInterval(timer);
  }, [bridgePaused, reducedMotion]);

  const chooseStep = (index: number) => {
    setBridgePaused(true);
    setActiveStep(index);
  };

  const promises = isDe
    ? 'Du entscheidest, was du teilst. · Nichts wird ohne menschliche Prüfung veröffentlicht. · Du kannst jederzeit aufhören.'
    : 'You choose what to share. · Nothing is published without human review. · You can stop at any time.';

  return (
    <>
      <section
        id="story-tool-preview"
        aria-labelledby="story-tool-intro-title"
        className="relative -mx-6 mb-1 scroll-mt-24 border-b border-white/10 px-5 py-3 sm:-mx-10 sm:px-8 sm:py-4"
      >
        <div className="grid items-center gap-3 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-8">
          <div className="min-w-0">
            <p className="mb-1.5 flex flex-wrap items-center gap-2 text-[0.72rem] font-bold uppercase tracking-[0.13em] text-[#B580FF]">
              {isDe ? 'Story-Werkzeug' : 'Story creation tool'}
              <span
                id="story-tool-notice"
                role="status"
                className="rounded-full border border-amber-200/40 px-2 py-0.5 text-[11px] font-semibold normal-case tracking-normal text-amber-200"
              >
                {isDe ? 'In Entwicklung' : 'In development'}
              </span>
            </p>
            <h1
              id="story-tool-intro-title"
              className="font-lora text-[clamp(1.25rem,2vw,1.7rem)] font-bold leading-tight text-white"
            >
              {isDe ? (
                <>
                  Wandle deine Erfahrung in <em className="not-italic text-[#B580FF]">eine Geschichte</em>
                </>
              ) : (
                <>
                  Turn your experience into <em className="not-italic text-[#B580FF]">a story</em>
                </>
              )}
            </h1>
            <p className="mt-1.5 max-w-[46ch] text-sm leading-snug text-white/80">
              {isDe
                ? 'Starte mit einem Gespräch oder einem Transkript und forme die Kapitel selbst.'
                : 'Start from a conversation or a transcript, then shape the chapters yourself.'}
            </p>
            <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2">
              <a
                href="#ai-story-tool"
                onClick={scrollToSection('ai-story-tool', true)}
                className="inline-flex min-h-11 items-center justify-center rounded-full bg-[#7339E0] px-5 py-2.5 text-sm font-bold text-white hover:bg-[#8150EA] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#EDE5FF]"
              >
                {isDe ? 'Geschichte starten' : 'Start your story'}
              </a>
              <a
                href="#community-stories"
                onClick={scrollToSection('community-stories', false)}
                className="inline-flex min-h-11 items-center justify-center text-sm font-bold text-[#EDE5FF] underline decoration-white/40 underline-offset-4 hover:text-white hover:decoration-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#EDE5FF]"
              >
                {isDe ? 'Veröffentlichte Geschichten lesen' : 'Read published stories'}
              </a>
            </div>
          </div>

          <div
            className="min-w-0"
            role="group"
            aria-label={
              isDe
                ? 'Eine Brücke mit vier Steinen, einer für jeden Schritt'
                : 'A bridge with four stones, one for each step'
            }
          >
            <div className="relative">
              <svg
                viewBox="0 0 400 72"
                className="pointer-events-none absolute inset-x-0 top-0 h-16 w-full"
                aria-hidden
              >
                <path
                  d="M20 58 Q200 6 380 58"
                  fill="none"
                  stroke="rgba(255,255,255,0.22)"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
                <path
                  d="M20 58 Q200 6 380 58"
                  fill="none"
                  stroke="#B580FF"
                  strokeWidth="3"
                  strokeLinecap="round"
                  pathLength={1}
                  strokeDasharray="1"
                  strokeDashoffset={1 - BRIDGE_REACH[activeStep]}
                  style={{ transition: reducedMotion ? 'none' : 'stroke-dashoffset 0.7s ease' }}
                />
              </svg>
              <div className="relative grid grid-cols-4">
                {BRIDGE_STEPS.map((step, index) => {
                  const reached = index <= activeStep;
                  const selected = index === activeStep;
                  const name = isDe ? step.de : step.en;
                  return (
                    <button
                      key={step.en}
                      type="button"
                      className={`flex min-w-0 flex-col items-center gap-1 rounded-lg px-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#EDE5FF] ${
                        index === 0 || index === 3 ? 'pt-6' : 'pt-0'
                      }`}
                      aria-current={selected ? 'step' : undefined}
                      aria-pressed={selected}
                      aria-label={isDe ? `Schritt ${index + 1}, ${name}` : `Step ${index + 1}, ${name}`}
                      onClick={() => chooseStep(index)}
                      onMouseEnter={() => chooseStep(index)}
                      onFocus={() => chooseStep(index)}
                    >
                      <span
                        className={`flex h-8 w-8 items-center justify-center rounded-full border-2 text-sm font-bold text-white ${
                          reached
                            ? 'border-[#9152FF] bg-[#7339E0]'
                            : 'border-[#B580FF] bg-[#1A1033]'
                        } ${selected ? 'ring-2 ring-[#EDE5FF] ring-offset-2 ring-offset-[#1A1033]' : ''}`}
                      >
                        {index + 1}
                      </span>
                      <span
                        className={`max-w-full truncate text-[11px] font-semibold leading-none sm:text-xs ${
                          selected ? 'text-white' : 'text-[#EDE5FF]'
                        }`}
                      >
                        {name}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
            <p
              className="mt-1.5 min-h-10 text-center text-sm leading-snug text-white/85"
              aria-live="polite"
            >
              {isDe ? BRIDGE_STEPS[activeStep].deDetail : BRIDGE_STEPS[activeStep].enDetail}
            </p>
          </div>
        </div>
        <p className="mt-2 text-[13px] leading-snug text-white/80">{promises}</p>
      </section>

      {canCreateStories ? (
        <AiStoryTool />
      ) : (
        <section
          id="ai-story-tool"
          tabIndex={-1}
          className="scroll-mt-24 rounded-[28px] border border-white/10 bg-white/[0.05] px-6 py-10 outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#EDE5FF] sm:px-10"
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

      <div className="mt-8 overflow-hidden rounded-[28px]">
        <CommunityStories extraStories={approvedStories.map(mapApprovedStoryToCommunityStory)} />
      </div>
    </>
  );
}
