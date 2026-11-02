'use client';

import Link from 'next/link';
import { Sparkles } from 'lucide-react';
import { StatCard } from '@/components/dashboard-portal/StatCard';
import { ApprovalTable, type ApprovalUserRow } from '@/components/dashboard-portal/ApprovalTable';
import { StoryReviewTable, type StoryReviewRow } from '@/components/dashboard-portal/StoryReviewTable';
import { useLanguage } from '@/lib/hooks/useLanguage';
import { portalText } from '@/lib/portal/portal-copy';

export type AdminPortalHomeProps = {
  greetingName: string;
  storyRows: StoryReviewRow[];
  users: ApprovalUserRow[];
  userCount: number;
  mentorCount: number;
  pendingStoryCount: number;
  publishedStoryCount: number;
};

export function AdminPortalHome({
  greetingName,
  storyRows,
  users,
  userCount,
  mentorCount,
  pendingStoryCount,
  publishedStoryCount,
}: AdminPortalHomeProps) {
  const { isDe } = useLanguage();

  return (
    <div className="space-y-8">
      <header className="space-y-2">
        <p className="inline-flex items-center gap-2 rounded-full border border-[rgba(145,82,255,0.18)] bg-white/90 px-3 py-1 text-[0.7rem] font-bold uppercase tracking-[0.14em] text-[#7339E0] shadow-sm backdrop-blur">
          <Sparkles className="h-3 w-3" aria-hidden />
          {portalText(isDe, 'Moderation overview', 'Moderationsübersicht')}
        </p>
        <h1 className="font-lora text-[clamp(1.85rem,3.8vw,2.25rem)] font-bold tracking-tight text-[#1A1033]">
          {portalText(isDe, `Welcome back, ${greetingName}!`, `Willkommen zurück, ${greetingName}!`)}{' '}
          <span aria-hidden>👋</span>
        </h1>
        <p className="max-w-prose text-[1rem] leading-relaxed text-[#5C5275]">
          {portalText(
            isDe,
            "Here's what's happening on Building Bridges.",
            'Das passiert gerade auf Building Bridges.'
          )}
        </p>
      </header>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4" aria-label={portalText(isDe, 'Key statistics', 'Kennzahlen')}>
        <StatCard
          href="/portal/admin/users/pending"
          title={portalText(isDe, 'Total users', 'Nutzer:innen gesamt')}
          value={userCount}
          hint={portalText(
            isDe,
            'Registered mentors, participants, and admins.',
            'Registrierte Mentor:innen, Teilnehmer:innen und Admins.'
          )}
        />
        <StatCard
          href="/portal/admin/users/pending"
          title={portalText(isDe, 'Mentors', 'Mentor:innen')}
          value={mentorCount}
          hint={portalText(isDe, 'Accounts registered as mentors.', 'Konten, die als Mentor:in registriert sind.')}
        />
        <StatCard
          href="/portal/admin/stories/review"
          title={portalText(isDe, 'In review', 'In Prüfung')}
          value={pendingStoryCount}
          hint={portalText(
            isDe,
            'Submitted stories waiting for admin approval. Not public yet.',
            'Eingereichte Stories, die auf Admin-Freigabe warten. Noch nicht öffentlich.'
          )}
        />
        <StatCard
          href="/portal/admin/stories/published"
          title={portalText(isDe, 'Published stories', 'Veröffentlichte Stories')}
          value={publishedStoryCount}
          hint={portalText(
            isDe,
            'Approved stories visible on the public site.',
            'Freigegebene Stories, die auf der öffentlichen Seite sichtbar sind.'
          )}
        />
      </section>

      <ApprovalTable rows={users} showActions={false} />
      <StoryReviewTable
        rows={storyRows}
        title={portalText(isDe, 'Stories in review', 'Stories in Prüfung')}
      />

      <div className="rounded-2xl border border-[rgba(145,82,255,0.14)] bg-gradient-to-br from-white via-[#FAF8FF] to-emerald-50/30 p-6 shadow-[0_10px_36px_rgba(145,82,255,0.09)]">
        <h2 className="font-lora text-lg font-semibold text-[#1A1033]">
          {portalText(isDe, 'Safety & care', 'Sicherheit & Sorgfalt')}
        </h2>
        <p className="mt-3 max-w-3xl text-[0.95rem] leading-relaxed text-[#4B4266]">
          {portalText(
            isDe,
            'Only authorised admins can open this dashboard. Stories stay in review until an admin approves or rejects them.',
            'Nur autorisierte Admins können dieses Portal öffnen. Stories bleiben in Prüfung, bis eine Admin-Person sie freigibt oder ablehnt.'
          )}
        </p>
        <Link
          href="/portal/admin/stories/published"
          className="mt-4 inline-flex text-[0.9rem] font-semibold text-[#7339E0] underline-offset-4 hover:underline"
        >
          {portalText(isDe, 'View published stories', 'Veröffentlichte Stories ansehen')}
        </Link>
      </div>
    </div>
  );
}
