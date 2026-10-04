import { NextResponse } from 'next/server';
import { redirect } from 'next/navigation';
import { getUser } from '@/lib/db/queries';
import { userCanSubmitStories, userHasAdminAccess } from '@/lib/auth/admin-emails';
import type { User } from '@/lib/db/schema';

export async function requireSignedInUser(): Promise<User> {
  const user = await getUser();
  if (!user) {
    redirect('/sign-in');
  }
  return user;
}

export async function requireAdminUser(): Promise<User> {
  const user = await requireSignedInUser();
  if (!userHasAdminAccess(user)) {
    redirect('/portal');
  }
  return user;
}

export async function requireApiSignedInUser() {
  const user = await getUser();
  if (!user) {
    return {
      user: null,
      response: NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 }),
    };
  }
  return { user, response: null };
}

export async function requireApiStorySubmitter() {
  const result = await requireApiSignedInUser();
  if (result.response) return result;
  if (!userCanSubmitStories(result.user)) {
    return {
      user: null,
      response: NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 403 }),
    };
  }
  return result;
}

export async function requireApiAdminUser() {
  const result = await requireApiSignedInUser();
  if (result.response) return result;
  if (!userHasAdminAccess(result.user)) {
    return {
      user: null,
      response: NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 403 }),
    };
  }
  return result;
}
