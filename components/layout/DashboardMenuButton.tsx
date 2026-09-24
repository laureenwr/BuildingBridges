'use client';

import { ChevronDown } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';

const ITEMS = [
  { href: '/portal', key: 'nav.mentorDashboard', fallback: 'Mentor dashboard' },
  { href: '/portal/admin', key: 'nav.adminDashboard', fallback: 'Admin dashboard' },
] as const;

export function DashboardMenuButton({ compact = false }: { compact?: boolean }) {
  const { t } = useTranslation('common');

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          className={cn(
            'group inline-flex items-center gap-1 whitespace-nowrap rounded-full bg-[#9152FF] font-semibold text-white shadow-[0_3px_12px_rgba(145,82,255,0.35)] transition hover:-translate-y-px hover:bg-[#7339E0] hover:shadow-[0_6px_20px_rgba(145,82,255,0.45)]',
            compact ? 'px-3 py-1.5 text-[0.75rem]' : 'px-4 py-2 text-[0.82rem]'
          )}
        >
          Dashboard
          <ChevronDown className="h-3 w-3 shrink-0 opacity-80 transition-transform group-data-[state=open]:rotate-180" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        side="bottom"
        sideOffset={12}
        avoidCollisions={false}
        className="z-[10050] min-w-[215px] rounded-[14px] border border-[rgba(145,82,255,0.15)] bg-white p-1.5 shadow-lg"
        aria-label={t('nav.chooseDashboard', { defaultValue: 'Choose dashboard' })}
      >
        {ITEMS.map((item) => (
          <DropdownMenuItem
            key={item.href}
            className="cursor-pointer rounded-lg px-4 py-2 text-[0.835rem] font-medium text-[#6B5F8A] focus:bg-[#F5F0FF] focus:text-[#9152FF] data-[highlighted]:bg-[#F5F0FF] data-[highlighted]:text-[#9152FF]"
            onSelect={() => {
              window.location.assign(item.href);
            }}
          >
            {t(item.key, { defaultValue: item.fallback })}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
