import { NextRequest, NextResponse } from "next/server";
import path from "path";
import fs from "fs";
import prisma from '@/utils/prismaDB'
import { revalidatePath } from "next/cache";
const UPLOAD_DIR = path.resolve(process.env.ROOT_PATH ?? "", "public/uploads");

export const POST = async (req: NextRequest) => {
  const formData = await req.formData();
  const body = Object.fromEntries(formData);
  // prepare all data 
  const name =(body.name as string);
  const price=(Number(body.price)as number)
  const basePrice=(Number(body.basePrice)as number)
  const dosageForm=(body.dosageForm as string)
  const brand=(body.brand as string);

  // checking for existing product that has the same name and same comapny 
  try {
    const existingProduct = await prisma.medicine.findFirst({
      where:{
        name:name,
       brand:brand
      }
    })
     if(existingProduct){
      console.log(existingProduct,'product')
      console.log("not in there")
      return NextResponse.json({
        success: false,
        error:"خطاء: هاذا المنتج موجود بالفعل"
      });
     }
    
    // handling file upload 
    const file = (body.image as Blob) || null;
    const filePath =Date.now()+"-"+(body.image as File).name
    if (file) {
      console.log(file,'file')
      const buffer = Buffer.from(await file.arrayBuffer());
      if (!fs.existsSync(UPLOAD_DIR)) {
        fs.mkdirSync(UPLOAD_DIR);
      }
  
      fs.writeFileSync(
        path.resolve(UPLOAD_DIR,filePath),
        buffer
      );
    } else {
      return NextResponse.json({
        success: false,
        error:"خطاء: الصوره غير مدعومة "
      });
    }
  
  
  
    // add it to data base and refresh the medicines page 
     await prisma.medicine.create({data:{name:name,price:price,dosageForm:dosageForm,brand:brand,image:filePath,basePrice:basePrice}})
     revalidatePath('/medicines')
  // end and return response
    return NextResponse.json({
      success: true,
      error:null,
      message:"added successfully"
    });
  } catch (error) {
     console.log(error)
  }
};


export const GET=async(req:NextRequest)=>{
    const page = req.nextUrl.searchParams.get("page") as string
    const pageSize =req.nextUrl.searchParams.get("pageSize") as string
    const search =req.nextUrl.searchParams.get("search") as string
    const pageNumber = parseInt(page as string, 10);
    const pageSizeNumber = parseInt(pageSize as string, 10);
    const searchQuery = search as string;
  
    try {
      
       if(!searchQuery.length){
        const totalMedicines = await prisma.medicine.count({
            where: {OR:[
              {name:{contains:search,mode:"insensitive"}},
              {brand:{contains:search,mode:"insensitive"}}
            ]},
            
          });
        const medicines = await prisma.medicine.findMany({
            skip: (pageNumber - 1) * pageSizeNumber,
            take: pageSizeNumber,
            include:{batches:true},
            orderBy:{createdAt:"asc"}
          });
          return   NextResponse.json({
            medicines,
            totalPages: Math.ceil(totalMedicines / pageSizeNumber),
          },{status:200});
       }
       else {
        const totalMedicines = await prisma.medicine.count({
            where: {OR:[
              {name:{contains:search,mode:"insensitive"}},
              {brand:{contains:search,mode:"insensitive"}}
            ]},
          });
          const medicines = await prisma.medicine.findMany({
            skip: (pageNumber - 1) * pageSizeNumber,
            take: pageSizeNumber,
            where: {OR:[
              {name:{contains:search,mode:"insensitive"}},
              {brand:{contains:search,mode:"insensitive"}}
            ]},
            orderBy:{createdAt:"desc"},
            include:{batches:true}
          } );
         return NextResponse.json({
            medicines:medicines,
            totalPages: Math.ceil(totalMedicines / pageSizeNumber),
          },{status:200});
       }
     
  
    
    } catch (error) {
      console.log(error,'error')
     return NextResponse.json({ error: 'Internal Server Error' },{status:404});
    }
}