import { NextRequest, NextResponse } from 'next/server';
import { verifyJWT } from './utils/helpers';

const PUBLIC_ROUTES = ['/auth/login', '/auth/register']; // Publicly accessible routes
const API_PUBLIC_ROUTES = ['/api/auth/login', '/api/auth/register']; // Publicly accessible API routes

export async function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();
  const token = req.cookies.get('token')?.value;

  const isApiRequest = url.pathname.startsWith('/api');
  const isPublicRoute = PUBLIC_ROUTES.includes(url.pathname);
  const isPublicApiRoute = API_PUBLIC_ROUTES.some((route) => url.pathname.startsWith(route));
  const isProtectedRoute = ['/dashboard', '/'].some((route) => url.pathname === route || url.pathname.startsWith(`${route}/`));

  // API Requests Handling
  if (isApiRequest) {
    if (isPublicApiRoute) {
      return NextResponse.next(); // Allow public APIs
    }

    if (!token) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 }); // Block protected APIs
    }

    try {
      await verifyJWT(token);
      return NextResponse.next(); // Allow protected APIs with valid token
    } catch {
      return NextResponse.json({ message: 'Invalid Token' }, { status: 401 });
    }
  }

  // Public Route Handling
  if (isPublicRoute) {
    if (!token) {
      return NextResponse.next(); // Allow public routes when not logged in
    }

    try {
      await verifyJWT(token);
      url.pathname = '/dashboard'; // Redirect to dashboard if already logged in
      return NextResponse.redirect(url);
    } catch {
      return NextResponse.next(); // Allow public route if token is invalid
    }
  }

  // Protected Route Handling (/dashboard or /)
  if (isProtectedRoute) {
    if (!token) {
      url.pathname = '/auth/login'; // Redirect to login if not logged in
      return NextResponse.redirect(url);
    }

    try {
      await verifyJWT(token);
      return NextResponse.next(); // Allow access if token is valid
    } catch {
      const response = NextResponse.redirect('/auth/login');
      response.cookies.delete('token'); // Clear invalid token
      return response;
    }
  }

  // Allow all other routes by default
  return NextResponse.next();
}

export const config = {
  matcher: ['/api/:path*', '/dashboard/:path*', '/dashboard', '/', '/auth/:path*'], // Apply middleware to relevant routes
};
