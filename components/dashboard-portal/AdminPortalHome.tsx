'use client';

import Link from 'next/link';
import { Sparkles } from 'lucide-react';
import { StatCard } from '@/components/dashboard-portal/StatCard';
import { ApprovalTable } from '@/components/dashboard-portal/ApprovalTable';
import { StoryReviewTable } from '@/components/dashboard-portal/StoryReviewTable';
import {
  dummyPendingUsers,
  dummyStoriesForReview,
} from '@/components/dashboard-portal/dashboard-copy';

export type AdminPortalHomeProps = {
  greetingName: string;
};

export function AdminPortalHome({ greetingName }: AdminPortalHomeProps) {
  return (
    <div className="space-y-8">
      <header className="space-y-2">
        <p className="inline-flex items-center gap-2 rounded-full border border-[rgba(145,82,255,0.18)] bg-white/90 px-3 py-1 text-[0.7rem] font-bold uppercase tracking-[0.14em] text-[#7339E0] shadow-sm backdrop-blur">
          <Sparkles className="h-3 w-3" aria-hidden />
          Moderation overview
        </p>
        <h1 className="font-lora text-[clamp(1.85rem,3.8vw,2.25rem)] font-bold tracking-tight text-[#1A1033]">
          Welcome back, {greetingName}! <span aria-hidden>👋</span>
        </h1>
        <p className="max-w-prose text-[1rem] leading-relaxed text-[#5C5275]">
          Here&apos;s what&apos;s happening on Building Bridges.
        </p>
      </header>

      <section className="grid gap-4 md:grid-cols-3" aria-label="Key statistics">
        <StatCard title="Total Users" value={128} hint="Including mentors, mentees, and researchers." />
        <StatCard title="Pending Approvals" value={8} hint="Profiles waiting for moderator review." />
        <StatCard title="Stories Submitted" value={15} hint="Stories currently in moderation." />
      </section>

      <ApprovalTable rows={[...dummyPendingUsers]} />
      <StoryReviewTable rows={[...dummyStoriesForReview]} />

      <div className="rounded-2xl border border-[rgba(145,82,255,0.14)] bg-gradient-to-br from-white via-[#FAF8FF] to-emerald-50/30 p-6 shadow-[0_10px_36px_rgba(145,82,255,0.09)]">
        <h2 className="font-lora text-lg font-semibold text-[#1A1033]">Safety &amp; care</h2>
        <p className="mt-3 max-w-3xl text-[0.95rem] leading-relaxed text-[#4B4266]">
          Only approved users can create and submit stories. All stories are reviewed before publishing to ensure a
          safe and inclusive community.
        </p>
        <Link
          href="/portal/community"
          className="mt-4 inline-flex text-[0.9rem] font-semibold text-[#7339E0] underline-offset-4 hover:underline"
        >
          Read community guidelines
        </Link>
      </div>
    </div>
  );
}
