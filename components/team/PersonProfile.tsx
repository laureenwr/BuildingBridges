import Image from 'next/image';
import { Card } from '@/components/ui/card';
import type { TeamMember } from '@/lib/content/team';

export function PersonProfile({ m }: { m: TeamMember }) {
  return (
    <main className="py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          <Card className="p-6 md:col-span-1">
            <div className="w-full aspect-square relative mb-4 bg-gray-50 rounded-xl overflow-hidden border border-gray-200">
              <Image src={m.image} alt={m.name} fill className="object-contain p-6" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-1">{m.name}</h1>
            <p className="text-purple-700 font-medium">{m.role}</p>
            <p className="text-gray-600">{m.org}</p>
          </Card>

          <div className="md:col-span-2 space-y-6">
            {m.bio && (
              <Card className="p-6">
                <h2 className="text-xl font-semibold mb-3">Kurzprofil</h2>
                <p className="text-gray-700 leading-relaxed whitespace-pre-line">{m.bio}</p>
              </Card>
            )}

            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-3">Kontakt</h2>
              <ul className="text-gray-700 space-y-1">
                {m.email && <li>E-Mail: <a className="text-blue-700 hover:underline" href={`mailto:${m.email}`}>{m.email}</a></li>}
                {m.phone && <li>Telefon: {m.phone}</li>}
                {m.room && <li>Raum: {m.room}</li>}
                {m.address && <li>Adresse: {m.address}</li>}
                {m.links?.length ? (
                  <li className="pt-2">
                    Weiterführende Links:
                    <ul className="list-disc list-inside text-blue-700">
                      {m.links.map((l) => (
                        <li key={l.url}><a className="hover:underline" href={l.url} target="_blank" rel="noreferrer">{l.label}</a></li>
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

