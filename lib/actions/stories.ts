'use server';

import { and, desc, eq, isNull, sql } from 'drizzle-orm';
import { cookies } from 'next/headers';
import { revalidatePath } from 'next/cache';
import { getToken } from 'next-auth/jwt';
import { userHasAdminAccess } from '@/lib/auth/admin-emails';
import { db } from '@/lib/db/drizzle';
import { getUser } from '@/lib/db/queries';
import { stories, users } from '@/lib/db/schema';

type StoryReviewActionState = {
  type: 'success' | 'error' | null;
  message: string;
};

function formatSubmittedOn(value: Date | string | null) {
  if (!value) return 'Unknown';
  const date = value instanceof Date ? value : new Date(value);
  if (Number.isNaN(date.getTime())) return 'Unknown';
  return new Intl.DateTimeFormat('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);
}

export type PublicApprovedStory = {
  id: number;
  title: string;
  summary: string;
  empowermentMessage: string;
  submittedOn: string;
  timeline: { label: string; text: string; quote: string; icon: string }[];
  quotes: { label: string; text: string }[];
};

function asRecord(value: unknown): Record<string, unknown> | null {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : null;
}

function asText(value: unknown): string {
  return typeof value === 'string' ? value.trim() : '';
}

function parseTimeline(value: unknown): PublicApprovedStory['timeline'] {
  if (!Array.isArray(value)) return [];
  return value
    .map((item) => {
      const row = asRecord(item);
      if (!row) return null;
      const text = asText(row.text);
      if (!text) return null;
      return {
        label: asText(row.label),
        text,
        quote: asText(row.quote),
        icon: asText(row.icon),
      };
    })
    .filter((item): item is PublicApprovedStory['timeline'][number] => item !== null);
}

function parseQuotes(value: unknown): PublicApprovedStory['quotes'] {
  if (!Array.isArray(value)) return [];
  return value
    .map((item) => {
      const row = asRecord(item);
      const text = row ? asText(row.text) : asText(item);
      if (!text) return null;
      return { label: row ? asText(row.label) : '', text };
    })
    .filter((item): item is PublicApprovedStory['quotes'][number] => item !== null);
}

export async function getApprovedStoriesForPublic(): Promise<PublicApprovedStory[]> {
  try {
    const rows = await db
      .select({
        id: stories.id,
        title: stories.title,
        summary: stories.summary,
        empowermentMessage: stories.empowermentMessage,
        timeline: stories.timeline,
        quotes: stories.quotes,
        createdAt: stories.createdAt,
      })
      .from(stories)
      .where(and(eq(stories.status, 'approved'), eq(stories.consentGiven, true)))
      .orderBy(desc(stories.createdAt));

    return rows.map((row) => ({
      id: row.id,
      title: row.title,
      summary: row.summary,
      empowermentMessage: row.empowermentMessage,
      submittedOn: formatSubmittedOn(row.createdAt),
      timeline: parseTimeline(row.timeline),
      quotes: parseQuotes(row.quotes),
    }));
  } catch (error) {
    console.error('Failed to load approved stories for public display:', error);
    return [];
  }
}

export async function getPendingStoriesForReview() {
  const rows = await db
    .select({
      id: stories.id,
      sessionId: stories.sessionId,
      title: stories.title,
      summary: stories.summary,
      consentGiven: stories.consentGiven,
      status: stories.status,
      createdAt: stories.createdAt,
    })
    .from(stories)
    .where(eq(stories.status, 'pending_review'))
    .orderBy(desc(stories.createdAt));

  return rows.map((row) => ({
    id: row.id,
    sessionId: row.sessionId,
    title: row.title,
    summary: row.summary,
    consentGiven: row.consentGiven,
    status: row.status,
    submittedOn: formatSubmittedOn(row.createdAt),
  }));
}

function asFormData(
  previousState: StoryReviewActionState | FormData,
  formData?: FormData
): FormData | null {
  if (formData instanceof FormData) return formData;
  if (previousState instanceof FormData) return previousState;
  return null;
}

async function reviewerIsAdmin(): Promise<boolean> {
  // Attach cookies so NextAuth can read the session inside a Server Action.
  const cookieStore = cookies();
  const user = await getUser();
  if (userHasAdminAccess(user)) return true;

  const cookieHeader = cookieStore
    .getAll()
    .map((cookie) => `${cookie.name}=${cookie.value}`)
    .join('; ');
  const token = await getToken({
    req: {
      headers: { cookie: cookieHeader },
      cookies: Object.fromEntries(cookieStore.getAll().map((cookie) => [cookie.name, cookie.value])),
    } as never,
    secret: process.env.NEXTAUTH_SECRET,
  });

  if (userHasAdminAccess({
    role: (token as { role?: string } | null)?.role,
    email: (token as { email?: string } | null)?.email,
  })) {
    return true;
  }

  const tokenEmail = (token as { email?: string } | null)?.email?.trim().toLowerCase();
  const tokenId = token?.sub ? parseInt(String(token.sub), 10) : NaN;

  if (tokenEmail) {
    const [dbUser] = await db
      .select({ role: users.role, email: users.email })
      .from(users)
      .where(and(eq(users.email, tokenEmail), isNull(users.deletedAt)))
      .limit(1);
    if (userHasAdminAccess(dbUser)) return true;
  }

  if (!Number.isNaN(tokenId)) {
    const [dbUser] = await db
      .select({ role: users.role, email: users.email })
      .from(users)
      .where(and(eq(users.id, tokenId), isNull(users.deletedAt)))
      .limit(1);
    if (userHasAdminAccess(dbUser)) return true;
  }

  return false;
}

function revalidateStoryPaths() {
  revalidatePath('/portal/admin');
  revalidatePath('/portal/admin/stories/review');
  revalidatePath('/portal/admin/stories/published');
  revalidatePath('/stories');
  revalidatePath('/story-tool');
}

export async function reviewStoryAction(
  previousState: StoryReviewActionState | FormData,
  formData?: FormData
): Promise<StoryReviewActionState> {
  try {
    if (!(await reviewerIsAdmin())) {
      return { type: 'error', message: 'Unauthorized. Only admins can review stories.' };
    }

    const data = asFormData(previousState, formData);
    if (!data) {
      return { type: 'error', message: 'Invalid review request.' };
    }

    const storyId = Number(data.get('storyId'));
    const decision = data.get('decision');

    if (!Number.isInteger(storyId) || storyId <= 0) {
      return { type: 'error', message: 'Invalid story ID.' };
    }

    if (decision === 'delete') {
      const deleted = await db.execute<{ id: number; title: string }>(sql`
        DELETE FROM stories
        WHERE id = ${storyId}
        RETURNING id, title
      `);
      const deletedStory = deleted[0];

      if (!deletedStory) {
        return { type: 'error', message: 'Story was not found or has already been deleted.' };
      }

      revalidateStoryPaths();
      return {
        type: 'success',
        message: `Story "${deletedStory.title}" was deleted.`,
      };
    }

    const nextStatus = decision === 'approve' ? 'approved' : decision === 'reject' ? 'rejected' : null;
    if (!nextStatus) {
      return { type: 'error', message: 'Invalid review decision.' };
    }

    const updated = await db.execute<{ id: number; title: string }>(sql`
      UPDATE stories
      SET status = ${nextStatus}
      WHERE id = ${storyId} AND status = 'pending_review'
      RETURNING id, title
    `);
    const updatedStory = updated[0];

    if (!updatedStory) {
      return {
        type: 'error',
        message: 'Story was not found or has already been reviewed.',
      };
    }

    revalidateStoryPaths();
    return {
      type: 'success',
      message: `Story "${updatedStory.title}" was ${nextStatus === 'approved' ? 'approved' : 'rejected'}.`,
    };
  } catch (error) {
    console.error('Error reviewing story:', error);
    return { type: 'error', message: 'Could not update the story review status.' };
  }
}

