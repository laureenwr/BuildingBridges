import { revalidatePath } from 'next/cache';
import { sql } from 'drizzle-orm';
import { db } from '@/lib/db';
import { asQueryRows } from '@/lib/db/query-rows';
import { isMissingUserIdColumn, type ValidStorySubmitBody } from '@/lib/stories/submit-helpers';

async function insertStory(data: ValidStorySubmitBody, submitterId: number, includeUserId: boolean) {
  if (includeUserId) {
    return db.execute<{ id: number }>(sql`
      INSERT INTO stories (
        session_id,
        user_id,
        title,
        summary,
        timeline,
        quotes,
        empowerment_message,
        raw_conversation,
        consent_given,
        status
      ) VALUES (
        ${data.sessionId},
        ${submitterId},
        ${data.story.title},
        ${data.story.summary},
        CAST(${JSON.stringify(data.story.timeline)} AS jsonb),
        CAST(${JSON.stringify(data.story.quotes)} AS jsonb),
        ${data.story.empowermentMessage},
        CAST(${JSON.stringify(data.conversation)} AS jsonb),
        ${data.consent},
        ${'pending_review'}
      )
      RETURNING id
    `);
  }

  return db.execute<{ id: number }>(sql`
    INSERT INTO stories (
      session_id,
      title,
      summary,
      timeline,
      quotes,
      empowerment_message,
      raw_conversation,
      consent_given,
      status
    ) VALUES (
      ${data.sessionId},
      ${data.story.title},
      ${data.story.summary},
      CAST(${JSON.stringify(data.story.timeline)} AS jsonb),
      CAST(${JSON.stringify(data.story.quotes)} AS jsonb),
      ${data.story.empowermentMessage},
      CAST(${JSON.stringify(data.conversation)} AS jsonb),
      ${data.consent},
      ${'pending_review'}
    )
    RETURNING id
  `);
}

export async function submitStoryRecord(data: ValidStorySubmitBody, submitterId: number) {
  const existing = asQueryRows<{ id: number }>(
    await db.execute(sql`
      SELECT id FROM stories WHERE session_id = ${data.sessionId} LIMIT 1
    `)
  );
  if (existing[0]?.id) {
    return { id: existing[0].id, reused: true as const };
  }

  let inserted;
  try {
    inserted = await insertStory(data, submitterId, true);
  } catch (error) {
    if (!isMissingUserIdColumn(error)) throw error;
    console.error(
      'stories.user_id is missing; submitting without submitter link. Apply lib/db/migrations/0007_stories_user_id.sql when approved.'
    );
    inserted = await insertStory(data, submitterId, false);
  }

  const created = asQueryRows<{ id: number }>(inserted)[0];
  if (!created?.id) {
    throw new Error('Story insert did not return an id.');
  }

  try {
    revalidatePath('/portal');
    revalidatePath('/portal/admin/stories');
    revalidatePath('/portal/admin/stories/review');
    revalidatePath('/portal/stories');
  } catch {
    /* revalidate only works inside a Next.js request */
  }

  return { id: created.id, reused: false as const };
}
