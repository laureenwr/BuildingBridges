'use client';

import Link from 'next/link';
import { useLandingLocale } from '@/lib/landing/locale';

export function LandingFooter() {
  const { t } = useLandingLocale();

  const L = {
    wcag: t(
      'This platform is built to WCAG 2.1 accessibility standards.',
      'Diese Plattform orientiert sich an den Barrierefreiheitsstandards der WCAG 2.1.'
    ),
    tagline: t(
      'Empowering FLINTA individuals and girls of color to achieve their full potential in psychosocial and educational fields. 2024–2027.',
      'Empowerment von FLINTA-Personen und Mädchen of Colour, damit sie ihr Potenzial in psychosozialen und Bildungsbereichen entfalten können. 2024–2027.'
    ),
    about: t('About', 'Über'),
    platform: t('Platform', 'Plattform'),
    program: t('Program', 'Programm'),
    legal: t('Legal', 'Rechtliches'),
    vision: t('Vision', 'Vision'),
    team: t('Team', 'Team'),
    partners: t('Partners', 'Partner'),
    contact: t('Contact', 'Kontakt'),
    knowledgeHub: t('Knowledge Hub', 'Wissenshub'),
    storyTool: t('Story Tool', 'Story-Tool'),
    toolkit: t('Digital Toolkit', 'Digitales Toolkit'),
    workshops: t('Workshops', 'Workshops'),
    research: t('Research', 'Forschung'),
    register: t('Register', 'Anmelden'),
    imprint: t('Imprint', 'Impressum'),
    privacy: t('Privacy Policy', 'Datenschutz'),
    accessibility: t('Accessibility', 'Barrierefreiheit'),
    cookies: t('Cookie Settings', 'Cookie-Einstellungen'),
    copy: t(
      '© 2024–2027 Building Bridges. Funded by BMBF, BMFSJ & ESF+.',
      '© 2024–2027 Building Bridges. Gefördert durch BMBF, BMFSJ & ESF+.'
    ),
  };

  return (
    <footer className="bg-[#1A1033] px-10 pb-8 pt-16 text-[rgba(255,255,255,0.5)] max-md:px-6">
      <div className="mx-auto max-w-[1280px]">
        <div className="mb-8 flex flex-wrap items-center gap-4 rounded-[18px] border border-[rgba(145,82,255,0.25)] bg-[rgba(145,82,255,0.15)] px-6 py-4 text-[0.83rem]">
          <span className="text-base" aria-hidden>
            ♿
          </span>
          <span className="text-[rgba(255,255,255,0.75)]">{L.wcag}</span>
          <span className="rounded-full bg-[rgba(255,255,255,0.12)] px-2.5 py-1 text-[0.72rem] font-bold text-[rgba(255,255,255,0.7)]">
            WCAG 2.1 AA
          </span>
        </div>

        <div className="grid grid-cols-1 gap-10 border-b border-[rgba(145,82,255,0.18)] pb-12 md:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr_1fr]">
          <div>
            <div className="font-[family-name:var(--font-lora)] text-xl font-bold text-white">
              Building<span className="text-[#B580FF]">Bridges</span>
            </div>
            <p className="mt-3 max-w-[280px] text-[0.875rem] leading-relaxed">{L.tagline}</p>
          </div>
          <div>
            <h4 className="mb-4 text-[0.78rem] font-bold uppercase tracking-[0.12em] text-[rgba(255,255,255,0.75)]">
              {L.about}
            </h4>
            <ul className="flex list-none flex-col gap-2">
              <li>
                <Link href="/vision" className="text-[0.875rem] text-[rgba(255,255,255,0.45)] hover:text-white">
                  {L.vision}
                </Link>
              </li>
              <li>
                <Link href="/team" className="text-[0.875rem] text-[rgba(255,255,255,0.45)] hover:text-white">
                  {L.team}
                </Link>
              </li>
              <li>
                <Link href="/partners" className="text-[0.875rem] text-[rgba(255,255,255,0.45)] hover:text-white">
                  {L.partners}
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-[0.875rem] text-[rgba(255,255,255,0.45)] hover:text-white">
                  {L.contact}
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="mb-4 text-[0.78rem] font-bold uppercase tracking-[0.12em] text-[rgba(255,255,255,0.75)]">
              {L.platform}
            </h4>
            <ul className="flex list-none flex-col gap-2">
              <li>
                <Link href="/#knowledge" className="text-[0.875rem] text-[rgba(255,255,255,0.45)] hover:text-white">
                  {L.knowledgeHub}
                </Link>
              </li>
              <li>
                <Link href="/#storytelling" className="text-[0.875rem] text-[rgba(255,255,255,0.45)] hover:text-white">
                  {L.storyTool}
                </Link>
              </li>
              <li>
                <Link href="/glossary" className="text-[0.875rem] text-[rgba(255,255,255,0.45)] hover:text-white">
                  {L.toolkit}
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="mb-4 text-[0.78rem] font-bold uppercase tracking-[0.12em] text-[rgba(255,255,255,0.75)]">
              {L.program}
            </h4>
            <ul className="flex list-none flex-col gap-2">
              <li>
                <Link href="/workshops" className="text-[0.875rem] text-[rgba(255,255,255,0.45)] hover:text-white">
                  {L.workshops}
                </Link>
              </li>
              <li>
                <Link href="/#events" className="text-[0.875rem] text-[rgba(255,255,255,0.45)] hover:text-white">
                  {L.research}
                </Link>
              </li>
              <li>
                <Link href="/sign-up" className="text-[0.875rem] text-[rgba(255,255,255,0.45)] hover:text-white">
                  {L.register}
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="mb-4 text-[0.78rem] font-bold uppercase tracking-[0.12em] text-[rgba(255,255,255,0.75)]">
              {L.legal}
            </h4>
            <ul className="flex list-none flex-col gap-2">
              <li>
                <Link href="/imprint" className="text-[0.875rem] text-[rgba(255,255,255,0.45)] hover:text-white">
                  {L.imprint}
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="text-[0.875rem] text-[rgba(255,255,255,0.45)] hover:text-white">
                  {L.privacy}
                </Link>
              </li>
              <li>
                <Link href="/imprint" className="text-[0.875rem] text-[rgba(255,255,255,0.45)] hover:text-white">
                  {L.accessibility}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4 pt-7 text-[0.83rem]">
          <span>{L.copy}</span>
          <div className="flex gap-6">
            <Link href="/imprint" className="text-[rgba(255,255,255,0.38)] hover:text-[rgba(255,255,255,0.7)]">
              {L.imprint}
            </Link>
            <Link href="/privacy-policy" className="text-[rgba(255,255,255,0.38)] hover:text-[rgba(255,255,255,0.7)]">
              {L.privacy}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
