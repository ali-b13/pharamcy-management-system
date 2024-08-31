import { NextRequest, NextResponse } from 'next/server';
import { serialize } from 'cookie';
import bcrypt from 'bcryptjs';
import { SignJWT } from 'jose';
import prisma from '@/utils/prismaDB'; // Ensure this points to your Prisma instance

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || 'niceTryDude1001'); // Store this in .env
const ADMIN_USERNAME = process.env.ADMIN_USERNAME || 'admin';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin';

export const POST = async (req: NextRequest) => {
  try {
    const { username, password } = await req.json();

    // Check if there are any users in the database
    const userCount = await prisma.user.count();

    // If no users exist, create a default admin user
    if (userCount === 0) {
      console.log('will create ',ADMIN_USERNAME,ADMIN_PASSWORD)
      const hashedPassword = bcrypt.hashSync(ADMIN_PASSWORD, 10);
      await prisma.user.create({
        data: {
          username: ADMIN_USERNAME,
          password: hashedPassword,
          mobile_number: "",
          role: "Admin",
        },
      });
    }

    // Fetch the user trying to log in
    const user = await prisma.user.findFirst({
      where: {
        username: username,
      },
    });

    if (!user || !bcrypt.compareSync(password, user.password)) {
      return NextResponse.json({ error: true, message: "كلمه المرور غير صحيحه", success: false }, { status: 401 });
    }

    // Create JWT token using jose
    const token = await new SignJWT({ userId: user.id, username: user.username })
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setExpirationTime('10d') // Token is valid for 10 days
      .sign(JWT_SECRET);

    // Set the cookie with the JWT token
    return new Response(
      JSON.stringify({ message: 'Login successful' }),
      {
        status: 200,
        headers: {
          'Set-Cookie': serialize('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 3600, // 1 hour
            path: '/',
            sameSite: 'lax', // Adjust as necessary
          }),
          'Content-Type': 'application/json',
        },
      }
    );
  } catch (error) {
    console.error('Login error:', error);
    return new Response(JSON.stringify({ message: 'Internal Server Error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};

