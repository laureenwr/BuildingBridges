import { NextResponse } from 'next/server';
import { listPublishedWorkshops } from '@/lib/db/workshops';

export async function GET() {
  try {
    const data = await listPublishedWorkshops();
    return NextResponse.json({ ok: true, data });
  } catch (e: any) {
    // Fail soft to avoid breaking dashboard pages
    console.error('GET /api/workshops error:', e);
    return NextResponse.json({ ok: true, data: [] }, { status: 200 });
  }
}


