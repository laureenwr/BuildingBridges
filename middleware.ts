import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

// Define protected paths by role
const adminOnlyPaths = [
  '/dashboard/admin',
  '/dashboard/settings/users'
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
  '/dashboard/mentors',
  '/mentors',
  '/contact',
  '/about',
  '/partners',
  '/team',
  '/api/webhooks/stripe',
  '/onboarding',
  '/design-system'
];

const isPublicPath = (path: string) => {
  return publicPaths.some(publicPath => 
    path === publicPath || 
    path.startsWith(`${publicPath}/`) ||
    path.match(/\.(jpg|jpeg|png|webp|svg|ico|css|js)$/)
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
    // Redirect to sign-in if not authenticated
    return NextResponse.redirect(new URL('/sign-in', request.url));
  }
  
  const userRole = (token as any).role || 'STUDENT';
  
  // Role-based access control
  if (isAdminOnlyPath(pathname) && userRole !== 'ADMIN') {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }
  
  if (isMentorOnlyPath(pathname) && userRole !== 'MENTOR') {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }
  
  if (isStudentOnlyPath(pathname) && userRole !== 'STUDENT') {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|api/auth).*)'],
};
