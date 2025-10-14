import { NextResponse } from 'next/server';
import { listPublishedWorkshops } from '@/lib/db/workshops';

export async function GET() {
  try {
    // Avoid DB access during static build to keep builds clean
    if (process.env.NEXT_PHASE === 'phase-production-build' || process.env.SKIP_DB === 'true') {
      return NextResponse.json({ ok: true, data: [] });
    }
    const data = await listPublishedWorkshops();
    return NextResponse.json({ ok: true, data });
  } catch (e: any) {
    // Fail soft to avoid breaking dashboard pages; reduce noise during build
    if (process.env.NEXT_PHASE !== 'phase-production-build') {
      console.warn('GET /api/workshops error (suppressed during build):', e?.message || e);
    }
    return NextResponse.json({ ok: true, data: [] }, { status: 200 });
  }
}


