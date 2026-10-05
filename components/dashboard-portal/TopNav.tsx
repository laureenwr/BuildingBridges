'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Menu } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { signOut } from 'next-auth/react';
import { setStoredLanguage } from '@/lib/i18n/language';
import { useLanguage } from '@/lib/hooks/useLanguage';

type RoleLabel = 'Mentee' | 'Mentor' | 'Admin';

export type TopNavProps = {
  userName: string;
  roleLabel: RoleLabel;
  onMenuClick: () => void;
};

export function TopNav({
  userName,
  roleLabel,
  onMenuClick,
}: TopNavProps) {
  const { lang, isDe } = useLanguage();
  const isAdmin = roleLabel === 'Admin';

  const initials = userName
    .split(/\s+/)
    .map((w) => w[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  return (
    <header className="fixed left-0 right-0 top-0 z-[1000] border-b border-[rgba(145,82,255,0.15)] bg-[rgba(255,255,255,0.97)] shadow-[0_1px_20px_rgba(145,82,255,0.06)] backdrop-blur-xl">
      <nav className="mx-auto flex h-[70px] max-w-[1440px] items-center gap-3 px-4 sm:px-6">
        <button
          type="button"
          className="flex rounded-lg p-2 text-[#1A1033] hover:bg-[#F5F0FF] lg:hidden"
          aria-label="Open sidebar"
          onClick={onMenuClick}
        >
          <Menu className="h-6 w-6" />
        </button>

        <Link href="/" className="flex shrink-0 items-center gap-2.5 whitespace-nowrap no-underline">
          <Image
            src="/logo_round.svg"
            alt="Building Bridges"
            width={36}
            height={36}
            className="h-9 w-9 rounded-full object-cover"
          />
          <span className="font-lora text-[1.15rem] font-bold tracking-tight text-[#1A1033] sm:text-[1.2rem]">
            Building<span className="text-[#9152FF]">Bridges</span>
          </span>
        </Link>

        <div className="ml-auto flex shrink-0 items-center gap-1.5 sm:gap-2">
          <div className="hidden items-center gap-0.5 rounded-full border border-[rgba(145,82,255,0.15)] bg-[#F5F0FF] p-0.5 sm:flex">
            <button
              type="button"
              onClick={() => setStoredLanguage('en')}
              className={cn(
                'rounded-full px-2.5 py-0.5 font-primary text-[0.68rem] font-bold transition md:text-xs',
                lang === 'en' ? 'bg-[#9152FF] text-white' : 'text-[#6B5F8A]'
              )}
            >
              EN
            </button>
            <button
              type="button"
              onClick={() => setStoredLanguage('de')}
              className={cn(
                'rounded-full px-2.5 py-0.5 font-primary text-[0.68rem] font-bold transition md:text-xs',
                lang === 'de' ? 'bg-[#9152FF] text-white' : 'text-[#6B5F8A]'
              )}
            >
              DE
            </button>
          </div>

          <div className="flex items-center gap-2 pl-1">
            <span
              className={cn(
                'hidden rounded-full border px-2.5 py-0.5 text-[0.65rem] font-bold uppercase tracking-wide sm:inline-block',
                isAdmin
                  ? 'border-orange-300/70 bg-orange-50 text-orange-900'
                  : 'border-[rgba(145,82,255,0.2)] bg-[#F5F0FF] text-[#7339E0]'
              )}
            >
              {isAdmin ? 'Admin' : roleLabel === 'Mentor' ? (isDe ? 'Mentor:in' : 'Mentor') : isDe ? 'Mentee' : 'Mentee'}
            </span>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  type="button"
                  className="rounded-full ring-2 ring-[rgba(145,82,255,0.2)] ring-offset-2 ring-offset-white transition hover:ring-[#9152FF]"
                  aria-label={`${userName} menu`}
                >
                  <Avatar className="h-9 w-9">
                    <AvatarFallback className="bg-gradient-to-br from-[#9152FF] to-[#7339E0] text-[0.75rem] font-bold text-white">
                      {initials}
                    </AvatarFallback>
                  </Avatar>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-56"
                align="end"
                side="bottom"
                sideOffset={12}
                avoidCollisions={false}
              >
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium">{userName}</p>
                    <p className="text-muted-foreground text-xs">
                      {isAdmin ? 'Admin' : roleLabel === 'Mentor' ? (isDe ? 'Mentor:in' : 'Mentor') : isDe ? 'Mentee' : 'Mentee'}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="cursor-pointer"
                  onClick={async () => {
                    await signOut({ callbackUrl: '/' });
                  }}
                >
                  {isDe ? 'Abmelden' : 'Log out'}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </nav>
    </header>
  );
}
