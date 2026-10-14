'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import type { MySubmittedStory } from '@/lib/actions/stories';
import { useLanguage } from '@/lib/hooks/useLanguage';
import { portalText } from '@/lib/portal/portal-copy';
import { cn } from '@/lib/utils';

function previewText(text: string, limit = 180) {
  const value = text.trim();
  if (value.length <= limit) return value;
  return `${value.slice(0, limit).trim()}…`;
}

function statusLabel(isDe: boolean, status: string) {
  if (status === 'draft') return portalText(isDe, 'Draft', 'Entwurf');
  if (status === 'pending_review') return portalText(isDe, 'In review', 'In Prüfung');
  if (status === 'approved') return portalText(isDe, 'Published', 'Veröffentlicht');
  if (status === 'rejected') return portalText(isDe, 'Rejected', 'Abgelehnt');
  return status;
}

function statusClass(status: string) {
  if (status === 'draft') return 'bg-[#F5F0FF] text-[#7339E0] ring-1 ring-[rgba(145,82,255,0.16)]';
  if (status === 'pending_review') return 'bg-amber-50 text-amber-800 ring-1 ring-amber-200/80';
  if (status === 'approved') return 'bg-emerald-50 text-emerald-800 ring-1 ring-emerald-200/80';
  if (status === 'rejected') return 'bg-rose-50 text-rose-800 ring-1 ring-rose-200/80';
  return 'bg-[#FAF8FF] text-[#6B5F8A]';
}

