'use client';

import { useId } from 'react';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

export type ProgressCardProps = {
  percent: number;
  items: { id: string; label: string; done: boolean }[];
  onContinue?: () => void;
  className?: string;
};

export function ProgressCard({ percent, items, onContinue, className }: ProgressCardProps) {
  const gid = useId().replace(/:/g, '');
  const gradId = `bb-progress-gradient-${gid}`;
  const safe = Math.min(100, Math.max(0, percent));
  const circumference = 2 * Math.PI * 44;
  const offset = circumference - (safe / 100) * circumference;

  return (
    <div
      className={cn(
        'rounded-2xl border border-[rgba(145,82,255,0.12)] bg-white p-6 shadow-[0_10px_36px_rgba(145,82,255,0.09)]',
        className
      )}
    >
      <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
        <div className="relative mx-auto flex h-32 w-32 shrink-0 items-center justify-center sm:mx-0">
          <svg className="h-full w-full -rotate-90" viewBox="0 0 100 100" aria-hidden>
            <circle
              cx="50"
              cy="50"
              r="44"
              fill="none"
              stroke="#F0E8FF"
              strokeWidth="10"
            />
            <circle
              cx="50"
              cy="50"
              r="44"
              fill="none"
              stroke="url(#bb-progress-gradient)"
              strokeWidth="10"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={offset}
              className="transition-[stroke-dashoffset] duration-500"
            />
            <defs>
              <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#9152FF" />
                <stop offset="100%" stopColor="#5FD4A8" />
              </linearGradient>
            </defs>
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="font-lora text-2xl font-bold text-[#1A1033]">{safe}%</span>
            <span className="text-[0.7rem] font-semibold uppercase tracking-wide text-[#9A8CB3]">
              Journey
            </span>
          </div>
        </div>

        <div className="min-w-0 flex-1">
          <h3 className="font-lora text-lg font-semibold text-[#1A1033]">Your progress</h3>
          <p className="mt-1 text-[0.9rem] text-[#6B5F8A]">Complete each gentle step when you feel ready.</p>
          <ul className="mt-4 space-y-2">
            {items.map((item) => (
              <li
                key={item.id}
                className={cn(
                  'flex items-start gap-2 rounded-xl border px-3 py-2 text-[0.88rem]',
                  item.done
                    ? 'border-emerald-200/80 bg-emerald-50/80 text-emerald-900'
                    : 'border-[rgba(145,82,255,0.14)] bg-[#FAF8FF] text-[#4B4266]'
                )}
              >
                <span
                  className={cn(
                    'mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border',
                    item.done ? 'border-emerald-400 bg-emerald-500 text-white' : 'border-[#D6CFFB] bg-white text-transparent'
                  )}
                  aria-hidden
                >
                  <Check className="h-3 w-3" />
                </span>
                <span>{item.label}</span>
              </li>
            ))}
          </ul>
          <div className="mt-5 flex flex-wrap gap-3">
            <Button
              type="button"
              className="rounded-full bg-gradient-to-r from-[#9152FF] to-[#7339E0] px-6 text-white shadow-[0_4px_16px_rgba(145,82,255,0.35)] hover:brightness-105"
              onClick={() => onContinue?.()}
            >
              Continue
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
