'use client';

import Image from 'next/image';

type Logo = {
  src: string;
  alt: string;
  width: number;
  height: number;
  scale?: number; // optional visual adjustment for mixed-aspect assets
};

const DEFAULT_FUNDING_TEXT =
  'Das Projekt Building Bridges wird im Rahmen des Programms „Integration durch Bildung" durch das Bundesministerium für Bildung, Familie, Senioren, Frauen und Jugend und die Europäische Union über den Europäischen Sozialfonds Plus (ESF Plus) gefördert.';
const DEFAULT_PARTNERS_LOGO = '/workshops/updated/funding-strip.png';

export function FundingBanner({
  heading = 'Gefördert durch',
  logos: _logos,
  description = DEFAULT_FUNDING_TEXT,
  combinedLogoSrc = DEFAULT_PARTNERS_LOGO,
}: {
  heading?: string;
  logos?: Logo[];
  description?: string;
  combinedLogoSrc?: string;
}) {
  return (
    <section className="py-10">
      <div className="container mx-auto px-4">
        <div className="w-full flex justify-center">
          <div className="w-full max-w-6xl">
            <h3 className="text-gray-900 text-2xl md:text-3xl font-bold mb-3 text-center">
              {heading}
            </h3>
            <div className="rounded-2xl border border-gray-200 bg-white px-5 md:px-7 py-6 md:py-7 shadow-sm">
              <div className="flex flex-col gap-5">
                {description ? (
                  <p className="mx-auto max-w-4xl text-center text-xs leading-relaxed text-gray-700 md:text-sm">
                    {description}
                  </p>
                ) : null}
                <div className="relative mx-auto w-full overflow-hidden rounded-xl bg-white">
                  <Image
                    src={combinedLogoSrc}
                    alt="Building Bridges funding and partner logos"
                    width={1920}
                    height={178}
                    quality={100}
                    unoptimized
                    className="h-auto w-full object-contain"
                    priority={false}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

