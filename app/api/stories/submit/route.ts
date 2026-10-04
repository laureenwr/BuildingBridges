import { NextRequest, NextResponse } from 'next/server';
import { sql } from 'drizzle-orm';
import { requireApiStorySubmitter } from '@/lib/auth/access';
import { db } from '@/lib/db';

export const runtime = 'nodejs';

type StorySubmitBody = {
  sessionId?: unknown;
  consent?: unknown;
  story?: {
    title?: unknown;
    summary?: unknown;
    timeline?: unknown;
    quotes?: unknown;
    empowermentMessage?: unknown;
  };
  conversation?: unknown;
};

type ValidStorySubmitBody = {
  sessionId: string;
  consent: boolean;
  story: {
    title: string;
    summary: string;
    timeline: unknown[];
    quotes: unknown[];
    empowermentMessage: string;
  };
  conversation: unknown[];
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function isNonEmptyString(value: unknown): value is string {
  return typeof value === 'string' && value.trim().length > 0;
}

function getSafeDbTargetFromEnv() {
  const source = process.env.DATABASE_URL
    ? 'DATABASE_URL'
    : process.env.POSTGRES_URL
      ? 'POSTGRES_URL'
      : 'unset';
  const rawUrl = process.env.DATABASE_URL || process.env.POSTGRES_URL;

  if (!rawUrl) {
    return { source, hostname: null, database: null };
  }

  try {
    const url = new URL(rawUrl);
    const database = url.pathname.replace(/^\//, '').split('/')[0] || null;
    return { source, hostname: url.hostname || null, database };
  } catch {
    return { source, hostname: null, database: null };
  }
}

function parseBody(body: StorySubmitBody): { ok: true; data: ValidStorySubmitBody } | { ok: false; error: string } {
  if (!isNonEmptyString(body.sessionId)) return { ok: false, error: 'sessionId is required.' };
  if (typeof body.consent !== 'boolean') return { ok: false, error: 'consent must be a boolean.' };
  if (!isRecord(body.story)) return { ok: false, error: 'story is required.' };
  if (!isNonEmptyString(body.story.title)) return { ok: false, error: 'story.title is required.' };
  if (!isNonEmptyString(body.story.summary)) return { ok: false, error: 'story.summary is required.' };
  if (!Array.isArray(body.story.timeline)) return { ok: false, error: 'story.timeline must be an array.' };
  if (!Array.isArray(body.story.quotes)) return { ok: false, error: 'story.quotes must be an array.' };
  if (!isNonEmptyString(body.story.empowermentMessage)) {
    return { ok: false, error: 'story.empowermentMessage is required.' };
  }
  if (!Array.isArray(body.conversation)) return { ok: false, error: 'conversation must be an array.' };

  return {
    ok: true,
    data: {
      sessionId: body.sessionId.trim(),
      consent: body.consent,
      story: {
        title: body.story.title.trim(),
        summary: body.story.summary.trim(),
        timeline: body.story.timeline,
        quotes: body.story.quotes,
        empowermentMessage: body.story.empowermentMessage.trim(),
      },
      conversation: body.conversation,
    },
  };
}

export async function POST(request: NextRequest) {
  const auth = await requireApiStorySubmitter();
  if (auth.response) {
    return auth.response;
  }

  const configuredApiKey = process.env.STORIES_API_KEY;
  const incomingApiKey = request.headers.get('x-api-key');

  if (!configuredApiKey || incomingApiKey !== configuredApiKey) {
    return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
  }

  let body: StorySubmitBody;

  try {
    body = (await request.json()) as StorySubmitBody;
  } catch {
    return NextResponse.json({ success: false, message: 'Request body must be valid JSON.' }, { status: 400 });
  }

  try {
    const parsed = parseBody(body);

    if (!parsed.ok) {
      return NextResponse.json({ success: false, message: parsed.error }, { status: 400 });
    }

    const data = parsed.data;

    const envTarget = getSafeDbTargetFromEnv();
    console.info('[stories/submit diagnostic] env connection target', {
      source: envTarget.source,
      hostname: envTarget.hostname,
      database: envTarget.database,
    });

    const runtimeContext = await db.execute<{
      current_user: string;
      current_database: string;
      current_schema: string;
      search_path: string;
      public_stories_regclass: string | null;
    }>(sql`
      SELECT
        current_user AS current_user,
        current_database() AS current_database,
        current_schema() AS current_schema,
        current_setting('search_path') AS search_path,
        to_regclass('public.stories') AS public_stories_regclass
    `);
    console.info('[stories/submit diagnostic] runtime database context', {
      current_user: runtimeContext[0]?.current_user ?? null,
      current_database: runtimeContext[0]?.current_database ?? null,
      current_schema: runtimeContext[0]?.current_schema ?? null,
      search_path: runtimeContext[0]?.search_path ?? null,
      public_stories_regclass: runtimeContext[0]?.public_stories_regclass ?? null,
    });

    const inserted = await db.execute<{ id: number }>(sql`
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

    const createdStory = inserted[0];

    if (!createdStory?.id) {
      return NextResponse.json({ success: false, message: 'Failed to submit story.' }, { status: 500 });
    }

    return NextResponse.json({ success: true, id: createdStory.id });
  } catch (error) {
    console.error('Error submitting story:', error);
    return NextResponse.json({ success: false, message: 'Failed to submit story.' }, { status: 500 });
  }
}

