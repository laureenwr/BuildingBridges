'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { teamMembers } from '@/lib/content/team';
import { useLanguage } from '@/lib/hooks/useLanguage';

const roleOverrides: Record<string, { de: string; en: string }> = {
  'claudia-calvano': {
    de: 'Verbundleitung und Leitung Teilprojekt 1',
    en: 'Consortium Lead and Head of Subproject 1',
  },
  'celiana-kiefer': {
    de: 'Teilprojektleitung von Teilprojekt 2 „Ment2Power" (Mentoringprogramm)',
    en: 'Lead of Subproject 2 "Ment2Power" (Mentoring Program)',
  },
  'susanne-birnkammer': {
    de: 'Wissenschaftliche Mitarbeiterin, Doktorandin',
    en: 'Research Associate, Doctoral Candidate',
  },
  'felicia-boma-lazaridou': {
    de: 'Wissenschaftliche Mitarbeiterin (Drittmittelprojekt)',
    en: 'Research Associate (Third-party Funded Project)',
  },
  'esther-kipnis': {
    de: 'Studentische Hilfskraft im Teilprojekt 1',
    en: 'Student Research Assistant in Subproject 1',
  },
  'dilara-yildirim': {
    de: 'Studentische Hilfskraft',
    en: 'Student Research Assistant',
  },
  'hannes-rothe': {
    de: 'Projektleitung Digitale Plattform (TP3), Lehrstuhlinhaber',
    en: 'Lead of Digital Platform (TP3), Chair Holder',
  },
  'daniel-courtney': {
    de: 'Wissenschaftlicher Mitarbeiter (TP3)',
    en: 'Research Associate (TP3)',
  },
  'laureen-warikoru': {
    de: 'Wissenschaftliche Mitarbeiterin (TP3)',
    en: 'Research Associate (TP3)',
  },
  'sumera-sajid': {
    de: 'Studentische Hilfskraft (TP3)',
    en: 'Research Assistant (TP3)',
  },
};

const orgOverrides: Record<string, { de: string; en: string }> = {
  'Universität Duisburg-Essen': {
    de: 'Universität Duisburg-Essen',
    en: 'University of Duisburg-Essen',
  },
  'Freie Universität Berlin': {
    de: 'Freie Universität Berlin',
    en: 'Freie University of Berlin',
  },
};

export default function TeamPage() {
  const { isDe } = useLanguage();
  const bySlug = new Map(teamMembers.map((m) => [m.slug, m] as const));

  const TP1 = ['claudia-calvano', 'susanne-birnkammer', 'felicia-boma-lazaridou', 'esther-kipnis'];
  const TP2 = ['celiana-kiefer', 'dilara-yildirim'];
  const TP3 = ['hannes-rothe', 'daniel-courtney', 'laureen-warikoru', 'sumera-sajid'];

  function renderSection(title: string, slugs: string[]) {
    const members = slugs
      .map((slug) => bySlug.get(slug))
      .filter((m): m is NonNullable<typeof bySlug extends Map<any, infer V> ? V : never> => Boolean(m));

    if (members.length === 0) return null;

    return (
      <section className="mt-12">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">{title}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {members.map((member) => (
            <Link key={member.slug} href={`/team/${member.slug}`}>
              <Card className="p-6 hover:shadow-lg transition-shadow duration-200 h-full">
                <div className="w-full h-80 md:h-96 relative mb-4 bg-gray-50 rounded-xl overflow-hidden border border-gray-200">
                  <Image
                    src={member.image}
                    alt={member.name || `${member.firstName} ${member.lastName}`}
                    fill
                    className="object-cover"
                  />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-1">
                  {member.name || `${member.firstName} ${member.lastName}`}
                </h3>
                {member.degree && (
                  <p className="text-sm text-gray-500 mb-2">{member.degree}</p>
                )}
                <p className="text-purple-700 font-medium text-sm mb-1">
                  {roleOverrides[member.slug]
                    ? (isDe ? roleOverrides[member.slug].de : roleOverrides[member.slug].en)
                    : member.role}
                </p>
                {member.org ? (
                  <p className="text-gray-600 text-sm">
                    {orgOverrides[member.org]
                      ? (isDe ? orgOverrides[member.org].de : orgOverrides[member.org].en)
                      : member.org}
                  </p>
                ) : null}
              </Card>
            </Link>
          ))}
        </div>
      </section>
    );
  }

  return (
    <main className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {isDe ? 'Unser Team' : 'Our Team'}
          </h1>
          <p className="text-gray-700 max-w-2xl mx-auto">
            {isDe
              ? 'Wir sind ein vielfältiges Team mit einer gemeinsamen Vision: Bruecken bauen - zwischen Bildung, Perspektiven und Moeglichkeiten.'
              : 'We are a diverse team with one shared vision: building bridges between education, perspectives, and opportunities.'}
          </p>
        </div>
        {renderSection(isDe ? 'Teilprojekt 1 (TP1)' : 'Subproject 1 (TP1)', TP1)}
        {renderSection(isDe ? 'Teilprojekt 2 (TP2)' : 'Subproject 2 (TP2)', TP2)}
        {renderSection(isDe ? 'Teilprojekt 3 (TP3)' : 'Subproject 3 (TP3)', TP3)}
      </div>
    </main>
  );
}

