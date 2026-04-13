import './landing-extra.css';
import { teamMembers } from '@/lib/content/team';
import { LandingExperience } from '@/components/landing/LandingExperience';

export default function HomePage() {
  return <LandingExperience members={teamMembers} />;
}
