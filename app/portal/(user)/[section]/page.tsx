import Link from 'next/link';
import { redirect } from 'next/navigation';
import { getUserOrPreviewForPortalUser } from '@/lib/dev/dashboard-preview-resolve';

const labels: Record<string, string> = {
  profile: 'My Profile',
  stories: 'My Stories',
  messages: 'Messages',
  community: 'Community',
  events: 'Events & Workshops',
  resources: 'Resources',
  settings: 'Settings',
};

export default async function UserPortalSectionPage({ params }: { params: { section: string } }) {
  if (!(await getUserOrPreviewForPortalUser())) redirect('/sign-in');

  const { section } = params;
  const title = labels[section] ?? section.replace(/-/g, ' ');

  return (
    <div className="rounded-2xl border border-[rgba(145,82,255,0.12)] bg-white p-8 shadow-[0_10px_36px_rgba(145,82,255,0.09)]">
      <h1 className="font-lora text-2xl font-semibold capitalize text-[#1A1033]">{title}</h1>
      <p className="mt-3 max-w-prose leading-relaxed text-[#5C5275]">
        This section is scaffolded for the Building Bridges portal. Hook it up to Supabase/Firebase or your existing API
        for live data — user profile, chats, calendars, files, etc.
      </p>
      <Link
        href="/portal"
        className="mt-6 inline-flex rounded-full bg-gradient-to-r from-[#9152FF] to-[#7339E0] px-6 py-2.5 text-[0.9rem] font-semibold text-white shadow-[0_4px_14px_rgba(145,82,255,0.35)] transition hover:brightness-105"
      >
        ← Back to dashboard
      </Link>
    </div>
  );
}
