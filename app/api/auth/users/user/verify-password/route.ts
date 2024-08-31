import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/utils/prismaDB';
import { verifyJWT } from '@/utils/helpers';
import bcrypt from 'bcryptjs';

export const POST = async (req: NextRequest) => {
  const token = req.cookies.get('token')?.value;

  if (!token) {
    return NextResponse.json({ error: true, message: 'Not authenticated' }, { status: 401 });
  }

  try {
    const { password } = await req.json();
    const payload = await verifyJWT(token);

    const user = await prisma.user.findUnique({
      where: { id: payload.userId as string },
      select: {
        password: true,
      },
    });

    if (!user) {
      return NextResponse.json({ error: true, message: 'User not found' }, { status: 404 });
    }

    const passwordMatches = await bcrypt.compare(password, user.password);

    if (!passwordMatches) {
      return NextResponse.json({ error: true, message: 'Incorrect password' }, { status: 403 });
    }

    return NextResponse.json({ success: true, message: 'Password verified' });
  } catch (error) {
    console.error('Error verifying password:', error);
    return NextResponse.json({ error: true, message: 'Internal Server Error' }, { status: 500 });
  }
};
