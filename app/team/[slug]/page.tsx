import { notFound } from 'next/navigation';
import { getMemberBySlug, teamMembers } from '@/lib/content/team';
import { PersonProfile } from '@/components/team/PersonProfile';

export async function generateStaticParams() {
  return teamMembers.map((m) => ({ slug: m.slug }));
}

export default function PersonPage() {
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

