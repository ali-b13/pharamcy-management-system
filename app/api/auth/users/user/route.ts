import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/utils/prismaDB';
import { verifyJWT } from '@/utils/helpers';

export const GET = async (req: NextRequest) => {

  const token = req.cookies.get('token')?.value;
    console.log(token,'cookie')
  if (!token) {
    console.log("token not exists")
    return NextResponse.json({ error: true, message: 'Not authenticated' }, { status: 401 });
  }

  try {
    // Verify the JWT and extract the payload (user info)
    const payload = await verifyJWT(token);
   console.log(payload,'payload')
    // Fetch user information from the database
    const user = await prisma.user.findUnique({
      where: { id: payload.userId as string },
      select: {
        id: true,
        username: true,
        role: true,
        mobile_number: true,
      },
    });

    if (!user) {
      return NextResponse.json({ error: true, message: 'User not found', user: null }, { status: 404 });
    }

    // Return the user info as JSON
    return NextResponse.json({ user });
  } catch (error) {
    console.error('Error fetching user:', error);
    return NextResponse.json({ error: true, message: 'Internal Server Error', user: null }, { status: 500 });
  }
};


export const DELETE = async (req: NextRequest) => {
  const token = req.cookies.get('token')?.value;
  const userId = req.nextUrl.searchParams.get("userId")
  if (!token) {
    return NextResponse.json({ error: true, message: 'Not authenticated' }, { status: 401 });
  }

  try {
    // Verify the JWT and extract the payload (user info)
    const payload = await verifyJWT(token);

    // Fetch the admin user information from the database
    const adminUser = await prisma.user.findUnique({
      where: { id: payload.userId as string },
      select: { id: true, role: true },
    });

    if (!adminUser || adminUser.role !== 'Admin') {
      return NextResponse.json({ error: true, message: 'Unauthorized' }, { status: 403 });
    }



    if (!userId) {
      return NextResponse.json({ error: true, message: 'User ID is required' }, { status: 400 });
    }

    // Prevent Admins from deleting themselves
    if (userId === adminUser.id) {
      return NextResponse.json({ error: true, message: 'You cannot delete yourself' }, { status: 403 });
    }

    // Delete the user
    const deletedUser = await prisma.user.delete({
      where: { id: userId },
    });

    if (deletedUser) {
      return NextResponse.json({ success: true, message: 'User deleted successfully' });
    } else {
      return NextResponse.json({ error: true, message: 'User not found' }, { status: 404 });
    }
  } catch (error) {
    console.error('Error deleting user:', error);
    return NextResponse.json({ error: true, message: 'Internal Server Error' }, { status: 500 });
  }
};
