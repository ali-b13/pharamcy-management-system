import prisma from '@/utils/prismaDB'; 
import { NextRequest, NextResponse } from 'next/server';

export const POST = async (req: NextRequest) => {
  try {
    const { orderId } = await req.json();
    console.log(orderId, 'order id');

    // Fetch the order and its items
    const order = await prisma.order.findUnique({
      where: { id: orderId },
      include: { items: true },
    });

    if (!order) {
      return NextResponse.json({ success: false, error: 'Order not found' }, { status: 400 });
    }

    // Update the stock levels for each item in the order
    for (const item of order.items) {
      await prisma.batch.updateMany({
        where: {
          batchId: item.batchId,
        },
        data: {
          quantity: {
            increment: item.quantity, // Add the quantity back to stock
          },
        },
      });

      // Remove the item from OrderItem
      await prisma.orderItem.deleteMany({
        where: {
          orderId: orderId,
          batchId: item.batchId,
        },
      });
    }

    // Optionally update the order status to 'Refunded'
    await prisma.order.update({
      where: { id: orderId },
      data: { status: 'REFUNDED' }, // Adjust according to your status field
    });

    // Revalidate the path (optional, if using ISR or similar)
  

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error during refund:', error);
    return NextResponse.json({ success: false, error: 'Internal Server Error ' }, { status: 500 });
  }
};
