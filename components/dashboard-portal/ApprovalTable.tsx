'use client';

import { cn } from '@/lib/utils';
import { useLanguage } from '@/lib/hooks/useLanguage';
import { portalRoleLabel, portalText } from '@/lib/portal/portal-copy';

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
  showActions?: boolean;
};

export function ApprovalTable({
  rows,
  title,
  className,
  showActions = false,
}: ApprovalTableProps) {
  const { isDe } = useLanguage();
  const heading = title ?? portalText(isDe, 'Registered users', 'Registrierte Nutzer:innen');

  return (
    <div
      className={cn(
        'overflow-hidden rounded-2xl border border-[rgba(145,82,255,0.12)] bg-white shadow-[0_10px_36px_rgba(145,82,255,0.09)]',
        className
      )}
    >
      <div className="border-b border-[rgba(145,82,255,0.1)] px-5 py-4">
        <h3 className="font-lora text-lg font-semibold text-[#1A1033]">{heading}</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse text-left text-[0.88rem]">
          <thead>
            <tr className="bg-[#FAF8FF] text-[0.72rem] font-bold uppercase tracking-wider text-[#9A8CB3]">
              <th className="whitespace-nowrap px-5 py-3 font-bold">{portalText(isDe, 'User', 'Nutzer:in')}</th>
              <th className="whitespace-nowrap px-5 py-3 font-bold">{portalText(isDe, 'Role', 'Rolle')}</th>
              <th className="whitespace-nowrap px-5 py-3 font-bold">
                {portalText(isDe, 'Joined On', 'Beigetreten')}
              </th>
              {showActions ? (
                <th className="whitespace-nowrap px-5 py-3 font-bold text-right">
                  {portalText(isDe, 'Action', 'Aktion')}
                </th>
              ) : null}
            </tr>
          </thead>
          <tbody className="text-[#1A1033]">
            {rows.length === 0 ? (
              <tr>
                <td
                  colSpan={showActions ? 4 : 3}
                  className="px-5 py-8 text-center text-[0.9rem] text-[#6B5F8A]"
                >
                  {portalText(isDe, 'No registered users yet.', 'Noch keine registrierten Nutzer:innen.')}
                </td>
              </tr>
            ) : (
              rows.map((row) => (
                <tr key={row.id} className="border-t border-[rgba(145,82,255,0.08)]">
                  <td className="px-5 py-3 font-semibold">{row.user}</td>
                  <td className="px-5 py-3 text-[#5C5275]">{portalRoleLabel(isDe, row.role)}</td>
                  <td className="px-5 py-3 text-[#5C5275]">{row.joinedOn}</td>
                  {showActions ? (
                    <td className="px-5 py-3 text-right text-[0.8rem] text-[#6B5F8A]">—</td>
                  ) : null}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
