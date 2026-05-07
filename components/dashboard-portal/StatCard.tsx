import { cn } from '@/lib/utils';

export type StatCardProps = {
  title: string;
  value: string | number;
  hint?: string;
  className?: string;
};

export function StatCard({ title, value, hint, className }: StatCardProps) {
  return (
    <div
      className={cn(
        'rounded-2xl border border-[rgba(145,82,255,0.12)] bg-white p-5 shadow-[0_8px_30px_rgba(145,82,255,0.08)]',
        className
      )}
    >
      <p className="text-[0.8rem] font-semibold text-[#6B5F8A]">{title}</p>
      <p className="mt-2 font-lora text-[1.75rem] font-bold tracking-tight text-[#1A1033]">{value}</p>
      {hint ? <p className="mt-1 text-[0.78rem] leading-snug text-[#9A8CB3]">{hint}</p> : null}
    </div>
  );
}
