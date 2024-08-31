import { NextRequest, NextResponse } from "next/server";
import prisma from '@/utils/prismaDB';

const getStartOfWeek = (date: Date) => {
    const result = new Date(date);
    result.setHours(0, 0, 0, 0);
    const day = result.getDay();
    const diff = result.getDate() - day + (day === 0 ? -6 : 1); // Adjust if day is Sunday
    result.setDate(diff);
    return result;
};

export const GET = async (req: NextRequest) => {
    const timeFrame = req.nextUrl.searchParams.get("timeFrame") as string;
    
    try {
        let salesData: any;
        
        const now = new Date();
        let startDate: Date | undefined;
        
        if (timeFrame === 'weekly') {
            startDate = getStartOfWeek(now);
        } else if (timeFrame === 'monthly') {
            startDate = new Date(now.getFullYear(), now.getMonth(), 1);
        } else if (timeFrame === 'annually') {
            startDate = new Date(now.getFullYear(), 0, 1);
        } else {
            return NextResponse.json({ error: 'Invalid time frame' }, { status: 404 });
        }
        
        // Fetch sales data from orders
        const orders = await prisma.order.findMany({
            where: {
                createdAt: {
                    gte: startDate,
                    lte: now,
                },
            },
        });
        
        // Format fetched data based on timeframe
        if (timeFrame === 'weekly') {
            const weekDays = ['الاحد', 'الاثنين', 'الثلاثاء', 'الاربعاء', 'الخميس', 'الجمعه', 'السبت'];
            salesData = weekDays.map((day) => ({
                label: day,
                value: 0,
            }));
            
            orders.forEach((order) => {
                const orderDay = new Date(order.createdAt).getDay();
                salesData[orderDay].value += order.totalPrice;
            });
        } else if (timeFrame === 'monthly') {
            salesData = Array.from({ length: 4 }, (_, i) => ({
                label: `الاسبوع ${i + 1}`,
                value: 0,
            }));
            
            orders.forEach((order) => {
                const orderDate = new Date(order.createdAt).getDate();
                const weekOfMonth = Math.min(3, Math.floor((orderDate - 1) / 7));  // Ensure max index is 3
                salesData[weekOfMonth].value += order.totalPrice;
            });
        } else if (timeFrame === 'annually') {
            const months = [
                'يناير', 'فبراير', 'مارس', 'ابريل', 'مايو', 'يونيو',
                'يوليو', 'اغسطس', 'سبتمبر', 'اكتوبر', 'نوفمبر', 'ديسمبر'
            ];
            salesData = months.map((month) => ({
                label: month,
                value: 0,
            }));
            
            orders.forEach((order) => {
                const orderMonth = new Date(order.createdAt).getMonth();
                salesData[orderMonth].value += order.totalPrice;
            });
        }
        
        console.log(salesData);
        return NextResponse.json({salesData:salesData.length?salesData:[]}, { status: 200 });
        
    } catch (error) {
        console.error(`Error fetching ${timeFrame} sales data:`, error);
        return NextResponse.json({ error: `Failed to fetch ${timeFrame} sales data` }, { status: 500 });
    }
};
