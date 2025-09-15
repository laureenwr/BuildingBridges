import { notFound } from 'next/navigation';
import { getMemberBySlug, teamMembers } from '@/lib/content/team';
import { PersonProfile } from '@/components/team/PersonProfile';

export async function generateStaticParams() {
  return teamMembers.map((m) => ({ slug: m.slug }));
}

export default function PersonPage({ params }: { params: { slug: string } }) {
  const m = getMemberBySlug(params.slug);
  if (!m) return notFound();
  return <PersonProfile m={m} />;
}

