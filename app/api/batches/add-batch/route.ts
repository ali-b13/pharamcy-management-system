import { NextRequest, NextResponse } from "next/server";
import prisma from '@/utils/prismaDB';
import { revalidatePath } from "next/cache";


export const POST=async(req:NextRequest)=>{
    const formData = await req.formData();
  const body = Object.fromEntries(formData);
  const medicineId = body.medicineId as string;
  const supplierId =body.supplierId as string
  const quantity = body.quantity as string;
  const expiryDate = body.expiryDate as string;

  try {
     const medicine=await prisma.medicine.findFirst({where:{id:medicineId}})
     const countBatchs=await prisma.batch.count()
     if(!medicine){
        return  NextResponse.json({error:"هاذا الدواء غير موجود , يرجئ اضافته اولا" ,success:false},{status:404})
     }
    const batch =await prisma.batch.create({data:{
        batchNumber:`B${countBatchs}`,
        expiryDate:new Date(expiryDate),
        quantity:Number(quantity),
        medicineId:medicineId,
        supplierId:supplierId
    }})
    revalidatePath("/batches")
    return NextResponse.json({success:true,error:null},{status:200})
  } catch (error) {
    return  NextResponse.json({error:"خطاء غير متوقع تاكد من ادخال البيانات بشكل صحيح",success:false},{status:404})

  }
}

export const PUT=async(req:NextRequest)=>{
    const formData = await req.formData();
  const body = Object.fromEntries(formData);
  const batchId= body.batchId as string;
  const medicineId = body.medicineId as string;
  const quantity = body.quantity as string;
  const expiryDate = body.expiryDate as string;
  

  try {
     const medicine=await prisma.medicine.findFirst({where:{id:medicineId}})
     if(!medicine){
      console.log("no medicine in this id ")
        return  NextResponse.json({error:"هاذا الدواء غير موجود , يرجئ اضافته اولا" ,success:false},{status:404})
     }
    await prisma.batch.update({where:{batchId:batchId},data:{
        expiryDate:new Date(expiryDate),
        quantity:Number(quantity),
        medicineId:medicineId,
      }})
    return NextResponse.json({success:true,error:null},{status:200})
  } catch (error) {
    console.log(error,'error')
    return  NextResponse.json({error:"خطاء غير متوقع تاكد من ادخال البيانات بشكل صحيح",success:false},{status:422})

  }
}
export const GET=async(req:NextRequest)=>{
    const id =req.nextUrl.searchParams.get("id") as string
    try {
        const batch =await prisma.batch.findFirst({where:{batchId:id },include:{medicine:true,supplier:true}})
        return NextResponse.json({batch:batch,success:true,error:null},{status:200})
    } catch (error) {
        return NextResponse.json({error:" خطاء غير متوقع ,اعد المحاوله" ,success:false},{status:404})
    }
}

export const DELETE=async(req:NextRequest)=>{
    const id =req.nextUrl.searchParams.get("id") as string
    try {
        await prisma.order.deleteMany({where:{batchBatchId:id }})
        await prisma.batch.delete({where:{batchId:id }})
        revalidatePath('/batches')
        return NextResponse.json({success:true,error:null},{status:200})
    } catch (error) {
      console.log(error,'error')
        return NextResponse.json({error:"لم يتم الحذف حاول مجدداّ" ,success:false},{status:404})
    }
}