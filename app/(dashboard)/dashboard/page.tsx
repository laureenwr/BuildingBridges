import { getUser } from '@/lib/db/queries';
import { MentorDashboard } from '../components/mentor-dashboard';
import { StudentDashboard } from '../components/student-dashboard';
import { getPostLoginHref } from '@/lib/nav/dashboard-href';
import { redirect } from 'next/navigation';

export const dynamic = 'force-dynamic';

export default async function DashboardPage() {
  const user = await getUser();

  if (!user) {
    redirect('/sign-in?redirect=/logged-in');
  }

  if (user.role === 'ADMIN') {
    redirect(getPostLoginHref(user.role));
  }

  if (user.role === 'MENTOR') {
    return <MentorDashboard />;
  }

  return <StudentDashboard />;
}
