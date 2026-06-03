'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  UserRound,
  PenLine,
  BookOpenCheck,
  MessageCircle,
  Users,
  CalendarDays,
  Library,
  Settings,
  Shield,
  UserPlus,
  UserCheck,
  UserX,
  FileSearch,
  Globe,
  X,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/lib/hooks/useLanguage';

type Variant = 'user' | 'admin';

export type SidebarProps = {
  variant: Variant;
  open: boolean;
  onClose: () => void;
  /** // TEMP: Dashboard preview mode (remove before production) — offset below development preview banner */
  developmentPreviewBanner?: boolean;
};

const userLinks: { href: string; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { href: '/portal', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/portal/profile', label: 'My Profile', icon: UserRound },
  { href: '/story-tool', label: 'Story Creation Tool', icon: PenLine },
  { href: '/portal/stories', label: 'My Stories', icon: BookOpenCheck },
  { href: '/portal/messages', label: 'Messages', icon: MessageCircle },
  { href: '/portal/community', label: 'Community', icon: Users },
  { href: '/portal/events', label: 'Events & Workshops', icon: CalendarDays },
  { href: '/portal/resources', label: 'Resources', icon: Library },
  { href: '/portal/settings', label: 'Settings', icon: Settings },
];

function NavButton({
  href,
  icon: Icon,
  label,
  active,
  onNavigate,
}: {
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  active: boolean;
  onNavigate: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onNavigate}
      className={cn(
        'flex items-center gap-3 rounded-xl px-3 py-2.5 text-[0.9rem] font-medium transition',
        active
          ? 'bg-gradient-to-r from-[#9152FF] to-[#7339E0] text-white shadow-[0_4px_14px_rgba(145,82,255,0.35)]'
          : 'text-[#4B4266] hover:bg-[#F5F0FF] hover:text-[#9152FF]'
      )}
    >
      <Icon className={cn('h-[1.125rem] w-[1.125rem] shrink-0', active && 'opacity-95')} />
      {label}
    </Link>
  );
}

