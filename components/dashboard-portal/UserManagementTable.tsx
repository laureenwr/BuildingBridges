'use client';

import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { deleteRegisteredUserAction } from '@/lib/actions/users';
import { isLikelyAutomatedAccount } from '@/lib/auth/signup-guard';
import { useLanguage } from '@/lib/hooks/useLanguage';
import { portalRoleLabel, portalText } from '@/lib/portal/portal-copy';
import type { ManagedAccountRow } from '@/lib/portal/portal-data';

export function UserManagementTable({
  rows,
  currentUserId,
}: {
  rows: ManagedAccountRow[];
  currentUserId: number;
}) {
  const { isDe } = useLanguage();
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [pending, setPending] = useState<ManagedAccountRow | null>(null);
  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();
    if (!needle) return rows;
    return rows.filter((row) => {
      const haystack = [
        row.name,
        row.email,
        portalRoleLabel(false, row.role),
        portalRoleLabel(true, row.role),
        row.role,
      ]
        .join(' ')
        .toLowerCase();
      return haystack.includes(needle);
    });
  }, [query, rows]);

  const confirmDelete = async () => {
    if (!pending || busy) return;
    const email = pending.email;
    setBusy(true);
    setStatus(null);
    const formData = new FormData();
    formData.set('userId', String(pending.id));
    const result = await deleteRegisteredUserAction(formData);
    setBusy(false);
    setPending(null);
    if (result.type === 'success') {
      setStatus({
        type: 'success',
        message: portalText(
          isDe,
          result.message,
          `Konto ${email} entfernt. Die Person kann sich nicht mehr anmelden. Eingereichte Stories wurden nicht gelöscht.`
        ),
      });
      router.refresh();
      return;
    }
    const ownAccount = result.message.includes('own account');
    setStatus({
      type: 'error',
      message: portalText(
        isDe,
        result.message,
        ownAccount
          ? 'Du kannst dein eigenes Konto auf dieser Seite nicht löschen.'
          : 'Dieses Konto wurde nicht gefunden oder ist bereits entfernt.'
      ),
    });
  };

  return (
    <div className="overflow-hidden rounded-2xl border border-[rgba(145,82,255,0.12)] bg-white shadow-[0_10px_36px_rgba(145,82,255,0.09)]">
      <div className="border-b border-[rgba(145,82,255,0.1)] px-5 py-4">
        <h3 className="font-lora text-lg font-semibold text-[#1A1033]">
          {portalText(isDe, 'Registered accounts', 'Registrierte Konten')}
        </h3>
        <p className="mt-1 text-[0.82rem] text-[#6B5F8A]">
          {portalText(
            isDe,
            `${rows.length} account${rows.length === 1 ? '' : 's'} in the live database: mentors, participants, and admins. Passwords are never shown.`,
            `${rows.length} ${rows.length === 1 ? 'Konto' : 'Konten'} in der Datenbank: Mentor:innen, Teilnehmer:innen und Admins. Passwörter werden nicht angezeigt.`
          )}
        </p>
        <label className="mt-3 block">
          <span className="sr-only">{portalText(isDe, 'Search accounts', 'Konten suchen')}</span>
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={portalText(isDe, 'Search by name, email, or role', 'Nach Name, E-Mail oder Rolle suchen')}
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
          <p className="font-semibold text-[#1A1033]">
            {portalText(isDe, 'Confirm account removal', 'Kontoentfernung bestätigen')}
          </p>
          <p className="mt-2">
            {portalText(
              isDe,
              'You are about to remove this account. They will no longer be able to sign in.',
              'Du bist dabei, dieses Konto zu entfernen. Die Person kann sich danach nicht mehr anmelden.'
            )}
          </p>
          <ul className="mt-3 space-y-1 text-[#5C5275]">
            <li>
              <span className="font-semibold text-[#1A1033]">ID:</span> {pending.id}
            </li>
            <li>
              <span className="font-semibold text-[#1A1033]">{portalText(isDe, 'Name', 'Name')}:</span>{' '}
              {pending.name?.trim() || '—'}
            </li>
            <li>
              <span className="font-semibold text-[#1A1033]">{portalText(isDe, 'Email', 'E-Mail')}:</span>{' '}
              {pending.email}
            </li>
            <li>
              <span className="font-semibold text-[#1A1033]">{portalText(isDe, 'Role', 'Rolle')}:</span>{' '}
              {portalRoleLabel(isDe, pending.role)}
            </li>
          </ul>
          <div className="mt-4 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => void confirmDelete()}
              disabled={busy}
              className="rounded-full bg-rose-700 px-4 py-2 text-[0.82rem] font-semibold text-white hover:bg-rose-800 disabled:opacity-50"
            >
              {busy
                ? portalText(isDe, 'Removing…', 'Wird entfernt…')
                : portalText(isDe, 'Yes, remove this account', 'Ja, dieses Konto entfernen')}
            </button>
            <button
              type="button"
              onClick={() => setPending(null)}
              disabled={busy}
              className="rounded-full border border-[#D9D0F0] px-4 py-2 text-[0.82rem] font-semibold text-[#5C5275] hover:bg-white"
            >
              {portalText(isDe, 'Cancel', 'Abbrechen')}
            </button>
          </div>
        </div>
      ) : null}

      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse text-left text-[0.88rem]">
          <thead>
            <tr className="bg-[#FAF8FF] text-[0.72rem] font-bold uppercase tracking-wider text-[#9A8CB3]">
              <th className="whitespace-nowrap px-5 py-3 font-bold">ID</th>
              <th className="whitespace-nowrap px-5 py-3 font-bold">{portalText(isDe, 'Name', 'Name')}</th>
              <th className="whitespace-nowrap px-5 py-3 font-bold">{portalText(isDe, 'Email', 'E-Mail')}</th>
              <th className="whitespace-nowrap px-5 py-3 font-bold">{portalText(isDe, 'Role', 'Rolle')}</th>
              <th className="whitespace-nowrap px-5 py-3 font-bold">
                {portalText(isDe, 'Registered', 'Registriert')}
              </th>
              <th className="whitespace-nowrap px-5 py-3 font-bold text-right">
                {portalText(isDe, 'Action', 'Aktion')}
              </th>
            </tr>
          </thead>
          <tbody className="text-[#1A1033]">
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-5 py-8 text-center text-[0.9rem] text-[#6B5F8A]">
                  {rows.length === 0
                    ? portalText(isDe, 'No registered users yet.', 'Noch keine registrierten Nutzer:innen.')
                    : portalText(
                        isDe,
                        `No account matches “${query.trim()}”.`,
                        `Kein Konto passt zu „${query.trim()}“.`
                      )}
                </td>
              </tr>
            ) : (
              filtered.map((row) => {
                const isSelf = row.id === currentUserId;
                return (
                  <tr key={row.id} className="border-t border-[rgba(145,82,255,0.08)]">
                    <td className="px-5 py-3 text-[#5C5275]">{row.id}</td>
                    <td className="px-5 py-3 font-semibold">
                      <div>{row.name?.trim() || row.email}</div>
                      {isLikelyAutomatedAccount(row) ? (
                        <span className="mt-1 inline-flex rounded-full bg-amber-50 px-2 py-0.5 text-[0.68rem] font-semibold text-amber-800 ring-1 ring-amber-200/80">
                          {portalText(isDe, 'Likely automated', 'Vermutlich automatisiert')}
                        </span>
                      ) : null}
                    </td>
                    <td className="px-5 py-3 text-[#5C5275]">{row.email}</td>
                    <td className="px-5 py-3 text-[#5C5275]">{portalRoleLabel(isDe, row.role)}</td>
                    <td className="px-5 py-3 text-[#5C5275]">{row.createdAtLabel}</td>
                    <td className="px-5 py-3 text-right">
                      {isSelf ? (
                        <span className="text-[0.8rem] text-[#9A8CB3]">
                          {portalText(isDe, 'This is you', 'Das bist du')}
                        </span>
                      ) : (
                        <button
                          type="button"
                          onClick={() => {
                            setStatus(null);
                            setPending(row);
                          }}
                          className="rounded-full border border-rose-200 px-3 py-1 text-[0.78rem] font-semibold text-rose-700 hover:bg-rose-50"
                        >
                          {portalText(isDe, 'Remove', 'Entfernen')}
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
