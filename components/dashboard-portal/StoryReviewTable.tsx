'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useFormStatus } from 'react-dom';
import { reviewStoryAction } from '@/lib/actions/stories';
import { cn } from '@/lib/utils';

export type StoryReviewRow = {
  id: number;
  sessionId: string;
  title: string;
  summary: string;
  consentGiven: boolean;
  status: string;
  submittedOn: string;
};

export type StoryReviewTableProps = {
  rows: readonly StoryReviewRow[];
  title?: string;
  className?: string;
};

type ReviewState = {
  type: 'success' | 'error' | null;
  message: string;
};

export function StoryReviewTable({
  rows,
  title = 'Stories for review',
  className,
}: StoryReviewTableProps) {
  const router = useRouter();
  const [state, setState] = useState<ReviewState>({ type: null, message: '' });

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
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse text-left text-[0.88rem]">
          <thead>
            <tr className="bg-[#FAF8FF] text-[0.72rem] font-bold uppercase tracking-wider text-[#9A8CB3]">
              <th className="whitespace-nowrap px-5 py-3 font-bold">Story Title</th>
              <th className="whitespace-nowrap px-5 py-3 font-bold">Summary</th>
              <th className="whitespace-nowrap px-5 py-3 font-bold">Consent</th>
              <th className="whitespace-nowrap px-5 py-3 font-bold">Status</th>
              <th className="whitespace-nowrap px-5 py-3 font-bold">Submitted On</th>
              <th className="whitespace-nowrap px-5 py-3 font-bold text-right">Action</th>
            </tr>
          </thead>
          <tbody className="text-[#1A1033]">
            {rows.length === 0 ? (
              <tr className="border-t border-[rgba(145,82,255,0.08)]">
                <td colSpan={6} className="px-5 py-6 text-center text-[#5C5275]">
                  No stories are currently pending review.
                </td>
              </tr>
            ) : (
              rows.map((row) => (
                <tr key={row.id} className="border-t border-[rgba(145,82,255,0.08)] align-top">
                  <td className="px-5 py-3">
                    <div className="font-semibold">{row.title}</div>
                    <div className="mt-1 text-[0.72rem] text-[#9A8CB3]">Session: {row.sessionId}</div>
                  </td>
                  <td className="max-w-[320px] px-5 py-3 text-[#5C5275]">{row.summary}</td>
                  <td className="px-5 py-3">
                    <span
                      className={cn(
                        'rounded-full px-2.5 py-1 text-[0.72rem] font-semibold',
                        row.consentGiven
                          ? 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200/80'
                          : 'bg-amber-50 text-amber-700 ring-1 ring-amber-200/80'
                      )}
                    >
                      {row.consentGiven ? 'Given' : 'Missing'}
                    </span>
                  </td>
                  <td className="px-5 py-3">
                    <span className="rounded-full bg-[#FAF8FF] px-2.5 py-1 text-[0.72rem] font-semibold text-[#7339E0] ring-1 ring-[rgba(145,82,255,0.16)]">
                      {row.status}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-[#5C5275]">{row.submittedOn}</td>
                  <td className="px-5 py-3 text-right">
                    <div className="flex min-w-[11rem] flex-col items-stretch gap-2">
                      <form action={submitReview}>
                        <input type="hidden" name="storyId" value={String(row.id)} />
                        <input type="hidden" name="decision" value="approve" />
                        <ReviewButton variant="approve" label="Approve" pendingLabel="Approving..." />
                      </form>
                      <form action={submitReview}>
                        <input type="hidden" name="storyId" value={String(row.id)} />
                        <input type="hidden" name="decision" value="reject" />
                        <ReviewButton variant="reject" label="Reject" pendingLabel="Rejecting..." />
                      </form>
                      <form
                        action={submitReview}
                        onSubmit={(event) => {
                          if (
                            !window.confirm(
                              `Delete "${row.title}" permanently? This cannot be undone.`
                            )
                          ) {
                            event.preventDefault();
                          }
                        }}
                      >
                        <input type="hidden" name="storyId" value={String(row.id)} />
                        <input type="hidden" name="decision" value="delete" />
                        <ReviewButton variant="delete" label="Delete story" pendingLabel="Deleting..." />
                      </form>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
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
