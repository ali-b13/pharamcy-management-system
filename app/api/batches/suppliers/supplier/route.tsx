import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/utils/prismaDB';
import { revalidatePath } from 'next/cache';

export const GET = async (req: NextRequest) => {
  const id = req.nextUrl.searchParams.get('id') as string;
  try {
    const supplier = await prisma.supplier.findUnique({ where: { id } });
    if (!supplier) {
      return NextResponse.json({ success: false, error: 'Supplier not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true, supplier }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, error: 'Failed to fetch supplier' }, { status: 500 });
  }
};

export const PUT = async (req: NextRequest) => {
  const { name, address, phoneNumber, id} = await req.json();
  console.log(name,address,phoneNumber,id)
  try {
    const supplier = await prisma.supplier.update({
      where: { id },
      data: { name, address, phoneNumber },
    });
    revalidatePath('/batches')
    return NextResponse.json({ success: true, supplier }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, error: 'فشل في تعديل البيانات حاول مجددا' }, { status: 500 });
  }
};

export const DELETE = async (req: NextRequest) => {
  const id = req.nextUrl.searchParams.get('id') as string;
  
  try {

    await prisma.order.deleteMany({where:{supplierId:id}})
    await prisma.batch.deleteMany({where:{supplierId:id}})
    await prisma.supplier.delete({ where: { id } });
    revalidatePath('/batches')
    return NextResponse.json({ success: true, message: 'Supplier deleted successfully' }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, error: 'Failed to delete supplier' }, { status: 500 });
  }
};
