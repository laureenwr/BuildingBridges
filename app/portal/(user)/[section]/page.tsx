import Link from 'next/link';
import { redirect } from 'next/navigation';
import { getUser } from '@/lib/db/queries';

const labels: Record<string, string> = {
  profile: 'My Profile',
  stories: 'My Stories',
  messages: 'Messages',
  community: 'Community',
  events: 'Events & Workshops',
  resources: 'Resources',
  settings: 'Settings',
};

const liveRoutes: Record<string, string> = {
  stories: '/stories',
  events: '/workshops',
  profile: '/dashboard/general',
  settings: '/dashboard/general',
};

export default async function UserPortalSectionPage({ params }: { params: { section: string } }) {
  if (!(await getUser())) redirect('/sign-in');

  const { section } = params;
  if (liveRoutes[section]) {
    redirect(liveRoutes[section]);
  }

  const title = labels[section] ?? section.replace(/-/g, ' ');

  return (
    <div className="rounded-2xl border border-[rgba(145,82,255,0.12)] bg-white p-8 shadow-[0_10px_36px_rgba(145,82,255,0.09)]">
      <h1 className="font-lora text-2xl font-semibold capitalize text-[#1A1033]">{title}</h1>
      <p className="mt-3 max-w-prose leading-relaxed text-[#5C5275]">
        This part of the portal is not available yet. Use Story Creation, workshops, or settings from the dashboard.
      </p>
      <Link
        href="/portal"
        className="mt-6 inline-flex rounded-full bg-[#9152FF] px-6 py-2.5 text-[0.9rem] font-semibold text-white shadow-[0_4px_14px_rgba(145,82,255,0.35)] transition hover:bg-[#7339E0]"
      >
        ← Back to dashboard
      </Link>
    </div>
  );
}
