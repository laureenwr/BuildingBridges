import Link from 'next/link';
import { cn } from '@/lib/utils';

export type StatCardProps = {
  title: string;
  value: string | number;
  hint?: string;
  href?: string;
  className?: string;
};

export function StatCard({ title, value, hint, href, className }: StatCardProps) {
  const card = (
    <div
      className={cn(
        'h-full rounded-2xl border border-[rgba(145,82,255,0.12)] bg-white p-5 shadow-[0_8px_30px_rgba(145,82,255,0.08)]',
        href && 'transition hover:-translate-y-0.5 hover:border-[rgba(145,82,255,0.28)] hover:shadow-[0_12px_32px_rgba(145,82,255,0.12)]',
        className
      )}
    >
      <p className="text-[0.8rem] font-semibold text-[#6B5F8A]">{title}</p>
      <p className="mt-2 font-lora text-[1.75rem] font-bold tracking-tight text-[#1A1033]">{value}</p>
      {hint ? <p className="mt-1 text-[0.78rem] leading-snug text-[#9A8CB3]">{hint}</p> : null}
    </div>
  );

  if (!href) return card;

  return (
    <Link href={href} className="block h-full no-underline">
      {card}
    </Link>
  );
}
