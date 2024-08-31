import { NextRequest, NextResponse } from "next/server";
import prisma from '@/utils/prismaDB';

export const GET = async (req: NextRequest) => {
  const page = req.nextUrl.searchParams.get("currentPage") || '1';
  const pageSize = req.nextUrl.searchParams.get("pageSize") || '6';
  const status = req.nextUrl.searchParams.get("searchQuery[status]") || '';
  const batchNumber = req.nextUrl.searchParams.get("searchQuery[batchNumber]") || '';
  const sortOrder = req.nextUrl.searchParams.get("searchQuery[sortOrder]");
  const pageNumber = parseInt(page, 10);
  const pageSizeNumber = parseInt(pageSize, 10);

  const whereConditions: any = {};

  if (batchNumber) {
    whereConditions.batchNumber = {
      contains: batchNumber,
      mode: "insensitive",
    };
  }

  if (status) {
    const currentDate = new Date();
    const oneMonthLater = new Date();
    oneMonthLater.setMonth(oneMonthLater.getMonth() + 1);

    if (status === 'expired') {
      whereConditions.expiryDate = {
        lt: currentDate,
      };
    } else if (status === 'warning') {
      whereConditions.expiryDate = {
        gte: currentDate,
        lte: oneMonthLater,
      };
    } else if (status === 'good') {
      whereConditions.expiryDate = {
        gt: oneMonthLater,
      };
    }
  }

  try {
    const totalBatches = await prisma.batch.count({
      where: whereConditions,
    });

    // Construct orderBy array conditionally
    const orderByConditions: any[] = [{ createdAt: 'desc' }];
    if (sortOrder) {
      orderByConditions.unshift({ quantity: sortOrder });
    }

    const batches = await prisma.batch.findMany({
      skip: (pageNumber - 1) * pageSizeNumber,
      take: pageSizeNumber,
      where: whereConditions,
      include: {
        medicine: true,
      },
      orderBy: orderByConditions,
    });

    return NextResponse.json({
      batches,
      totalPages: Math.ceil(totalBatches / pageSizeNumber),
    }, { status: 200 });

  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: 'Internal Server Error', batches: [] }, { status: 500 });
  }
};
