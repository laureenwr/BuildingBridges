'use client';

import Image from 'next/image';
import Link from 'next/link';
import { FundingBanner } from '@/components/partners/FundingBanner';
import { useLanguage } from '@/lib/hooks/useLanguage';

const partners = [
  {
    tag: 'Network Coordination · TP1',
    name: 'Free University of Berlin',
    role: 'Project Management & Research',
    body: 'Overall coordination and scientific management under Prof. Dr. Claudia Calvano.',
    href: 'https://www.fu-berlin.de',
    logo: '/Projektpartner Logos/FU Berlin logo.png',
  },
  {
    tag: 'MEP Development · TP2',
    name: 'SPI Foundation',
    role: 'Mentoring & Empowerment Program',
    body: 'Practice-oriented development of the MEP under MA Celiana Kiefer.',
    href: '/partners',
    logo: '/Projektpartner Logos/Stiftung SPI Logo.png',
  },
  {
    tag: 'Digital Platform · TP3',
    name: 'University of Duisburg-Essen',
    role: 'Digital Platform & Research',
    body: 'Participatory development of the digital storytelling platform under Prof. Dr. Hannes Rothe.',
    href: 'https://www.uni-due.de',
    logo: '/Projektpartner Logos/UDE_Logo.png',
  },
];

export function LandingPartnersFunding() {
  const { isDe } = useLanguage();
  return (
    <section id="partners" className="bg-white px-6 py-24 sm:px-10 sm:py-28">
      <div className="mx-auto max-w-[1280px]">
        <p className="mb-3 text-center text-[0.72rem] font-bold uppercase tracking-[0.13em] text-[#9152FF]">{isDe ? 'Projektpartner' : 'Project Partners'}</p>
        <h2 className="mb-12 text-center font-lora text-[clamp(2rem,3vw,2.6rem)] font-bold leading-tight tracking-tight text-[#1A1033]">
          {isDe ? (
            <>Eine starke <em className="font-normal not-italic text-[#9152FF]">Allianz</em> aus Hochschulen &amp; Stiftungen</>
          ) : (
            <>A strong <em className="font-normal not-italic text-[#9152FF]">alliance</em> of universities &amp; foundations</>
          )}
        </h2>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {partners.map((p) => (
            <article
              key={p.name}
              className="rounded-[24px] border-[1.5px] border-[rgba(145,82,255,0.15)] bg-white p-8 transition hover:-translate-y-1 hover:shadow-[0_6px_28px_rgba(145,82,255,0.13)]"
            >
              <p className="mb-2 text-[0.72rem] font-bold uppercase tracking-[0.1em] text-[#9152FF]">{p.tag}</p>
              <div className="mb-2 flex items-center gap-3">
                <div className="relative h-10 w-20 shrink-0">
                  <Image src={p.logo} alt="" fill className="object-contain object-left" sizes="80px" />
                </div>
                <h3 className="font-lora text-lg font-bold text-[#1A1033]">{p.name}</h3>
              </div>
              <p className="mb-3 text-[0.83rem] font-semibold text-[#6B5F8A]">{p.role}</p>
              <p className="text-[0.875rem] leading-relaxed text-[#888]">{p.body}</p>
              <Link
                href={p.href}
                className="mt-4 inline-block text-[0.84rem] font-bold text-[#9152FF] hover:underline"
                {...(p.href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              >
                {isDe ? 'Website besuchen →' : 'Visit website →'}
              </Link>
            </article>
          ))}
        </div>

        <div className="mt-14">
          <FundingBanner
            heading={isDe ? 'Gefoerdert durch' : 'Funded by'}
            logos={[
              { src: '/BMBF/LOGO%20Kit_BMBFSFJ/BMBFSFJ_gefoerdert_vom_deutsch_Web.svg', alt: 'BMBFSFJ', width: 220, height: 70, scale: 0.95 },
              { src: '/BMBF/EBF-Publikations-Kit/BG-EBF_Wortmarke.svg', alt: 'Empirical Educational Research', width: 220, height: 70, scale: 0.9 },
              { src: '/BMBF/image copy 3.png', alt: 'European Union', width: 220, height: 70, scale: 0.6 },
            ]}
          />
        </div>
      </div>
    </section>
  );
}
