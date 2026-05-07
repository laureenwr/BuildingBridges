'use client';

import { useState } from 'react';
import { AiStoryTool } from './AiStoryTool';

type CommunityStoryChapter = {
  num: string;
  label: string;
  period: string;
  icon: string;
  heading: string;
  body: string;
  quote?: string;
};

type CommunityStory = {
  id: string;
  name: string;
  origin: string;
  field: string;
  type: 'mentor' | 'participant' | 'researcher';
  avatar: string;
  teaser: string;
  headline: string;
  tagline: string;
  tags: string[];
  cardText: string;
  keyQuote: string;
  timelineDesc: string;
  chapters: CommunityStoryChapter[];
};

const communityStories: CommunityStory[] = [
  {
    id: 'cairo-to-charite',
    name: 'From Cairo to Charite',
    origin: 'Egypt -> Berlin',
    field: 'Psychology',
    type: 'mentor',
    avatar: '🌍',
    teaser: 'She was told she would never get in. She kept the letter.',
    headline: 'From Cairo to Charite - Finding My Voice',
    tagline:
      "A psychology student's journey across continents, classrooms and belonging - navigating barriers with quiet determination.",
    tags: ['Psychology', 'Mentor', 'Egypt -> Germany'],
    cardText:
      'Growing up in a German school in Egypt, she dreamed of studying psychology in Berlin. When a university representative told her she would never be admitted, she applied anyway - and was. She arrived late, without housing, without a credit history. She navigated lecture halls where she was one of very few students of color. She carried the accumulated weight of small comments and large systems. And she discovered, slowly, that her bilingual background was not a burden but a gift the field desperately needed.',
    keyQuote: "\"Don't rush to prove anything to others - do it for yourself.\"",
    timelineDesc:
      'A journey across continents, classrooms and belonging - told as a timeline of turning points.',
    chapters: [
      {
        num: '01',
        label: 'The Seed',
        period: 'Early years - Egypt',
        icon: '🌍',
        heading: 'A German school in the desert',
        body: 'Growing up in Egypt, she attended a German school - one of the rare windows to a world most of her peers would never see. German was not just a foreign language; it was a door. That school planted something she did not yet have a name for - a sense that there was a place, far away, where psychology and rigor and compassion could live together.',
      },
      {
        num: '02',
        label: "The Rejection That Wasn't",
        period: 'University application - Berlin visit',
        icon: '🔥',
        heading: '"You will never get in."',
        body: 'When she visited the Freie University of Berlin, a representative told her directly that someone like her would never be admitted. She chose not to collapse into that sentence. She applied anyway. The acceptance letter arrived months later.',
        quote: 'They told me I would never get in. I kept the letter.',
      },
      {
        num: '03',
        label: 'Arriving Without a Floor',
        period: 'Arrival - Berlin, late admission',
        icon: '🏙️',
        heading: 'No housing. No credit.',
        body: 'She arrived in Berlin with a late admission - housing lists were already closed and classes had started. No credit history meant no apartment. Those early months were made of improvisation and resilience.',
      },
      {
        num: '04',
        label: 'The Lecture Hall',
        period: 'University - lecture halls',
        icon: '👁️',
        heading: 'One of the only ones of color',
        body: 'In the lecture hall, she was often one of very few students of color. Once, a fellow student asked if she had come to Berlin by camel. The comments were small. The accumulation was not.',
        quote: 'The comments were small. The accumulation was not.',
      },
      {
        num: '05',
        label: 'The Turning',
        period: 'Turning point - clinical work',
        icon: '🌱',
        heading: 'Bilingualism as bridge, not burden',
        body: 'What she had thought of as a complication - her Arabic, her Egyptian context, her non-linear route to Berlin - became a resource the field desperately needs. Working with patients in their native language is not just efficient; it is dignifying.',
      },
      {
        num: '06',
        label: 'The Message',
        period: 'Today - message to others',
        icon: '✨',
        heading: 'Do it for yourself',
        body: 'If I could speak to the person standing outside that Berlin university, I would say: the doubt you feel is real, but it is not the truth. The barriers are real, but they are not the end of the sentence.',
        quote: "Don't rush to prove anything to others - do it for yourself.",
      },
    ],
  },
  {
    id: 'finding-my-people-berlin',
    name: 'Finding My People in Berlin',
    origin: 'Berlin - Germany',
    field: 'Psychology',
    type: 'participant',
    avatar: '💜',
    teaser: 'She always knew she wanted to do something social. It just took time to name it.',
    headline: 'Finding My People in Berlin',
    tagline:
      'A third-semester psychology student navigating a non-diverse lecture hall, a packed calendar, and the slow work of building community on her own terms.',
    tags: ['Psychology', 'Participant', 'Berlin'],
    cardText:
      'She always knew she wanted to do something social. By her teenage years, she realized it was psychology. Her parents nudged her away from social work for financial reasons, and she chose empirical grounding over pure philosophy. Now in her third semester, she is one of very few students of color in her lecture hall, and she finds support through political organizing, a mutual aid therapy circle, and suicide prevention volunteering.',
    keyQuote: '"Listen to yourself on every step of the way - and never be too scared to change."',
    timelineDesc:
      'A journey of slow decisions, political awakening, and finding community outside the classroom.',
    chapters: [
      {
        num: '01',
        label: 'Always Something Social',
        period: 'Childhood and teenage years - Berlin',
        icon: '🌱',
        heading: 'She always knew - just not quite what',
        body: 'From an early age she knew she wanted to do something social. Nursing, medicine, therapy - something where people matter. In her teenage years, people around her kept saying she was good at emotionally supporting others, and psychology slowly came into focus.',
      },
      {
        num: '02',
        label: 'The Compromise',
        period: 'Late high school - decision time',
        icon: '⚖️',
        heading: 'Psychology as compromise and conviction',
        body: 'She first wanted social work, but her parents were concerned about financial precarity. She chose psychology and leaned into its empirical grounding, wanting evidence to support the political and philosophical knowledge she already carried.',
        quote: 'I wanted empirical evidence for my knowledge - philosophy alone was not enough.',
      },
      {
        num: '03',
        label: 'The Lecture Hall',
        period: 'First semesters - university life',
        icon: '👁️',
        heading: 'One of the only ones in the room',
        body: 'At university she was often one of very few students of color. Growing up in a diverse school environment, this was a shock. She also expected more political awareness among peers and found it harder than expected to locate shared perspectives.',
      },
      {
        num: '04',
        label: 'No Mentor in the Room',
        period: 'University - daily reality',
        icon: '🪟',
        heading: 'No professor who looks like me',
        body: 'In large lecture settings, she felt structurally anonymous. She had no one-on-one relationships with professors and did not see people of color among instructors, tutors, or supervisors.',
        quote: 'No one knows my name. And even if they did, I fear that would not mean anything great.',
      },
      {
        num: '05',
        label: 'Finding Community Outside',
        period: 'Ongoing - organizing and volunteering',
        icon: '🤝',
        heading: 'Her people outside the classroom',
        body: 'She volunteers in digital suicide prevention, organizes politically, and attends mutual aid circles. These spaces gave her the sense of belonging she could not find in formal university structures.',
      },
      {
        num: '06',
        label: 'The Advice',
        period: 'Today - message to others',
        icon: '✨',
        heading: 'Listen to yourself and allow change',
        body: 'Her advice is simple: keep listening to yourself, build peer connections early, and do not fear changing direction. Passion pursued later is still better than staying in something that drains you.',
        quote: 'Listen to yourself on every step of the way - and never be too scared to change.',
      },
    ],
  },
];

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
  const [storyFilter, setStoryFilter] = useState<'all' | 'mentor' | 'participant' | 'researcher'>('all');
  const [activeStoryId, setActiveStoryId] = useState<string | null>(null);
  const [storyFormat, setStoryFormat] = useState<'immersive' | 'card' | 'timeline' | 'quotes' | 'album'>('immersive');
  const [albumIndex, setAlbumIndex] = useState(0);

  const visibleStories = communityStories.filter((story) => storyFilter === 'all' || story.type === storyFilter);
  const activeStory = communityStories.find((story) => story.id === activeStoryId) ?? null;
  const albumSlides = activeStory
    ? [
        { overline: 'Building Bridges - Mentor Story', title: activeStory.headline, body: activeStory.tagline, quote: '' },
        ...activeStory.chapters.map((chapter) => ({
          overline: `Chapter ${chapter.num} - ${chapter.label}`,
          title: chapter.heading,
          body: chapter.body,
          quote: chapter.quote ?? '',
        })),
      ]
    : [];

  const openStory = (storyId: string) => {
    setActiveStoryId(storyId);
    setStoryFormat('immersive');
    setAlbumIndex(0);
  };

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

      <section id="community-stories" className="mt-20">
        <p className="mb-3 text-[0.72rem] font-bold uppercase tracking-[0.13em] text-[#B580FF]">Community Stories - Building Bridges</p>
        <h2 className="font-lora text-[clamp(1.8rem,3vw,2.4rem)] font-bold leading-tight text-white">
          Stories that <em className="font-normal not-italic text-[#B580FF]">build bridges</em>
        </h2>
        <p className="mt-3 max-w-[680px] text-[0.92rem] leading-relaxed text-white/60">
          Real experiences from mentors, researchers and participants - shared to inspire, connect and empower.
          More stories are added as interviews are conducted.
        </p>

        {!activeStory ? (
          <div className="mt-10">
            <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
              <p className="font-dmMono text-[0.68rem] uppercase tracking-[0.1em] text-white/35">
                {visibleStories.length === 1 ? '1 story published' : `${visibleStories.length} stories published`}
              </p>
              <div className="flex flex-wrap gap-2">
                {(['all', 'mentor', 'participant', 'researcher'] as const).map((filter) => (
                  <button
                    key={filter}
                    type="button"
                    onClick={() => setStoryFilter(filter)}
                    className={`rounded-full border px-3 py-1.5 text-[0.74rem] font-semibold transition ${
                      storyFilter === filter
                        ? 'border-[#9152FF] bg-[rgba(145,82,255,0.18)] text-white'
                        : 'border-white/10 bg-white/[0.03] text-white/45 hover:border-[#9152FF]/50 hover:text-white'
                    }`}
                  >
                    {filter[0].toUpperCase() + filter.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
              {visibleStories.map((story) => (
                <button
                  key={story.id}
                  type="button"
                  onClick={() => openStory(story.id)}
                  className="group rounded-[20px] border border-white/10 bg-white/[0.03] p-6 text-left transition hover:-translate-y-1 hover:border-[#9152FF]/40 hover:bg-[rgba(145,82,255,0.08)]"
                >
                  <div className="mb-4 flex items-center gap-3">
                    <span className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-[#9152FF] to-[#6BAA8A] text-xl shadow-md">
                      {story.avatar}
                    </span>
                    <div>
                      <p className="text-[0.9rem] font-bold text-white">{story.name}</p>
                      <p className="text-[0.72rem] text-white/45">{story.origin}</p>
                    </div>
                  </div>
                  <div className="mb-3 flex flex-wrap gap-1.5">
                    {story.tags.map((tag) => (
                      <span key={tag} className="rounded-full border border-[#9152FF]/35 bg-[rgba(145,82,255,0.12)] px-2.5 py-0.5 text-[0.62rem] font-semibold uppercase tracking-[0.06em] text-[#C9B1FF]">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <p className="text-[0.83rem] italic leading-relaxed text-white/55">{story.teaser}</p>
                  <p className="mt-4 text-[0.75rem] font-semibold text-[#B580FF]">Read story -</p>
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="mt-10">
            <div className="mb-5 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => setActiveStoryId(null)}
                className="rounded-full border border-white/15 bg-white/[0.04] px-4 py-2 text-[0.8rem] font-semibold text-white/65 hover:text-white"
              >
                ← All stories
              </button>
              <div>
                <p className="font-lora text-[1.05rem] font-bold text-white">{activeStory.name}</p>
                <p className="text-[0.72rem] uppercase tracking-[0.08em] text-[#B580FF]">
                  {activeStory.origin} - {activeStory.field}
                </p>
              </div>
            </div>

            <div className="mb-6 flex flex-wrap gap-2">
              {(['immersive', 'card', 'timeline', 'quotes', 'album'] as const).map((format) => (
                <button
                  key={format}
                  type="button"
                  onClick={() => setStoryFormat(format)}
                  className={`rounded-full border px-3 py-1.5 text-[0.76rem] font-semibold capitalize transition ${
                    storyFormat === format
                      ? 'border-[#9152FF] bg-[rgba(145,82,255,0.2)] text-white'
                      : 'border-white/10 bg-white/[0.03] text-white/45 hover:border-[#9152FF]/50 hover:text-white'
                  }`}
                >
                  {format}
                </button>
              ))}
            </div>

            {storyFormat === 'immersive' && (
              <div className="overflow-hidden rounded-[22px] border border-[#9152FF]/20 bg-[#080510]">
                <div className="border-b border-[#9152FF]/20 bg-gradient-to-br from-[#0c0428] to-[#080510] px-7 py-8">
                  <p className="font-dmMono text-[0.6rem] uppercase tracking-[0.2em] text-[#B580FF]/70">
                    Building Bridges - {activeStory.field} - {activeStory.origin}
                  </p>
                  <h3 className="mt-3 font-lora text-[clamp(1.7rem,3vw,2.4rem)] font-bold leading-tight text-white">
                    {activeStory.headline}
                  </h3>
                  <p className="mt-2 max-w-[620px] text-[0.88rem] leading-relaxed text-white/55">{activeStory.tagline}</p>
                </div>
                <div className="max-h-[520px] overflow-y-auto">
                  {activeStory.chapters.map((chapter) => (
                    <div key={chapter.num} className="border-b border-white/5 px-7 py-6 last:border-b-0">
                      <p className="font-dmMono text-[0.58rem] uppercase tracking-[0.16em] text-[#B580FF]/60">
                        {chapter.num} - {chapter.label}
                      </p>
                      <h4 className="mt-2 font-lora text-[1.3rem] font-bold text-white">{chapter.heading}</h4>
                      <p className="mt-2 max-w-[760px] text-[0.86rem] leading-relaxed text-white/60">{chapter.body}</p>
                      {chapter.quote && <p className="mt-3 border-l-2 border-[#9152FF]/60 pl-3 font-lora text-[0.92rem] italic text-white/80">&ldquo;{chapter.quote}&rdquo;</p>}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {storyFormat === 'card' && (
              <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                <div className="rounded-[22px] border border-[#9152FF]/25 bg-gradient-to-br from-[#1a0e38] to-[#0e0b1a] p-7">
                  <span className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-[#9152FF] to-[#6BAA8A] text-2xl shadow-lg">
                    {activeStory.avatar}
                  </span>
                  <h3 className="font-lora text-xl font-bold text-white">{activeStory.name}</h3>
                  <p className="mb-4 text-[0.72rem] uppercase tracking-[0.07em] text-[#B580FF]">
                    {activeStory.field} - {activeStory.origin}
                  </p>
                  <p className="text-[0.86rem] leading-relaxed text-white/60">{activeStory.cardText}</p>
                  <p className="mt-4 rounded-r-xl border-l-2 border-[#B580FF] bg-[rgba(145,82,255,0.1)] px-3 py-2 font-lora text-[0.92rem] italic text-white/80">
                    {activeStory.keyQuote}
                  </p>
                </div>
                <div className="flex flex-col gap-2">
                  {activeStory.chapters.map((chapter) => (
                    <div key={chapter.num} className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
                      <p className="font-dmMono text-[0.58rem] uppercase tracking-[0.12em] text-[#B580FF]/55">Chapter {chapter.num}</p>
                      <p className="mt-1 text-[0.88rem] font-semibold text-white">
                        {chapter.icon} {chapter.label}
                      </p>
                      <p className="mt-1 text-[0.78rem] text-white/45">{chapter.body.slice(0, 120)}...</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {storyFormat === 'timeline' && (
              <div>
                <p className="mb-6 max-w-[620px] text-[0.86rem] text-white/55">{activeStory.timelineDesc}</p>
                <div className="relative pl-2 before:absolute before:bottom-0 before:left-[22px] before:top-2 before:w-px before:bg-gradient-to-b before:from-[#9152FF]/70 before:via-[#6BAA8A]/50 before:to-transparent">
                  {activeStory.chapters.map((chapter) => (
                    <div key={chapter.num} className="relative mb-5 flex gap-4 last:mb-0">
                      <div className="relative z-[1] mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/15 bg-[#1A1033] text-sm">
                        {chapter.icon}
                      </div>
                      <div className="flex-1 rounded-[14px] border border-white/10 bg-white/[0.03] p-4">
                        <p className="font-dmMono text-[0.58rem] uppercase tracking-[0.12em] text-[#B580FF]/60">{chapter.period}</p>
                        <h4 className="mt-1 font-lora text-[1rem] font-bold text-white">{chapter.heading}</h4>
                        <p className="mt-1 text-[0.82rem] leading-relaxed text-white/55">{chapter.body}</p>
                        {chapter.quote && <p className="mt-2 border-l-2 border-[#9152FF]/55 pl-2 font-lora text-[0.86rem] italic text-white/75">&ldquo;{chapter.quote}&rdquo;</p>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {storyFormat === 'quotes' && (
              <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                {activeStory.chapters.map((chapter) => (
                  <div key={chapter.num} className="rounded-[16px] border border-[#9152FF]/25 bg-gradient-to-br from-[#1a0e38] to-[#0d0a20] p-5">
                    <p className="mb-2 font-lora text-4xl leading-none text-[#B580FF]/40">&quot;</p>
                    <p className="font-lora text-[0.95rem] italic leading-relaxed text-white/80">
                      {chapter.quote ?? chapter.body.split('.').slice(0, 1).join('.')}
                    </p>
                    <p className="mt-3 font-dmMono text-[0.58rem] uppercase tracking-[0.1em] text-white/35">
                      Chapter {chapter.num} - {chapter.label}
                    </p>
                  </div>
                ))}
              </div>
            )}

            {storyFormat === 'album' && albumSlides.length > 0 && (
              <div>
                <div className="mb-3 flex items-center justify-between">
                  <p className="text-[0.8rem] text-white/45">
                    Slide {albumIndex + 1} / {albumSlides.length}
                  </p>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => setAlbumIndex((prev) => Math.max(0, prev - 1))}
                      className="rounded-full border border-white/15 px-3 py-1 text-[0.74rem] text-white/70 hover:text-white"
                    >
                      ←
                    </button>
                    <button
                      type="button"
                      onClick={() => setAlbumIndex((prev) => Math.min(albumSlides.length - 1, prev + 1))}
                      className="rounded-full border border-white/15 px-3 py-1 text-[0.74rem] text-white/70 hover:text-white"
                    >
                      →
                    </button>
                  </div>
                </div>
                <div className="rounded-[20px] border border-[#9152FF]/25 bg-gradient-to-br from-[#0c0428] to-[#060410] p-7">
                  <p className="font-dmMono text-[0.58rem] uppercase tracking-[0.14em] text-[#B580FF]/60">
                    {albumSlides[albumIndex].overline}
                  </p>
                  <h3 className="mt-2 font-lora text-[clamp(1.35rem,2.6vw,2rem)] font-bold leading-tight text-white">
                    {albumSlides[albumIndex].title}
                  </h3>
                  <p className="mt-2 max-w-[760px] text-[0.86rem] leading-relaxed text-white/60">{albumSlides[albumIndex].body}</p>
                  {albumSlides[albumIndex].quote && (
                    <p className="mt-3 border-l-2 border-white/30 pl-3 font-lora text-[0.9rem] italic text-white/78">
                      &ldquo;{albumSlides[albumIndex].quote}&rdquo;
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </section>

    </>
  );
}
