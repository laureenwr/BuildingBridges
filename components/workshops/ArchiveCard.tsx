'use client';

import Image from 'next/image';
import Link from 'next/link';
import type { ArchiveItem } from './workshop-data';
import { useLanguage } from '@/lib/hooks/useLanguage';

export function ArchiveCard({ item }: { item: ArchiveItem }) {
  const { isDe } = useLanguage();

  return (
    <article className="group overflow-hidden rounded-3xl border border-[rgba(145,82,255,0.15)] bg-white shadow-[0_8px_24px_rgba(145,82,255,0.08)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_12px_30px_rgba(145,82,255,0.13)]">
      <div className="relative aspect-[16/10]">
        <Image
          src={item.image}
          alt={isDe ? `Archiv-Flyer: ${item.title}` : `Archive flyer for ${item.title}`}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover"
        />
      </div>
      <div className="p-4">
        <div className="mb-2 flex flex-wrap gap-2">
          <span className="rounded-full border border-[#DDCCFF] bg-[#F7F2FF] px-2.5 py-1 text-[0.68rem] font-semibold text-[#6E44C5]">
            {item.status}
          </span>
          <span className="rounded-full bg-[#F4F7EC] px-2.5 py-1 text-[0.68rem] font-semibold text-[#5C8E70]">
            {item.date}
          </span>
        </div>
        <h3 className="font-lora text-[1.03rem] font-bold text-[#1A1033]">{item.title}</h3>
        <p className="mt-1 text-sm text-[#6B5F8A]">{item.type}</p>
        <Link
          href={item.href}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 inline-flex items-center rounded-full border border-[#D7C3FF] px-3 py-1.5 text-sm font-semibold text-[#6E44C5] transition hover:border-[#9152FF] hover:text-[#5C32BE]"
        >
          {isDe ? 'Flyer öffnen' : 'Open flyer'}
        </Link>
      </div>
    </article>
  );
}
