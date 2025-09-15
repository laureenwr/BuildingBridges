import 'server-only';
import { desc, eq } from 'drizzle-orm';
import { db } from './drizzle';
import { workshops, workshopEnrollments } from './schema';

export async function listPublishedWorkshops() {
  return await db
    .select()
    .from(workshops)
    .where(eq(workshops.status, 'PUBLISHED'))
    .orderBy(desc(workshops.startsAt));
}

export async function getWorkshopBySlug(slug: string) {
  const result = await db
    .select()
    .from(workshops)
    .where(eq(workshops.slug, slug))
    .limit(1);
  return result[0] ?? null;
}

export async function enrollInWorkshop(userId: number, workshopId: number) {
  try {
    await db.insert(workshopEnrollments).values({ workshopId, userId });
    return { ok: true };
  } catch (e) {
    return { ok: false, error: 'Already enrolled or invalid.' };
  }
}


