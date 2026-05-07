'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Calendar, MapPin } from 'lucide-react';
import type { WorkshopItem } from './workshop-data';

export function WorkshopHero({ workshop }: { workshop: WorkshopItem }) {
  return (
    <section className="relative overflow-hidden rounded-[30px] border border-[rgba(145,82,255,0.18)] bg-[#F6F0FF] p-5 shadow-[0_12px_34px_rgba(145,82,255,0.12)] md:p-8">
      <div className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-gradient-to-br from-[#B894FF] to-transparent blur-2xl" />
      <div className="pointer-events-none absolute -left-10 bottom-4 h-28 w-28 rounded-full bg-gradient-to-br from-[#D6F0E3] to-transparent blur-2xl" />

      <div className="relative z-[1] grid grid-cols-1 items-center gap-5 md:grid-cols-[1.2fr_1fr]">
        <div>
          <p className="mb-2 inline-flex w-fit rounded-full border border-[#DDCCFF] bg-white px-3 py-1 text-[0.7rem] font-bold uppercase tracking-[0.1em] text-[#7B56CC]">
            Featured workshop
          </p>
          <h2 className="font-lora text-[clamp(1.8rem,2.8vw,2.6rem)] font-bold leading-tight text-[#1A1033]">
            {workshop.title}
          </h2>
          <p className="mt-3 max-w-2xl text-[0.95rem] leading-relaxed text-[#5F4F84]">{workshop.description}</p>

          <div className="mt-4 flex flex-wrap gap-2">
            {workshop.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-[#DCCBFF] bg-white px-2.5 py-1 text-[0.72rem] font-semibold text-[#6A46BD]"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="mt-5 flex flex-wrap gap-3 text-sm text-[#6B5F8A]">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5">
              <Calendar className="h-4 w-4 text-[#9152FF]" />
              {workshop.date} · {workshop.time}
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5">
              <MapPin className="h-4 w-4 text-[#9152FF]" />
              {workshop.location}
            </span>
          </div>

          <div className="mt-5 flex flex-wrap gap-3">
            <Link
              href="/sign-up"
              className="inline-flex items-center rounded-full bg-gradient-to-r from-[#9152FF] to-[#7339E0] px-4 py-2 text-sm font-semibold text-white shadow-[0_5px_16px_rgba(145,82,255,0.34)] transition hover:brightness-[1.04]"
            >
              Join workshop
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center rounded-full border border-[#DCCBFF] bg-white px-4 py-2 text-sm font-semibold text-[#6B4AAF] transition hover:border-[#9152FF] hover:text-[#5A35B8]"
            >
              View details
            </Link>
          </div>
        </div>

        <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-[rgba(145,82,255,0.15)] bg-white">
          <Image
            src={workshop.image}
            alt={`Featured workshop flyer for ${workshop.title}`}
            fill
            sizes="(max-width: 768px) 100vw, 40vw"
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
}
