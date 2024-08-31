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
    const payload = await verifyJWT(token);

    // Check if the user making the request is an admin
    const adminUser = await prisma.user.findUnique({
      where: { id: payload.userId as string },
      select: { role: true },
    });

    if (!adminUser || adminUser.role !== 'Admin') {
      return NextResponse.json({ error: true, message: 'Not authorized' }, { status: 403 });
    }

    const { username, password,mobileNumber } = await req.json();
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        username,
        password: hashedPassword,
        mobile_number:mobileNumber,
      },
    });

    return NextResponse.json({ success: true, message: 'User added successfully', user: newUser });
  } catch (error) {
    console.error('Error adding user:', error);
    return NextResponse.json({ error: true, message: 'Internal Server Error' }, { status: 500 });
  }
};
