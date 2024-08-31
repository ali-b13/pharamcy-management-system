import { NextRequest, NextResponse } from "next/server";
import prisma from '@/utils/prismaDB'
export const GET = async (req: NextRequest) => {
    const currentPage =req.nextUrl.searchParams.get("currentPage")as string
    const pageSize =req.nextUrl.searchParams.get("pageSize")as string
    const pageNumber = parseInt(currentPage as string, 10);
    const pageSizeNumber = parseInt(pageSize as string, 10);
    try {
        // Calculate the date one month from now
        const now = new Date();
        
        // Query batches with expiry date within the next month
        const batches = await prisma.batch.findMany({
            where: {
                expiryDate: {
                    lte: now
                },
            },
            include: {
                medicine: true, // Include associated medicine details
            },
            skip: (pageNumber - 1) * pageSizeNumber,
            take: pageSizeNumber,
        });

        return NextResponse.json({batches,totalPages:Math.ceil(batches.length / pageSizeNumber)||1,success:true,error:null},{status:200});
    } catch (error) {
        console.error('Error fetching batches:', error);
        return NextResponse.json({ error: 'An error occurred while fetching batches.' ,success:false}, { status: 500 });
    }
};