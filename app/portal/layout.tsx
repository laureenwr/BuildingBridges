/**
 * // TEMP: Dashboard preview mode (remove before production)
 * Keeps portal routes dynamic so Host-based preview bypass can read headers safely.
 */
export const dynamic = 'force-dynamic';

export default function PortalRootLayout({ children }: { children: React.ReactNode }) {
  return children;
}
