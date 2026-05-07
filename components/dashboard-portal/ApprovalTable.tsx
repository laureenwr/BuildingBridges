'use client';

import { cn } from '@/lib/utils';

export type ApprovalUserRow = {
  id: string;
  user: string;
  role: string;
  joinedOn: string;
};

export type ApprovalTableProps = {
  rows: readonly ApprovalUserRow[];
  title?: string;
  className?: string;
};

export function ApprovalTable({ rows, title = 'Pending user approvals', className }: ApprovalTableProps) {
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
              <th className="whitespace-nowrap px-5 py-3 font-bold">User</th>
              <th className="whitespace-nowrap px-5 py-3 font-bold">Role</th>
              <th className="whitespace-nowrap px-5 py-3 font-bold">Joined On</th>
              <th className="whitespace-nowrap px-5 py-3 font-bold text-right">Action</th>
            </tr>
          </thead>
          <tbody className="text-[#1A1033]">
            {rows.map((row) => (
              <tr key={row.id} className="border-t border-[rgba(145,82,255,0.08)]">
                <td className="px-5 py-3 font-semibold">{row.user}</td>
                <td className="px-5 py-3 text-[#5C5275]">{row.role}</td>
                <td className="px-5 py-3 text-[#5C5275]">{row.joinedOn}</td>
                <td className="px-5 py-3 text-right">
                  <div className="flex flex-wrap justify-end gap-2">
                    <button
                      type="button"
                      className="rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 px-3 py-1.5 text-[0.75rem] font-semibold text-white shadow-sm transition hover:brightness-105"
                      onClick={() => {
                        // TODO: PATCH /api/users/{id} — set approval_status: 'approved'
                        console.info('approve user', row.id);
                      }}
                    >
                      Approve
                    </button>
                    <button
                      type="button"
                      className="rounded-full bg-rose-50 px-3 py-1.5 text-[0.75rem] font-semibold text-rose-700 ring-1 ring-rose-200/80 transition hover:bg-rose-100"
                      onClick={() => {
                        // TODO: PATCH /api/users/{id} — set approval_status: 'rejected'
                        console.info('reject user', row.id);
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
