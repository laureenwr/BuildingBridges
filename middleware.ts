import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import { userHasAdminAccess } from '@/lib/auth/admin-emails';
import { allowSignupPost } from '@/lib/auth/signup-http-limit';
import { getPostLoginHref } from '@/lib/nav/dashboard-href';

// Define protected paths by role
const adminOnlyPaths = [
  '/dashboard/admin',
  '/dashboard/settings/users',
  '/portal/admin',
];

const mentorOnlyPaths = [
  '/dashboard/mentor'
];

const studentOnlyPaths = [
  '/dashboard/student'
];

// Public paths that don't require authentication
const publicPaths = [
  '/',
  '/sign-in',
  '/sign-up',
  '/reset-password',
  '/dashboard/mentors',
  '/mentors',
  '/contact',
  '/about',
  '/partners',
  '/team',
  '/workshops',
  '/activity',
  '/roadmap',
  '/imprint',
  '/glossary',
  '/story-tool',
  '/stories',
  '/videos',
  '/tos',
  '/privacy-policy',
  '/api/webhooks/stripe',
  '/onboarding',
  '/design-system',
  '/accessibility',
];

const isPublicPath = (path: string) => {
  return publicPaths.some(publicPath => 
    path === publicPath || 
    path.startsWith(`${publicPath}/`) ||
    path.match(/\.(jpg|jpeg|png|webp|svg|ico|css|js|mp4|webm|html)$/)
  );
};

const isAdminOnlyPath = (path: string) => {
  return adminOnlyPaths.some(adminPath => 
    path === adminPath || 
    path.startsWith(`${adminPath}/`)
  );
};

const isMentorOnlyPath = (path: string) => {
  return mentorOnlyPaths.some(mentorPath => 
    path === mentorPath || 
    path.startsWith(`${mentorPath}/`)
  );
};

const isStudentOnlyPath = (path: string) => {
  return studentOnlyPaths.some(studentPath => 
    path === studentPath || 
    path.startsWith(`${studentPath}/`)
  );
};

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === '/vision' || pathname === '/vision/') {
    return NextResponse.redirect(new URL('/', request.url), 308);
  }

  if (pathname === '/sign-up' && request.method === 'POST') {
    const ip =
      request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
      request.headers.get('x-real-ip') ||
      'anonymous';
    if (!allowSignupPost(ip)) {
      return NextResponse.redirect(new URL('/sign-up?error=too-many-signups', request.url));
    }
  }
  
  // Direct server-side redirect for mentors path
  if (pathname === '/dashboard/mentors' || pathname === '/dashboard/mentors/') {
    return NextResponse.redirect(new URL('/mentors', request.url));
  }

  // Allow public paths
  if (isPublicPath(pathname)) {
    return NextResponse.next();
  }

  // For all other paths, check authentication (edge-safe)
  const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });
  if (!token) {
    const signIn = new URL('/sign-in', request.url);
    const dest = `${pathname}${request.nextUrl.search || ''}`;
    if (dest.startsWith('/') && !dest.startsWith('//')) {
      signIn.searchParams.set('redirect', dest);
    }
    return NextResponse.redirect(signIn);
  }
  
  const userRole = typeof (token as { role?: unknown }).role === 'string'
    ? (token as { role: string }).role
    : undefined;
  const userEmail = typeof (token as { email?: unknown }).email === 'string'
    ? (token as { email: string }).email
    : undefined;
  const accessUser = { role: userRole, email: userEmail };

  if (pathname === '/dashboard' || pathname === '/dashboard/') {
    return NextResponse.redirect(new URL(getPostLoginHref(accessUser), request.url));
  }

  if (isAdminOnlyPath(pathname) && !userHasAdminAccess(accessUser)) {
    return NextResponse.redirect(new URL('/portal', request.url));
  }
  
  if (isMentorOnlyPath(pathname) && userRole !== 'MENTOR' && !userHasAdminAccess(accessUser)) {
    return NextResponse.redirect(new URL(getPostLoginHref(accessUser), request.url));
  }
  
  if (isStudentOnlyPath(pathname) && userRole !== 'STUDENT') {
    return NextResponse.redirect(new URL(getPostLoginHref(accessUser), request.url));
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/portal',
    '/portal/:path*',
    '/((?!api|_next/static|_next/image|favicon.ico|api/auth).*)',
  ],
};
