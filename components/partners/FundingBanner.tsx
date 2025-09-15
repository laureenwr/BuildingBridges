'use client';

import Image from 'next/image';

type Logo = {
  src: string;
  alt: string;
  width: number;
  height: number;
  scale?: number; // optional visual adjustment for mixed-aspect assets
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
        <div className="w-full flex justify-center">
          <div className="inline-block">
            <h3 className="text-gray-900 text-2xl md:text-3xl font-bold mb-3 pl-2 text-left">
              {heading}
            </h3>
            <div className="rounded-2xl border border-gray-200 bg-white p-6 md:p-8 shadow-sm">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center justify-items-center">
                {logos.map((logo) => (
                  <div
                    key={logo.src}
                    className="relative flex items-center justify-center"
                    style={{ height: 70, width: 220 }}
                  >
                    <Image
                      src={logo.src}
                      alt={logo.alt}
                      width={220}
                      height={70}
                      className="object-contain"
                      priority={false}
                      style={logo.scale ? ({ transform: `scale(${logo.scale})` } as any) : undefined}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

