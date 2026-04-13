'use client';

import { usePathname } from 'next/navigation';
import { LandingNav } from '@/components/landing/LandingNav';
import { LandingFooter } from '@/components/landing/LandingFooter';

export function AppChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isLanding = pathname === '/';

  return (
    <div className="min-h-screen bg-[#F2EEFF] font-[family-name:var(--font-sora)] text-[#1A1033] antialiased flex flex-col">
      <LandingNav />
      <main className={isLanding ? 'flex-1' : 'flex-1 mt-[70px]'}>{children}</main>
      <LandingFooter />
    </div>
  );
}
