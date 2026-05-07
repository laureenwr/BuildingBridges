/**
 * // TEMP: Dashboard preview mode (remove before production)
 *
 * Enables unauthenticated access to /portal and /portal/admin plus mock users.
 *
 * Toggle:
 * - On by default when NODE_ENV is not "production" (e.g. `next dev`).
 * - On localhost/127.0.0.1 even if NODE_ENV is "production" (e.g. `next start` after build).
 * - Opt-in elsewhere: NEXT_PUBLIC_DASHBOARD_PREVIEW_DEV=true
 * - Force off: NEXT_PUBLIC_DISABLE_DASHBOARD_PREVIEW=true
 */

export function hostnameFromHostHeader(hostHeader: string | null | undefined): string {
  if (!hostHeader) return '';
  const h = hostHeader.trim().toLowerCase();
  if (h.startsWith('[')) {
    const end = h.indexOf(']');
    if (end > 1) return h.slice(1, end);
  }
  const colon = h.indexOf(':');
  if (colon > 0) return h.slice(0, colon);
  return h;
}

export function isLocalDevHostname(hostname: string | null | undefined): boolean {
  if (!hostname) return false;
  const n = hostname.trim().toLowerCase();
  return n === 'localhost' || n === '127.0.0.1' || n === '::1';
}

/**
 * // TEMP: Dashboard preview mode (remove before production)
 */
export function isDashboardPreviewModeEnabled(opts?: {
  hostname?: string | null;
  hostHeader?: string | null;
}): boolean {
  if (process.env.NEXT_PUBLIC_DISABLE_DASHBOARD_PREVIEW === 'true') {
    return false;
  }
  if (process.env.NEXT_PUBLIC_DASHBOARD_PREVIEW_DEV === 'true') {
    return true;
  }

  const nextHost = opts?.hostname?.trim().toLowerCase() ?? '';
  if (nextHost && isLocalDevHostname(nextHost)) {
    return true;
  }

  const fromHdr = hostnameFromHostHeader(opts?.hostHeader ?? null);
  if (fromHdr && isLocalDevHostname(fromHdr)) {
    return true;
  }

  const env = process.env.NODE_ENV;
  return env === 'development' || env === 'test';
}

export function isPortalRoutePath(pathname: string): boolean {
  return pathname === '/portal' || pathname.startsWith('/portal/');
}
