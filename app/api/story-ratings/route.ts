import { createHash } from 'crypto';
import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { storyFormatRatings } from '@/lib/db/schema';

export const runtime = 'nodejs';

const ALLOWED_FORMATS = new Set([
  'immersive',
  'card',
  'video',
  'timeline',
  'quotes',
  'globe',
  'album',
]);

const RATING_KEYS = ['recognition', 'less_alone', 'stronger', 'felt_story', 'respect'] as const;
const ALLOWED_BODY_KEYS = new Set(['story_key', 'format', 'website', ...RATING_KEYS]);
const STORY_KEY_PATTERN = /^[a-z0-9-]{1,80}$/;
const WINDOW_MS = 60_000;
const MAX_REQUESTS_PER_WINDOW = 20;

const hitsByCaller = new Map<string, number[]>();

type RatingKey = (typeof RATING_KEYS)[number];
type RatingValues = Partial<Record<RatingKey, number>>;

function ratingsEnabled() {
  return process.env.NEXT_PUBLIC_STORY_RATINGS_ENABLED === 'true';
}

function genericError(status: number) {
  return NextResponse.json({ ok: false, message: 'Could not save rating.' }, { status });
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function memoryCallerKey(request: NextRequest) {
  const ip =
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    request.headers.get('x-real-ip')?.trim() ||
    'anonymous';
  return createHash('sha256').update(ip).digest('hex');
}

function allowRequest(request: NextRequest) {
  const key = memoryCallerKey(request);
  const now = Date.now();
  const recent = (hitsByCaller.get(key) ?? []).filter((stamp) => now - stamp < WINDOW_MS);
  if (recent.length >= MAX_REQUESTS_PER_WINDOW) {
    hitsByCaller.set(key, recent);
    return false;
  }
  recent.push(now);
  hitsByCaller.set(key, recent);
  return true;
}

function parseRatings(body: Record<string, unknown>): { ok: true; ratings: RatingValues } | { ok: false } {
  const ratings: RatingValues = {};
  for (const key of RATING_KEYS) {
    if (!(key in body) || body[key] === null || body[key] === undefined) continue;
    const value = body[key];
    if (typeof value !== 'number' || !Number.isInteger(value) || value < 1 || value > 5) {
      return { ok: false };
    }
    ratings[key] = value;
  }
  if (Object.keys(ratings).length === 0) return { ok: false };
  return { ok: true, ratings };
}

export async function POST(request: NextRequest) {
  if (!ratingsEnabled()) {
    return NextResponse.json({ ok: false, message: 'Not found.' }, { status: 404 });
  }

  if (!allowRequest(request)) {
    return genericError(429);
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return genericError(400);
  }

  if (!isRecord(body)) {
    return genericError(400);
  }

  const honeypot = body.website;
  if (typeof honeypot === 'string' ? honeypot.trim() !== '' : honeypot != null) {
    return NextResponse.json({ ok: true });
  }

  for (const key of Object.keys(body)) {
    if (!ALLOWED_BODY_KEYS.has(key)) {
      return genericError(400);
    }
  }

  const storyKey = body.story_key;
  const format = body.format;
  if (typeof storyKey !== 'string' || !STORY_KEY_PATTERN.test(storyKey)) {
    return genericError(400);
  }
  if (typeof format !== 'string' || !ALLOWED_FORMATS.has(format)) {
    return genericError(400);
  }

  const parsed = parseRatings(body);
  if (!parsed.ok) {
    return genericError(400);
  }

  try {
    await db.insert(storyFormatRatings).values({
      storyKey,
      format,
      recognition: parsed.ratings.recognition,
      lessAlone: parsed.ratings.less_alone,
      stronger: parsed.ratings.stronger,
      feltStory: parsed.ratings.felt_story,
      respect: parsed.ratings.respect,
    });
  } catch {
    return genericError(500);
  }

  return NextResponse.json({ ok: true });
}
