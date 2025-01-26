import { NextRequest, NextResponse } from 'next/server';
import { verifyJWT } from './utils/helpers';

export const middleware = async (req: NextRequest) => {
  const token = req.cookies.get('token')?.value;
  const loginUrl = new URL('/auth/login', req.url);
  const dashboardUrl = new URL('/dashboard', req.url);

  // Define public routes
  const publicPages = ['/auth/login', '/auth/register'];
  const publicAPIs = ['/api/auth/login', '/api/auth/register'];
  const publicRoutes = [...publicPages, ...publicAPIs];
  
  const currentPath = req.nextUrl.pathname;

  // Check if current path is a public route
  if (publicRoutes.includes(currentPath)) {
    if (publicPages.includes(currentPath)) {
      // Handle public page routes
      if (token) {
        try {
          await verifyJWT(token);
          // Valid token, redirect to dashboard
          return NextResponse.redirect(dashboardUrl);
        } catch (error) {
          // Invalid token, clear and proceed
          const response = NextResponse.next();
          response.cookies.delete('token');
          return response;
        }
      }
      // No token, proceed to the public page
      return NextResponse.next();
    } else {
      // Handle public API routes: allow without token
      return NextResponse.next();
    }
  }

  // Handle protected routes (both page and API)
  try {
    if (!token) throw new Error('No token found');
    
    // Verify token
    const decoded = await verifyJWT(token);
    
    // Add user data to headers
    const requestHeaders = new Headers(req.headers);
    requestHeaders.set('x-user-id', decoded.id as string);
    requestHeaders.set('x-user-role', decoded.role as string);

    // Continue request with new headers
    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
  } catch (error) {
    // Handle unauthorized access
    if (currentPath.startsWith('/api')) {
      // For API routes, return 401 JSON response
      return new NextResponse(
        JSON.stringify({ error: 'Unauthorized' }),
        { status: 401, headers: { 'Content-Type': 'application/json' } }
      );
    } else {
      // For page routes, redirect to login
      const response = NextResponse.redirect(loginUrl);
      response.cookies.delete('token');
      return response;
    }
  }
};

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/settings',
    // Include all routes except static files and favicon
    '/((?!_next/static|_next/image|favicon.ico).*)'
  ],
};