import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/utils/prismaDB';
import { revalidatePath } from 'next/cache';

export const GET = async (req: NextRequest) => {
  const search = req.nextUrl.searchParams.get('search') || '';
  const page = parseInt(req.nextUrl.searchParams.get('page') || '1');
  const pageSize = 5;

  try {
    const [totalSuppliers, suppliers] = await Promise.all([
      prisma.supplier.count({
        where: {
          name: {
            contains: search,
            mode: 'insensitive',
          },
        },
      }),
      prisma.supplier.findMany({
        where: {
          name: {
            contains: search,
            mode: 'insensitive',
          },
        },
        skip: (page - 1) * pageSize,
        take: pageSize,
      }),
    ]);

    return NextResponse.json({ success: true, suppliers, totalSuppliers, page, pageSize }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, error: 'Failed to fetch suppliers' }, { status: 500 });
  }
};

export const POST = async (req: NextRequest) => {
  const { name, address, mobileNumber } = await req.json();
  console.log(name,address,mobileNumber,'details')
  try {

      const existedSupplier = await prisma.supplier.findFirst({where:{name:name,phoneNumber:mobileNumber}})

      if(existedSupplier)return  NextResponse.json({ success: false, error: 'المورد موجود مسبقاّ' }, { status: 200 });
      
    const supplier = await prisma.supplier.create({
      data: { name, address, phoneNumber:mobileNumber },
    });
    revalidatePath("/batches")

    return NextResponse.json({ success: true, supplier }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, error: 'Failed to create supplier' }, { status: 500 });
  }
};
