'use client';

import { useEffect, useState } from 'react';
import { Menu, X, User, Settings, LogOut } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useUser } from '@/lib/auth/index';
import { usePathname } from 'next/navigation';
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
import styles from './navbar.module.css';

type NavChildItem = {
  label: string;
  labelDe?: string;
  href: string;
};

type NavItem = {
  label: string;
  labelDe?: string;
  href: string;
  children?: NavChildItem[];
};

const defaultNavItems: NavItem[] = [
  { label: 'Veranstaltungen', href: '/workshops' },
  { label: 'Mentoren', href: '/mentors' },
  { label: 'Partner', href: '/partners' },
  { label: 'Über uns', href: '/team' },
  { label: 'Kontakt', href: '/contact' },
];

const landingNavItems: NavItem[] = [
  { label: 'Home', labelDe: 'Start', href: '#home' },
  {
    label: 'About',
    labelDe: 'Über',
    href: '#about',
    children: [
      { label: 'About the Project', labelDe: 'Über das Projekt', href: '#about' },
      { label: 'Vision & Goals', labelDe: 'Vision & Ziele', href: '#program' },
      { label: 'Team & Partners', labelDe: 'Team & Partner', href: '#team' },
    ],
  },
  {
    label: 'Program',
    labelDe: 'Programm',
    href: '#program',
    children: [
      { label: 'Workshops & Events', labelDe: 'Workshops & Events', href: '#events' },
      { label: 'Research Activities', labelDe: 'Forschungsaktivitäten', href: '#events' },
      { label: 'Project Progress', labelDe: 'Projektfortschritt', href: '#events' },
    ],
  },
  { label: 'Team', labelDe: 'Team', href: '#team' },
  {
    label: 'Platform',
    labelDe: 'Plattform',
    href: '#knowledge',
    children: [
      { label: 'Knowledge & Resources', labelDe: 'Wissen & Ressourcen', href: '#knowledge' },
      { label: 'Story Creation Tool', labelDe: 'Story-Creation-Tool', href: '#storytelling' },
      { label: 'Digital Toolkit', labelDe: 'Digitales Toolkit', href: '#storytelling' },
    ],
  },
  { label: 'Partners', labelDe: 'Partner', href: '#partners' },
];

type Lang = 'en' | 'de';

export function Navbar() {
  const pathname = usePathname();
  const isLandingPage = pathname === '/';
  const { user } = useUser();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [lang, setLang] = useState<Lang>('en');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('bb_lang_v1');
      if (saved === 'en' || saved === 'de') {
        setLang(saved);
      }
    } catch {
      // ignore storage errors
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
    try {
      localStorage.setItem('bb_lang_v1', lang);
    } catch {
      // ignore storage errors
    }
  }, [lang]);

  const navItems = isLandingPage ? landingNavItems : defaultNavItems;
  const t = (en: string, de?: string) => (lang === 'de' ? de ?? en : en);

  return (
    <>
      <header className={`${styles.navRoot} ${scrolled ? styles.scrolled : ''}`}>
        <nav className={styles.navInner}>
          <Link href="/" className={styles.logo}>
            <Image
              src="/logo_round.svg"
              alt="Building Bridges"
              width={36}
              height={36}
              className={styles.logoImg}
            />
            <span>
              Building<span className={styles.logoAccent}>Bridges</span>
            </span>
          </Link>

          <ul className={styles.navLinks}>
            {navItems.map((item) => (
              <li key={item.label} className={item.children && isLandingPage ? styles.navItemWithDropdown : undefined}>
                {isLandingPage ? (
                  <a href={item.href} className={item.children ? styles.dropdownTrigger : undefined}>
                    {t(item.label, item.labelDe)}
                    {item.children && <span className={styles.dropdownCaret} aria-hidden="true">▾</span>}
                  </a>
                ) : (
                  <Link href={item.href}>{item.label}</Link>
                )}

                {isLandingPage && item.children && (
                  <ul className={styles.dropdownMenu}>
                    {item.children.map((child) => (
                      <li key={`${item.label}-${child.label}`}>
                        <a href={child.href} className={styles.dropdownLink}>
                          {t(child.label, child.labelDe)}
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>

          <div className={styles.actions}>
            {isLandingPage && (
              <div className={styles.langSwitch}>
                <button
                  type="button"
                  className={`${styles.langBtn} ${lang === 'en' ? styles.langActive : ''}`}
                  onClick={() => setLang('en')}
                >
                  EN
                </button>
                <button
                  type="button"
                  className={`${styles.langBtn} ${lang === 'de' ? styles.langActive : ''}`}
                  onClick={() => setLang('de')}
                >
                  DE
                </button>
              </div>
            )}

            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className={styles.authButton}>Dashboard</button>
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
                {isLandingPage ? (
                  <>
                    <a href="#contact" className={styles.btnOutline}>
                      {t('Contact', 'Kontakt')}
                    </a>
                    <a href="#register" className={styles.btnFilled}>
                      {t('Register →', 'Anmelden →')}
                    </a>
                  </>
                ) : (
                  <>
                    <Link href="/sign-in" className={styles.btnOutline}>
                      Sign In
                    </Link>
                    <Link href="/sign-up" className={styles.btnFilled}>
                      Sign Up
                    </Link>
                  </>
                )}
              </>
            )}

            <button
              type="button"
              className={styles.hamburger}
              onClick={() => setIsOpen((prev) => !prev)}
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </nav>
      </header>

      {isOpen && (
        <div className={styles.mobileMenu}>
          {navItems.map((item) =>
            isLandingPage ? (
              <div key={item.label} className={styles.mobileItemGroup}>
                <a href={item.href} onClick={() => setIsOpen(false)}>
                  {t(item.label, item.labelDe)}
                </a>
                {item.children?.map((child) => (
                  <a
                    key={`${item.label}-${child.label}-mobile`}
                    href={child.href}
                    className={styles.mobileSubLink}
                    onClick={() => setIsOpen(false)}
                  >
                    {t(child.label, child.labelDe)}
                  </a>
                ))}
              </div>
            ) : (
              <Link key={item.label} href={item.href} onClick={() => setIsOpen(false)}>
                {item.label}
              </Link>
            ),
          )}

          {isLandingPage ? (
            <>
              <a href="#contact" onClick={() => setIsOpen(false)}>
                {t('Contact', 'Kontakt')}
              </a>
              <a href="#register" className={styles.mobileCta} onClick={() => setIsOpen(false)}>
                {t('Register Now →', 'Jetzt anmelden →')}
              </a>
            </>
          ) : (
            <>
              <Link href="/sign-in" onClick={() => setIsOpen(false)}>
                Sign In
              </Link>
              <Link href="/sign-up" className={styles.mobileCta} onClick={() => setIsOpen(false)}>
                Sign Up
              </Link>
            </>
          )}
        </div>
      )}
    </>
  );
}