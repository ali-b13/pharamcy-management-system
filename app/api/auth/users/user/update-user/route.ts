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
    const { username, newPassword, mobileNumber } = await req.json();
    const payload = await verifyJWT(token);

    const hashedPassword = newPassword ? await bcrypt.hash(newPassword, 10) : undefined;

    const updatedUser = await prisma.user.update({
      where: { id: payload.userId as string },
      data: {
        username,
        password: hashedPassword,
        mobile_number: mobileNumber,
      },
    });

    return NextResponse.json({ success: true, message: 'User updated successfully', user: updatedUser });
  } catch (error) {
    console.error('Error updating user:', error);
    return NextResponse.json({ error: true, message: 'Internal Server Error' }, { status: 500 });
  }
};
