import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  // Auth condition
  const isAuthRoute = req.nextUrl.pathname.startsWith('/(auth)');
  const isProtectedRoute = req.nextUrl.pathname.startsWith('/dashboard');

  // Redirect if logged in and trying to access auth routes
  if (session && isAuthRoute) {
    return NextResponse.redirect(new URL('/dashboard', req.url));
  }

  // Redirect if not logged in and trying to access protected routes
  if (!session && isProtectedRoute) {
    return NextResponse.redirect(new URL('/signin', req.url));
  }

  return res;
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}; 