import { NextRequest, NextResponse } from "next/server";
import prisma from '@/utils/prismaDB';

export const GET =async(req:NextRequest)=>{
    const type =req.nextUrl.searchParams.get("type") as string

  let inventoryData;

  try {
    if (type === 'valid') {
        inventoryData = await prisma.batch.findMany({
          where: {
            expiryDate: {
              gt: new Date(),
            },
          },
          include:{medicine:true,supplier:true}
        });
      } else if (type === 'aboutToExpire') {
        const currentDate = new Date();
        const oneMonthLater = new Date();
        oneMonthLater.setMonth(oneMonthLater.getMonth() + 1);
    
        inventoryData = await prisma.batch.findMany({
          where: {
            expiryDate: {
              gt: currentDate,
              lte: oneMonthLater,
            },
          },
          include:{medicine:true,supplier:true}
        });
      } else if (type === 'expired') {
        inventoryData = await prisma.batch.findMany({
          where:{
            expiryDate:{
                lte:new Date()
            }
          },
          include:{medicine:true,supplier:true}
        });
      }
      const formattedData =inventoryData?.map(item=>{
        return {
            quantity:item.quantity,
            medicineName:item.medicine.name,
            brand :item.medicine.brand,
            price:item.medicine.price,
            batchNumber:item.batchNumber,
            dosageForm:item.medicine.dosageForm,
            expiryDate:item.expiryDate,
            supplierName:item.supplier.name
        }
      })
  return NextResponse.json({data:formattedData,success:true,error:null},{status:200})    
  } catch (error) {
    return  NextResponse.json({success:false,error:"فشل الاستيراد"},{status:422})    
  }
  
}