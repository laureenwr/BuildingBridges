import Image from 'next/image';
import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { teamMembers } from '@/lib/content/team';

const placeholder = '/images/placeholder-user.svg';

export default function TeamPage() {
  return (
    <main className="py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8">Team</h1>
        <p className="text-gray-700 max-w-3xl mb-12">
          Das interdisziplinäre Team von Building Bridges verbindet Expertise aus Psychologie, Sozialarbeit, Informatik
          und Organisationspraxis. Porträts werden sukzessive ergänzt.
        </p>

        {[
          { title: 'Freie Universität Berlin', key: 'Freie Universität Berlin' },
          { title: 'Stiftung SPI', key: 'Stiftung SPI' },
          { title: 'Universität Duisburg-Essen', key: 'Universität Duisburg-Essen' },
        ].map((section) => (
          <section key={section.key} className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">{section.title}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.filter((tm) => tm.org === section.key).map((m) => (
              <Card key={m.slug} className="p-6">
                <div className="w-full aspect-square relative mb-4 bg-gray-50 rounded-xl overflow-hidden border border-gray-200">
                  <Image src={placeholder} alt={m.name} fill className="object-contain p-6" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">
                  <Link href={`/team/${m.slug}`} className="hover:underline">{m.name}</Link>
                </h3>
                <p className="text-sm text-purple-700 font-medium">{m.role}</p>
                <p className="text-sm text-gray-600">{m.org}</p>
              </Card>
            ))}
            </div>
          </section>
        ))}
      </div>
    </main>
  );
}

