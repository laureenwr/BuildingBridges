import type { User } from '@/lib/db/schema';

/** // TEMP: Dashboard preview mode (remove before production) */
const FIXED_TS = new Date('2020-01-01T00:00:00.000Z');

/**
 * // TEMP: Dashboard preview mode (remove before production)
 * Mock mirrors: { name: "Amina", role: "mentee" } | { name: "Amina", role: "admin" }
 * (Schema uses STUDENT + ADMIN enums.)
 */
export function getDashboardPreviewMockUser(area: 'mentee' | 'admin'): User {
  return {
    id: 0,
    name: 'Amina',
    email: 'preview@dashboard.dev',
    passwordHash: '__dashboard_preview_mode__',
    role: area === 'admin' ? 'ADMIN' : 'STUDENT',
    createdAt: FIXED_TS,
    updatedAt: FIXED_TS,
    deletedAt: null,
  };
}
