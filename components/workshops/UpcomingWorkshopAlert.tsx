'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { CalendarClock, Sparkles, X } from 'lucide-react';
import { getUpcomingWorkshopAlert } from '@/components/workshops/workshop-data';
import { useLanguage } from '@/lib/hooks/useLanguage';

const STORAGE_KEY = 'bb-upcoming-workshop-alert-dismissed';

type UpcomingWorkshopAlertProps = {
  className?: string;
  href?: string;
};

export function UpcomingWorkshopAlert({ className = '', href = '/workshops' }: UpcomingWorkshopAlertProps) {
  const { lang } = useLanguage();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    try {
      if (sessionStorage.getItem(STORAGE_KEY) === '1') return;
    } catch {
      /* private mode */
    }
    setOpen(true);
  }, []);

  const dismiss = () => {
    try {
      sessionStorage.setItem(STORAGE_KEY, '1');
    } catch {
      /* ignore */
    }
    setOpen(false);
  };

  if (!open) return null;

  const copy = getUpcomingWorkshopAlert(lang);

  return (
    <div
      role="status"
      aria-live="polite"
      className={`group relative cursor-default overflow-hidden rounded-[20px] border border-[rgba(145,82,255,0.28)] bg-gradient-to-r from-[#F7F2FF] via-white to-[#F0E8FF] px-4 py-4 shadow-[0_8px_28px_rgba(145,82,255,0.14)] transition-[transform,box-shadow,border-color] duration-300 ease-out hover:-translate-y-1 hover:border-[rgba(145,82,255,0.5)] hover:shadow-[0_14px_42px_rgba(145,82,255,0.22)] motion-reduce:transition-none motion-reduce:hover:translate-y-0 sm:px-5 sm:py-4 ${className}`}
    >
      <div className="pointer-events-none absolute -left-8 bottom-0 h-20 w-20 rounded-full bg-[#6BAA8A]/0 blur-2xl transition-all duration-500 group-hover:bg-[#6BAA8A]/15 motion-reduce:transition-none" />
      <div className="pointer-events-none absolute -right-6 -top-6 h-24 w-24 rounded-full bg-[#9152FF]/10 blur-2xl transition-all duration-500 group-hover:scale-125 group-hover:bg-[#9152FF]/20 motion-reduce:transition-none motion-reduce:group-hover:scale-100" />
      <div className="relative flex flex-wrap items-start gap-3 sm:gap-4">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#9152FF] text-white shadow-[0_4px_14px_rgba(145,82,255,0.35)] transition-[transform,box-shadow] duration-300 group-hover:scale-110 group-hover:shadow-[0_6px_22px_rgba(145,82,255,0.45)] motion-reduce:transition-none motion-reduce:group-hover:scale-100">
          <CalendarClock className="h-5 w-5 transition-transform duration-300 group-hover:-rotate-6 motion-reduce:transition-none motion-reduce:group-hover:rotate-0" aria-hidden />
        </div>

        <div className="min-w-0 flex-1 pr-8 sm:pr-10">
          <p className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1 rounded-full bg-[#9152FF] px-2.5 py-0.5 text-[0.66rem] font-bold uppercase tracking-[0.1em] text-white transition-[transform,box-shadow] duration-300 group-hover:scale-105 group-hover:shadow-[0_2px_12px_rgba(145,82,255,0.4)] motion-reduce:transition-none motion-reduce:group-hover:scale-100">
              <Sparkles className="h-3 w-3 transition-transform duration-500 group-hover:rotate-12 motion-reduce:transition-none motion-reduce:group-hover:rotate-0" aria-hidden />
              {copy.badge}
            </span>
            <span className="text-[0.72rem] font-semibold uppercase tracking-[0.08em] text-[#7339E0]">
              {copy.headline}
            </span>
          </p>
          <p className="mt-1.5 font-lora text-[1.05rem] font-bold leading-snug text-[#1A1033] sm:text-[1.12rem]">
            {copy.title}
          </p>
          <p className="mt-1 text-[0.84rem] font-semibold text-[#7339E0]">{copy.dateLine}</p>
          <p className="mt-0.5 text-[0.8rem] leading-relaxed text-[#6B5F8A]">{copy.location}</p>
          <Link
            href={href}
            className="mt-3 inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-[#9152FF] to-[#7339E0] px-4 py-2 text-[0.82rem] font-bold text-white shadow-[0_4px_14px_rgba(145,82,255,0.33)] transition-[transform,box-shadow,filter] duration-300 hover:-translate-y-0.5 hover:brightness-[1.06] hover:shadow-[0_6px_20px_rgba(145,82,255,0.45)] motion-reduce:transition-none motion-reduce:hover:translate-y-0"
          >
            {copy.cta}
            <span className="inline-block transition-transform duration-300 group-hover:translate-x-0.5" aria-hidden>
              →
            </span>
          </Link>
        </div>

        <button
          type="button"
          onClick={dismiss}
          className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full border border-[rgba(145,82,255,0.15)] bg-white/90 text-[#6B5F8A] transition hover:border-[#9152FF] hover:bg-[#F5F0FF] hover:text-[#9152FF]"
          aria-label={copy.dismissLabel}
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
