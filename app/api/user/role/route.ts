import { NextResponse } from 'next/server';
import { getUser } from '@/lib/db/queries';

export async function GET() {
  try {
    const user = await getUser();
    if (!user) {
      return NextResponse.json({ role: null }, { status: 200 });
    }
    return NextResponse.json({ role: user.role }, { status: 200 });
  } catch (error) {
    console.error('Error fetching user role:', error);
    return NextResponse.json({ role: null }, { status: 200 });
  }
}
