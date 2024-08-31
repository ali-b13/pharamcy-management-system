import { NextRequest, NextResponse } from "next/server";
import prisma from '@/utils/prismaDB';
import dayjs from 'dayjs';

export const GET = async (req: NextRequest) => {
  const type = req.nextUrl.searchParams.get("type") as string;

  try {
    // Define lead time in days
    const leadTimeDays = 10;

    // Define the period for calculating average daily usage
    const daysInPeriod = 60; // Example period: 30 days

    if (type === 'quantity') {
      // Fetch batches with quantity less than or equal to 10
      const lowStockBatches = await prisma.batch.findMany({
        where: {
          quantity: {
            lte: 10 // Threshold for low stock
          },
        },
        include: {
          medicine: { select: { name: true, brand: true } },
        }
      });

      return NextResponse.json({
        data: lowStockBatches,
        success: true,
        error: null
      }, { status: 200 });
    } else if (type === 'reorder') {
      // Fetch all batches to calculate average daily usage and reorder level
      const allBatches = await prisma.batch.findMany({
        include: {
          medicine: { select: { name: true, brand: true } },
          OrderItem: true // Include sales related to the batch
        }
      });

      // Extract batch IDs
      const batchIds = allBatches.map(batch => batch.batchId);

      // Fetch total sales for these batches in the last 30 days
      const totalSales = await prisma.orderItem.aggregate({
        _sum: {
          quantity: true
        },
        where: {
          batchId: {
            in: batchIds
          },
          orderDate: {
            gte: dayjs().subtract(daysInPeriod, 'day').toDate() // Sales date within the last 30 days
          }
        }
      });

      // Calculate average daily usage
      const totalQuantity = totalSales._sum.quantity || 0;
      const averageDailyUsage = totalQuantity / daysInPeriod;

      // Calculate reorder level and filter batches
      const updatedLowStockBatches = allBatches.map(batch => {
        // Calculate reorder level
        const reorderLevel = Math.round(averageDailyUsage * leadTimeDays);

        // Determine if the current quantity is below the reorder level
        const isBelowReorderLevel = batch.quantity < reorderLevel;

        return {
          ...batch,
          reorderLevel,
          averageDailyUsage,
          isBelowReorderLevel
        };
      }).filter(batch => batch.isBelowReorderLevel); // Only include batches below reorder level

      return NextResponse.json({
        data: updatedLowStockBatches,
        success: true,
        error: null
      }, { status: 200 });
    } else {
      return NextResponse.json({
        success: false,
        error: "Invalid type parameter"
      }, { status: 400 });
    }

  } catch (error) {
    return NextResponse.json({
      success: false,
      error: "فشل الاستيراد"
    }, { status: 422 });
  }
};
