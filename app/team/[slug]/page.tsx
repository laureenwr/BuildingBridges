import { notFound, redirect } from 'next/navigation';
import { getMemberBySlug, teamMembers } from '@/lib/content/team';
import { PersonProfile } from '@/components/team/PersonProfile';
import type { Metadata } from 'next';

const legacySlugs: Record<string, string> = {
  may: 'may-khodaygan',
};

export async function generateStaticParams() {
  return [
    ...teamMembers.map((m) => ({ slug: m.slug })),
    ...Object.keys(legacySlugs).map((slug) => ({ slug })),
  ];
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const member = getMemberBySlug(legacySlugs[params.slug] ?? params.slug);
  if (!member) return { title: 'Team Member Not Found' };

  const name = member.name || `${member.firstName} ${member.lastName}`;
  return {
    title: `${name} - Building Bridges Team`,
    description: member.bio || `${name}, ${member.role} bei ${member.org}`,
  };
}

export default function PersonPage({ params }: { params: { slug: string } }) {
  const target = legacySlugs[params.slug];
  if (target) redirect(`/team/${target}`);

  const member = getMemberBySlug(params.slug);

  if (!member) {
    notFound();
  }

  return <PersonProfile m={member} />;
}

