'use server';

import { and, eq, isNull } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';
import { requireAdminUser } from '@/lib/auth/access';
import { db } from '@/lib/db/drizzle';
import { sessions, users } from '@/lib/db/schema';

export type DeleteAccountResult = {
  type: 'success' | 'error';
  message: string;
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

  return {
    type: 'success',
    message: `Removed account ${target.email}. They can no longer sign in. Submitted stories were not deleted.`,
  };
}