export function MyStoriesPanel({
  stories,
  storiesAllowed,
}: {
  stories: MySubmittedStory[];
  storiesAllowed: boolean;
}) {
  const { isDe } = useLanguage();
  const [openIds, setOpenIds] = useState<number[]>([]);

  const counts = useMemo(() => {
    const draft = stories.filter((story) => story.status === 'draft').length;
    const pending = stories.filter((story) => story.status === 'pending_review').length;
    const published = stories.filter((story) => story.status === 'approved').length;
    const rejected = stories.filter((story) => story.status === 'rejected').length;
    return { draft, pending, published, rejected };
  }, [stories]);

  const current = stories.filter(
    (story) => story.status === 'draft' || story.status === 'pending_review'
  );
  const archive = stories.filter(
    (story) => story.status === 'approved' || story.status === 'rejected'
  );

  const toggle = (id: number) => {
    setOpenIds((ids) => (ids.includes(id) ? ids.filter((value) => value !== id) : [...ids, id]));
  };

  const renderStory = (story: MySubmittedStory) => {
    const open = openIds.includes(story.id);
    return (
      <article key={story.id} className="rounded-xl border border-[rgba(145,82,255,0.1)] bg-[#FAF8FF] px-4 py-3">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
          <div className="min-w-0">
            <p className="font-semibold text-[#1A1033]">{story.title}</p>
            <p className="mt-1 text-[0.75rem] text-[#6B5F8A]">{story.submittedOn}</p>
          </div>
          <span
            className={cn(
              'inline-flex w-fit shrink-0 rounded-full px-2.5 py-0.5 text-[0.68rem] font-semibold',
              statusClass(story.status)
            )}
          >
            {statusLabel(isDe, story.status)}
          </span>
        </div>
        <p className="mt-2 text-[0.88rem] leading-relaxed text-[#4B4266]">
          {open ? story.summary : previewText(story.summary)}
        </p>
        {story.status === 'rejected' ? (
          <p className="mt-2 rounded-lg bg-rose-50 px-3 py-2 text-[0.8rem] text-rose-800">
            {portalText(
              isDe,
              'This story was not published. No further explanation was stored.',
              'Diese Story wurde nicht veröffentlicht. Es wurde keine weitere Begründung gespeichert.'
            )}
          </p>
        ) : null}
        {open && story.timeline.length > 0 ? (
          <div className="mt-3 space-y-2">
            {story.timeline.map((chapter, index) => (
              <div key={`${story.id}-chapter-${index}`} className="rounded-lg bg-white px-3 py-2">
                <p className="text-[0.75rem] font-semibold text-[#7339E0]">
                  {chapter.label || portalText(isDe, `Chapter ${index + 1}`, `Kapitel ${index + 1}`)}
                </p>
                <p className="mt-1 whitespace-pre-wrap text-[0.85rem] leading-relaxed text-[#1A1033]">{chapter.text}</p>
              </div>
            ))}
          </div>
        ) : null}
        {open && story.empowermentMessage ? (
          <p className="mt-3 text-[0.85rem] leading-relaxed text-emerald-900">{story.empowermentMessage}</p>
        ) : null}
        <button
          type="button"
          onClick={() => toggle(story.id)}
          className="mt-3 text-[0.8rem] font-semibold text-[#7339E0] underline-offset-4 hover:underline"
          aria-expanded={open}
        >
          {open
            ? portalText(isDe, 'Show less', 'Weniger anzeigen')
            : portalText(isDe, 'Read full story', 'Vollständige Story lesen')}
        </button>
      </article>
    );
  };

  return (
    <div className="rounded-2xl border border-[rgba(145,82,255,0.14)] bg-white p-6 shadow-[0_10px_36px_rgba(145,82,255,0.09)]">
      <h2 className="font-lora text-lg font-semibold text-[#1A1033]">
        {portalText(isDe, 'My Stories', 'Meine Stories')}
      </h2>
      <p className="mt-1 text-[0.82rem] text-[#6B5F8A]">
        {portalText(
          isDe,
          'Only stories you submitted. Previously submitted stories stay here as an archive.',
          'Nur Stories, die du eingereicht hast. Frühere Einreichungen bleiben hier als Archiv.'
        )}
      </p>

      <dl className={`mt-4 grid grid-cols-2 gap-3 ${counts.draft > 0 ? 'sm:grid-cols-4' : 'sm:grid-cols-3'}`}>
        {counts.draft > 0 ? (
          <div className="rounded-xl bg-[#F5F0FF] px-4 py-3">
            <dt className="text-[0.75rem] font-bold uppercase tracking-wide text-[#7339E0]/80">
              {portalText(isDe, 'Draft', 'Entwurf')}
            </dt>
            <dd className="mt-1 font-lora text-2xl font-bold text-[#1A1033]">{counts.draft}</dd>
          </div>
        ) : null}
        <div className="rounded-xl bg-amber-50/90 px-4 py-3">
          <dt className="text-[0.75rem] font-bold uppercase tracking-wide text-amber-900/80">
            {portalText(isDe, 'In review', 'In Prüfung')}
          </dt>
          <dd className="mt-1 font-lora text-2xl font-bold text-amber-950">{counts.pending}</dd>
        </div>
        <div className="rounded-xl bg-emerald-50/90 px-4 py-3">
          <dt className="text-[0.75rem] font-bold uppercase tracking-wide text-emerald-800/80">
            {portalText(isDe, 'Published', 'Veröffentlicht')}
          </dt>
          <dd className="mt-1 font-lora text-2xl font-bold text-emerald-950">{counts.published}</dd>
        </div>
        <div className="rounded-xl bg-rose-50/90 px-4 py-3">
          <dt className="text-[0.75rem] font-bold uppercase tracking-wide text-rose-800/80">
            {portalText(isDe, 'Rejected', 'Abgelehnt')}
          </dt>
          <dd className="mt-1 font-lora text-2xl font-bold text-rose-950">{counts.rejected}</dd>
        </div>
      </dl>

      {stories.length === 0 ? (
        <div className="mt-5">
          <p className="text-[0.85rem] text-[#6B5F8A]">
            {portalText(isDe, 'You have not submitted a story yet.', 'Du hast noch keine Story eingereicht.')}
          </p>
          {storiesAllowed ? (
            <Link
              href="/story-tool"
              className="mt-4 inline-flex text-[0.9rem] font-semibold text-[#7339E0] underline-offset-4 hover:underline"
            >
              {portalText(isDe, 'Create a story', 'Story erstellen')}
            </Link>
          ) : null}
        </div>
      ) : (
        <div className="mt-5 space-y-5">
          {current.length > 0 ? (
            <div className="space-y-2">
              <h3 className="text-[0.72rem] font-bold uppercase tracking-wider text-[#9A8CB3]">
                {portalText(isDe, 'In progress', 'In Bearbeitung')}
              </h3>
              {current.map(renderStory)}
            </div>
          ) : null}
          {archive.length > 0 ? (
            <div className="space-y-2">
              <h3 className="text-[0.72rem] font-bold uppercase tracking-wider text-[#9A8CB3]">
                {portalText(isDe, 'Archive', 'Archiv')}
              </h3>
              {archive.map(renderStory)}
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
}
