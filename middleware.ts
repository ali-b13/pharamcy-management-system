import { NextRequest, NextResponse } from 'next/server';
import { verifyJWT } from './utils/helpers';




export const middleware = async (req: NextRequest) => {
  const token = req.cookies.get('token')?.value;

  // Check if the user is authenticated
 
  if (token) {
    try {
      await verifyJWT(token);
      
      // If the user is already logged in and tries to access /auth/login, redirect to /dashboard
      if (req.nextUrl.pathname === '/auth/login') {
        return NextResponse.redirect(new URL('/dashboard', req.url));
      }

      // If authenticated, allow access to the requested route
      return NextResponse.next();
    } catch (error) {
      console.error('Error verifying token:', error);
      // Redirect to login if the token is invalid
      return NextResponse.redirect(new URL('/auth/login', req.url));
    }
  } else {
    // If the user is not authenticated and trying to access a protected route, redirect to login
    if (req.nextUrl.pathname.startsWith('/auth/login')) {
      return NextResponse.next();
    }
    return NextResponse.redirect(new URL('/auth/login', req.url));

  }
};

export const config = {
  matcher: ['/dashboard/:path*', '/','/settings','/auth/login'], // Specify which routes to protect and which to allow
};


