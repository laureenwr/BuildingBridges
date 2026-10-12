import { UserManagementTable } from '@/components/dashboard-portal/UserManagementTable';
import { requireAdminUser } from '@/lib/auth/access';
import { getManagedAccounts } from '@/lib/portal/portal-data';

export const dynamic = 'force-dynamic';

export default async function AdminPendingUsersPage() {
  const admin = await requireAdminUser();
  const users = await getManagedAccounts(200);

  return (
    <div className="space-y-4">
      <header>
        <h1 className="font-lora text-2xl font-semibold text-[#1A1033]">User management</h1>
        <p className="mt-2 max-w-prose text-[0.95rem] leading-relaxed text-[#5C5275]">
          Every mentor, participant, and admin who has registered. Search by name or email if the list is long.
          Account removal does not delete submitted stories.
        </p>
      </header>
      <UserManagementTable rows={users} currentUserId={admin.id} />
    </div>
  );
}
