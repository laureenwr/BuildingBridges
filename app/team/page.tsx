import Image from 'next/image';
import { Card } from '@/components/ui/card';

const placeholder = '/logo_round.svg';

type Member = {
  name: string;
  role: string;
  org: string;
  bio?: string;
};

const members: Member[] = [
  { name: 'Prof. Dr. Claudia Calvano', role: 'Projektleitung', org: 'Freie Universität Berlin' },
  { name: 'M.Sc. Susanne Birnkammer', role: 'Wissenschaftliche Mitarbeiterin', org: 'Freie Universität Berlin' },
  { name: 'Dr. rer. medic. Felicia Boma Lazaridou', role: 'Wissenschaftliche Mitarbeiterin (Drittmittelprojekt)', org: 'Freie Universität Berlin' },
  { name: 'B.Sc. Esther Kipnis', role: 'Studentische Hilfskraft (Drittmittelprojekt)', org: 'Freie Universität Berlin' },
  { name: 'Prof. Dr. Hannes Rothe', role: 'Projektleitung Digitale Plattform', org: 'Universität Duisburg-Essen' },
  { name: 'M.Sc. Elias Jelinek', role: 'Wissenschaftlicher Mitarbeiter', org: 'Universität Duisburg-Essen' },
];

export default function TeamPage() {
  return (
    <main className="py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8">Team</h1>
        <p className="text-gray-700 max-w-3xl mb-12">
          Das interdisziplinäre Team von Building Bridges verbindet Expertise aus Psychologie, Sozialarbeit, Informatik
          und Organisationspraxis. Porträts werden sukzessive ergänzt.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {members.map((m) => (
            <Card key={m.name} className="p-6">
              <div className="w-full aspect-square relative mb-4 bg-gray-50 rounded-xl overflow-hidden border border-gray-200">
                <Image src={placeholder} alt={m.name} fill className="object-contain p-6" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">{m.name}</h3>
              <p className="text-sm text-purple-700 font-medium">{m.role}</p>
              <p className="text-sm text-gray-600">{m.org}</p>
            </Card>
          ))}
        </div>
      </div>
    </main>
  );
}

