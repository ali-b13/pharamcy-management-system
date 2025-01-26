import { NextRequest, NextResponse } from 'next/server';
import { verifyJWT } from './utils/helpers';

export async function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();
  const token = req.cookies.get('token')?.value;

  // Check if the user is trying to access a public route (login or register)
  const isPublicRoute = url.pathname.startsWith('/auth');
  
  // If no token and trying to access protected route like dashboard
  if (!token) {
    // Redirect to login if accessing a protected route
    if (!isPublicRoute) {
      const loginUrl = `${req.nextUrl.origin}/auth/login`;
      return NextResponse.redirect(loginUrl);
    }
  }

  // If there's a token and trying to access login or register, redirect to /dashboard
  if (token && isPublicRoute) {
    const dashboardUrl = `${req.nextUrl.origin}/dashboard`;
    return NextResponse.redirect(dashboardUrl);
  }

  // If user is at the root ("/") and there is no token, redirect to login
  if (url.pathname === '/') {
    if (token) {
      const dashboardUrl = `${req.nextUrl.origin}/dashboard`;
      return NextResponse.redirect(dashboardUrl); // Redirect to dashboard if token exists
    } else {
      const loginUrl = `${req.nextUrl.origin}/auth/login`;
      return NextResponse.redirect(loginUrl); // Redirect to login if no token
    }
  }

  // If there's a valid token, proceed as normal
  try {
    if (token) {
      await verifyJWT(token); // Verify the token
      return NextResponse.next();
    }
  } catch (error) {
    console.error('Invalid token:', error);
    const response = NextResponse.redirect('/auth/login');
    response.cookies.delete('token'); // Delete invalid token
    return response;
  }

  // Default response: allow next action
  return NextResponse.next();
}

export const config = {
  matcher: ['/api/:path*', '/dashboard/:path*', '/dashboard', '/', '/auth/:path*'], // Apply middleware to relevant routes
};
