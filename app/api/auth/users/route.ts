import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/utils/prismaDB';
import { verifyJWT } from '@/utils/helpers';

export const GET = async (req: NextRequest) => {
  const token = req.cookies.get('token')?.value;

  if (!token) {
    return NextResponse.json({ error: true, message: 'Not authenticated' }, { status: 401 });
  }

  try {
    const payload = await verifyJWT(token);

    // Check if the user making the request is an admin
    const adminUser = await prisma.user.findUnique({
      where: { id: payload.userId as string },
      select: { role: true },
    });

    if (!adminUser || adminUser.role !== 'Admin') {
      return NextResponse.json({ error: true, message: 'Not authorized' }, { status: 403 });
    }

    const users = await prisma.user.findMany({
      select: {
        id: true,
        username: true,
        role: true,
      },
    });

    return NextResponse.json({users: users });
  } catch (error) {
    console.error('Error fetching users:', error);
    return NextResponse.json({ error: true, message: 'Internal Server Error' }, { status: 500 });
  }
};
