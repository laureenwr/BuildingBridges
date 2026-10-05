'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Sparkles, ArrowRight, CalendarRange, ShieldAlert } from 'lucide-react';
import { ActionCard } from '@/components/dashboard-portal/ActionCard';
import { EventCard } from '@/components/dashboard-portal/EventCard';

export type MentorMenteeDashboardProps = {
  greetingName: string;
  pendingApproval: boolean;
  storiesAllowed: boolean;
  events: { id: string; title: string; date: string; time: string; format: string }[];
  storyCounts: { total: number; pending: number; approved: number };
};

export function MentorMenteeDashboard({
  greetingName,
  pendingApproval,
  storiesAllowed,
  events,
  storyCounts,
}: MentorMenteeDashboardProps) {
  return (
    <div className="space-y-8">
      {pendingApproval ? (
        <div
          className="flex flex-col gap-3 rounded-2xl border border-amber-200/90 bg-gradient-to-r from-amber-50 via-white to-amber-50/80 px-4 py-4 shadow-sm sm:flex-row sm:items-center sm:justify-between"
          role="status"
        >
          <div className="flex gap-3">
            <ShieldAlert className="mt-0.5 h-10 w-10 shrink-0 text-amber-600" aria-hidden />
            <div>
              <p className="font-lora text-base font-semibold text-amber-950">Approval pending</p>
              <p className="mt-1 text-[0.9rem] leading-relaxed text-amber-900/90">
                Your profile is waiting for approval. Story publishing will be available after approval.
              </p>
            </div>
          </div>
          <Link
            href="/contact"
            className="inline-flex shrink-0 items-center justify-center rounded-full border border-amber-300 bg-white px-4 py-2 text-[0.85rem] font-semibold text-amber-950 transition hover:bg-amber-100"
          >
            Need help?
          </Link>
        </div>
      ) : null}

      <section className="relative overflow-hidden rounded-3xl border border-[rgba(145,82,255,0.12)] shadow-[0_14px_50px_rgba(145,82,255,0.12)]">
        <div className="absolute inset-0">
          <Image
            src="/coverimage.png"
            alt=""
            fill
            className="object-cover opacity-[0.16]"
            sizes="100vw"
            priority
          />
        </div>
        <div className="relative z-[1] px-6 py-8 sm:px-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-[rgba(145,82,255,0.22)] bg-white/85 px-3 py-1 text-[0.7rem] font-bold uppercase tracking-wider text-[#7339E0] shadow-sm backdrop-blur">
            <Sparkles className="h-3.5 w-3.5" aria-hidden />
            Your dashboard
          </div>
          <h1 className="mt-4 font-lora text-[clamp(1.85rem,4vw,2.35rem)] font-bold tracking-tight text-[#1A1033]">
            Welcome back, {greetingName}! <span aria-hidden>👋</span>
          </h1>
          <p className="mt-3 max-w-xl text-[0.98rem] leading-relaxed text-[#4B4266] sm:text-[1.05rem]">
            Create a story, read community stories, or check upcoming workshops.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            {storiesAllowed ? (
              <Link
                href="/story-tool"
                className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-[#9152FF] to-[#7339E0] px-7 py-2.5 text-[0.9rem] font-semibold text-white shadow-[0_8px_24px_rgba(145,82,255,0.38)] transition hover:brightness-105"
              >
                Create a story
              </Link>
            ) : (
              <span
                className="inline-flex cursor-not-allowed items-center justify-center rounded-full bg-[#E8E0F7] px-7 py-2.5 text-[0.9rem] font-semibold text-[#9A8CB3]"
                title="Available after approval"
                aria-disabled
              >
                Create a story
              </span>
            )}
            <Link
              href="/stories"
              className="inline-flex items-center justify-center rounded-full border border-[rgba(145,82,255,0.35)] bg-white/90 px-7 py-2.5 text-[0.9rem] font-semibold text-[#7339E0] shadow-sm backdrop-blur transition hover:bg-[#F5F0FF]"
            >
              Stories
              <ArrowRight className="ml-1 h-4 w-4" aria-hidden />
            </Link>
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        <ActionCard
          title="Create a story"
          description="Share your experiences in your own way."
          actionLabel="Start now"
          href={storiesAllowed ? '/story-tool' : '#'}
          accent="purple"
          disabled={!storiesAllowed}
        />
        <ActionCard
          title="Workshops"
          description="See upcoming Building Bridges events."
          actionLabel="View workshops"
          href="/workshops"
          accent="green"
        />
      </section>

      <section className="grid gap-4 lg:grid-cols-2">
        <div className="rounded-2xl border border-[rgba(145,82,255,0.12)] bg-white p-6 shadow-[0_10px_36px_rgba(145,82,255,0.09)]">
          <div className="flex items-center justify-between gap-2">
            <h2 className="font-lora text-lg font-semibold text-[#1A1033]">Upcoming workshops</h2>
            <CalendarRange className="h-5 w-5 text-[#9152FF]" aria-hidden />
          </div>
          <div className="mt-4 flex flex-col gap-3">
            {events.length > 0 ? (
              events.slice(0, 2).map((event) => (
                <EventCard
                  key={event.id}
                  title={event.title}
                  date={event.date}
                  time={event.time}
                  format={event.format}
                />
              ))
            ) : (
              <p className="rounded-xl border border-dashed border-[rgba(145,82,255,0.2)] bg-[#FAF8FF] px-4 py-6 text-center text-[0.9rem] text-[#6B5F8A]">
                No upcoming workshops are listed right now.
              </p>
            )}
          </div>
        </div>

        <div className="rounded-2xl border border-[rgba(145,82,255,0.14)] bg-white p-6 shadow-[0_10px_36px_rgba(145,82,255,0.09)]">
          <h2 className="font-lora text-lg font-semibold text-[#1A1033]">Stories</h2>
          <dl className="mt-4 grid grid-cols-2 gap-3">
            <div className="rounded-xl bg-emerald-50/90 px-4 py-3">
              <dt className="text-[0.75rem] font-bold uppercase tracking-wide text-emerald-800/80">Published</dt>
              <dd className="mt-1 font-lora text-2xl font-bold text-emerald-950">{storyCounts.approved}</dd>
            </div>
            <div className="rounded-xl bg-amber-50/90 px-4 py-3">
              <dt className="text-[0.75rem] font-bold uppercase tracking-wide text-amber-900/80">In review</dt>
              <dd className="mt-1 font-lora text-2xl font-bold text-amber-950">{storyCounts.pending}</dd>
            </div>
          </dl>
          <Link
            href="/stories"
            className="mt-5 inline-flex text-[0.9rem] font-semibold text-[#7339E0] underline-offset-4 hover:underline"
          >
            Open stories
          </Link>
        </div>
      </section>
    </div>
  );
}
