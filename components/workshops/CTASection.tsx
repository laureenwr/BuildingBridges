'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export function CTASection() {
  return (
    <section className="mt-14">
      <div className="relative overflow-hidden rounded-[30px] border border-[rgba(145,82,255,0.16)] bg-[#F7F1FF] px-6 py-8 shadow-[0_10px_28px_rgba(145,82,255,0.1)] md:px-8">
        <div className="pointer-events-none absolute -right-8 top-0 h-32 w-32 rounded-full bg-gradient-to-br from-[#B794FF] to-transparent blur-2xl" />
        <div className="pointer-events-none absolute -left-10 bottom-0 h-28 w-28 rounded-full bg-gradient-to-br from-[#CFEBDD] to-transparent blur-2xl" />

        <div className="relative z-[1] flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
          <div>
            <p className="text-[0.72rem] font-bold uppercase tracking-[0.12em] text-[#7C58CC]">Community invitation</p>
            <h3 className="mt-1 font-lora text-2xl font-bold text-[#1A1033]">
              Want to participate in future workshops?
            </h3>
            <p className="mt-2 max-w-2xl text-[0.95rem] text-[#5E5677]">
              Join a warm learning community that centers empowerment, reflection, and collective growth.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              href="/sign-up"
              className="inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-[#9152FF] to-[#7339E0] px-4 py-2 text-sm font-semibold text-white shadow-[0_5px_16px_rgba(145,82,255,0.35)] transition hover:brightness-[1.04]"
            >
              Join community
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
            <Link
              href="/workshops"
              className="inline-flex items-center rounded-full border border-[#D7C3FF] bg-white px-4 py-2 text-sm font-semibold text-[#6C43C2] transition hover:border-[#9152FF] hover:text-[#5B33BB]"
            >
              Explore workshops
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
