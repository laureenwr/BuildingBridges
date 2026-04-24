import { LandingHero } from '@/components/landing/LandingHero';
import { LandingAbout } from '@/components/landing/LandingAbout';
import { LandingVideo } from '@/components/landing/LandingVideo';
import { LandingTeam } from '@/components/landing/LandingTeam';
import { LandingKnowledge } from '@/components/landing/LandingKnowledge';
import { LandingStorytelling } from '@/components/landing/LandingStorytelling';
import { LandingPartnersFunding } from '@/components/landing/LandingPartnersFunding';
import { LandingEvents } from '@/components/landing/LandingEvents';
import { LandingRegister } from '@/components/landing/LandingRegister';
import { LandingContactTeaser } from '@/components/landing/LandingContactTeaser';

export default function HomePage() {
  return (
    <div className="overflow-x-hidden">
      <LandingHero />
      <LandingAbout />
      <LandingVideo />
      <LandingTeam />
      <LandingKnowledge />
      <LandingStorytelling />
      <LandingPartnersFunding />
      <LandingEvents />
      <LandingRegister />
      <LandingContactTeaser />
    </div>
  );
}
