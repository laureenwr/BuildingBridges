'use client';

import { usePathname } from 'next/navigation';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';

/**
 * Portal routes (/portal/*) render their own Building Bridges header inside the dashboard shell,
 * so we skip the marketing Navbar + Footer here to avoid duplicate chrome.
 */
export function AppChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isPortal = pathname?.startsWith('/portal') ?? false;

  if (isPortal) {
    return (
      <div className="flex min-h-screen flex-col">{children}</div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 pt-[70px]">{children}</main>
      <Footer />
    </div>
  );
}
