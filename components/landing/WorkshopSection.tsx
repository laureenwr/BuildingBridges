'use client';

import { useMemo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

type ArchiveCategory = 'Mentoring' | 'Empowerment' | 'Events' | 'Self-care';
type ArchiveFilter = 'All' | ArchiveCategory;

type WorkshopItem = {
  title: string;
  date: string;
  time?: string;
  location: string;
  description: string;
  flyerHref: string;
  flyerPreview?: string;
  category: ArchiveCategory;
  isPdfPreview?: boolean;
};

const upcomingWorkshops: WorkshopItem[] = [
  {
    title: 'Fruehlingsfest',
    date: '20.03.2026',
    time: '15:00 - 19:00',
    location: 'Maedea',
    description:
      'A spring celebration with food, henna, self-care impulses, flowers, and community activities.',
    flyerHref: '/workshops/fruehlingsfest-2026.png',
    flyerPreview: '/workshops/fruehlingsfest-2026.png',
    category: 'Events',
  },
  {
    title: 'Mentoring: Fokus auf "Was tut mir gut?"',
    date: '02.03.2026',
    time: '16:00 - 19:00',
    location: 'Johanna-Eck',
    description:
      'Empowerment workshop for Maedchen* with racism experiences, centered on wellbeing and reflection.',
    flyerHref: '/workshops/mentoring-was-tut-mir-gut-2026.png',
    flyerPreview: '/workshops/mentoring-was-tut-mir-gut-2026.png',
    category: 'Mentoring',
  },
  {
    title: 'Mentoring-Programm fuer Maedchen und junge FLINTA of Colour',
    date: '09.2025 - 09.2026',
    location: 'Maedea',
    description:
      'Mentoring programme with workshops on self-care, skills training, and long-term empowerment.',
    flyerHref: '/workshops/mentoring-programm-2025.png',
    flyerPreview: '/workshops/mentoring-programm-2025.png',
    category: 'Empowerment',
  },
];

const archiveWorkshops: WorkshopItem[] = [
  {
    title: 'Fruehlingsfest',
    date: '20.03.2026',
    location: 'Maedea',
    description:
      'Spring celebration with food, henna, self-care impulses, flowers, and community activities.',
    flyerHref: '/workshops/fruehlingsfest-2026.png',
    flyerPreview: '/workshops/fruehlingsfest-2026.png',
    category: 'Events',
  },
  {
    title: 'Mentoring: Fokus auf "Was tut mir gut?"',
    date: '02.03.2026',
    location: 'Johanna-Eck',
    description: 'Empowerment for Maedchen* with racism experiences with focus on inner resources.',
    flyerHref: '/workshops/mentoring-was-tut-mir-gut-2026.png',
    flyerPreview: '/workshops/mentoring-was-tut-mir-gut-2026.png',
    category: 'Mentoring',
  },
  {
    title: 'Perlen & Power',
    date: '18.12.2025',
    location: 'Johanna-Eck',
    description:
      'Reflection on 2025 with exchange, pearl necklaces, pizza, snacks, and shared celebration.',
    flyerHref: '/workshops/perlen-power-2025.png',
    flyerPreview: '/workshops/perlen-power-2025.png',
    category: 'Self-care',
  },
  {
    title: 'Kennenlerntreffen mit Building Bridges',
    date: '08.10.2025',
    location: 'Anigo Space',
    description: 'Introduction meeting with safe-space discussion, shared food, and group exchange.',
    flyerHref: '/workshops/kennenlerntreffen-2025.png',
    flyerPreview: '/workshops/kennenlerntreffen-2025.png',
    category: 'Events',
  },
  {
    title: 'Mentoring-Programm fuer Maedchen und junge FLINTA of Colour',
    date: '09.2025 - 09.2026',
    location: 'Maedea',
    description:
      'Programme journey with self-care, skills training, and empowerment workshops across the year.',
    flyerHref: '/workshops/mentoring-programm-2025.png',
    flyerPreview: '/workshops/mentoring-programm-2025.png',
    category: 'Empowerment',
  },
];

const filterChips: ArchiveFilter[] = ['All', 'Mentoring', 'Empowerment', 'Events', 'Self-care'];

function ArchiveTag({ label }: { label: ArchiveCategory }) {
  return (
    <span className="inline-flex items-center rounded-full border border-[#D8CAFB] bg-[#F7F2FF] px-2.5 py-1 text-[0.72rem] font-semibold text-[#6C4BAA]">
      {label}
    </span>
  );
}

function FlyerPreview({
  item,
  className,
}: {
  item: WorkshopItem;
  className?: string;
}) {
  if (item.isPdfPreview || !item.flyerPreview) {
    return (
      <div
        className={`flex aspect-[4/5] items-center justify-center rounded-2xl border border-dashed border-[#D8CAFB] bg-[#FAF7FF] px-4 text-center text-sm font-medium text-[#6B5F8A] ${className ?? ''}`}
        aria-label={`${item.title} flyer preview`}
      >
        Flyer preview available as PDF
      </div>
    );
  }

  return (
    <div className={`relative aspect-[4/5] overflow-hidden rounded-2xl ${className ?? ''}`}>
      <Image
        src={item.flyerPreview}
        alt={`Flyer preview for ${item.title}`}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        className="object-cover"
      />
    </div>
  );
}

export function WorkshopSection() {
  const [activeFilter, setActiveFilter] = useState<ArchiveFilter>('All');

  const visibleArchive = useMemo(() => {
    if (activeFilter === 'All') return archiveWorkshops;
    return archiveWorkshops.filter((item) => item.category === activeFilter);
  }, [activeFilter]);

  return (
    <div>
      <div className="mb-12 max-w-3xl">
        <h2 className="font-lora text-[clamp(2rem,3vw,2.6rem)] font-bold tracking-tight text-[#1A1033]">
          Workshops &amp; Events
        </h2>
        <p className="mt-4 text-base leading-relaxed text-[#6B5F8A]">
          Our workshops create safe spaces for exchange, empowerment, mentoring, and shared learning.
        </p>
      </div>

      <div className="mb-14">
        <h3 className="mb-5 text-xl font-bold text-[#1A1033]">Upcoming Workshops</h3>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {upcomingWorkshops.map((workshop) => (
            <article
              key={workshop.title}
              className="flex h-full flex-col rounded-3xl border border-[#E8DFFE] bg-white p-4 shadow-[0_8px_26px_rgba(145,82,255,0.08)]"
            >
              <FlyerPreview item={workshop} />
              <div className="mt-4 flex flex-1 flex-col">
                <h4 className="font-lora text-lg font-bold text-[#1A1033]">{workshop.title}</h4>
                <p className="mt-2 text-sm font-semibold text-[#7C55CC]">
                  {workshop.date}
                  {workshop.time ? ` · ${workshop.time}` : ''}
                </p>
                <p className="mt-1 text-sm text-[#6B5F8A]">{workshop.location}</p>
                <p className="mt-3 text-sm leading-relaxed text-[#5E5677]">{workshop.description}</p>
                <Link
                  href={workshop.flyerHref}
                  className="mt-4 inline-flex w-fit items-center rounded-full border border-[#CDBAF8] px-3.5 py-1.5 text-sm font-semibold text-[#6C4BAA] transition hover:border-[#9152FF] hover:text-[#7339E0] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9152FF] focus-visible:ring-offset-2"
                >
                  View flyer / Learn more
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>

      <div>
        <div className="mb-4 flex items-center gap-3">
          <span className="inline-flex items-center rounded-full border border-[#D8CAFB] bg-[#F7F2FF] px-3 py-1 text-[0.72rem] font-bold uppercase tracking-[0.09em] text-[#6C4BAA]">
            Archive
          </span>
          <h3 className="text-xl font-bold text-[#1A1033]">Workshop Archive</h3>
        </div>

        <div className="mb-6 flex flex-wrap gap-2">
          {filterChips.map((chip) => {
            const isActive = chip === activeFilter;
            return (
              <button
                key={chip}
                type="button"
                onClick={() => setActiveFilter(chip)}
                className={`rounded-full border px-3 py-1.5 text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9152FF] focus-visible:ring-offset-2 ${
                  isActive
                    ? 'border-[#9152FF] bg-[#9152FF] text-white'
                    : 'border-[#D8CAFB] bg-white text-[#6B5F8A] hover:border-[#9152FF] hover:text-[#7339E0]'
                }`}
                aria-pressed={isActive}
              >
                {chip}
              </button>
            );
          })}
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {visibleArchive.map((workshop) => (
            <article
              key={`${workshop.title}-${workshop.date}`}
              className="flex h-full flex-col rounded-3xl border border-[#E8DFFE] bg-white p-4 shadow-[0_8px_26px_rgba(145,82,255,0.08)]"
            >
              <FlyerPreview item={workshop} />
              <div className="mt-4 flex flex-1 flex-col">
                <div className="mb-2">
                  <ArchiveTag label={workshop.category} />
                </div>
                <h4 className="font-lora text-lg font-bold text-[#1A1033]">{workshop.title}</h4>
                <p className="mt-2 text-sm font-semibold text-[#7C55CC]">{workshop.date}</p>
                <p className="mt-1 text-sm text-[#6B5F8A]">{workshop.location}</p>
                <p className="mt-3 text-sm leading-relaxed text-[#5E5677]">{workshop.description}</p>
                <Link
                  href={workshop.flyerHref}
                  className="mt-4 inline-flex w-fit items-center rounded-full border border-[#CDBAF8] px-3.5 py-1.5 text-sm font-semibold text-[#6C4BAA] transition hover:border-[#9152FF] hover:text-[#7339E0] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9152FF] focus-visible:ring-offset-2"
                >
                  Open / Download flyer
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
