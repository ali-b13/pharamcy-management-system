import { NextRequest, NextResponse } from 'next/server';
import { verifyJWT } from './utils/helpers';

export const middleware = async (req: NextRequest) => {
  const token = req.cookies.get('token')?.value;
  const loginUrl = new URL('/auth/login', req.url);
  const dashboardUrl = new URL('/dashboard', req.url);

  // Add public routes that don't require authentication
  const publicRoutes = ['/auth/login', '/auth/register'];
  
  // 1. Handle public routes first
  if (publicRoutes.includes(req.nextUrl.pathname)) {
    if (token) {
      try {
        await verifyJWT(token);
        // Valid token, redirect from login to dashboard
        return NextResponse.redirect(dashboardUrl);
      } catch (error) {
        // Invalid token, clear cookie and allow access to login
        const response = NextResponse.next();
        response.cookies.delete('token');
        return response;
      }
    }
    return NextResponse.next();
  }

  // 2. Handle protected routes
  try {
    if (!token) throw new Error('No token found');
    
    // Verify token and get decoded data
    const decoded = await verifyJWT(token);
    
    // Add user data to request headers
    const requestHeaders = new Headers(req.headers);
    requestHeaders.set('x-user-id', decoded.id as string);
    requestHeaders.set('x-user-role', decoded.role as string);

    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
  } catch (error) {
    // Clear invalid token and redirect to login
    const response = NextResponse.redirect(loginUrl);
    response.cookies.delete('token');
    return response;
  }
};

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/settings',
    // Exclude public routes from middleware
    '/((?!api|_next/static|_next/image|favicon.ico).*)'
  ],
};