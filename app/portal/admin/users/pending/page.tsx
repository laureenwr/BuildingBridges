import { ApprovalTable } from '@/components/dashboard-portal/ApprovalTable';
import { getRegisteredUsers } from '@/lib/portal/portal-data';

export const dynamic = 'force-dynamic';

export default async function AdminPendingUsersPage() {
  const users = await getRegisteredUsers(50);

  return (
    <div className="space-y-4">
      <header>
        <h1 className="font-lora text-2xl font-semibold text-[#1A1033]">Users</h1>
        <p className="mt-2 max-w-prose text-[0.95rem] leading-relaxed text-[#5C5275]">
          Accounts registered on Building Bridges. Story review lives under Stories for Review.
        </p>
      </header>
      <ApprovalTable rows={users} title="Registered users" showActions={false} />
    </div>
  );
}
