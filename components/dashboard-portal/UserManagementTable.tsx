'use client';

import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { deleteRegisteredUserAction } from '@/lib/actions/users';
import type { ManagedAccountRow } from '@/lib/portal/portal-data';

const ROLE_LABEL: Record<ManagedAccountRow['role'], string> = {
  ADMIN: 'Admin',
  MENTOR: 'Mentor',
  STUDENT: 'Participant',
};

export function UserManagementTable({
  rows,
  currentUserId,
}: {
  rows: ManagedAccountRow[];
  currentUserId: number;
}) {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [pending, setPending] = useState<ManagedAccountRow | null>(null);
  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();
    if (!needle) return rows;
    return rows.filter((row) => {
      const haystack = [row.name, row.email, ROLE_LABEL[row.role], row.role].join(' ').toLowerCase();
      return haystack.includes(needle);
    });
  }, [query, rows]);

  const confirmDelete = async () => {
    if (!pending || busy) return;
    setBusy(true);
    setStatus(null);
    const formData = new FormData();
    formData.set('userId', String(pending.id));
    const result = await deleteRegisteredUserAction(formData);
    setBusy(false);
    setPending(null);
    setStatus(result);
    if (result.type === 'success') {
      router.refresh();
    }
  };

  return (
    <div className="overflow-hidden rounded-2xl border border-[rgba(145,82,255,0.12)] bg-white shadow-[0_10px_36px_rgba(145,82,255,0.09)]">
      <div className="border-b border-[rgba(145,82,255,0.1)] px-5 py-4">
        <h3 className="font-lora text-lg font-semibold text-[#1A1033]">Registered accounts</h3>
        <p className="mt-1 text-[0.82rem] text-[#6B5F8A]">
          {rows.length} account{rows.length === 1 ? '' : 's'} in the live database: mentors, participants, and admins.
          Passwords are never shown.
        </p>
        <label className="mt-3 block">
          <span className="sr-only">Search accounts</span>
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search by name, email, or role"
            className="w-full rounded-xl border border-[rgba(145,82,255,0.2)] bg-[#FAF8FF] px-3 py-2 text-[0.9rem] text-[#1A1033] outline-none ring-[#9152FF] focus:ring-2"
          />
        </label>
      </div>

      {status ? (
        <p
          className={`border-b px-5 py-3 text-[0.88rem] ${
            status.type === 'success'
              ? 'border-emerald-100 bg-emerald-50 text-emerald-800'
              : 'border-rose-100 bg-rose-50 text-rose-800'
          }`}
        >
          {status.message}
        </p>
      ) : null}

      {pending ? (
        <div className="border-b border-rose-100 bg-rose-50 px-5 py-4 text-[0.9rem] text-[#4B4266]">
          <p className="font-semibold text-[#1A1033]">Confirm account removal</p>
          <p className="mt-2">
            You are about to remove this account. They will no longer be able to sign in.
          </p>
          <ul className="mt-3 space-y-1 text-[#5C5275]">
            <li>
              <span className="font-semibold text-[#1A1033]">ID:</span> {pending.id}
            </li>
            <li>
              <span className="font-semibold text-[#1A1033]">Name:</span> {pending.name?.trim() || '—'}
            </li>
            <li>
              <span className="font-semibold text-[#1A1033]">Email:</span> {pending.email}
            </li>
            <li>
              <span className="font-semibold text-[#1A1033]">Role:</span> {ROLE_LABEL[pending.role]}
            </li>
          </ul>
          <div className="mt-4 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => void confirmDelete()}
              disabled={busy}
              className="rounded-full bg-rose-700 px-4 py-2 text-[0.82rem] font-semibold text-white hover:bg-rose-800 disabled:opacity-50"
            >
              {busy ? 'Removing…' : 'Yes, remove this account'}
            </button>
            <button
              type="button"
              onClick={() => setPending(null)}
              disabled={busy}
              className="rounded-full border border-[#D9D0F0] px-4 py-2 text-[0.82rem] font-semibold text-[#5C5275] hover:bg-white"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : null}

      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse text-left text-[0.88rem]">
          <thead>
            <tr className="bg-[#FAF8FF] text-[0.72rem] font-bold uppercase tracking-wider text-[#9A8CB3]">
              <th className="whitespace-nowrap px-5 py-3 font-bold">ID</th>
              <th className="whitespace-nowrap px-5 py-3 font-bold">Name</th>
              <th className="whitespace-nowrap px-5 py-3 font-bold">Email</th>
              <th className="whitespace-nowrap px-5 py-3 font-bold">Role</th>
              <th className="whitespace-nowrap px-5 py-3 font-bold">Registered</th>
              <th className="whitespace-nowrap px-5 py-3 font-bold text-right">Action</th>
            </tr>
          </thead>
          <tbody className="text-[#1A1033]">
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-5 py-8 text-center text-[0.9rem] text-[#6B5F8A]">
                  {rows.length === 0
                    ? 'No registered users yet.'
                    : `No account matches “${query.trim()}”.`}
                </td>
              </tr>
            ) : (
              filtered.map((row) => {
                const isSelf = row.id === currentUserId;
                return (
                  <tr key={row.id} className="border-t border-[rgba(145,82,255,0.08)]">
                    <td className="px-5 py-3 text-[#5C5275]">{row.id}</td>
                    <td className="px-5 py-3 font-semibold">{row.name?.trim() || row.email}</td>
                    <td className="px-5 py-3 text-[#5C5275]">{row.email}</td>
                    <td className="px-5 py-3 text-[#5C5275]">{ROLE_LABEL[row.role]}</td>
                    <td className="px-5 py-3 text-[#5C5275]">{row.createdAtLabel}</td>
                    <td className="px-5 py-3 text-right">
                      {isSelf ? (
                        <span className="text-[0.8rem] text-[#9A8CB3]">This is you</span>
                      ) : (
                        <button
                          type="button"
                          onClick={() => {
                            setStatus(null);
                            setPending(row);
                          }}
                          className="rounded-full border border-rose-200 px-3 py-1 text-[0.78rem] font-semibold text-rose-700 hover:bg-rose-50"
                        >
                          Remove
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
