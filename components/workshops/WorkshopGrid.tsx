'use client';

import { WorkshopCard } from './WorkshopCard';
import type { WorkshopItem } from './workshop-data';

export function WorkshopGrid({ items }: { items: WorkshopItem[] }) {
  return (
    <section className="mt-12">
      <div className="mb-5 flex items-end justify-between">
        <div>
          <p className="text-[0.72rem] font-bold uppercase tracking-[0.12em] text-[#9152FF]">Workshop feed</p>
          <h3 className="font-lora text-2xl font-bold text-[#1A1033]">Browse upcoming sessions</h3>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
        {items.map((item) => (
          <WorkshopCard key={item.id} workshop={item} />
        ))}
      </div>
    </section>
  );
}
