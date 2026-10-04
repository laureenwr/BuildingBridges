import { redirect } from 'next/navigation';
import { userHasAdminAccess } from '@/lib/auth/admin-emails';
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
  if (requested === '/portal/admin') {
    redirect(userHasAdminAccess(user) ? '/portal/admin' : '/portal');
  }
  if (requested === '/portal') {
    redirect('/portal');
  }
  if (requested === '/story-tool') {
    redirect('/story-tool');
  }

  redirect(getPostLoginHref(user));
}
