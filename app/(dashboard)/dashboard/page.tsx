import { getUser } from '@/lib/db/queries';
import { getPostLoginHref } from '@/lib/nav/dashboard-href';
import { redirect } from 'next/navigation';

export const dynamic = 'force-dynamic';

export default async function DashboardPage() {
  const user = await getUser();

  if (!user) {
    redirect('/sign-in?redirect=/logged-in');
  }

  redirect(getPostLoginHref(user.role));
}
