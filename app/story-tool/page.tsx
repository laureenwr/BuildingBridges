import type { Metadata } from 'next';
import { StoryToolPageContent } from '@/components/landing/StoryToolPageContent';

export const metadata: Metadata = {
  title: 'Story Creation Tool',
  description:
    'Building Bridges story creation — optional AI support, privacy by default, built with the community.',
};

export default function StoryToolPage() {
  return (
    <div className="relative min-h-[calc(100dvh-70px)] overflow-hidden bg-[#1A1033] px-6 py-16 text-white sm:px-10 sm:py-20">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_80%_50%,rgba(145,82,255,0.18)_0%,transparent_70%),radial-gradient(ellipse_40%_60%_at_10%_80%,rgba(107,170,138,0.12)_0%,transparent_70%)]"
        aria-hidden
      />
      <div className="relative z-[1] mx-auto max-w-[1280px]">
        <StoryToolPageContent />
      </div>
    </div>
  );
}
