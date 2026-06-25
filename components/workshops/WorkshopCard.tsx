'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Bookmark, MapPin, Users } from 'lucide-react';
import type { WorkshopItem } from './workshop-data';
import { useLanguage } from '@/lib/hooks/useLanguage';

export function WorkshopCard({ workshop }: { workshop: WorkshopItem }) {
  const { isDe } = useLanguage();

  return (
    <article className="group flex h-full flex-col rounded-3xl border border-[rgba(145,82,255,0.16)] bg-white p-3.5 shadow-[0_8px_24px_rgba(145,82,255,0.08)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_12px_32px_rgba(145,82,255,0.14)]">
      <div className="relative mb-3 aspect-[16/10] overflow-hidden rounded-2xl">
        <Image
          key={workshop.image}
          src={workshop.image}
          alt={isDe ? `Flyer: ${workshop.title}` : `Flyer preview for ${workshop.title}`}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition duration-500 group-hover:scale-[1.03]"
        />
      </div>

      <div className="mb-2 flex flex-wrap items-center gap-2">
        <span className="rounded-full bg-[#EEE4FF] px-2.5 py-1 text-[0.68rem] font-semibold text-[#7642DB]">
          {workshop.categoryLabel}
        </span>
        <span className="rounded-full border border-[#DCCBFF] px-2.5 py-1 text-[0.68rem] font-semibold text-[#6B5F8A]">
          {workshop.modeLabel}
        </span>
      </div>

      <h3 className="font-lora text-lg font-bold text-[#1A1033]">{workshop.title}</h3>
      <p className="mt-1 text-[0.79rem] font-semibold text-[#7B56CC]">
        {workshop.date} · {workshop.time}
      </p>
      <p className="mt-1 inline-flex items-center gap-1 text-[0.8rem] text-[#6B5F8A]">
        <MapPin className="h-3.5 w-3.5 text-[#9152FF]" />
        {workshop.location}
      </p>
      <p className="mt-2 text-[0.86rem] leading-relaxed text-[#5E5677]">{workshop.description}</p>

      <div className="mt-3 flex items-center justify-between">
        <div className="inline-flex items-center gap-1.5 text-[0.78rem] text-[#6B5F8A]">
          <Users className="h-3.5 w-3.5 text-[#9152FF]" />
          {isDe ? 'Community interessiert' : 'Community interested'}
        </div>
        <button
          type="button"
          aria-label={isDe ? `${workshop.title} merken` : `Save ${workshop.title}`}
          className="rounded-full border border-[#DBC9FF] p-1.5 text-[#7B56CC] transition hover:border-[#9152FF] hover:text-[#6A39CF]"
        >
          <Bookmark className="h-3.5 w-3.5" />
        </button>
      </div>

      <Link
        href="/contact"
        className="mt-4 inline-flex w-fit items-center rounded-full bg-gradient-to-r from-[#9152FF] to-[#7339E0] px-3.5 py-1.5 text-sm font-semibold text-white shadow-[0_4px_14px_rgba(145,82,255,0.34)] transition hover:brightness-[1.04]"
      >
        {isDe ? 'Workshop ansehen' : 'View workshop'}
      </Link>
    </article>
  );
}
