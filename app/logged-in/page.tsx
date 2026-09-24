import { redirect } from 'next/navigation';
import { getUser } from '@/lib/db/queries';
import { getPostLoginHref, safeAuthRedirect } from '@/lib/nav/dashboard-href';

export const dynamic = 'force-dynamic';

/** Server-side home after login so Mentor and Admin land on their own portal. */
export default async function LoggedInPage({
  searchParams,
}: {
  searchParams?: { redirect?: string };
}) {
  const user = await getUser();
  if (!user) {
    redirect('/sign-in');
  }

  const requested = safeAuthRedirect(searchParams?.redirect);
  if (requested === '/portal' || requested === '/portal/admin') {
    redirect(requested);
  }

  redirect(getPostLoginHref(user.role));
}
