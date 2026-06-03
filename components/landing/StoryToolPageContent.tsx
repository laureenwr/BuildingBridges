'use client';

import { useState } from 'react';
import { AiStoryTool } from './AiStoryTool';
import { CommunityStories } from './CommunityStories';
import { StoryToolDevelopmentNotice } from './StoryToolDevelopmentNotice';
import { useLanguage } from '@/lib/hooks/useLanguage';

function ToggleRow({ label, icon, initialOn = false }: { label: string; icon: string; initialOn?: boolean }) {
  const [on, setOn] = useState(initialOn);
  return (
    <div className="flex items-center justify-between rounded-[var(--radius-sm)] border border-white/10 bg-white/[0.04] px-4 py-3">
      <div className="flex items-center gap-2 text-[0.88rem] font-semibold text-white">
        <span>{icon}</span>
        {label}
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={on}
        onClick={() => setOn(!on)}
        className={`relative h-[22px] w-10 rounded-full border-none transition-colors ${on ? 'bg-[#6BAA8A]' : 'bg-white/20'}`}
      >
        <span
          className={`absolute top-[3px] h-4 w-4 rounded-full bg-white transition-[left] ${on ? 'left-[21px]' : 'left-[3px]'}`}
        />
      </button>
    </div>
  );
}

export function StoryToolPageContent() {
  const { isDe } = useLanguage();
  const scrollAi = () => document.getElementById('ai-story-tool')?.scrollIntoView({ behavior: 'smooth' });

  const steps = isDe
    ? [
        {
          n: '1',
          t: 'Story-Typ wählen',
          d: 'Wähle die Art der Geschichte, die du erzählen möchtest. Alle Formen sind wertvoll.',
          tags: ['Erfahrungsstory', 'Mentoring-Story', 'Awareness-Story'],
        },
        {
          n: '2',
          t: 'Kontext setzen',
          d: 'Wo und wann ist es passiert? Du entscheidest, wie konkret du sein möchtest.',
          tags: ['Schule / Uni', 'Online-Raum', 'Persönlich'],
        },
        {
          n: '3',
          t: 'Erfahrung teilen',
          d: 'Was ist passiert? Nutze Impulsfragen, Vorlagen oder Freitext.',
          tags: ['⚠️ Sensible Abschnitte überspringen'],
        },
        { n: '4', t: 'Empowerment-Botschaft', d: 'Was sollten andere wissen? Was hat dir geholfen?', tags: [] },
        {
          n: '5',
          t: 'Veröffentlichung wählen',
          d: 'Deine Story wird standardmäßig als privater Entwurf gespeichert.',
          tags: ['🔒 Privat halten', '👥 Mit Gruppe teilen', '🌐 Veröffentlichen'],
        },
      ]
    : [
        {
          n: '1',
          t: 'Choose your story type',
          d: 'Select the kind of story you want to tell. All types are valid and valuable.',
          tags: ['Experience story', 'Mentoring story', 'Awareness story'],
        },
        {
          n: '2',
          t: 'Set the context',
          d: 'Where and when did this happen? You control how specific you want to be.',
          tags: ['School / University', 'Online space', 'Personal'],
        },
        {
          n: '3',
          t: 'Share your experience',
          d: 'What happened? You can use guided prompts, templates, or free text.',
          tags: ['⚠️ Skip sensitive sections'],
        },
        { n: '4', t: 'Add your empowerment message', d: 'What would you like others to know? What helped you?', tags: [] },
        {
          n: '5',
          t: 'Choose how to publish',
          d: 'Your story is saved as a private draft by default.',
          tags: ['🔒 Keep private', '👥 Share with group', '🌐 Publish'],
        },
      ];

  return (
    <>
      <StoryToolDevelopmentNotice />

      <div id="story-tool-preview" className="scroll-mt-24">
      <div className="mb-16 max-w-[640px]">
        <p className="mb-3 text-[0.72rem] font-bold uppercase tracking-[0.13em] text-[#B580FF]">
          {isDe ? 'Story-Werkzeug · TP3' : 'Story Creation Tool · TP3'}
        </p>
        <h1 className="font-lora text-[clamp(2rem,3vw,2.8rem)] font-bold leading-tight tracking-tight text-white">
          {isDe ? (
            <>
              Ein gemeinsam gestalteter Raum für <em className="font-normal not-italic text-[#B580FF]">deine Geschichte</em>
            </>
          ) : (
            <>
              A co-creative space for <em className="font-normal not-italic text-[#B580FF]">your story</em>
            </>
          )}
        </h1>
        <p className="mt-4 text-[0.97rem] leading-relaxed text-white/70">
          {isDe
            ? 'Ein digitaler Storytelling-Raum, in dem du steuerst, wie viel du teilst, ob du veröffentlichst und wie KI dich unterstützt – entwickelt mit und für die Community.'
            : 'A digital storytelling space where you control how much you share, whether to publish, and how AI assists your creative process — built with and for the community.'}
        </p>
      </div>

      <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
        <div>
          <h2 className="font-lora text-xl font-bold text-white">
            {isDe ? 'Schritte zur Story-Erstellung' : 'Story creation steps'}
          </h2>
          <p className="mb-6 mt-1 text-[0.85rem] text-white/60">
            {isDe ? 'Ein geführter Prozess – jeder Schritt ist optional.' : 'A guided process — skip any step at any time.'}
          </p>
          <div className="flex flex-col">
            {steps.map((row, idx, arr) => (
              <div
                key={row.n}
                className={`flex gap-4 py-6 ${idx < arr.length - 1 ? 'border-b border-white/[0.08]' : ''}`}
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-[1.5px] border-[rgba(145,82,255,0.35)] bg-[rgba(145,82,255,0.18)] text-[0.85rem] font-extrabold text-[#9152FF]">
                  {row.n}
                </div>
                <div>
                  <h3 className="text-[0.97rem] font-bold text-white">{row.t}</h3>
                  <p className="mt-1 text-[0.85rem] leading-relaxed text-white/60">{row.d}</p>
                  {row.tags.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {row.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full border border-white/15 bg-white/[0.08] px-2.5 py-0.5 text-[0.72rem] font-semibold text-white/70"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-4 rounded-[32px] border-[1.5px] border-white/10 bg-white/[0.06] p-8">
          <div>
            <h2 className="font-lora text-xl font-bold text-white">
              {isDe ? 'Du behältst die Kontrolle' : 'You are always in control'}
            </h2>
            <p className="mt-2 text-[0.85rem] text-white/60">
              {isDe
                ? 'Diese Einstellungen kannst du jederzeit während oder nach der Erstellung anpassen.'
                : 'Adjust these settings at any time during or after creating your story.'}
            </p>
          </div>
          <ToggleRow label={isDe ? 'KI-Unterstützung nutzen' : 'Use AI assistance'} icon="🤖" initialOn />
          <ToggleRow label={isDe ? 'Peer-Feedback erhalten' : 'Receive peer feedback'} icon="💬" />
          <ToggleRow label={isDe ? 'Öffentlich veröffentlichen' : 'Publish publicly'} icon="🌐" />
          <ToggleRow label={isDe ? 'Voice-over / Audio hinzufügen' : 'Add voice-over / audio'} icon="🎙️" />
          <ToggleRow label={isDe ? 'Bilder generieren' : 'Generate images'} icon="🖼️" initialOn />
          <ToggleRow label={isDe ? 'Untertitel / Captions hinzufügen' : 'Add subtitles / captions'} icon="♿" initialOn />
          <button
            type="button"
            onClick={scrollAi}
            className="mt-2 flex w-full items-center justify-center gap-2 rounded-full bg-[#9152FF] py-4 font-primary text-[0.95rem] font-bold text-white shadow-[0_4px_20px_rgba(145,82,255,0.45)] transition hover:bg-[#7339E0] hover:-translate-y-px"
          >
            {isDe ? '✍️ KI-Story-Generator ausprobieren ↓' : '✍️ Try the AI Story Generator ↓'}
          </button>
        </div>
      </div>

      <AiStoryTool />
      </div>

      <div className="mt-20 -mx-6 sm:-mx-10">
        <CommunityStories />
      </div>
    </>
  );
}
