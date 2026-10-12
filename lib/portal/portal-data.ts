import { count, isNull, sql } from 'drizzle-orm';
import { requireAdminUser } from '@/lib/auth/access';
import { db } from '@/lib/db/drizzle';
import { stories, users } from '@/lib/db/schema';
import { getWorkshopFeed } from '@/components/workshops/workshop-data';
import type { AppLanguage } from '@/lib/hooks/useLanguage';

export function greetingFirstName(
  user: { name?: string | null; email?: string | null },
  fallback = 'there'
): string {
  const name = user.name?.trim();
  if (name) return name.split(/\s+/)[0]!;
  const email = user.email?.trim();
  if (email?.includes('@')) return email.split('@')[0]!;
  return fallback;
}

export type PortalEvent = {
  id: string;
  title: string;
  date: string;
  time: string;
  format: string;
};

export function getPortalUpcomingEvents(lang: AppLanguage): PortalEvent[] {
  return getWorkshopFeed(lang)
    .slice(0, 3)
    .map((workshop) => ({
      id: workshop.id,
      title: workshop.title,
      date: workshop.date,
      time: workshop.time,
      format: workshop.modeLabel || workshop.location,
    }));
}

export type StoryCounts = {
  total: number;
  pending: number;
  approved: number;
  rejected: number;
};

export async function getStoryCounts(): Promise<StoryCounts> {
  try {
    const rows = await db
      .select({
        status: stories.status,
        n: count(),
      })
      .from(stories)
      .groupBy(stories.status);

    const byStatus = Object.fromEntries(rows.map((row) => [row.status, Number(row.n)])) as Record<
      string,
      number
    >;

    const pending = byStatus.pending_review ?? 0;
    const approved = byStatus.approved ?? 0;
    const rejected = byStatus.rejected ?? 0;

    return {
      total: pending + approved + rejected,
      pending,
      approved,
      rejected,
    };
  } catch (error) {
    console.error('Failed to load story counts:', error);
    return { total: 0, pending: 0, approved: 0, rejected: 0 };
  }
}

export type PortalUserRow = {
  id: string;
  user: string;
  role: string;
  joinedOn: string;
};

function formatJoinedOn(value: Date | string | null) {
  if (!value) return '—';
  const date = value instanceof Date ? value : new Date(value);
  if (Number.isNaN(date.getTime())) return '—';
  return new Intl.DateTimeFormat('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(date);
}

function roleLabel(role: string) {
  if (role === 'ADMIN') return 'Admin';
  if (role === 'MENTOR') return 'Mentor';
  return 'Mentee';
}

function asAccountRole(value: string): ManagedAccountRow['role'] {
  const role = value.trim().toUpperCase();
  if (role === 'ADMIN' || role === 'MENTOR') return role;
  return 'STUDENT';
}

function accountDisplayName(name: string | null | undefined, email: string) {
  const trimmed = name?.trim();
  if (trimmed) return trimmed;
  if (email.includes('@')) return email.split('@')[0]!;
  return email;
}

export type ManagedAccountRow = {
  id: number;
  name: string | null;
  email: string;
  role: 'ADMIN' | 'STUDENT' | 'MENTOR';
  createdAtLabel: string;
};

type AccountQueryRow = {
  id: number;
  name: string | null;
  email: string;
  role: string;
  created_at: Date | string;
};

function asQueryRows<T>(result: unknown): T[] {
  if (Array.isArray(result)) return result as T[];
  if (result && typeof result === 'object' && 'rows' in result) {
    const rows = (result as { rows?: unknown }).rows;
    if (Array.isArray(rows)) return rows as T[];
  }
  return [];
}

async function loadActiveAccounts(limit = 1000): Promise<ManagedAccountRow[]> {
  const result = await db.execute<AccountQueryRow>(sql`
    SELECT id, name, email, role::text AS role, created_at
    FROM users
    WHERE deleted_at IS NULL
    ORDER BY created_at DESC
    LIMIT ${limit}
  `);

  return asQueryRows<AccountQueryRow>(result).map((row) => ({
    id: Number(row.id),
    name: accountDisplayName(row.name, row.email),
    email: row.email,
    role: asAccountRole(String(row.role ?? '')),
    createdAtLabel: formatJoinedOn(row.created_at),
  }));
}

export async function getRegisteredUsers(limit = 50): Promise<PortalUserRow[]> {
  await requireAdminUser();

  try {
    const rows = await loadActiveAccounts(limit);
    return rows.map((row) => ({
      id: String(row.id),
      user: row.name?.trim() || row.email,
      role: roleLabel(row.role),
      joinedOn: row.createdAtLabel,
    }));
  } catch (error) {
    console.error('Failed to load registered users:', error);
    return [];
  }
}

export async function getManagedAccounts(limit = 500): Promise<ManagedAccountRow[]> {
  await requireAdminUser();
  return loadActiveAccounts(limit);
}

export async function getUserCount(): Promise<number> {
  try {
    const rows = await db
      .select({ n: sql<number>`count(*)::int` })
      .from(users)
      .where(isNull(users.deletedAt));
    return Number(rows[0]?.n ?? 0);
  } catch (error) {
    console.error('Failed to load user count:', error);
    return 0;
  }
}
