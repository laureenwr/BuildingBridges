'use client';

import type { PublicApprovedStory } from '@/lib/actions/stories';
import { useLanguage } from '@/lib/hooks/useLanguage';

export function ApprovedStoriesList({
  stories,
  variant = 'public',
}: {
  stories: PublicApprovedStory[];
  variant?: 'public' | 'admin';
}) {
  const { isDe } = useLanguage();
  const isAdmin = variant === 'admin';

  if (stories.length === 0) {
    return (
      <div
        className={
          isAdmin
            ? 'rounded-2xl border border-[rgba(145,82,255,0.12)] bg-white px-5 py-8 text-center text-[#5C5275] shadow-[0_10px_36px_rgba(145,82,255,0.09)]'
            : 'rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-8 text-center text-white/55'
        }
      >
        {isDe
          ? 'Noch keine geprüften Community-Stories. Nach der Freigabe erscheinen sie hier.'
          : 'No reviewed community stories yet. Approved submissions will appear here.'}
      </div>
    );
  }

  return (
    <div className="space-y-5">
      {stories.map((story) => (
        <article
          key={story.id}
          className={
            isAdmin
              ? 'rounded-2xl border border-[rgba(145,82,255,0.12)] bg-white p-6 shadow-[0_10px_36px_rgba(145,82,255,0.09)]'
              : 'rounded-2xl border border-[rgba(145,82,255,0.28)] bg-white/[0.05] p-6'
          }
        >
          <p
            className={
              isAdmin
                ? 'text-[0.72rem] font-bold uppercase tracking-[0.12em] text-[#7339E0]'
                : 'text-[0.72rem] font-bold uppercase tracking-[0.12em] text-[#B580FF]'
            }
          >
            {isDe ? 'Geprüft & veröffentlicht' : 'Reviewed & published'} · {story.submittedOn}
          </p>
          <h3
            className={
              isAdmin
                ? 'mt-2 font-lora text-xl font-semibold text-[#1A1033]'
                : 'mt-2 font-lora text-xl font-semibold text-white'
            }
          >
            {story.title}
          </h3>
          <p className={isAdmin ? 'mt-3 leading-relaxed text-[#5C5275]' : 'mt-3 leading-relaxed text-white/70'}>
            {story.summary}
          </p>
          {story.timeline.length > 0 ? (
            <ol className="mt-5 space-y-3">
              {story.timeline.map((chapter, index) => (
                <li key={`${story.id}-chapter-${index}`}>
                  <p
                    className={
                      isAdmin
                        ? 'text-[0.72rem] font-bold uppercase tracking-[0.08em] text-[#9A8CB3]'
                        : 'text-[0.72rem] font-bold uppercase tracking-[0.08em] text-[#B580FF]/80'
                    }
                  >
                    {chapter.icon ? `${chapter.icon} ` : ''}
                    {chapter.label || (isDe ? `Kapitel ${index + 1}` : `Chapter ${index + 1}`)}
                  </p>
                  <p className={isAdmin ? 'mt-1 text-[#4B4266]' : 'mt-1 text-white/75'}>{chapter.text}</p>
                  {chapter.quote ? (
                    <blockquote
                      className={
                        isAdmin
                          ? 'mt-2 border-l-2 border-[#9152FF] pl-3 italic text-[#5C5275]'
                          : 'mt-2 border-l-2 border-[#B580FF] pl-3 italic text-white/80'
                      }
                    >
                      “{chapter.quote}”
                    </blockquote>
                  ) : null}
                </li>
              ))}
            </ol>
          ) : null}
          {story.quotes.length > 0 ? (
            <div className="mt-5 space-y-2">
              {story.quotes.map((quote, index) => (
                <blockquote
                  key={`${story.id}-quote-${index}`}
                  className={
                    isAdmin
                      ? 'border-l-2 border-[#6BAA8A] pl-3 italic text-[#4B4266]'
                      : 'border-l-2 border-[#6BAA8A] pl-3 italic text-white/80'
                  }
                >
                  “{quote.text}”
                </blockquote>
              ))}
            </div>
          ) : null}
          {story.empowermentMessage ? (
            <p
              className={
                isAdmin
                  ? 'mt-5 rounded-xl bg-[#FAF8FF] px-4 py-3 text-[#4B4266]'
                  : 'mt-5 rounded-xl bg-[rgba(145,82,255,0.16)] px-4 py-3 text-white/85'
              }
            >
              {story.empowermentMessage}
            </p>
          ) : null}
        </article>
      ))}
    </div>
  );
}
