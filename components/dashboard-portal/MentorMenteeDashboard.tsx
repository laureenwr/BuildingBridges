'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Sparkles, CalendarRange, ShieldAlert } from 'lucide-react';
import { ActionCard } from '@/components/dashboard-portal/ActionCard';
import { EventCard } from '@/components/dashboard-portal/EventCard';
import { MyStoriesPanel } from '@/components/dashboard-portal/MyStoriesPanel';
import { getWorkshopFeed } from '@/components/workshops/workshop-data';
import type { MySubmittedStory } from '@/lib/actions/stories';
import { useLanguage } from '@/lib/hooks/useLanguage';
import { portalText } from '@/lib/portal/portal-copy';

export type MentorMenteeDashboardProps = {
  greetingName: string;
  pendingApproval: boolean;
  storiesAllowed: boolean;
  myStories: MySubmittedStory[];
};

export function MentorMenteeDashboard({
  greetingName,
  pendingApproval,
  storiesAllowed,
  myStories,
}: MentorMenteeDashboardProps) {
  const { isDe, lang } = useLanguage();
  const events = getWorkshopFeed(lang).slice(0, 2);

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
              <p className="font-lora text-base font-semibold text-amber-950">
                {portalText(isDe, 'Approval pending', 'Freigabe ausstehend')}
              </p>
              <p className="mt-1 text-[0.9rem] leading-relaxed text-amber-900/90">
                {portalText(
                  isDe,
                  'Your profile is waiting for approval. Story publishing will be available after approval.',
                  'Dein Profil wartet auf Freigabe. Das Veröffentlichen von Stories ist danach möglich.'
                )}
              </p>
            </div>
          </div>
          <Link
            href="/contact"
            className="inline-flex shrink-0 items-center justify-center rounded-full border border-amber-300 bg-white px-4 py-2 text-[0.85rem] font-semibold text-amber-950 transition hover:bg-amber-100"
          >
            {portalText(isDe, 'Need help?', 'Hilfe benötigt?')}
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
            {portalText(isDe, 'Your dashboard', 'Dein Portal')}
          </div>
          <h1 className="mt-4 font-lora text-[clamp(1.85rem,4vw,2.35rem)] font-bold tracking-tight text-[#1A1033]">
            {portalText(isDe, `Welcome back, ${greetingName}!`, `Willkommen zurück, ${greetingName}!`)}{' '}
            <span aria-hidden>👋</span>
          </h1>
          <p className="mt-3 max-w-xl text-[0.98rem] leading-relaxed text-[#4B4266] sm:text-[1.05rem]">
            {portalText(
              isDe,
              'Create a story, see your submissions, or check upcoming workshops.',
              'Erstelle eine Story, sieh deine Einreichungen oder schau dir kommende Workshops an.'
            )}
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            {storiesAllowed ? (
              <Link
                href="/story-tool"
                className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-[#9152FF] to-[#7339E0] px-7 py-2.5 text-[0.9rem] font-semibold text-white shadow-[0_8px_24px_rgba(145,82,255,0.38)] transition hover:brightness-105"
              >
                {portalText(isDe, 'Create a story', 'Story erstellen')}
              </Link>
            ) : (
              <span
                className="inline-flex cursor-not-allowed items-center justify-center rounded-full bg-[#E8E0F7] px-7 py-2.5 text-[0.9rem] font-semibold text-[#9A8CB3]"
                title={portalText(isDe, 'Available after approval', 'Nach der Freigabe verfügbar')}
                aria-disabled
              >
                {portalText(isDe, 'Create a story', 'Story erstellen')}
              </span>
            )}
            <Link
              href="/workshops"
              className="inline-flex items-center justify-center rounded-full border border-[rgba(145,82,255,0.35)] bg-white/90 px-7 py-2.5 text-[0.9rem] font-semibold text-[#7339E0] shadow-sm backdrop-blur transition hover:bg-[#F5F0FF]"
            >
              Workshops
            </Link>
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        <ActionCard
          title={portalText(isDe, 'Create a story', 'Story erstellen')}
          description={portalText(
            isDe,
            'Share your experiences in your own way.',
            'Teile deine Erfahrungen auf deine Weise.'
          )}
          actionLabel={portalText(isDe, 'Start now', 'Jetzt starten')}
          href={storiesAllowed ? '/story-tool' : '#'}
          accent="purple"
          disabled={!storiesAllowed}
        />
        <ActionCard
          title="Workshops"
          description={portalText(
            isDe,
            'See upcoming Building Bridges events.',
            'Sieh dir kommende Building-Bridges-Termine an.'
          )}
          actionLabel={portalText(isDe, 'View workshops', 'Workshops ansehen')}
          href="/workshops"
          accent="green"
        />
      </section>

      <section className="grid gap-4 lg:grid-cols-2">
        <div className="rounded-2xl border border-[rgba(145,82,255,0.12)] bg-white p-6 shadow-[0_10px_36px_rgba(145,82,255,0.09)]">
          <div className="flex items-center justify-between gap-2">
            <h2 className="font-lora text-lg font-semibold text-[#1A1033]">
              {portalText(isDe, 'Upcoming workshops', 'Kommende Workshops')}
            </h2>
            <CalendarRange className="h-5 w-5 text-[#9152FF]" aria-hidden />
          </div>
          <div className="mt-4 flex flex-col gap-3">
            {events.length > 0 ? (
              events.map((event) => (
                <EventCard
                  key={event.id}
                  title={event.title}
                  date={event.date}
                  time={event.time}
                  format={event.modeLabel || event.location}
                />
              ))
            ) : (
              <p className="rounded-xl border border-dashed border-[rgba(145,82,255,0.2)] bg-[#FAF8FF] px-4 py-6 text-center text-[0.9rem] text-[#6B5F8A]">
                {portalText(
                  isDe,
                  'No upcoming workshops are listed right now.',
                  'Aktuell sind keine kommenden Workshops eingetragen.'
                )}
              </p>
            )}
          </div>
        </div>

        <MyStoriesPanel stories={myStories} storiesAllowed={storiesAllowed} />
      </section>
    </div>
  );
}
