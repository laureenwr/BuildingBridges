'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useFormStatus } from 'react-dom';
import { reviewStoryAction } from '@/lib/actions/stories';
import type { StoryReviewItem } from '@/lib/actions/stories';
import { cn } from '@/lib/utils';

export type StoryReviewRow = StoryReviewItem;

export type StoryReviewTableProps = {
  rows: readonly StoryReviewRow[];
  title?: string;
  className?: string;
  defaultExpanded?: boolean;
};

type ReviewState = {
  type: 'success' | 'error' | null;
  message: string;
};

const STORY_TYPE_LABEL: Record<StoryReviewRow['storyType'], string> = {
  mentor: 'Mentor',
  participant: 'Participant',
  awareness: 'Awareness',
};

export function StoryReviewTable({
  rows,
  title = 'Stories for review',
  className,
  defaultExpanded = false,
}: StoryReviewTableProps) {
  const router = useRouter();
  const [state, setState] = useState<ReviewState>({ type: null, message: '' });
  const [openIds, setOpenIds] = useState<number[]>(() =>
    defaultExpanded ? rows.map((row) => row.id) : []
  );

  function toggleStory(id: number) {
    setOpenIds((current) => (current.includes(id) ? current.filter((value) => value !== id) : [...current, id]));
  }

  async function submitReview(formData: FormData) {
    try {
      const result = await reviewStoryAction({ type: null, message: '' }, formData);
      setState(result);
      if (result.type === 'success') {
        router.refresh();
      }
    } catch (error) {
      console.error('Story review request failed:', error);
      setState({ type: 'error', message: 'Could not update the story review status.' });
    }
  }

  return (
    <div
      className={cn(
        'overflow-hidden rounded-2xl border border-[rgba(145,82,255,0.12)] bg-white shadow-[0_10px_36px_rgba(145,82,255,0.09)]',
        className
      )}
    >
      <div className="border-b border-[rgba(145,82,255,0.1)] px-5 py-4">
        <h3 className="font-lora text-lg font-semibold text-[#1A1033]">{title}</h3>
        <p className="mt-1 text-[0.82rem] text-[#6B5F8A]">
          Read the full story, not only the summary, before you approve or reject it.
        </p>
        {state.message ? (
          <p
            role="status"
            className={cn(
              'mt-2 rounded-xl px-3 py-2 text-[0.8rem] font-medium',
              state.type === 'success'
                ? 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200/80'
                : 'bg-rose-50 text-rose-700 ring-1 ring-rose-200/80'
            )}
          >
            {state.message}
          </p>
        ) : null}
      </div>

      {rows.length === 0 ? (
        <p className="px-5 py-6 text-center text-[0.88rem] text-[#5C5275]">
          No stories are currently pending review.
        </p>
      ) : (
        <div className="divide-y divide-[rgba(145,82,255,0.08)]">
          {rows.map((row) => {
            const open = openIds.includes(row.id);
            const submitter =
              row.submitterName?.trim() ||
              row.submitterEmail?.trim() ||
              'Unknown submitter';

            return (
              <article key={row.id} className="px-5 py-5">
                <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
                  <div className="min-w-0">
                    <h4 className="font-lora text-xl font-semibold text-[#1A1033]">{row.title}</h4>
                    <p className="mt-1 text-[0.82rem] text-[#6B5F8A]">
                      Submitted by <span className="font-semibold text-[#4B4266]">{submitter}</span>
                      {row.submitterEmail && row.submitterName ? ` · ${row.submitterEmail}` : ''}
                      {' · '}
                      {row.submittedOn}
                    </p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      <span className="rounded-full bg-[#FAF8FF] px-2.5 py-1 text-[0.72rem] font-semibold text-[#7339E0] ring-1 ring-[rgba(145,82,255,0.16)]">
                        {STORY_TYPE_LABEL[row.storyType]}
                      </span>
                      <span
                        className={cn(
                          'rounded-full px-2.5 py-1 text-[0.72rem] font-semibold',
                          row.consentGiven
                            ? 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200/80'
                            : 'bg-amber-50 text-amber-700 ring-1 ring-amber-200/80'
                        )}
                      >
                        Consent {row.consentGiven ? 'given' : 'missing'}
                      </span>
                      <span className="rounded-full bg-[#FAF8FF] px-2.5 py-1 text-[0.72rem] font-semibold text-[#7339E0] ring-1 ring-[rgba(145,82,255,0.16)]">
                        {row.status}
                      </span>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => toggleStory(row.id)}
                    className="shrink-0 rounded-full border border-[rgba(145,82,255,0.28)] bg-[#F5F0FF] px-4 py-2 text-[0.8rem] font-semibold text-[#7339E0] hover:bg-[#EDE4FF]"
                    aria-expanded={open}
                  >
                    {open ? 'Hide full story' : 'Read full story'}
                  </button>
                </div>

                {open ? (
                  <div className="mt-5 space-y-4">
                    <section className="rounded-xl bg-[#FAF8FF] px-4 py-3">
                      <h5 className="text-[0.72rem] font-bold uppercase tracking-wider text-[#9A8CB3]">Summary</h5>
                      <p className="mt-1 whitespace-pre-wrap text-[0.92rem] leading-relaxed text-[#4B4266]">{row.summary}</p>
                    </section>

                    {row.timeline.length > 0 ? (
                      <section className="space-y-3">
                        <h5 className="text-[0.72rem] font-bold uppercase tracking-wider text-[#9A8CB3]">Chapters</h5>
                        {row.timeline.map((chapter, index) => (
                          <div
                            key={`${row.id}-chapter-${index}`}
                            className="rounded-xl border border-[rgba(145,82,255,0.1)] bg-white px-4 py-3"
                          >
                            <p className="text-[0.82rem] font-semibold text-[#7339E0]">
                              {chapter.icon ? `${chapter.icon} ` : ''}
                              {chapter.label || `Chapter ${index + 1}`}
                            </p>
                            <p className="mt-2 whitespace-pre-wrap text-[0.92rem] leading-relaxed text-[#1A1033]">
                              {chapter.text}
                            </p>
                            {chapter.quote ? (
                              <blockquote className="mt-2 border-l-2 border-[#9152FF] pl-3 text-[0.88rem] italic text-[#5C5275]">
                                {chapter.quote}
                              </blockquote>
                            ) : null}
                          </div>
                        ))}
                      </section>
                    ) : null}

                    {row.quotes.length > 0 ? (
                      <section>
                        <h5 className="text-[0.72rem] font-bold uppercase tracking-wider text-[#9A8CB3]">Quotes</h5>
                        <ul className="mt-2 space-y-2">
                          {row.quotes.map((quote, index) => (
                            <li
                              key={`${row.id}-quote-${index}`}
                              className="rounded-xl bg-[#FAF8FF] px-4 py-3 text-[0.9rem] italic text-[#4B4266]"
                            >
                              {quote.label ? <span className="mb-1 block not-italic text-[0.75rem] font-semibold text-[#7339E0]">{quote.label}</span> : null}
                              {quote.text}
                            </li>
                          ))}
                        </ul>
                      </section>
                    ) : null}

                    <section className="rounded-xl bg-emerald-50/70 px-4 py-3">
                      <h5 className="text-[0.72rem] font-bold uppercase tracking-wider text-emerald-800/80">
                        Empowerment message
                      </h5>
                      <p className="mt-1 whitespace-pre-wrap text-[0.92rem] leading-relaxed text-emerald-950">
                        {row.empowermentMessage}
                      </p>
                    </section>

                    <div className="flex flex-col gap-2 sm:max-w-xs sm:flex-row">
                      <form action={submitReview} className="flex-1">
                        <input type="hidden" name="storyId" value={String(row.id)} />
                        <input type="hidden" name="decision" value="approve" />
                        <ReviewButton variant="approve" label="Approve" pendingLabel="Approving..." />
                      </form>
                      <form action={submitReview} className="flex-1">
                        <input type="hidden" name="storyId" value={String(row.id)} />
                        <input type="hidden" name="decision" value="reject" />
                        <ReviewButton variant="reject" label="Reject" pendingLabel="Rejecting..." />
                      </form>
                      <form
                        action={submitReview}
                        className="flex-1"
                        onSubmit={(event) => {
                          if (!window.confirm(`Delete "${row.title}" permanently? This cannot be undone.`)) {
                            event.preventDefault();
                          }
                        }}
                      >
                        <input type="hidden" name="storyId" value={String(row.id)} />
                        <input type="hidden" name="decision" value="delete" />
                        <ReviewButton variant="delete" label="Delete" pendingLabel="Deleting..." />
                      </form>
                    </div>
                  </div>
                ) : (
                  <p className="mt-3 text-[0.85rem] text-[#6B5F8A]">
                    Open the full story to read every chapter before you approve or reject it.
                  </p>
                )}
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}

function ReviewButton({
  variant,
  label,
  pendingLabel,
}: {
  variant: 'approve' | 'reject' | 'delete';
  label: string;
  pendingLabel: string;
}) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className={cn(
        'w-full rounded-full px-3 py-1.5 text-[0.75rem] font-semibold shadow-sm transition disabled:cursor-not-allowed disabled:opacity-60',
        variant === 'approve'
          ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white hover:brightness-105'
          : variant === 'delete'
            ? 'bg-[#1A1033] text-white hover:bg-[#2A1B4A]'
            : 'bg-rose-50 text-rose-700 ring-1 ring-rose-200/80 hover:bg-rose-100'
      )}
    >
      {pending ? pendingLabel : label}
    </button>
  );
}
