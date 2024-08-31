import { NextRequest, NextResponse } from "next/server";
import path from "path";
import fs from "fs";
import prisma from '@/utils/prismaDB'
import { revalidatePath } from "next/cache";

const UPLOAD_DIR = path.resolve(process.env.ROOT_PATH ?? "", "public/uploads");

export const PUT = async (req: NextRequest) => {
  const formData = await req.formData();
  const body = Object.fromEntries(formData);
  const id = body.id as string;
  const name = body.name as string;
  const price = Number(body.price) as number;
  const basePrice = Number(body.basePrice) as number;
  const dosageForm = body.dosageForm as string;
  const brand = body.brand as string;

  try {
    // Fetch the existing product to get the current image
    const existingProduct = await prisma.medicine.findUnique({ where: { id } });

    if (!existingProduct) {
      return NextResponse.json({ success: false, error: "الدواء غير موجود", message: null }, { status: 404 });
    }

    // Handling file upload
    const file = body.image as Blob || null;
    let filePath;
    if (file) {
      filePath = Date.now() + "-" + (body.image as File).name;
      const buffer = Buffer.from(await file.arrayBuffer());
      if (!fs.existsSync(UPLOAD_DIR)) {
        fs.mkdirSync(UPLOAD_DIR);
      }
      fs.writeFileSync(path.resolve(UPLOAD_DIR, filePath), buffer);

      // Delete the old image if a new one is uploaded
      if (existingProduct.image) {
        const oldImagePath = path.resolve(UPLOAD_DIR, existingProduct.image);
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath);
        }
      }
    } else {
      // Keep the old image if no new image is provided
      filePath = existingProduct.image;
    }

    // Update the product in the database
    await prisma.medicine.update({
      where: { id },
      data: {
        name,
        price,
        dosageForm,
        brand,
        image: filePath,
        basePrice:basePrice
      },
    });

    revalidatePath('/medicines');

    return NextResponse.json({ success: true, error: null, message: "Updated successfully" });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, error: "خطاء غير متوقع,اعد المحاوله لاحقا", message: null }, { status: 500 });
  }
};
    export const GET =async(req:NextRequest)=>{
        const id= req.nextUrl.searchParams.get('id')
        try {
            const product =await prisma.medicine.findFirst({where:{id:id as string},include:{batches:true}})
            return NextResponse.json({message:"fetched successfully",medicine:product},{status:200})
        } catch (error) {
            return NextResponse.json({message:"fetched successfully",medicine:null,error:"الدواء غير موجود"},{status:404})
    
        }
    }



    export const DELETE =async(req:NextRequest)=>{
        const id = req.nextUrl.searchParams.get('id') as string;
  try {
    // Start a transaction to ensure atomicity
    await prisma.$transaction(async (prisma) => {
      // Fetch all batches related to the medicine
      const batches = await prisma.batch.findMany({
        where: { medicineId: id },
      });

      // Delete related orders for each batch
      for (const batch of batches) {
        await prisma.order.deleteMany({
          where: { batchBatchId: batch.batchId },
        });
      }

      // Delete all related batches
      await prisma.batch.deleteMany({
        where: { medicineId: id },
      });

      // Fetch the medicine record to get the image path before deleting it
      const medicine = await prisma.medicine.findUnique({ where: { id } });
      if (medicine && medicine.image) {
        const imagePath = path.join(UPLOAD_DIR, medicine.image);
        if (fs.existsSync(imagePath)) {
          fs.unlinkSync(imagePath);
        }
      }

      // Delete the medicine record
      await prisma.medicine.delete({ where: { id } });
    });

    revalidatePath('/medicines');
        return NextResponse.json({ message: "deleted successfully", success: true, error: null }, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Error in server", success: false, error: "خلل لم يتم الحذف, تاكد ان لديك الصلاحيه للقيام بذالك" }, { status: 404 });
    }
    }