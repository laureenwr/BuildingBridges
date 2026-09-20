import { redirect } from 'next/navigation';
import { getUser } from '@/lib/db/queries';
import { getPostLoginHref } from '@/lib/nav/dashboard-href';

export const dynamic = 'force-dynamic';

/** Server-side home after login so ADMIN always lands on /portal/admin. */
export default async function LoggedInPage() {
  const user = await getUser();
  if (!user) {
    redirect('/sign-in');
  }
  redirect(getPostLoginHref(user.role));
}
