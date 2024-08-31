import { NextRequest, NextResponse } from "next/server";
import prisma from '@/utils/prismaDB';
import { addDays, addMonths, addYears } from 'date-fns';

interface ReportData {
  [key: string]: {
    name: string;
    brand: string;
    basePrice: number;
    sellingPrice: number;
    totalSold: number;
    totalPrice: number;
    totalProfit: number;
    batchNumber: string;
    timeFrame: string; // Added to group data by timeframe
  };
}

export const GET = async (req: NextRequest) => {
  const startDate = req.nextUrl.searchParams.get("startDate");
  const endDate = req.nextUrl.searchParams.get("endDate");
  const timeFrame = req.nextUrl.searchParams.get("timeFrame");

  try {
    const start = new Date(startDate as string);
    const end = new Date(endDate as string);

    // Fetch order items within the specified date range
    const orders = await prisma.orderItem.findMany({
      where: {
        orderDate: {
          gte: start,
          lte: end,
        },
      },
      include: {
        medicine: true, // Include medicine details
        batch: true
      },
      orderBy: { orderDate: "asc" },
    });

    const getTimeFrameLabel = (date: Date) => {
      if (timeFrame === 'weekly') {
        const weekStart = start; 
        const weekEnd = addDays(weekStart, 6);
        return `${weekStart.toISOString().split('T')[0]} - ${weekEnd.toISOString().split('T')[0]}`;
      } else if (timeFrame === 'monthly') {
        return `${date.getFullYear()}-${date.getMonth() + 1}`;
      } else if (timeFrame === 'annual') {
        return `${date.getFullYear()}`;
      }
      return '';
    };

    // Calculate the aggregated data
    const reportData = orders.reduce((acc: ReportData, order) => {
      const { medicine, quantity, batch, orderDate } = order;
      const timeFrameLabel = getTimeFrameLabel(new Date(orderDate));

      const key = `${medicine.id}-${timeFrameLabel}`;

      if (!acc[key]) {
        acc[key] = {
          name: medicine.name,
          brand: medicine.brand,
          basePrice: medicine.basePrice,
          sellingPrice: medicine.price,
          totalSold: 0,
          totalPrice: 0,
          totalProfit: 0,
          batchNumber: batch.batchNumber,
          timeFrame: timeFrameLabel,
        };
      }

      acc[key].totalSold += quantity;
      acc[key].totalPrice = parseFloat((acc[key].totalPrice + medicine.price * quantity).toFixed(2));
      acc[key].totalProfit = parseFloat((acc[key].totalProfit + (medicine.price - medicine.basePrice) * quantity).toFixed(2));

      return acc;
    }, {} as ReportData);

    const totalSoldProducts = orders.reduce((acc, order) => acc + order.quantity, 0);
    const totalProfit = orders.reduce((acc, order) => acc + ((order.medicine.price - order.medicine.basePrice) * order.quantity), 0);

    const formattedReportData = Object.values(reportData);
    console.log(formattedReportData, 'data');
    return NextResponse.json(
      {
        data: formattedReportData,
        totalSoldProducts,
        totalProfit,
        success: true,
        error: null,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching report:", error);
    return NextResponse.json(
      { error: "فشل في الاستيراد", success: false },
      { status: 422 }
    );
  }
};
