import { PortalPageIntro } from '@/components/dashboard-portal/PortalPageIntro';
import { UserManagementTable } from '@/components/dashboard-portal/UserManagementTable';
import { requireAdminUser } from '@/lib/auth/access';
import { getManagedAccounts } from '@/lib/portal/portal-data';

export const dynamic = 'force-dynamic';

export default async function AdminPendingUsersPage() {
  const admin = await requireAdminUser();
  const users = await getManagedAccounts(200);

  return (
    <div className="space-y-4">
      <PortalPageIntro
        boxed={false}
        titleEn="User management"
        titleDe="Nutzer:innenverwaltung"
        bodyEn='Every mentor, participant, and admin who has registered. Search by name or email if the list is long. Rows marked “Likely automated” can be removed. Account removal does not delete submitted stories.'
        bodyDe="Alle Mentor:innen, Teilnehmer:innen und Admins, die sich registriert haben. Suche nach Name oder E-Mail, wenn die Liste lang ist. Zeilen mit „Vermutlich automatisiert“ können entfernt werden. Das Entfernen eines Kontos löscht keine eingereichten Stories."
      />
      <UserManagementTable rows={users} currentUserId={admin.id} />
    </div>
  );
}
