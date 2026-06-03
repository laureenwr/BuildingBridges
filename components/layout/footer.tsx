'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Instagram } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const footerColumns = [
  {
    titleKey: 'footer.about',
    links: [
      { labelKey: 'footer.vision', href: '/vision' },
      { labelKey: 'footer.team', href: '/#team' },
      { labelKey: 'footer.partners', href: '/#partners' },
      { labelKey: 'footer.contact', href: '/contact' },
    ],
  },
  {
    titleKey: 'footer.platform',
    links: [
      { labelKey: 'footer.knowledgeHub', href: '/#knowledge' },
      { labelKey: 'footer.storyTool', href: '/story-tool' },
      { labelKey: 'footer.glossary', href: '/glossary' },
    ],
  },
  {
    titleKey: 'footer.program',
    links: [
      { labelKey: 'footer.workshops', href: '/#events' },
      { labelKey: 'footer.research', href: '/#events' },
      { labelKey: 'footer.register', href: '/sign-up' },
    ],
  },
  {
    titleKey: 'footer.legal',
    links: [
      { labelKey: 'footer.imprint', href: '/imprint' },
      { labelKey: 'footer.privacy', href: '/privacy-policy' },
      { labelKey: 'footer.terms', href: '/tos' },
    ],
  },
] as const;

const socialLinks = [{ Icon: Instagram, href: 'https://www.instagram.com/building_bridges_team/' }];

export function Footer() {
  const { t } = useTranslation('common');
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#1A1033] px-6 py-12 text-[rgba(255,255,255,0.5)] sm:px-10">
      <div className="mx-auto max-w-[1280px]">
        <div className="mb-8 flex flex-wrap items-center gap-4 rounded-[var(--radius-md)] border border-[rgba(145,82,255,0.25)] bg-[rgba(145,82,255,0.15)] px-5 py-4 text-[0.83rem]">
          <span className="text-lg" aria-hidden>
            ♿
          </span>
          <span className="text-[rgba(255,255,255,0.75)]">{t('footer.accessibilityBanner')}</span>
          <span className="rounded-full bg-[rgba(255,255,255,0.12)] px-2.5 py-1 text-[0.72rem] font-bold text-[rgba(255,255,255,0.7)]">
            {t('footer.wcag')}
          </span>
          <span className="rounded-full bg-[rgba(255,255,255,0.12)] px-2.5 py-1 text-[0.72rem] font-bold text-[rgba(255,255,255,0.7)]">
            {t('footer.inclusiveLanguage')}
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
              {t('footer.tagline')}
            </p>
          </div>

          {footerColumns.map((col) => (
            <div key={col.titleKey}>
              <h4 className="mb-4 text-[0.78rem] font-bold uppercase tracking-[0.12em] text-[rgba(255,255,255,0.75)]">
                {t(col.titleKey)}
              </h4>
              <ul className="flex list-none flex-col gap-2">
                {col.links.map((link) => (
                  <li key={link.href + link.labelKey}>
                    <Link
                      href={link.href}
                      className="text-[0.875rem] text-[rgba(255,255,255,0.45)] transition hover:text-[rgba(255,255,255,0.9)]"
                    >
                      {t(link.labelKey)}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-col flex-wrap items-start justify-between gap-4 pt-8 text-[0.83rem] sm:flex-row sm:items-center">
          <span>{t('footer.copyright', { year })}</span>
          <div className="flex flex-wrap gap-6">
            <Link href="/imprint" className="text-[rgba(255,255,255,0.38)] hover:text-[rgba(255,255,255,0.7)]">
              {t('footer.imprint')}
            </Link>
            <Link href="/privacy-policy" className="text-[rgba(255,255,255,0.38)] hover:text-[rgba(255,255,255,0.7)]">
              {t('footer.privacy')}
            </Link>
            <span className="text-[rgba(255,255,255,0.38)]">{t('footer.accessibility')}</span>
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
