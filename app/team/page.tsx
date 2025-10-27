import Image from 'next/image';
import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { teamMembers } from '@/lib/content/team';

export default function TeamPage() {
  return (
    <main className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Unser Team</h1>
          <p className="text-gray-700 max-w-2xl mx-auto">
            Lernen Sie die Menschen kennen, die hinter dem Building Bridges Projekt stehen.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {teamMembers.map((member) => (
            <Link key={member.slug} href={`/team/${member.slug}`}>
              <Card className="p-6 hover:shadow-lg transition-shadow duration-200 h-full">
                <div className="w-full aspect-square relative mb-4 bg-gray-50 rounded-xl overflow-hidden border border-gray-200">
                  <Image
                    src={member.image}
                    alt={member.name || `${member.firstName} ${member.lastName}`}
                    fill
                    className="object-contain p-6"
                  />
                </div>
                <h2 className="text-xl font-bold text-gray-900 mb-1">
                  {member.name || `${member.firstName} ${member.lastName}`}
                </h2>
                {member.degree && (
                  <p className="text-sm text-gray-500 mb-2">{member.degree}</p>
                )}
                <p className="text-purple-700 font-medium text-sm mb-1">{member.role}</p>
                <p className="text-gray-600 text-sm">{member.org}</p>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}

