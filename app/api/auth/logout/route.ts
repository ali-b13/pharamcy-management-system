import { verifyJWT } from "@/utils/helpers";
import { serialize } from "cookie";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
    try {
      const token = req.cookies.get('token')?.value;
        console.log(token,'token')
      if (!token) {
        return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
      }
  
      // Verify the JWT token
      try {
        const decoded = await verifyJWT(token);
  
        // Proceed with logout
        const cookie = serialize('token', '', {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          maxAge: -1, // Expire the cookie immediately
          path: '/',
        });
  
        return new Response(JSON.stringify({ message: 'Logged out successfully' }), {
          status: 200,
          headers: {
            'Set-Cookie': cookie,
            'Content-Type': 'application/json',
          },
        });
      } catch (error) {
        console.error('Error verifying token:', error);
        return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
      }
    } catch (error) {
      console.error('Logout error:', error);
      return new Response(JSON.stringify({ message: 'Internal Server Error' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }
  };