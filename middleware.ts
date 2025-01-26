import { NextRequest, NextResponse } from 'next/server';
import { verifyJWT } from './utils/helpers';

const PUBLIC_ROUTES = ['/auth/login', '/auth/register'];
const API_PUBLIC_ROUTES = ['/api/auth/login', '/api/auth/register'];

export async function middleware(req: NextRequest) {
  try {
    const url = req.nextUrl.clone();
    const token = req.cookies.get('token')?.value;

    // Handle API routes
    if (url.pathname.startsWith('/api')) {
      if (API_PUBLIC_ROUTES.some((route) => url.pathname.startsWith(route))) {
        return NextResponse.next();
      }

      if (!token) {
        return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
      }

      try {
        await verifyJWT(token);
        return NextResponse.next();
      } catch {
        return NextResponse.json({ message: 'Invalid Token' }, { status: 401 });
      }
    }

    // Handle public routes (auth pages)
    if (PUBLIC_ROUTES.includes(url.pathname)) {
      if (!token) return NextResponse.next();

      try {
        await verifyJWT(token);
        const redirectUrl = `${req.nextUrl.origin}/dashboard`;
        return NextResponse.redirect(redirectUrl);
      } catch {
        return NextResponse.next();
      }
    }

    // Handle root route (/)
    if (url.pathname === '/') {
      if (!token) {
        const redirectUrl = `${req.nextUrl.origin}/auth/login`;
        return NextResponse.redirect(redirectUrl);
      }

      try {
        await verifyJWT(token);
        const redirectUrl = `${req.nextUrl.origin}/dashboard`;
        return NextResponse.redirect(redirectUrl);
      } catch {
        const redirectUrl = `${req.nextUrl.origin}/auth/login`;
        const response = NextResponse.redirect(redirectUrl);
        response.cookies.delete('token');
        return response;
      }
    }

    // Handle dashboard routes
    if (url.pathname.startsWith('/dashboard')) {
      if (!token) {
        const redirectUrl = `${req.nextUrl.origin}/auth/login`;
        return NextResponse.redirect(redirectUrl);
      }

      try {
        await verifyJWT(token);
        return NextResponse.next();
      } catch {
        const redirectUrl = `${req.nextUrl.origin}/auth/login`;
        const response = NextResponse.redirect(redirectUrl);
        response.cookies.delete('token');
        return response;
      }
    }

    // Default case (allow the request to proceed)
    return NextResponse.next();
  } catch (error) {
    console.error('Middleware error:', error);
    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

export const config = {
  matcher: ['/api/:path*', '/dashboard/:path*', '/dashboard', '/', '/auth/:path*'],
};
