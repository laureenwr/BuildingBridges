'use client';

import Link from 'next/link';
import { cn } from '@/lib/utils';

const buttonClass = (compact: boolean) =>
  cn(
    'inline-flex items-center whitespace-nowrap rounded-full bg-[#9152FF] font-semibold text-white shadow-[0_3px_12px_rgba(145,82,255,0.35)] transition hover:-translate-y-px hover:bg-[#7339E0] hover:shadow-[0_6px_20px_rgba(145,82,255,0.45)]',
    compact ? 'px-3 py-1.5 text-[0.75rem]' : 'px-4 py-2 text-[0.82rem]'
  );

export function DashboardMenuButton({
  compact = false,
  showAdmin = false,
  homeHref = '/portal',
}: {
  compact?: boolean;
  showAdmin?: boolean;
  homeHref?: string;
}) {
  const href = showAdmin ? '/portal/admin' : homeHref;
  const label = showAdmin ? 'Admin' : 'Portal';

  return (
    <Link href={href} className={buttonClass(compact)}>
      {label}
    </Link>
  );
}
