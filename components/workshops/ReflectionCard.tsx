'use client';

import { Quote } from 'lucide-react';
import type { ReflectionItem } from './workshop-data';

export function ReflectionCard({ item }: { item: ReflectionItem }) {
  return (
    <article className="rounded-2xl border border-[rgba(145,82,255,0.14)] bg-white p-4 shadow-[0_6px_18px_rgba(145,82,255,0.08)]">
      <Quote className="h-4 w-4 text-[#9152FF]" />
      <p className="mt-2 text-[0.92rem] leading-relaxed text-[#5E5677]">"{item.quote}"</p>
      <p className="mt-3 text-[0.78rem] font-semibold uppercase tracking-[0.08em] text-[#7C58CC]">
        {item.role}
      </p>
    </article>
  );
}
