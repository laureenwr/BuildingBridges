import Link from 'next/link';

export default function AdminPortalSettingsPage() {
  return (
    <div className="rounded-2xl border border-[rgba(145,82,255,0.12)] bg-white p-8 shadow-[0_10px_36px_rgba(145,82,255,0.09)]">
      <h1 className="font-lora text-2xl font-semibold text-[#1A1033]">Admin Settings</h1>
      <p className="mt-3 max-w-prose leading-relaxed text-[#5C5275]">
        Notification emails, escalation contacts, and community guidelines versioning can live here.
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
