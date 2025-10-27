import { NextResponse } from 'next/server';
import { getWorkshop } from '@/lib/actions/workshops';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const workshopId = parseInt(params.id);
    const result = await getWorkshop(workshopId);

    if (result.error) {
      return NextResponse.json({ error: result.error }, { status: 404 });
    }

    return NextResponse.json({
      ok: true,
      data: result.workshop,
      enrollmentCount: result.enrollmentCount,
      files: result.files,
    });
  } catch (e: any) {
    console.error('GET /api/workshops/[id] error:', e);
    return NextResponse.json({ error: 'Failed to fetch workshop' }, { status: 500 });
  }
}
