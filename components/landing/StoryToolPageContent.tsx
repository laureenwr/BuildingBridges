'use client';

import { useState } from 'react';
import { AiStoryTool } from './AiStoryTool';

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
  const scrollAi = () => document.getElementById('ai-story-tool')?.scrollIntoView({ behavior: 'smooth' });

  return (
    <>
      <div className="mb-16 max-w-[640px]">
        <p className="mb-3 text-[0.72rem] font-bold uppercase tracking-[0.13em] text-[#B580FF]">Story Creation Tool — TP3</p>
        <h1 className="font-lora text-[clamp(2rem,3vw,2.8rem)] font-bold leading-tight tracking-tight text-white">
          A co-creative space for <em className="font-normal not-italic text-[#B580FF]">your story</em>
        </h1>
        <p className="mt-4 text-[0.97rem] leading-relaxed text-white/70">
          A digital storytelling space where you control how much you share, whether to publish, and how AI assists your
          creative process — built with and for the community.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
        <div>
          <h2 className="font-lora text-xl font-bold text-white">Story creation steps</h2>
          <p className="mb-6 mt-1 text-[0.85rem] text-white/60">A guided process — skip any step at any time.</p>
          <div className="flex flex-col">
            {[
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
            ].map((row, idx, arr) => (
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
            <h2 className="font-lora text-xl font-bold text-white">You are always in control</h2>
            <p className="mt-2 text-[0.85rem] text-white/60">
              Adjust these settings at any time during or after creating your story.
            </p>
          </div>
          <ToggleRow label="Use AI assistance" icon="🤖" initialOn />
          <ToggleRow label="Receive peer feedback" icon="💬" />
          <ToggleRow label="Publish publicly" icon="🌐" />
          <ToggleRow label="Add voice-over / audio" icon="🎙️" />
          <ToggleRow label="Generate images" icon="🖼️" initialOn />
          <ToggleRow label="Add subtitles / captions" icon="♿" initialOn />
          <button
            type="button"
            onClick={scrollAi}
            className="mt-2 flex w-full items-center justify-center gap-2 rounded-full bg-[#9152FF] py-4 font-primary text-[0.95rem] font-bold text-white shadow-[0_4px_20px_rgba(145,82,255,0.45)] transition hover:bg-[#7339E0] hover:-translate-y-px"
          >
            ✍️ Try the AI Story Generator ↓
          </button>
        </div>
      </div>

      <AiStoryTool />

      <div className="mt-16">
        <h2 className="font-lora text-2xl font-bold text-white">AI-supported technical toolkit</h2>
        <p className="mb-8 mt-2 text-[0.88rem] text-white/60">
          Combining manual creativity with responsible AI support — always optional, always transparent.
        </p>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { i: '✍️', t: 'Text generation', p: 'LLM-powered writing assistance — you stay the author.' },
            { i: '🖼️', t: 'Image generation', p: 'Illustrations without using personal photos.' },
            { i: '🎙️', t: 'Audio & voice-over', p: 'Record or generate narration with privacy options.' },
            { i: '📝', t: 'Structure & subtitles', p: 'Automated structuring and subtitles for accessibility.' },
          ].map((x) => (
            <div
              key={x.t}
              className="rounded-[18px] border-[1.5px] border-white/10 bg-white/[0.06] p-5 text-center transition hover:bg-white/10"
            >
              <div className="mb-3 text-3xl">{x.i}</div>
              <h3 className="text-[0.88rem] font-bold text-white">{x.t}</h3>
              <p className="mt-1 text-[0.78rem] leading-relaxed text-white/55">{x.p}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-14">
        <h2 className="font-lora text-2xl font-bold text-white">Design principles</h2>
        <p className="mb-8 mt-2 text-[0.88rem] text-white/60">Developed through interviews, workshops, and participant feedback.</p>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {[
            { i: '🔒', t: 'Privacy by default', p: 'Drafts stay private until you choose to publish.' },
            { i: '⏭️', t: 'Skip anything', p: 'Sensitive prompts include a skip path — nothing is mandatory.' },
            { i: '🕐', t: 'Publish later', p: 'Take the time you need before sharing more widely.' },
            { i: '🌈', t: 'Inclusive language', p: 'Gender-inclusive, accessible copy in German and English.' },
            { i: '💙', t: 'Emotional safety', p: 'Content notes and pause points in the story flow.' },
            { i: '🔍', t: 'Transparency', p: 'Clear explanations of AI use, storage, and access.' },
          ].map((d) => (
            <div key={d.t} className="rounded-[18px] border border-white/10 bg-white/[0.05] p-5">
              <h3 className="flex items-center gap-2 text-[0.88rem] font-bold text-white">
                <span>{d.i}</span>
                {d.t}
              </h3>
              <p className="mt-2 text-[0.8rem] leading-relaxed text-white/55">{d.p}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
