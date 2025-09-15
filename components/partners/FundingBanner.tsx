'use client';

import Image from 'next/image';

type Logo = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

export function FundingBanner({
  heading = 'Gefördert durch',
  logos,
}: {
  heading?: string;
  logos: Logo[];
}) {
  return (
    <section className="py-10">
      <div className="container mx-auto px-4">
        <div className="rounded-2xl border border-gray-200 bg-white p-6 md:p-8 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
            <p className="text-gray-800 text-base md:text-lg font-medium shrink-0 md:pr-6">
              {heading}
            </p>
            <div className="flex flex-wrap items-center justify-start gap-x-10 gap-y-6">
              {logos.map((logo) => (
                <div key={logo.src} className="relative" style={{ height: 70, width: 220 }}>
                  <Image
                    src={logo.src}
                    alt={logo.alt}
                    width={220}
                    height={70}
                    className="object-contain"
                    priority={false}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

