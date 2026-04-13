'use client';

import Image from 'next/image';
import { Card } from '@/components/ui/card';
import type { TeamMember } from '@/lib/content/team';
import { pickTeamMemberText, teamLinkLabel } from '@/lib/content/team';
import { useLandingLocale } from '@/lib/landing/locale';

export function PersonProfile({ m }: { m: TeamMember }) {
  const { t } = useLandingLocale();
  const role = pickTeamMemberText(m, 'role', t) ?? m.role;
  const degree = pickTeamMemberText(m, 'degree', t);
  const org = pickTeamMemberText(m, 'org', t) ?? m.org;
  const bio = pickTeamMemberText(m, 'bio', t);

  return (
    <main className="py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          <Card className="p-6 md:col-span-1">
            <div className="mb-4 aspect-[4/5] w-full overflow-hidden rounded-xl border border-gray-200 bg-gray-50">
              <Image
                src={m.image}
                alt={m.name || `${m.firstName} ${m.lastName}`}
                width={400}
                height={500}
                className="h-full w-full object-cover object-top"
                sizes="(max-width: 768px) 100vw, 400px"
                priority
              />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-1">{m.name || `${m.firstName} ${m.lastName}`}</h1>
            {degree ? <p className="text-sm text-gray-500 mb-2">{degree}</p> : null}
            <p className="text-purple-700 font-medium">{role}</p>
            <p className="text-gray-600">{org}</p>
          </Card>

          <div className="md:col-span-2 space-y-6">
            {bio ? (
              <Card className="p-6">
                <h2 className="text-xl font-semibold mb-3">{t('Bio', 'Bio')}</h2>
                <p className="text-gray-700 leading-relaxed whitespace-pre-line">{bio}</p>
              </Card>
            ) : null}

            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-3">{t('Contact', 'Kontakt')}</h2>
              <ul className="text-gray-700 space-y-1">
                <li>
                  {t('Email', 'E-Mail')}:{' '}
                  {m.email ? (
                    <a className="text-blue-700 hover:underline" href={`mailto:${m.email}`}>
                      {m.email}
                    </a>
                  ) : (
                    '—'
                  )}
                </li>
                {m.phone ? (
                  <li>
                    {t('Phone', 'Telefon')}:{' '}
                    <a className="text-blue-700 hover:underline" href={`tel:${m.phone}`}>
                      {m.phone}
                    </a>
                  </li>
                ) : null}
                {m.room ? (
                  <li>
                    {t('Room', 'Raum')}: {m.room}
                  </li>
                ) : null}
                {m.address ? (
                  <li>
                    {t('Address', 'Adresse')}: {m.address}
                  </li>
                ) : null}
                {m.links?.length ? (
                  <li className="pt-2">
                    {t('Further links', 'Weiterführende Links')}:
                    <ul className="list-disc list-inside text-blue-700">
                      {m.links.map((l) => (
                        <li key={l.url}>
                          <a className="hover:underline" href={l.url} target="_blank" rel="noreferrer">
                            {teamLinkLabel(l, t)}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </li>
                ) : null}
              </ul>
            </Card>
          </div>
        </div>
      </div>
    </main>
  );
}
