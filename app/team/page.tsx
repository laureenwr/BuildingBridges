'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { pickTeamMemberText, teamMembers } from '@/lib/content/team';
import { useLandingLocale } from '@/lib/landing/locale';

export default function TeamPage() {
  const { t } = useLandingLocale();
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
          {members.map((member) => {
            const role = pickTeamMemberText(member, 'role', t) ?? member.role;
            const degree = pickTeamMemberText(member, 'degree', t);
            const org = pickTeamMemberText(member, 'org', t) ?? member.org;
            return (
              <Link key={member.slug} href={`/team/${member.slug}`}>
                <Card className="p-6 hover:shadow-lg transition-shadow duration-200 h-full">
                  <div className="mb-4 w-full overflow-hidden rounded-xl border border-gray-200 bg-gray-50">
                    <Image
                      src={member.image}
                      alt={member.name || `${member.firstName} ${member.lastName}`}
                      width={400}
                      height={500}
                      className="h-[500px] w-full object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-1">
                    {member.name || `${member.firstName} ${member.lastName}`}
                  </h3>
                  {degree ? <p className="text-sm text-gray-500 mb-2">{degree}</p> : null}
                  <p className="text-purple-700 font-medium text-sm mb-1">{role}</p>
                  {org ? <p className="text-gray-600 text-sm">{org}</p> : null}
                </Card>
              </Link>
            );
          })}
        </div>
      </section>
    );
  }

  return (
    <main className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {t('Our team', 'Unser Team')}
          </h1>
          <p className="text-gray-700 max-w-2xl mx-auto">
            {t(
              'We are a diverse team with a shared vision: building bridges between education, perspectives, and opportunity.',
              'Wir sind ein vielfältiges Team mit einer gemeinsamen Vision: Brücken bauen – zwischen Bildung, Perspektiven und Möglichkeiten.'
            )}
          </p>
        </div>
        {renderSection(t('Subproject 1 (TP1)', 'Teilprojekt 1 (TP1)'), TP1)}
        {renderSection(t('Subproject 2 (TP2)', 'Teilprojekt 2 (TP2)'), TP2)}
        {renderSection(t('Subproject 3 (TP3)', 'Teilprojekt 3 (TP3)'), TP3)}
      </div>
    </main>
  );
}
