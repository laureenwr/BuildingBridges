'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { useUser } from '@/lib/auth/index';
import { signOut } from 'next-auth/react';
import { useLandingLocale } from '@/lib/landing/locale';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';

function NavDrop({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <li className="relative group">
      <span className="flex cursor-default items-center gap-1 rounded-lg px-[0.82rem] py-[0.45rem] text-[0.835rem] font-medium text-[#6B5F8A] transition-colors group-hover:bg-[#F5F0FF] group-hover:text-[#9152FF]">
        {label}
        <span className="ml-0.5 text-[0.55rem] opacity-40 transition group-hover:rotate-180 group-hover:opacity-[0.65]" aria-hidden>
          ▼
        </span>
      </span>
      <div className="invisible absolute left-1/2 top-[calc(100%+8px)] z-[999] min-w-[215px] -translate-x-1/2 rounded-[14px] border border-[rgba(145,82,255,0.15)] bg-white p-1 opacity-0 shadow-[0_8px_30px_rgba(145,82,255,0.13)] transition-all group-hover:visible group-hover:opacity-100">
        {children}
      </div>
    </li>
  );
}

function NavDropLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="block rounded-lg px-4 py-[0.55rem] text-[0.835rem] font-medium text-[#6B5F8A] transition-colors hover:bg-[#F5F0FF] hover:text-[#9152FF]"
    >
      {children}
    </Link>
  );
}

