'use client';

import { ArchiveCard } from '@/components/workshops/ArchiveCard';
import { CTASection } from '@/components/workshops/CTASection';
import { ReflectionCard } from '@/components/workshops/ReflectionCard';
import { WorkshopGrid } from '@/components/workshops/WorkshopGrid';
import { UpcomingWorkshopAlert } from '@/components/workshops/UpcomingWorkshopAlert';
import { WorkshopHero } from '@/components/workshops/WorkshopHero';
import {
  getArchiveItems,
  getFeaturedWorkshop,
  getReflections,
  getWorkshopFeed,
  getWorkshopPageLabels,
} from '@/components/workshops/workshop-data';
import { useLanguage } from '@/lib/hooks/useLanguage';
import { useMemo } from 'react';

export default function WorkshopsPage() {
  const { lang } = useLanguage();

  const labels = useMemo(() => getWorkshopPageLabels(lang), [lang]);
  const featuredWorkshop = useMemo(() => getFeaturedWorkshop(lang), [lang]);
  const workshopFeed = useMemo(() => getWorkshopFeed(lang), [lang]);
  const archiveItems = useMemo(() => getArchiveItems(lang), [lang]);
  const reflections = useMemo(() => getReflections(lang), [lang]);

  return (
    <main className="min-h-screen bg-[#F3EEFF]">
      <div className="mx-auto max-w-[1280px] px-6 py-24 sm:px-10">
        <div className="mb-8 text-center">
          <p className="text-[0.74rem] font-bold uppercase tracking-[0.12em] text-[#8A5CE6]">{labels.eyebrow}</p>
          <h1 className="mt-2 font-lora text-[clamp(2rem,3.2vw,2.9rem)] font-bold text-[#1A1033]">{labels.title}</h1>
          <p className="mx-auto mt-3 max-w-3xl text-[0.98rem] leading-relaxed text-[#62557F]">{labels.intro}</p>
        </div>

        <UpcomingWorkshopAlert className="mb-8" />

        <WorkshopHero workshop={featuredWorkshop} />

        <WorkshopGrid items={workshopFeed} labels={{ eyebrow: labels.feedEyebrow, title: labels.feedTitle }} />

        <section className="mt-14">
          <div className="mb-5 flex items-end justify-between gap-3">
            <div>
              <p className="text-[0.72rem] font-bold uppercase tracking-[0.12em] text-[#9152FF]">{labels.archiveEyebrow}</p>
              <h2 className="font-lora text-2xl font-bold text-[#1A1033]">{labels.archiveTitle}</h2>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
            {archiveItems.map((item) => (
              <ArchiveCard key={item.id} item={item} />
            ))}
          </div>
        </section>

        <section className="mt-14">
          <div className="mb-5 max-w-3xl">
            <p className="text-[0.72rem] font-bold uppercase tracking-[0.12em] text-[#9152FF]">{labels.reflectionEyebrow}</p>
            <h2 className="font-lora text-2xl font-bold text-[#1A1033]">{labels.reflectionTitle}</h2>
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {reflections.map((item) => (
              <ReflectionCard key={item.id} item={item} />
            ))}
          </div>
        </section>

        <CTASection />
      </div>
    </main>
  );
}
