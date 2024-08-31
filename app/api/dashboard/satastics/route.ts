import { NextRequest, NextResponse } from "next/server";
import prisma from '@/utils/prismaDB'
export const GET =async(req:NextRequest)=>{
      
    try {
        // Calculate total sold products
        const totalSoldProducts = await prisma?.orderItem.aggregate({
          _sum: {
            quantity: true,
          },
        });
    
        // Calculate total batches
        const totalBatches = await prisma?.batch.count();
    
        // Calculate total medicines
        const totalMedicines = await prisma?.medicine.count();
    
        // Calculate total received amount (sum of order prices)
        const totalReceivedAmount = await prisma?.order.aggregate({
          _sum: {
            totalPrice: true,
          },
        });
    
        // Calculate warning period date (one month before today)
        const today = new Date();
        const warningPeriodDate = new Date(today);
        warningPeriodDate.setDate(today.getDate() + 30);

        const totalWarningMedicines = await prisma?.batch.count({
            where: {
              expiryDate: {
                gt: today, // Expiry date is greater than today
                lte: warningPeriodDate, // Expiry date is within the warning period
              },
            },
          });
    
        // Calculate total expired medicines
        const totalExpiredMedicines = await prisma?.batch.count({
          where: {
            expiryDate: {
              lt: today,
            },
          },
        });
    
        // Construct the response
        const statistics = {
          totalSoldProducts: totalSoldProducts._sum.quantity||0 ,
          totalBatches: totalBatches ||0,
          totalMedicines: totalMedicines ||0,
          totalReceivedAmount: totalReceivedAmount._sum.totalPrice || 0.00,
          totalWarningMedicines: totalWarningMedicines ||0,
          totalExpiredMedicines: totalExpiredMedicines ||0,
        };
    
        // Return the response
       return NextResponse.json(statistics,{status:200});
      } catch (error:any) {
        
       return NextResponse.json({error:"Internal server error"},{status:404});
      }
}