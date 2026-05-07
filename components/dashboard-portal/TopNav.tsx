'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { signOut } from 'next-auth/react';

type RoleLabel = 'Mentee' | 'Mentor' | 'Admin';

function NavDrop({
  label,
  href,
  children,
}: {
  label: string;
  href: string;
  children: React.ReactNode;
}) {
  return (
    <li className="relative group">
      <Link
        href={href}
        className="flex items-center gap-1 rounded-lg px-2.5 py-1.5 text-[0.8rem] font-medium text-[#6B5F8A] transition-colors hover:bg-[#F5F0FF] hover:text-[#9152FF] lg:px-3"
      >
        {label}
        <ChevronDown className="h-3 w-3 shrink-0 opacity-40 transition-transform group-hover:rotate-180 group-hover:opacity-[0.65]" />
      </Link>
      <div
        className={cn(
          'pointer-events-none absolute left-1/2 top-[calc(100%-1px)] z-[1001] min-w-[200px] -translate-x-1/2 rounded-[14px] border border-[rgba(145,82,255,0.15)] bg-white p-1.5 opacity-0 shadow-lg transition',
          'group-hover:pointer-events-auto group-hover:opacity-100'
        )}
      >
        {children}
      </div>
    </li>
  );
}

function NavDropLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="block rounded-lg px-4 py-2 text-[0.8rem] font-medium text-[#6B5F8A] transition hover:bg-[#F5F0FF] hover:text-[#9152FF]"
    >
      {children}
    </Link>
  );
}

export type TopNavProps = {
  userName: string;
  roleLabel: RoleLabel;
  onMenuClick: () => void;
  /** Primary dashboard route (defaults to mentor/mentee portal) */
  dashboardHref?: string;
};

export function TopNav({
  userName,
  roleLabel,
  onMenuClick,
  dashboardHref = '/portal',
}: TopNavProps) {
  const [lang, setLang] = useState<'en' | 'de'>('en');

  useEffect(() => {
    try {
      const v = localStorage.getItem('bb_lang_v1');
      if (v === 'de' || v === 'en') setLang(v);
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('bb_lang_v1', lang);
    } catch {
      /* ignore */
    }
    window.dispatchEvent(new CustomEvent('bb-lang-change', { detail: lang }));
  }, [lang]);

  const initials = userName
    .split(/\s+/)
    .map((w) => w[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  return (
    <header className="fixed left-0 right-0 top-0 z-[1000] border-b border-[rgba(145,82,255,0.15)] bg-[rgba(255,255,255,0.97)] shadow-[0_1px_20px_rgba(145,82,255,0.06)] backdrop-blur-xl">
      <nav className="mx-auto flex h-[70px] max-w-[1440px] items-center gap-3 px-4 sm:px-6 lg:gap-5">
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

        <ul className="mx-auto hidden list-none items-center justify-center gap-0 lg:flex">
          <li>
            <Link
              href="/#home"
              className="rounded-lg px-3 py-1.5 text-[0.8rem] font-medium text-[#6B5F8A] transition hover:bg-[#F5F0FF] hover:text-[#9152FF]"
            >
              Home
            </Link>
          </li>
          <NavDrop label="About" href="/#about">
            <NavDropLink href="/#about">About the Project</NavDropLink>
            <NavDropLink href="/#about">Vision &amp; Goals</NavDropLink>
            <NavDropLink href="/#team">Team &amp; Partners</NavDropLink>
          </NavDrop>
          <NavDrop label="Program" href="/#program">
            <NavDropLink href="/#events">Workshops &amp; Events</NavDropLink>
            <NavDropLink href="/#events">Research Activities</NavDropLink>
            <NavDropLink href="/#events">Project Progress</NavDropLink>
          </NavDrop>
          <NavDrop label="Platform" href="/#knowledge">
            <NavDropLink href="/#knowledge">Knowledge &amp; Resources</NavDropLink>
            <NavDropLink href="/story-tool">Story Creation Tool</NavDropLink>
            <NavDropLink href="/story-tool">Digital Toolkit</NavDropLink>
          </NavDrop>
          <li>
            <Link
              href="/#partners"
              className="rounded-lg px-3 py-1.5 text-[0.8rem] font-medium text-[#6B5F8A] transition hover:bg-[#F5F0FF] hover:text-[#9152FF]"
            >
              Partners
            </Link>
          </li>
        </ul>

        <div className="ml-auto flex shrink-0 items-center gap-1.5 sm:gap-2">
          <div className="hidden items-center gap-0.5 rounded-full border border-[rgba(145,82,255,0.15)] bg-[#F5F0FF] p-0.5 sm:flex">
            <button
              type="button"
              onClick={() => setLang('en')}
              className={cn(
                'rounded-full px-2.5 py-0.5 font-primary text-[0.68rem] font-bold transition md:text-xs',
                lang === 'en' ? 'bg-[#9152FF] text-white' : 'text-[#6B5F8A]'
              )}
            >
              EN
            </button>
            <button
              type="button"
              onClick={() => setLang('de')}
              className={cn(
                'rounded-full px-2.5 py-0.5 font-primary text-[0.68rem] font-bold transition md:text-xs',
                lang === 'de' ? 'bg-[#9152FF] text-white' : 'text-[#6B5F8A]'
              )}
            >
              DE
            </button>
          </div>
          <div className="hidden h-5 w-px bg-[rgba(145,82,255,0.15)] md:block" aria-hidden />

          <Link
            href="/contact"
            className="hidden whitespace-nowrap rounded-full border-[1.5px] border-[rgba(145,82,255,0.38)] px-3 py-1.5 text-[0.75rem] font-semibold text-[#9152FF] transition hover:border-[#9152FF] hover:bg-[#9152FF] hover:text-white lg:inline-flex"
          >
            Contact
          </Link>

          <Link
            href={dashboardHref}
            className={cn(
              'whitespace-nowrap rounded-full px-3 py-1.5 text-[0.75rem] font-semibold shadow-md transition sm:px-4 sm:text-[0.82rem]',
              'bg-[#9152FF] text-white shadow-[0_3px_12px_rgba(145,82,255,0.35)] hover:-translate-y-px hover:bg-[#7339E0]'
            )}
          >
            Dashboard
          </Link>

          <div className="flex items-center gap-2 pl-1">
            <span
              className={cn(
                'hidden rounded-full border px-2.5 py-0.5 text-[0.65rem] font-bold uppercase tracking-wide sm:inline-block',
                roleLabel === 'Admin'
                  ? 'border-orange-300/70 bg-orange-50 text-orange-900'
                  : 'border-[rgba(145,82,255,0.2)] bg-[#F5F0FF] text-[#7339E0]'
              )}
            >
              {roleLabel}
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
              <DropdownMenuContent className="w-56" align="end">
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium">{userName}</p>
                    <p className="text-muted-foreground text-xs">{roleLabel}</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <Link href={dashboardHref} className="block">
                    <DropdownMenuItem className="cursor-pointer">My dashboard</DropdownMenuItem>
                  </Link>
                  <Link href="/dashboard/general" className="block">
                    <DropdownMenuItem className="cursor-pointer">Account settings</DropdownMenuItem>
                  </Link>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="cursor-pointer"
                  onClick={async () => {
                    await signOut({ callbackUrl: '/' });
                  }}
                >
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </nav>
    </header>
  );
}
