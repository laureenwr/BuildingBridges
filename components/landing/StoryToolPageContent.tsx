'use client';

import { useState } from 'react';
import { AiStoryTool } from './AiStoryTool';
import { CommunityStories } from './CommunityStories';
import { StoryToolDevelopmentNotice } from './StoryToolDevelopmentNotice';
import { mapApprovedStoryToCommunityStory } from '@/lib/content/communityStories';
import type { PublicApprovedStory } from '@/lib/actions/stories';
import { useLanguage } from '@/lib/hooks/useLanguage';
import { cn } from '@/lib/utils';

const STEP_COLORS = [
  {
    ring: 'border-[#4EE1D6] text-[#4EE1D6]',
    glow: 'hover:shadow-[0_0_0_6px_rgba(78,225,214,0.22)]',
    tag: 'border-[rgba(78,225,214,0.32)] bg-[rgba(78,225,214,0.12)] text-[#4EE1D6]',
  },
  {
    ring: 'border-[#B580FF] text-[#B580FF]',
    glow: 'hover:shadow-[0_0_0_6px_rgba(181,128,255,0.22)]',
    tag: 'border-[rgba(181,128,255,0.35)] bg-[rgba(181,128,255,0.14)] text-[#C9A2FF]',
  },
  {
    ring: 'border-[#FF8FB1] text-[#FF8FB1]',
    glow: 'hover:shadow-[0_0_0_6px_rgba(255,143,177,0.22)]',
    tag: 'border-[rgba(255,143,177,0.35)] bg-[rgba(255,143,177,0.14)] text-[#FFB0C8]',
  },
  {
    ring: 'border-[#FFC078] text-[#FFC078]',
    glow: 'hover:shadow-[0_0_0_6px_rgba(255,192,120,0.22)]',
    tag: 'border-[rgba(255,192,120,0.35)] bg-[rgba(255,192,120,0.14)] text-[#FFC078]',
  },
  {
    ring: 'border-[#7FB1FF] text-[#7FB1FF]',
    glow: 'hover:shadow-[0_0_0_6px_rgba(127,177,255,0.22)]',
    tag: 'border-[rgba(127,177,255,0.35)] bg-[rgba(127,177,255,0.14)] text-[#A9CBFF]',
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
}: {
  approvedStories?: PublicApprovedStory[];
}) {
  const { isDe } = useLanguage();
  const scrollAi = () => document.getElementById('ai-story-tool')?.scrollIntoView({ behavior: 'smooth' });

  const steps = isDe
    ? [
        { n: '1', t: 'Story-Typ wählen', d: 'Alle Formen sind wertvoll.', tags: ['Erfahrung', 'Mentoring'] },
        { n: '2', t: 'Kontext setzen', d: 'Du entscheidest, wie konkret du sein möchtest.', tags: ['Schule', 'Persönlich'] },
        { n: '3', t: 'Erfahrung teilen', d: 'Impulsfragen, Vorlagen oder Freitext.', tags: ['⚠ Sensibles überspringen'] },
        { n: '4', t: 'Empowerment-Botschaft', d: 'Was sollten andere wissen?', tags: [] },
        { n: '5', t: 'Veröffentlichung wählen', d: 'Standardmäßig privater Entwurf.', tags: ['🔒 Privat', '🌐 Veröffentlichen'] },
      ]
    : [
        { n: '1', t: 'Choose your story type', d: 'All types are valid and valuable.', tags: ['Experience', 'Mentoring'] },
        { n: '2', t: 'Set the context', d: 'You control how specific to be.', tags: ['School', 'Personal'] },
        { n: '3', t: 'Share your experience', d: 'Guided prompts, templates, or free text.', tags: ['⚠ Skip sensitive'] },
        { n: '4', t: 'Add your empowerment message', d: 'What would you like others to know?', tags: [] },
        { n: '5', t: 'Choose how to publish', d: 'Saved as a private draft by default.', tags: ['🔒 Private', '🌐 Publish'] },
      ];

  return (
    <>
      <StoryToolDevelopmentNotice />

      <section
        id="story-tool-preview"
        className="relative -mx-6 mb-4 scroll-mt-24 overflow-hidden bg-[radial-gradient(120%_160%_at_12%_-15%,#2E1E4D_0%,#1A1129_42%,#100A1C_100%)] px-5 py-12 sm:-mx-10 sm:px-10 sm:py-14"
      >
        <div
          className="pointer-events-none absolute -right-20 -top-[120px] h-[380px] w-[380px] rounded-full bg-[radial-gradient(circle,rgba(181,128,255,0.30)_0%,rgba(181,128,255,0)_70%)] blur-[10px]"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute -bottom-[140px] left-[10%] h-[320px] w-[320px] rounded-full bg-[radial-gradient(circle,rgba(255,143,177,0.16)_0%,rgba(255,143,177,0)_70%)] blur-[10px]"
          aria-hidden
        />

        <div className="relative z-[1] flex flex-col gap-7">
          <div className="flex flex-wrap items-start justify-between gap-6">
            <div>
              <p className="mb-2.5 text-[11px] font-bold uppercase tracking-[0.14em] text-[#C9A2FF]">
                {isDe ? 'Story-Werkzeug · TP3' : 'Story Creation Tool · TP3'}
              </p>
              <h1 className="max-w-[620px] font-lora text-[clamp(1.5rem,2.4vw,1.9rem)] font-bold leading-[1.18] text-white">
                {isDe ? (
                  <>
                    Ein gemeinsam gestalteter Raum für{' '}
                    <em className="not-italic text-[#B580FF]">deine Geschichte</em>
                  </>
                ) : (
                  <>
                    A co-creative space for <em className="not-italic text-[#B580FF]">your story</em>
                  </>
                )}
              </h1>
              <p className="mt-2.5 max-w-[520px] text-[13.5px] leading-[1.55] text-white/60">
                {isDe
                  ? 'Fünf geführte Schritte, bei denen du die Kontrolle behältst — überspringe jeden, komm jederzeit zurück, veröffentliche erst wenn du bereit bist.'
                  : "Five guided steps you're always in control of — skip any, revisit any, publish only when you're ready."}
              </p>
            </div>

            <div className="flex shrink-0 items-center gap-2.5 rounded-full border border-white/10 bg-white/5 py-2 pl-2.5 pr-4">
              <div className="flex h-[30px] w-[30px] shrink-0 items-center justify-center rounded-full bg-[conic-gradient(#4EE1D6_0deg_72deg,#B580FF_72deg_144deg,#FF8FB1_144deg_216deg,#FFC078_216deg_288deg,#7FB1FF_288deg_360deg)]">
                <span className="block h-5 w-5 rounded-full bg-[#1A1129]" />
              </div>
              <div>
                <div className="text-[11.5px] font-bold text-white">
                  {isDe ? '5 flexible Schritte' : '5 flexible steps'}
                </div>
                <div className="text-[10.5px] text-white/50">
                  {isDe ? 'keiner ist Pflicht' : 'none required to finish'}
                </div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div
              className="absolute left-[9%] right-[9%] top-[22px] hidden h-0.5 bg-[linear-gradient(90deg,#4EE1D6,#B580FF,#FF8FB1,#FFC078,#7FB1FF)] opacity-45 min-[880px]:block"
              aria-hidden
            />
            <div className="relative grid grid-cols-1 gap-x-[18px] gap-y-6 sm:grid-cols-2 min-[880px]:grid-cols-5">
              {steps.map((row, idx) => {
                const color = STEP_COLORS[idx];
                return (
                  <div
                    key={row.n}
                    className="flex flex-col items-start gap-2.5 transition-transform duration-[180ms] ease-out hover:-translate-y-1"
                  >
                    <div
                      className={cn(
                        'flex h-11 w-11 items-center justify-center rounded-full border-2 bg-[#1A1129] font-lora text-base font-bold transition-[box-shadow] duration-[180ms] ease-out',
                        color.ring,
                        color.glow
                      )}
                    >
                      {row.n}
                    </div>
                    <h2 className="text-[13.5px] font-bold leading-snug text-white">{row.t}</h2>
                    <p className="min-h-[34px] text-[11.5px] leading-normal text-white/55">{row.d}</p>
                    <div className="flex min-h-[22px] flex-wrap gap-[5px]">
                      {row.tags.map((tag) => (
                        <span
                          key={tag}
                          className={cn(
                            'whitespace-nowrap rounded-full border px-2 py-[3px] text-[9.5px] font-semibold',
                            color.tag
                          )}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="flex flex-col items-start gap-[18px] rounded-2xl border border-white/10 bg-white/[0.045] px-[18px] py-3.5 min-[880px]:flex-row min-[880px]:items-center">
            <div className="shrink-0 border-white/10 min-[880px]:border-r min-[880px]:pr-4">
              <div className="text-[12.5px] font-bold text-white">
                {isDe ? 'Du behältst die Kontrolle' : "You're always in control"}
              </div>
              <div className="text-[10.5px] text-white/50">
                {isDe ? 'Jederzeit anpassbar' : 'Adjust anytime'}
              </div>
            </div>

            <div className="flex flex-grow flex-wrap items-center gap-2">
              <ToggleChip label={isDe ? 'KI-Unterstützung' : 'AI assistance'} initialOn />
              <ToggleChip label={isDe ? 'Peer-Feedback' : 'Peer feedback'} />
              <ToggleChip label={isDe ? 'Öffentlich' : 'Publish publicly'} />
              <ToggleChip label={isDe ? 'Bilder' : 'Generate images'} initialOn variant="teal" />
              <ToggleChip label={isDe ? 'Untertitel' : 'Subtitles'} initialOn variant="teal" />
            </div>

            <button
              type="button"
              onClick={scrollAi}
              className="inline-flex w-full shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-full bg-gradient-to-r from-[#8B5CF6] to-[#B580FF] px-[18px] py-[11px] text-[12.5px] font-bold text-white transition hover:-translate-y-px hover:brightness-110 min-[880px]:w-auto"
            >
              {isDe ? '✨ KI-Story-Generator ausprobieren' : '✨ Try the AI Story Generator'}
            </button>
          </div>
        </div>
      </section>

      <AiStoryTool />

      <div className="mt-20 -mx-6 sm:-mx-10">
        <CommunityStories extraStories={approvedStories.map(mapApprovedStoryToCommunityStory)} />
      </div>
    </>
  );
}
