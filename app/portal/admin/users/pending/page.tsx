import Link from 'next/link';

export default function AdminPendingUsersPage() {
  return (
    <div className="rounded-2xl border border-[rgba(145,82,255,0.12)] bg-white p-8 shadow-[0_10px_36px_rgba(145,82,255,0.09)]">
      <h1 className="font-lora text-2xl font-semibold text-[#1A1033]">Pending Approvals</h1>
      <p className="mt-3 max-w-prose leading-relaxed text-[#5C5275]">
        Full queue view will mirror the pending table on your dashboard once connected to{' '}
        <code className="rounded-md bg-[#FAF8FF] px-1 py-0.5 text-[0.8rem] text-[#7339E0]">users.approval_status</code>.
      </p>
      <Link
        href="/portal/admin"
        className="mt-6 inline-flex rounded-full bg-[#EDE4FF] px-6 py-2.5 text-[0.88rem] font-semibold text-[#7339E0] hover:bg-[#E4DAFF]"
      >
        ← Back to moderation overview
      </Link>
    </div>
  );
}
