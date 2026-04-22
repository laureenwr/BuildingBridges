import { notFound } from 'next/navigation';
import { getMemberBySlug, teamMembers } from '@/lib/content/team';
import { PersonProfile } from '@/components/team/PersonProfile';
import type { Metadata } from 'next';

export async function generateStaticParams() {
  return teamMembers.map((m) => ({ slug: m.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const member = getMemberBySlug(params.slug);
  if (!member) return { title: 'Team Member Not Found' };

  const name = member.name || `${member.firstName} ${member.lastName}`;
  return {
    title: `${name} - Building Bridges Team`,
    description: member.bio || `${name}, ${member.role} bei ${member.org}`,
  };
}

export default function PersonPage({ params }: { params: { slug: string } }) {
  const member = getMemberBySlug(params.slug);

  if (!member) {
    notFound();
  }

  return <PersonProfile m={member} />;
}

