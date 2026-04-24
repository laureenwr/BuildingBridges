'use client';

import Image from 'next/image';
import Link from 'next/link';
import { getMemberBySlug } from '@/lib/content/team';
import { useLanguage } from '@/lib/hooks/useLanguage';

const featuredSlugs = ['claudia-calvano', 'celiana-kiefer', 'hannes-rothe'] as const;

export function LandingTeam() {
  const { isDe } = useLanguage();
  const featured = featuredSlugs.map((s) => getMemberBySlug(s)).filter(Boolean);

  return (
    <section id="team" className="bg-white px-6 py-24 sm:px-10 sm:py-28">
      <div className="mx-auto max-w-[1280px]">
        <p className="mb-3 text-[0.72rem] font-bold uppercase tracking-[0.13em] text-[#9152FF]">{isDe ? 'Projektteam' : 'Project Team'}</p>
        <h2 className="mb-3 max-w-[720px] font-lora text-[clamp(2rem,3vw,2.6rem)] font-bold leading-tight tracking-tight text-[#1A1033]">
          {isDe ? (
            <>Lernen Sie die <em className="font-normal not-italic text-[#9152FF]">Menschen</em> hinter Building Bridges kennen</>
          ) : (
            <>Meet the <em className="font-normal not-italic text-[#9152FF]">people</em> behind Building Bridges</>
          )}
        </h2>
        <p className="mb-14 max-w-[640px] text-[0.97rem] text-[#6B5F8A]">
          {isDe ? 'Drei Partnerinstitutionen - eine gemeinsame Mission.' : 'Three partner institutions - one shared mission.'}
        </p>

        <div className="mb-10 rounded-2xl border-[1.5px] border-[rgba(145,82,255,0.15)] bg-[#F5F0FF]/50 p-6">
          <div className="flex flex-wrap items-center gap-4 border-b border-[rgba(145,82,255,0.15)] pb-5">
            <div className="flex h-[52px] w-[52px] shrink-0 items-center justify-center rounded-[14px] bg-[#9152FF] text-sm font-extrabold tracking-wide text-white">
              TP
            </div>
            <div>
              <h3 className="font-lora text-xl font-bold text-[#1A1033]">{isDe ? 'Hochschulen & Partner' : 'Universities & partners'}</h3>
              <span className="text-[0.83rem] font-medium text-[#6B5F8A]">
                {isDe ? 'FU Berlin · Stiftung SPI · Universitaet Duisburg-Essen' : 'FU Berlin · SPI Foundation · University of Duisburg-Essen'}
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {featured.map((m) =>
            m ? (
              <Link
                key={m.slug}
                href={`/team/${m.slug}`}
                className="group relative overflow-hidden rounded-[24px] border-[1.5px] border-[rgba(145,82,255,0.15)] bg-white p-7 shadow-[0_2px_12px_rgba(145,82,255,0.08)] transition hover:-translate-y-1 hover:shadow-[0_6px_28px_rgba(145,82,255,0.13)]"
              >
                <div className="absolute left-0 right-0 top-0 z-[1] h-1 bg-gradient-to-r from-[#9152FF] to-[#B580FF]" />
                <Image
                  src={m.image}
                  alt={m.name ?? `${m.firstName} ${m.lastName}`}
                  width={90}
                  height={90}
                  className="mb-4 h-[90px] w-[90px] rounded-full border-[3px] border-[#EDE5FF] object-cover object-top shadow-md"
                />
                <h4 className="font-lora text-[1.05rem] font-bold text-[#1A1033]">{m.name}</h4>
                <p className="mb-2 text-[0.8rem] font-bold uppercase tracking-[0.07em] text-[#9152FF]">{m.role}</p>
                <p className="line-clamp-4 text-[0.83rem] leading-relaxed text-[#6B5F8A]">{m.org}</p>
                <span className="mt-4 inline-block text-sm font-bold text-[#9152FF] group-hover:underline">{isDe ? 'Profil ansehen →' : 'View profile →'}</span>
              </Link>
            ) : null
          )}
        </div>

        <div className="mt-10 text-center">
          <Link
            href="/team"
            className="inline-flex rounded-full border-[1.5px] border-[rgba(145,82,255,0.38)] px-6 py-3 text-sm font-semibold text-[#9152FF] transition hover:bg-[#9152FF] hover:text-white"
          >
            {isDe ? 'Gesamtes Teamverzeichnis' : 'Full team directory'}
          </Link>
        </div>
      </div>
    </section>
  );
}
