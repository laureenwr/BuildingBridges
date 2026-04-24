'use client';

import { useLanguage } from '@/lib/hooks/useLanguage';

export function LandingVideo() {
  const { isDe } = useLanguage();

  return (
    <section id="project-video" className="bg-[#F2EEFF] px-6 py-24 sm:px-10 sm:py-28">
      <div className="mx-auto max-w-[1000px] text-center">
        <h2 className="font-lora text-[clamp(2rem,3vw,2.6rem)] font-bold leading-tight tracking-tight text-[#1A1033]">
          {isDe ? 'Projekt Building Bridges erklaert' : 'Project Building Bridges explained'}
        </h2>
        <p className="mx-auto mt-4 max-w-3xl text-base leading-relaxed text-[#6B5F8A]">
          {isDe
            ? 'Erfahren Sie mehr ueber unser interdisziplinaeres Forschungsprojekt zur Unterstuetzung von Girls und FLINTA* of Colour auf akademischen Wegen.'
            : 'Learn more about our interdisciplinary research project to support girls and FLINTA* of Colour in academic paths.'}
        </p>

        <div className="mt-10 overflow-hidden rounded-[28px] bg-white p-4 shadow-[0_12px_40px_rgba(145,82,255,0.18)] sm:p-6">
          <div className="aspect-video overflow-hidden rounded-2xl">
            <iframe
              className="h-full w-full"
              src="https://www.youtube-nocookie.com/embed/txvwXWRwxyI"
              title={isDe ? 'Erklaervideo: Building Bridges' : 'Explainer video: Building Bridges'}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          </div>
        </div>
      </div>
    </section>
  );
}