export function LandingNav() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { user } = useUser();
  const { locale, setLocale, t } = useLandingLocale();

  const L = {
    home: t('Home', 'Start'),
    about: t('About', 'Über uns'),
    aboutProject: t('About the Project', 'Über das Projekt'),
    vision: t('Vision & Goals', 'Vision & Ziele'),
    teamPartners: t('Team & Partners', 'Team & Partner'),
    program: t('Program', 'Programm'),
    workshops: t('Workshops & Events', 'Workshops & Veranstaltungen'),
    researchAct: t('Research Activities', 'Forschungsaktivitäten'),
    progress: t('Project Timeline', 'Projektverlauf'),
    platform: t('Platform', 'Plattform'),
    knowledge: t('Knowledge & Resources', 'Wissen & Ressourcen'),
    storyTool: t('Story Creation Tool', 'Story-Tool'),
    toolkit: t('Digital Toolkit', 'Digitales Toolkit'),
    partners: t('Partners', 'Partner'),
    contact: t('Contact', 'Kontakt'),
    register: t('Register', 'Anmelden'),
    dashboard: t('Dashboard', 'Dashboard'),
    signIn: t('Sign In', 'Anmelden'),
    signOut: t('Log out', 'Abmelden'),
  };

  return (
    <nav className="fixed left-0 right-0 top-0 z-[9999] border-b border-[rgba(145,82,255,0.15)] bg-[rgba(255,255,255,0.97)] shadow-[0_1px_20px_rgba(145,82,255,0.06)] backdrop-blur-[20px]">
      <div className="mx-auto grid h-[70px] max-w-[1280px] grid-cols-[auto_1fr_auto] items-center gap-6 px-8 max-md:grid-cols-[1fr_auto] max-md:px-4">
        <Link href="/#home" className="flex shrink-0 items-center gap-2 whitespace-nowrap font-[family-name:var(--font-lora)] text-[1.2rem] font-bold tracking-tight text-[#1A1033] no-underline">
          <Image src="/logo_round.svg" alt="" width={36} height={36} className="h-9 w-9 rounded-full object-cover" />
          Building<span className="text-[#9152FF]">Bridges</span>
        </Link>

        <ul className="mx-auto hidden list-none flex-row items-center justify-center gap-0 lg:flex">
          <li>
            <Link
              href="/#home"
              className="flex items-center gap-1 rounded-lg px-[0.82rem] py-[0.45rem] text-[0.835rem] font-medium text-[#6B5F8A] transition-colors hover:bg-[#F5F0FF] hover:text-[#9152FF]"
            >
              {L.home}
            </Link>
          </li>
          <NavDrop label={L.about}>
            <NavDropLink href="/#about">{L.aboutProject}</NavDropLink>
            <NavDropLink href="/#about">{L.vision}</NavDropLink>
            <NavDropLink href="/#team">{L.teamPartners}</NavDropLink>
          </NavDrop>
          <NavDrop label={L.program}>
            <NavDropLink href="/workshops">{L.workshops}</NavDropLink>
            <NavDropLink href="/workshops#research-activities">{L.researchAct}</NavDropLink>
            <NavDropLink href="/workshops#project-timeline">{L.progress}</NavDropLink>
          </NavDrop>
          <NavDrop label={L.platform}>
            <NavDropLink href="/#knowledge">{L.knowledge}</NavDropLink>
            <NavDropLink href="/#storytelling">{L.storyTool}</NavDropLink>
            <NavDropLink href="/#storytelling">{L.toolkit}</NavDropLink>
          </NavDrop>
          <li>
            <Link
              href="/#partners"
              className="flex items-center gap-1 rounded-lg px-[0.82rem] py-[0.45rem] text-[0.835rem] font-medium text-[#6B5F8A] transition-colors hover:bg-[#F5F0FF] hover:text-[#9152FF]"
            >
              {L.partners}
            </Link>
          </li>
        </ul>

        <div className="hidden shrink-0 items-center gap-2 md:flex">
          <div className="flex items-center gap-0.5 rounded-full border border-[rgba(145,82,255,0.15)] bg-[#F5F0FF] p-[3px]">
            <button
              type="button"
              onClick={() => setLocale('en')}
              className={`rounded-full px-2.5 py-1 font-[family-name:var(--font-sora)] text-xs font-bold leading-snug transition-colors ${
                locale === 'en' ? 'bg-[#9152FF] text-white' : 'bg-transparent text-[#6B5F8A]'
              }`}
            >
              EN
            </button>
            <button
              type="button"
              onClick={() => setLocale('de')}
              className={`rounded-full px-2.5 py-1 font-[family-name:var(--font-sora)] text-xs font-bold leading-snug transition-colors ${
                locale === 'de' ? 'bg-[#9152FF] text-white' : 'bg-transparent text-[#6B5F8A]'
              }`}
            >
              DE
            </button>
          </div>
          <div className="mx-0.5 h-5 w-px bg-[rgba(145,82,255,0.15)]" aria-hidden />
          <Link
            href="/contact"
            className="whitespace-nowrap rounded-full border-[1.5px] border-[rgba(145,82,255,0.38)] px-[1.05rem] py-[0.44rem] text-[0.82rem] font-semibold text-[#9152FF] transition-colors hover:border-[#9152FF] hover:bg-[#9152FF] hover:text-white"
          >
            {L.contact}
          </Link>
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="rounded-full border-[#9152FF]/40 text-[0.82rem]">
                  {L.dashboard}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-52">
                <DropdownMenuLabel>{user.email ?? 'Account'}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/dashboard">{L.dashboard}</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={async () => {
                    await signOut({ callbackUrl: '/' });
                  }}
                >
                  {L.signOut}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Link
                href="/sign-in"
                className="whitespace-nowrap rounded-full border-[1.5px] border-[rgba(145,82,255,0.38)] px-3 py-2 text-[0.82rem] font-semibold text-[#9152FF] transition-colors hover:bg-[#9152FF] hover:text-white"
              >
                {L.signIn}
              </Link>
              <Link
                href="/sign-up"
                className="whitespace-nowrap rounded-full bg-[#9152FF] px-[1.15rem] py-[0.48rem] text-[0.82rem] font-semibold text-white shadow-[0_3px_12px_rgba(145,82,255,0.35)] transition-all hover:-translate-y-px hover:bg-[#7339E0] hover:shadow-[0_6px_20px_rgba(145,82,255,0.45)]"
              >
                {L.register} →
              </Link>
            </>
          )}
        </div>

        <button
          type="button"
          className="flex flex-col gap-[5px] rounded-lg p-1.5 hover:bg-[#F5F0FF] lg:hidden"
          aria-expanded={mobileOpen}
          aria-label="Menu"
          onClick={() => setMobileOpen((o) => !o)}
        >
          <span className="block h-0.5 w-[22px] rounded-sm bg-[#1A1033]" />
          <span className="block h-0.5 w-[22px] rounded-sm bg-[#1A1033]" />
          <span className="block h-0.5 w-[22px] rounded-sm bg-[#1A1033]" />
        </button>
      </div>

      {mobileOpen ? (
        <div className="fixed left-0 right-0 top-[70px] z-[9998] flex flex-col gap-0.5 border-b border-[rgba(145,82,255,0.15)] bg-white px-6 py-4 pb-8 shadow-[0_6px_28px_rgba(145,82,255,0.13)] lg:hidden">
          {[
            ['/#home', L.home],
            ['/#about', L.aboutProject],
            ['/#team', L.teamPartners],
            ['/workshops', L.workshops],
            ['/workshops#project-timeline', L.progress],
            ['/#knowledge', L.knowledge],
            ['/#storytelling', L.storyTool],
            ['/#partners', L.partners],
            ['/contact', L.contact],
          ].map(([href, label]) => (
            <Link
              key={href + label}
              href={href}
              className="block rounded-lg px-3 py-2.5 text-[0.95rem] font-medium text-[#6B5F8A] hover:bg-[#F5F0FF] hover:text-[#9152FF]"
              onClick={() => setMobileOpen(false)}
            >
              {label}
            </Link>
          ))}
          <div className="mt-3 flex gap-2">
            <button
              type="button"
              onClick={() => setLocale('en')}
              className={`rounded-full px-3 py-1 text-xs font-bold ${locale === 'en' ? 'bg-[#9152FF] text-white' : 'bg-[#F5F0FF]'}`}
            >
              EN
            </button>
            <button
              type="button"
              onClick={() => setLocale('de')}
              className={`rounded-full px-3 py-1 text-xs font-bold ${locale === 'de' ? 'bg-[#9152FF] text-white' : 'bg-[#F5F0FF]'}`}
            >
              DE
            </button>
          </div>
          <Link
            href="/sign-in"
            className="mt-2 block rounded-full border-[1.5px] border-[rgba(145,82,255,0.38)] py-3 text-center text-[0.95rem] font-semibold text-[#9152FF]"
            onClick={() => setMobileOpen(false)}
          >
            {L.signIn}
          </Link>
          <Link
            href="/sign-up"
            className="mt-3 block rounded-full bg-[#9152FF] py-3 text-center text-[0.95rem] font-semibold text-white shadow-[0_4px_14px_rgba(145,82,255,0.32)]"
            onClick={() => setMobileOpen(false)}
          >
            {L.register} →
          </Link>
        </div>
      ) : null}
    </nav>
  );
}
