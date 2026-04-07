'use client';

import { HomeAboutProgram } from '@/components/landing/home-about-program';
import { TeamKnowledge } from '@/components/landing/team-knowledge';
import { StoryEventsContact } from '@/components/landing/story-events-contact';
import { MediaPartnersFunding } from '@/components/landing/media-partners-funding';

export default function HomePage() {
  return (
    <main className="relative">
      <HomeAboutProgram />
      <TeamKnowledge />
      <StoryEventsContact />
      <MediaPartnersFunding />
    </main>
  );
} 