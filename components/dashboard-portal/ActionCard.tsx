import Link from 'next/link';
import { cn } from '@/lib/utils';
import { ArrowRight } from 'lucide-react';

export type ActionCardProps = {
  title: string;
  description: string;
  actionLabel: string;
  /** If set, renders a link styled as the primary gradient control */
  href?: string;
  /** Used when href is omitted */
  onAction?: () => void;
  /** Soft accent behind icon area */
  accent?: 'purple' | 'green' | 'orange';
  disabled?: boolean;
  className?: string;
};

const accentMap = {
  purple: 'from-[#9152FF]/15 to-[#7339E0]/10 text-[#7339E0]',
  green: 'from-emerald-400/15 to-teal-400/10 text-emerald-700',
  orange: 'from-amber-400/20 to-orange-300/10 text-amber-800',
} as const;

export function ActionCard({
  title,
  description,
  actionLabel,
  href,
  onAction,
  accent = 'purple',
  disabled,
  className,
}: ActionCardProps) {
  const buttonClass = cn(
    'inline-flex items-center gap-2 rounded-full px-4 py-2 text-[0.82rem] font-semibold transition',
    disabled
      ? 'cursor-not-allowed bg-[#E8E0F7] text-[#9A8CB3]'
      : 'bg-gradient-to-r from-[#9152FF] to-[#7339E0] text-white shadow-[0_4px_16px_rgba(145,82,255,0.35)] hover:brightness-105 active:scale-[0.99]'
  );

  const safeHref = disabled ? undefined : href;
  const control = safeHref ? (
    <Link href={safeHref} className={buttonClass}>
      {actionLabel}
      <ArrowRight className="h-4 w-4 opacity-90" aria-hidden />
    </Link>
  ) : (
    <button type="button" className={buttonClass} onClick={onAction} disabled={disabled}>
      {actionLabel}
      <ArrowRight className="h-4 w-4 opacity-90" aria-hidden />
    </button>
  );

  return (
    <div
      className={cn(
        'flex h-full flex-col rounded-2xl border border-[rgba(145,82,255,0.1)] bg-white p-6 shadow-[0_10px_36px_rgba(145,82,255,0.09)]',
        className
      )}
    >
      <div
        className={cn(
          'mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br',
          accentMap[accent]
        )}
        aria-hidden
      >
        <span className="text-lg font-bold">✦</span>
      </div>
      <h3 className="font-lora text-lg font-semibold text-[#1A1033]">{title}</h3>
      <p className="mt-2 flex-1 text-[0.92rem] leading-relaxed text-[#5C5275]">{description}</p>
      <div className="mt-5">{control}</div>
    </div>
  );
}
