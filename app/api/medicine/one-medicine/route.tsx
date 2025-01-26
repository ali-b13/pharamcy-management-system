import { NextRequest, NextResponse } from "next/server";
import path from "path";
import fs from "fs";
import prisma from '@/utils/prismaDB'
import { revalidatePath } from "next/cache";
const UPLOAD_DIR = path.resolve(process.env.ROOT_PATH ?? "", "public/uploads");

export const PUT = async (req: NextRequest) => {
  const formData = await req.formData();
  const body = Object.fromEntries(formData);
  
  // Validate required fields
  if (!body.id || !body.name || !body.price || !body.basePrice || !body.dosageForm || !body.brand) {
    return NextResponse.json(
      { success: false, error: "جميع الحقول المطلوبة يجب أن تكون موجودة", message: null },
      { status: 400 }
    );
  }

  try {
    // Type casting with validation
    const id = String(body.id);
    const name = String(body.name);
    const price = Number(body.price);
    const basePrice = Number(body.basePrice);
    const dosageForm = String(body.dosageForm);
    const brand = String(body.brand);

    const existingProduct = await prisma.medicine.findUnique({ where: { id } });

    if (!existingProduct) {
      return NextResponse.json(
        { success: false, error: "الدواء غير موجود", message: null },
        { status: 404 }
      );
    }

    // Proper file type handling
    let filePath = existingProduct.image;
    const file = body.image;

    if (file && file instanceof File) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        return NextResponse.json(
          { success: false, error: "يجب أن يكون الملف المرفوع صورة", message: null },
          { status: 400 }
        );
      }

      // Generate safe filename
      filePath = `${Date.now()}-${file.name.replace(/[^a-z0-9.]/gi, '_')}`;
      const buffer = Buffer.from(await file.arrayBuffer());
      
      // Ensure upload directory exists
      if (!fs.existsSync(UPLOAD_DIR)) {
        fs.mkdirSync(UPLOAD_DIR, { recursive: true });
      }

      // Write file with error handling
      try {
        fs.writeFileSync(path.join(UPLOAD_DIR, filePath), buffer as any);
      } catch (writeError) {
        console.error('File write error:', writeError);
        return NextResponse.json(
          { success: false, error: "فشل في حفظ الصورة", message: null },
          { status: 500 }
        );
      }

      // Clean up old image
      if (existingProduct.image) {
        const oldImagePath = path.join(UPLOAD_DIR, existingProduct.image);
        if (fs.existsSync(oldImagePath)) {
          try {
            fs.unlinkSync(oldImagePath);
          } catch (unlinkError) {
            console.error('Old image deletion error:', unlinkError);
          }
        }
      }
    }

    // Update database entry
    const updatedProduct = await prisma.medicine.update({
      where: { id },
      data: {
        name,
        price,
        dosageForm,
        brand,
        image: filePath,
        basePrice
      },
    });

    revalidatePath('/medicines');

    return NextResponse.json({
      success: true,
      error: null,
      message: "تم التحديث بنجاح",
      data: updatedProduct
    });

  } catch (error) {
    console.error('Server error:', error);
    return NextResponse.json(
      { success: false, error: "خطأ غير متوقع، يرجى المحاولة لاحقًا", message: null },
      { status: 500 }
    );
  }
};
    export const GET =async(req:NextRequest)=>{
        const id= req.nextUrl.searchParams.get('id')
        console.log("medicine id",id)
        try {
            const product =await prisma.medicine.findFirst({where:{id:id as string},include:{batches:{include:{supplier:true}}}})
            const response = NextResponse.json({ product });
            response.headers.set("Cache-Control", "no-store, no-cache, must-revalidate");
            response.headers.set("Pragma", "no-cache");
            response.headers.set("Expires", "0");
            return response;
            
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