import Image from 'next/image';
import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { teamMembers } from '@/lib/content/team';

const placeholder = '/images/placeholder-user.svg';

export default function TeamPage() {
  return (
    <main className="py-20">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Seite im Aufbau</h1>
        <p className="text-gray-700 max-w-2xl mx-auto">
          Wir bauen diese Seite gerade um. Bitte schauen Sie später noch einmal vorbei.
        </p>
      </div>
    </main>
  );
}

