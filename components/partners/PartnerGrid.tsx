'use client';

import Image from 'next/image';

type Partner = {
  name: string;
  logoSrc: string;
  alt: string;
  url?: string;
};

export function PartnerGrid({ title, partners }: { title: string; partners: Partner[] }) {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 text-center">{title}</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8 items-center">
          {partners.map((p) => (
            <div key={p.name} className="flex items-center justify-center">
              {p.url ? (
                <a href={p.url} target="_blank" rel="noopener noreferrer" aria-label={p.name}>
                  <Image src={p.logoSrc} alt={p.alt} width={180} height={70} className="object-contain" />
                </a>
              ) : (
                <Image src={p.logoSrc} alt={p.alt} width={180} height={70} className="object-contain" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

