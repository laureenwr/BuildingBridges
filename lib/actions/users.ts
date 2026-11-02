'use server';

import { and, eq, isNull, sql } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';
import { requireAdminUser } from '@/lib/auth/access';
import { accountRemovalSuccessMessage } from '@/lib/auth/account-removal';
import { db } from '@/lib/db/drizzle';
import { sessions, stories, users } from '@/lib/db/schema';

export type DeleteAccountResult = {
  type: 'success' | 'error';
  message: string;
  storyCount?: number;
};

function parseUserId(value: FormDataEntryValue | null) {
  const raw = typeof value === 'string' ? value.trim() : '';
  const id = Number.parseInt(raw, 10);
  return Number.isInteger(id) && id > 0 ? id : null;
}

export async function deleteRegisteredUserAction(formData: FormData): Promise<DeleteAccountResult> {
  const admin = await requireAdminUser();
  const userId = parseUserId(formData.get('userId'));

  if (!userId) {
    return { type: 'error', message: 'That account could not be found.' };
  }

  if (userId === admin.id) {
    return { type: 'error', message: 'You cannot delete your own account from this page.' };
  }

  const [target] = await db
    .select({
      id: users.id,
      email: users.email,
      name: users.name,
    })
    .from(users)
    .where(and(eq(users.id, userId), isNull(users.deletedAt)))
    .limit(1);

  if (!target) {
    return { type: 'error', message: 'That account could not be found or is already removed.' };
  }

  let storyCount = 0;
  try {
    const storyRows = await db
      .select({ n: sql<number>`count(*)::int` })
      .from(stories)
      .where(eq(stories.userId, userId));
    storyCount = Number(storyRows[0]?.n ?? 0);
  } catch (error) {
    console.error('Could not count stories before account removal:', error);
  }

  await db
    .update(users)
    .set({
      deletedAt: new Date(),
      updatedAt: new Date(),
    })
    .where(eq(users.id, userId));

  try {
    await db.delete(sessions).where(eq(sessions.userId, userId));
  } catch {
    // JWT sessions are the live auth path; database sessions are optional.
  }

  revalidatePath('/portal/admin');
  revalidatePath('/portal/admin/users/pending');
  revalidatePath('/portal/admin/stories/review');
  revalidatePath('/portal/admin/stories/published');
  revalidatePath('/stories');

  return {
    type: 'success',
    message: accountRemovalSuccessMessage(target.email, storyCount),
    storyCount,
  };
}
