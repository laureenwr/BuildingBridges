'use client';

import { cn } from '@/lib/utils';

export type StoryReviewRow = {
  id: string;
  title: string;
  submittedBy: string;
  submittedOn: string;
};

export type StoryReviewTableProps = {
  rows: readonly StoryReviewRow[];
  title?: string;
  className?: string;
};

export function StoryReviewTable({
  rows,
  title = 'Stories for review',
  className,
}: StoryReviewTableProps) {
  return (
    <div
      className={cn(
        'overflow-hidden rounded-2xl border border-[rgba(145,82,255,0.12)] bg-white shadow-[0_10px_36px_rgba(145,82,255,0.09)]',
        className
      )}
    >
      <div className="border-b border-[rgba(145,82,255,0.1)] px-5 py-4">
        <h3 className="font-lora text-lg font-semibold text-[#1A1033]">{title}</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse text-left text-[0.88rem]">
          <thead>
            <tr className="bg-[#FAF8FF] text-[0.72rem] font-bold uppercase tracking-wider text-[#9A8CB3]">
              <th className="whitespace-nowrap px-5 py-3 font-bold">Story Title</th>
              <th className="whitespace-nowrap px-5 py-3 font-bold">Submitted By</th>
              <th className="whitespace-nowrap px-5 py-3 font-bold">Submitted On</th>
              <th className="whitespace-nowrap px-5 py-3 font-bold text-right">Action</th>
            </tr>
          </thead>
          <tbody className="text-[#1A1033]">
            {rows.map((row) => (
              <tr key={row.id} className="border-t border-[rgba(145,82,255,0.08)]">
                <td className="px-5 py-3 font-semibold">{row.title}</td>
                <td className="px-5 py-3 text-[#5C5275]">{row.submittedBy}</td>
                <td className="px-5 py-3 text-[#5C5275]">{row.submittedOn}</td>
                <td className="px-5 py-3 text-right">
                  <div className="flex flex-wrap justify-end gap-2">
                    <button
                      type="button"
                      className="rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 px-3 py-1.5 text-[0.75rem] font-semibold text-white shadow-sm transition hover:brightness-105"
                      onClick={() => {
                        // TODO: PATCH /api/stories/{id} — set status: 'published'
                        console.info('approve story', row.id);
                      }}
                    >
                      Approve
                    </button>
                    <button
                      type="button"
                      className="rounded-full bg-rose-50 px-3 py-1.5 text-[0.75rem] font-semibold text-rose-700 ring-1 ring-rose-200/80 transition hover:bg-rose-100"
                      onClick={() => {
                        // TODO: PATCH /api/stories/{id} — set status: 'rejected'
                        console.info('reject story', row.id);
                      }}
                    >
                      Reject
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
