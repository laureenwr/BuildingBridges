import Link from 'next/link';
import Image from 'next/image';
import { Instagram } from 'lucide-react';

const footerColumns = [
  {
    title: 'About',
    links: [
      { label: 'Vision', href: '/vision' },
      { label: 'Team', href: '/team' },
      { label: 'Partners', href: '/partners' },
      { label: 'Contact', href: '/contact' },
    ],
  },
  {
    title: 'Platform',
    links: [
      { label: 'Knowledge Hub', href: '/#knowledge' },
      { label: 'Story Tool', href: '/story-tool' },
      { label: 'Glossary', href: '/glossary' },
    ],
  },
  {
    title: 'Program',
    links: [
      { label: 'Workshops', href: '/workshops' },
      { label: 'Research', href: '/#events' },
      { label: 'Register', href: '/sign-up' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Imprint', href: '/imprint' },
      { label: 'Privacy Policy', href: '/privacy-policy' },
      { label: 'Terms of Service', href: '/tos' },
    ],
  },
];

const socialLinks = [{ Icon: Instagram, href: 'https://www.instagram.com/building_bridges_team/' }];

export function Footer() {
  return (
    <footer className="bg-[#1A1033] px-6 py-12 text-[rgba(255,255,255,0.5)] sm:px-10">
      <div className="mx-auto max-w-[1280px]">
        <div className="mb-8 flex flex-wrap items-center gap-4 rounded-[var(--radius-md)] border border-[rgba(145,82,255,0.25)] bg-[rgba(145,82,255,0.15)] px-5 py-4 text-[0.83rem]">
          <span className="text-lg" aria-hidden>
            ♿
          </span>
          <span className="text-[rgba(255,255,255,0.75)]">
            This platform is built to WCAG 2.1 accessibility standards.
          </span>
          <span className="rounded-full bg-[rgba(255,255,255,0.12)] px-2.5 py-1 text-[0.72rem] font-bold text-[rgba(255,255,255,0.7)]">
            WCAG 2.1 AA
          </span>
          <span className="rounded-full bg-[rgba(255,255,255,0.12)] px-2.5 py-1 text-[0.72rem] font-bold text-[rgba(255,255,255,0.7)]">
            Gender-inclusive language
          </span>
          <span className="rounded-full bg-[rgba(255,255,255,0.12)] px-2.5 py-1 text-[0.72rem] font-bold text-[rgba(255,255,255,0.7)]">
            DE / EN
          </span>
        </div>

        <div className="grid grid-cols-1 gap-10 border-b border-[rgba(145,82,255,0.18)] pb-12 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr_1fr]">
          <div>
            <Link href="/" className="inline-flex items-center gap-2">
              <Image src="/logo.png" alt="" width={36} height={36} className="h-9 w-9 rounded-full object-cover" />
              <span className="font-lora text-xl font-bold text-white">
                Building<span className="text-[#B580FF]">Bridges</span>
              </span>
            </Link>
            <p className="mt-3 max-w-[280px] text-[0.875rem] leading-relaxed text-[rgba(255,255,255,0.5)]">
              Empowering FLINTA individuals and girls of color to achieve their full potential in psychosocial and
              educational fields. 2024–2027.
            </p>
          </div>

          {footerColumns.map((col) => (
            <div key={col.title}>
              <h4 className="mb-4 text-[0.78rem] font-bold uppercase tracking-[0.12em] text-[rgba(255,255,255,0.75)]">
                {col.title}
              </h4>
              <ul className="flex list-none flex-col gap-2">
                {col.links.map((link) => (
                  <li key={link.href + link.label}>
                    <Link
                      href={link.href}
                      className="text-[0.875rem] text-[rgba(255,255,255,0.45)] transition hover:text-[rgba(255,255,255,0.9)]"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-col flex-wrap items-start justify-between gap-4 pt-8 text-[0.83rem] sm:flex-row sm:items-center">
          <span>© 2024–{new Date().getFullYear()} Building Bridges. Funded by BMBF, BMFSJ &amp; ESF+.</span>
          <div className="flex flex-wrap gap-6">
            <Link href="/imprint" className="text-[rgba(255,255,255,0.38)] hover:text-[rgba(255,255,255,0.7)]">
              Imprint
            </Link>
            <Link href="/privacy-policy" className="text-[rgba(255,255,255,0.38)] hover:text-[rgba(255,255,255,0.7)]">
              Privacy
            </Link>
            <span className="text-[rgba(255,255,255,0.38)]">Accessibility</span>
          </div>
          <div className="flex gap-4">
            {socialLinks.map(({ Icon, href }) => (
              <a
                key={href}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[rgba(255,255,255,0.45)] hover:text-white"
              >
                <Icon className="h-5 w-5" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
