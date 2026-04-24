'use client';

import { useState, useEffect } from 'react';
import { Menu, X, User, Settings, LogOut, ChevronDown } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useUser } from '@/lib/auth/index';
import { motion, AnimatePresence } from 'framer-motion';
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
import { cn } from '@/lib/utils';

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
        className="flex items-center gap-1 rounded-lg px-3 py-1.5 text-[0.835rem] font-medium text-[#6B5F8A] transition-colors hover:bg-[#F5F0FF] hover:text-[#9152FF]"
      >
        {label}
        <ChevronDown className="h-3 w-3 shrink-0 opacity-40 transition-transform group-hover:rotate-180 group-hover:opacity-[0.65]" />
      </Link>
      <div
        className={cn(
          'pointer-events-none absolute left-1/2 top-full z-[999] mt-2 min-w-[215px] -translate-x-1/2 rounded-[14px] border border-[rgba(145,82,255,0.15)] bg-white p-1.5 opacity-0 shadow-lg transition',
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
      className="block rounded-lg px-4 py-2 text-[0.835rem] font-medium text-[#6B5F8A] transition hover:bg-[#F5F0FF] hover:text-[#9152FF]"
    >
      {children}
    </Link>
  );
}

export function Navbar() {
  const { user } = useUser();
  const [mobileOpen, setMobileOpen] = useState(false);
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
    document.documentElement.lang = lang;
    try {
      localStorage.setItem('bb_lang_v1', lang);
    } catch {
      /* ignore */
    }
    window.dispatchEvent(new CustomEvent('bb-lang-change', { detail: lang }));
  }, [lang]);

  return (
    <header className="fixed left-0 right-0 top-0 z-[9999] border-b border-[rgba(145,82,255,0.15)] bg-[rgba(255,255,255,0.97)] shadow-[0_1px_20px_rgba(145,82,255,0.06)] backdrop-blur-xl">
      <nav className="mx-auto grid h-[70px] max-w-[1280px] grid-cols-[1fr_auto] items-center gap-4 px-6 md:grid-cols-[auto_1fr_auto] lg:gap-6">
        <Link href="/" className="flex shrink-0 items-center gap-2.5 whitespace-nowrap no-underline">
          <Image
            src="/logo_round.svg"
            alt="Building Bridges"
            width={36}
            height={36}
            className="h-9 w-9 rounded-full object-cover"
          />
          <span className="font-lora text-[1.2rem] font-bold tracking-tight text-[#1A1033]">
            Building<span className="text-[#9152FF]">Bridges</span>
          </span>
        </Link>

        <ul className="hidden list-none items-center justify-center gap-0 md:flex">
          <li>
            <Link
              href="/#home"
              className="rounded-lg px-3 py-1.5 text-[0.835rem] font-medium text-[#6B5F8A] transition hover:bg-[#F5F0FF] hover:text-[#9152FF]"
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
              className="rounded-lg px-3 py-1.5 text-[0.835rem] font-medium text-[#6B5F8A] transition hover:bg-[#F5F0FF] hover:text-[#9152FF]"
            >
              Partners
            </Link>
          </li>
        </ul>

        <div className="hidden items-center gap-2 md:flex md:shrink-0">
          <div className="flex items-center gap-0.5 rounded-full border border-[rgba(145,82,255,0.15)] bg-[#F5F0FF] p-0.5">
            <button
              type="button"
              onClick={() => setLang('en')}
              className={cn(
                'rounded-full px-2.5 py-0.5 font-primary text-xs font-bold transition',
                lang === 'en' ? 'bg-[#9152FF] text-white' : 'text-[#6B5F8A]'
              )}
            >
              EN
            </button>
            <button
              type="button"
              onClick={() => setLang('de')}
              className={cn(
                'rounded-full px-2.5 py-0.5 font-primary text-xs font-bold transition',
                lang === 'de' ? 'bg-[#9152FF] text-white' : 'text-[#6B5F8A]'
              )}
            >
              DE
            </button>
          </div>
          <div className="mx-0.5 h-5 w-px bg-[rgba(145,82,255,0.15)]" aria-hidden />

          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  type="button"
                  className="rounded-full bg-[#9152FF] px-4 py-2 text-[0.82rem] font-semibold text-white shadow-md transition hover:bg-[#7339E0]"
                >
                  Dashboard
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <Link href="/dashboard" className="block">
                    <DropdownMenuItem className="cursor-pointer">
                      <User className="mr-2 h-4 w-4" />
                      <span>Dashboard</span>
                    </DropdownMenuItem>
                  </Link>
                  <Link href="/dashboard/general" className="block">
                    <DropdownMenuItem className="cursor-pointer">
                      <Settings className="mr-2 h-4 w-4" />
                      <span>Settings</span>
                    </DropdownMenuItem>
                  </Link>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="cursor-pointer"
                  onClick={async () => {
                    await signOut({ callbackUrl: '/' });
                  }}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Link
                href="/contact"
                className="whitespace-nowrap rounded-full border-[1.5px] border-[rgba(145,82,255,0.38)] px-4 py-2 text-[0.82rem] font-semibold text-[#9152FF] transition hover:border-[#9152FF] hover:bg-[#9152FF] hover:text-white"
              >
                Contact
              </Link>
              <Link
                href="/sign-up"
                className="whitespace-nowrap rounded-full bg-[#9152FF] px-4 py-2 text-[0.82rem] font-semibold text-white shadow-[0_3px_12px_rgba(145,82,255,0.35)] transition hover:-translate-y-px hover:bg-[#7339E0] hover:shadow-[0_6px_20px_rgba(145,82,255,0.45)]"
              >
                Register →
              </Link>
            </>
          )}
        </div>

        <button
          type="button"
          className="flex flex-col justify-center gap-1.5 rounded-lg p-1.5 md:hidden"
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X className="h-6 w-6 text-[#1A1033]" /> : <Menu className="h-6 w-6 text-[#1A1033]" />}
        </button>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="fixed left-0 right-0 top-[70px] z-[9998] flex flex-col gap-0.5 overflow-hidden border-b border-[rgba(145,82,255,0.15)] bg-white px-4 py-4 shadow-lg md:hidden"
          >
            {[
              ['Home', '/#home'],
              ['About the Project', '/#about'],
              ['Team', '/#team'],
              ['Program & Goals', '/#program'],
              ['Knowledge Platform', '/#knowledge'],
              ['Story Creation Tool', '/story-tool'],
              ['Workshops & Events', '/#events'],
              ['Partners', '/#partners'],
              ['Contact', '/contact'],
            ].map(([label, href]) => (
              <Link
                key={href + label}
                href={href}
                className="block rounded-lg px-3 py-2.5 text-[0.95rem] font-medium text-[#6B5F8A] hover:bg-[#F5F0FF] hover:text-[#9152FF]"
                onClick={() => setMobileOpen(false)}
              >
                {label}
              </Link>
            ))}
            <Link
              href="/sign-up"
              className="mt-3 rounded-full bg-[#9152FF] py-3 text-center text-[0.95rem] font-semibold text-white shadow-md"
              onClick={() => setMobileOpen(false)}
            >
              Register Now →
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