export function Sidebar({ variant, open, onClose, developmentPreviewBanner }: SidebarProps) {
  const pathname = usePathname();
  const { isDe } = useLanguage();
  const belowHeaderTop = developmentPreviewBanner ? 'calc(70px + 2.75rem)' : '70px';

  const adminSections: {
    heading: string;
    items: { href: string; label: string; icon: React.ComponentType<{ className?: string }> }[];
  }[] = [
    {
      heading: isDe ? 'Überblick' : 'Overview',
      items: [{ href: '/portal/admin', label: isDe ? 'Dashboard' : 'Dashboard', icon: LayoutDashboard }],
    },
    {
      heading: isDe ? 'Nutzer:innen' : 'Users',
      items: [
        { href: '/portal/admin/users/pending', label: isDe ? 'Ausstehende Freigaben' : 'Pending Approvals', icon: UserPlus },
        { href: '/portal/admin/users/approved', label: isDe ? 'Freigegebene Nutzer:innen' : 'Approved Users', icon: UserCheck },
        { href: '/portal/admin/users/rejected', label: isDe ? 'Abgelehnte Nutzer:innen' : 'Rejected Users', icon: UserX },
      ],
    },
    {
      heading: isDe ? 'Stories' : 'Stories',
      items: [
        { href: '/portal/admin/stories/review', label: isDe ? 'Stories zur Prüfung' : 'Stories for Review', icon: FileSearch },
        { href: '/portal/admin/stories/published', label: isDe ? 'Veröffentlichte Stories' : 'Published Stories', icon: Globe },
      ],
    },
    {
      heading: isDe ? 'System' : 'System',
      items: [{ href: '/portal/admin/settings', label: isDe ? 'Einstellungen' : 'Settings', icon: Settings }],
    },
  ];

  const localizedUserLinks = userLinks.map((item) => ({
    ...item,
    label:
      !isDe
        ? item.label
        : item.href === '/portal'
          ? 'Dashboard'
          : item.href === '/portal/profile'
            ? 'Mein Profil'
            : item.href === '/story-tool'
              ? 'Story-Werkzeug'
              : item.href === '/portal/stories'
                ? 'Meine Stories'
                : item.href === '/portal/messages'
                  ? 'Nachrichten'
                  : item.href === '/portal/community'
                    ? 'Community'
                    : item.href === '/portal/events'
                      ? 'Events & Workshops'
                      : item.href === '/portal/resources'
                        ? 'Ressourcen'
                        : item.href === '/portal/settings'
                          ? 'Einstellungen'
                          : item.label,
  }));

  const shell = (
    <>
      <div className="flex items-center justify-between px-2 pb-4 lg:hidden">
        <span className="font-lora text-lg font-semibold text-[#1A1033]">{isDe ? 'Menü' : 'Menu'}</span>
        <button
          type="button"
          aria-label="Close sidebar"
          onClick={onClose}
          className="rounded-lg p-2 text-[#1A1033] hover:bg-[#F5F0FF]"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      <div className="mb-4 hidden items-center gap-2 rounded-xl border border-[rgba(145,82,255,0.12)] bg-white/70 px-3 py-3 shadow-sm lg:flex">
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#F5F0FF]">
          <Shield className="h-4 w-4 text-[#9152FF]" />
        </div>
        <div>
          <p className="text-[0.7rem] font-bold uppercase tracking-wider text-[#9152FF]/90">
            {variant === 'admin' ? (isDe ? 'Admin-Portal' : 'Admin portal') : isDe ? 'Dein Bereich' : 'Your space'}
          </p>
          <p className="text-[0.8rem] text-[#6B5F8A]">Building Bridges</p>
        </div>
      </div>

      <nav className="flex flex-col gap-1" aria-label={isDe ? 'Dashboard-Navigation' : 'Dashboard'}>
        {variant === 'user' &&
          localizedUserLinks.map((item) => (
            <NavButton
              key={item.href}
              href={item.href}
              icon={item.icon}
              label={item.label}
              active={pathname === item.href || (item.href !== '/portal' && pathname.startsWith(item.href))}
              onNavigate={onClose}
            />
          ))}

        {variant === 'admin' &&
          adminSections.map((section) => (
            <div key={section.heading} className="mb-4 last:mb-0">
              <p className="mb-2 px-3 text-[0.65rem] font-bold uppercase tracking-[0.12em] text-[#9A8CB3]">
                {section.heading}
              </p>
              <div className="flex flex-col gap-0.5">
                {section.items.map((item) => (
                  <NavButton
                    key={item.href}
                    href={item.href}
                    icon={item.icon}
                    label={item.label}
                    active={
                      item.href === '/portal/admin'
                        ? pathname === '/portal/admin'
                        : pathname === item.href || pathname.startsWith(item.href + '/')
                    }
                    onNavigate={onClose}
                  />
                ))}
              </div>
            </div>
          ))}
      </nav>
    </>
  );

  return (
    <>
      <div
        style={{ top: belowHeaderTop }}
        className={cn(
          'fixed bottom-0 left-0 right-0 z-[900] bg-black/25 backdrop-blur-[2px] transition-opacity lg:hidden',
          open ? 'opacity-100' : 'pointer-events-none opacity-0'
        )}
        aria-hidden={!open}
        onClick={onClose}
      />
      <aside
        style={{ top: belowHeaderTop }}
        className={cn(
          'fixed bottom-0 left-0 z-[950] flex w-[min(17.5rem,88vw)] flex-col overflow-y-auto border-r border-[rgba(145,82,255,0.12)] bg-white p-4 shadow-[4px_0_24px_rgba(145,82,255,0.08)] transition-transform lg:sticky lg:self-start lg:translate-x-0 lg:bg-[rgba(255,255,255,0.92)]',
          developmentPreviewBanner
            ? 'lg:min-h-[calc(100dvh-70px-2.75rem)]'
            : 'lg:min-h-[calc(100dvh-70px)]',
          open ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        )}
      >
        {shell}
      </aside>
    </>
  );
}
