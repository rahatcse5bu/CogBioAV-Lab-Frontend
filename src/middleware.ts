import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import * as jose from 'jose';

const JWT_SECRET = process.env.JWT_SECRET || 'cogbioav-lab-secret-key-2024';

export async function middleware(request: NextRequest) {
  const isAdminRoute = request.nextUrl.pathname.startsWith('/admin');
  const isMyProfileRoute = request.nextUrl.pathname.startsWith('/my-profile');
  const isLoginPage = request.nextUrl.pathname === '/admin/login';
  const authCookie = request.cookies.get('admin_auth');

  // For login page - if already logged in, redirect appropriately
  if (isLoginPage && authCookie) {
    try {
      const secret = new TextEncoder().encode(JWT_SECRET);
      const { payload } = await jose.jwtVerify(authCookie.value, secret);
      
      if (payload.role === 'member') {
        return NextResponse.redirect(new URL('/my-profile', request.url));
      }
      return NextResponse.redirect(new URL('/admin', request.url));
    } catch {
      // Invalid token, let them see login page
      return NextResponse.next();
    }
  }

  // For admin routes (except login)
  if (isAdminRoute && !isLoginPage) {
    if (!authCookie) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }

    try {
      const secret = new TextEncoder().encode(JWT_SECRET);
      const { payload } = await jose.jwtVerify(authCookie.value, secret);
      
      // Members cannot access admin routes - only 'admin' and 'super_admin' can
      if (payload.role === 'member') {
        return NextResponse.redirect(new URL('/my-profile', request.url));
      }
      
      return NextResponse.next();
    } catch {
      // Invalid token, redirect to login
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
  }

  // For my-profile route
  if (isMyProfileRoute) {
    if (!authCookie) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }

    try {
      const secret = new TextEncoder().encode(JWT_SECRET);
      await jose.jwtVerify(authCookie.value, secret);
      return NextResponse.next();
    } catch {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/my-profile/:path*'],
};
