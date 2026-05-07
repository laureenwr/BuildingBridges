'use client';

import Image from 'next/image';
import Link from 'next/link';
import {
  LayoutDashboard,
  Sparkles,
  ArrowRight,
  CalendarRange,
  Lightbulb,
  HeartHandshake,
  ShieldAlert,
} from 'lucide-react';
import { ActionCard } from '@/components/dashboard-portal/ActionCard';
import { ProgressCard } from '@/components/dashboard-portal/ProgressCard';
import { EventCard } from '@/components/dashboard-portal/EventCard';
import { dummyEvents } from '@/components/dashboard-portal/dashboard-copy';

export type MentorMenteeDashboardProps = {
  greetingName: string;
  pendingApproval: boolean;
  storiesAllowed: boolean;
};

export function MentorMenteeDashboard({
  greetingName,
  pendingApproval,
  storiesAllowed,
}: MentorMenteeDashboardProps) {
  const checklist = [
    { id: '1', label: 'Choose story type', done: true },
    { id: '2', label: 'Set the context', done: true },
    { id: '3', label: 'Share your experience', done: false },
    { id: '4', label: 'Add empowerment message', done: false },
    { id: '5', label: 'Choose how to publish', done: false },
  ];

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
        <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-[#9152FF]/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -left-16 h-60 w-60 rounded-full bg-emerald-300/25 blur-3xl" />
        <div className="pointer-events-none absolute bottom-10 right-[10%] h-44 w-44 rounded-full bg-amber-200/30 blur-3xl" />

        <div className="relative z-[1] flex flex-col gap-6 px-6 py-8 sm:px-10 lg:flex-row lg:items-center lg:justify-between lg:gap-10">
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-[rgba(145,82,255,0.22)] bg-white/85 px-3 py-1 text-[0.7rem] font-bold uppercase tracking-wider text-[#7339E0] shadow-sm backdrop-blur">
              <Sparkles className="h-3.5 w-3.5" aria-hidden />
              Your dashboard
            </div>
            <h1 className="mt-4 font-lora text-[clamp(1.85rem,4vw,2.35rem)] font-bold tracking-tight text-[#1A1033]">
              Welcome back, {greetingName}! <span aria-hidden>👋</span>
            </h1>
            <p className="mt-3 text-[0.98rem] leading-relaxed text-[#4B4266] sm:text-[1.05rem]">
              This is your safe space to create, share and be part of a supportive community.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              {storiesAllowed ? (
                <Link
                  href="/story-tool"
                  className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-[#9152FF] to-[#7339E0] px-7 py-2.5 text-[0.9rem] font-semibold text-white shadow-[0_8px_24px_rgba(145,82,255,0.38)] transition hover:brightness-105"
                >
                  Create a Story
                </Link>
              ) : (
                <span
                  className="inline-flex cursor-not-allowed items-center justify-center rounded-full bg-[#E8E0F7] px-7 py-2.5 text-[0.9rem] font-semibold text-[#9A8CB3]"
                  title="Available after approval"
                  aria-disabled
                >
                  Create a Story
                </span>
              )}
              <Link
                href="/story-tool"
                className="inline-flex items-center justify-center rounded-full border border-[rgba(145,82,255,0.35)] bg-white/90 px-7 py-2.5 text-[0.9rem] font-semibold text-[#7339E0] shadow-sm backdrop-blur transition hover:bg-[#F5F0FF]"
              >
                Explore Stories
                <ArrowRight className="ml-1 h-4 w-4" aria-hidden />
              </Link>
            </div>
            {!storiesAllowed ? (
              <p className="mt-3 text-[0.85rem] text-[#7339E0]" id="story-tool-hint">
                Story Creation unlocks once your profile is approved.
              </p>
            ) : null}
          </div>
          <div className="relative hidden min-h-[200px] w-full max-w-sm shrink-0 overflow-hidden rounded-2xl border border-white/70 bg-white/70 p-5 shadow-inner backdrop-blur-md lg:flex lg:flex-col lg:justify-center">
            <div className="font-lora text-lg font-semibold text-[#1A1033]">Today&apos;s invitation</div>
            <ul className="mt-4 space-y-3 text-[0.9rem] text-[#5C5275]">
              <li className="flex gap-2">
                <HeartHandshake className="mt-0.5 h-4 w-4 shrink-0 text-[#9152FF]" aria-hidden />
                Take one small storytelling step—you choose the pace.
              </li>
              <li className="flex gap-2">
                <Lightbulb className="mt-0.5 h-4 w-4 shrink-0 text-amber-500" aria-hidden />
                Drafts autosave — your voice stays yours.
              </li>
              <li className="flex gap-2">
                <LayoutDashboard className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" aria-hidden />
                Need support? The community is cheering for you.
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section aria-labelledby="journey-heading" className="space-y-4">
        <h2 id="journey-heading" className="font-lora text-xl font-semibold text-[#1A1033]">
          Continue your journey
        </h2>
        <div className="grid gap-4 md:grid-cols-3">
          <ActionCard
            title="Create a new story"
            description="Share your experiences in your own way."
            actionLabel="Start now"
            href={storiesAllowed ? '/story-tool' : '#'}
            accent="purple"
            disabled={!storiesAllowed}
          />
          <ActionCard
            title="My stories"
            description="View, edit or manage your existing stories."
            actionLabel="Go to my stories"
            href="/portal/stories"
            accent="green"
          />
          <ActionCard
            title="Community"
            description="Connect, support and grow together."
            actionLabel="Join community"
            href="/portal/community"
            accent="orange"
          />
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-[1.05fr_minmax(0,0.95fr)]">
        <ProgressCard percent={60} items={checklist} />
        <div
          className="flex flex-col gap-4 rounded-2xl border border-[rgba(145,82,255,0.12)] bg-white p-6 shadow-[0_10px_36px_rgba(145,82,255,0.09)]"
          aria-labelledby="events-heading"
        >
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h2 id="events-heading" className="font-lora text-lg font-semibold text-[#1A1033]">
              Upcoming events
            </h2>
            <CalendarRange className="h-5 w-5 text-[#9152FF]" aria-hidden />
          </div>
          <div className="flex flex-col gap-3">
            {dummyEvents.map((e) => (
              <EventCard key={e.id} title={e.title} date={e.date} time={e.time} format={e.format} />
            ))}
          </div>
          <Link
            href="/portal/events"
            className="mt-auto inline-flex w-full items-center justify-center rounded-full border border-[rgba(145,82,255,0.35)] bg-white px-5 py-2.5 text-[0.88rem] font-semibold text-[#7339E0] transition hover:bg-[#F5F0FF] md:w-auto"
          >
            See full calendar
          </Link>
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-[1fr_1fr]">
        <div className="rounded-2xl border border-[rgba(145,82,255,0.12)] bg-gradient-to-br from-white to-[#F7F3FF] p-6 shadow-[0_10px_36px_rgba(145,82,255,0.09)]">
          <h3 className="font-lora text-lg font-semibold text-[#1A1033]">Quick tips</h3>
          <ul className="mt-4 space-y-3">
            <li className="flex gap-2 rounded-xl border border-[rgba(145,82,255,0.1)] bg-white/85 px-3 py-2.5 text-[0.92rem] text-[#4B4266]">
              <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-[#9152FF]" aria-hidden />
              <strong className="text-[#1A1033]">You are in control</strong>&nbsp; — pause anytime, edit gently, publish only when ready.
            </li>
            <li className="flex gap-2 rounded-xl border border-[rgba(145,82,255,0.1)] bg-white/85 px-3 py-2.5 text-[0.92rem] text-[#4B4266]">
              <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-emerald-500" aria-hidden />
              <strong className="text-[#1A1033]">Your privacy matters</strong>&nbsp; — you decide what stays private or shared with mentors.
            </li>
            <li className="flex gap-2 rounded-xl border border-[rgba(145,82,255,0.1)] bg-white/85 px-3 py-2.5 text-[0.92rem] text-[#4B4266]">
              <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-amber-500" aria-hidden />
              <strong className="text-[#1A1033]">Support each other</strong>&nbsp; — kind words can change someone&apos;s day.
            </li>
          </ul>
          <Link
            href="/portal/community"
            className="mt-5 inline-flex items-center justify-center rounded-full bg-[#EDE4FF] px-5 py-2.5 text-[0.88rem] font-semibold text-[#7339E0] transition hover:bg-[#E4DAFF]"
          >
            Community guidelines
          </Link>
        </div>

        <div className="flex flex-col justify-between rounded-2xl border border-[rgba(145,82,255,0.14)] bg-white p-6 shadow-[0_10px_36px_rgba(145,82,255,0.09)]">
          <div>
            <h3 className="font-lora text-lg font-semibold text-[#1A1033]">Impact summary</h3>
            <dl className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
              <div className="rounded-xl bg-[#FAF8FF] px-4 py-3">
                <dt className="text-[0.75rem] font-bold uppercase tracking-wide text-[#9A8CB3]">Stories created</dt>
                <dd className="mt-1 font-lora text-2xl font-bold text-[#1A1033]">3</dd>
              </div>
              <div className="rounded-xl bg-emerald-50/90 px-4 py-3">
                <dt className="text-[0.75rem] font-bold uppercase tracking-wide text-emerald-800/80">Published</dt>
                <dd className="mt-1 font-lora text-2xl font-bold text-emerald-950">1</dd>
              </div>
              <div className="rounded-xl bg-amber-50/90 px-4 py-3">
                <dt className="text-[0.75rem] font-bold uppercase tracking-wide text-amber-900/80">Drafts saved</dt>
                <dd className="mt-1 font-lora text-2xl font-bold text-amber-950">2</dd>
              </div>
            </dl>
          </div>
          <blockquote className="mt-6 border-l-4 border-[#9152FF] pl-4 text-[0.95rem] italic leading-relaxed text-[#4B4266]">
            “Every story you share can inspire someone&apos;s journey.”
          </blockquote>
        </div>
      </section>
    </div>
  );
}
