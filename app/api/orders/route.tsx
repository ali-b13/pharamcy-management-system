import { NextRequest, NextResponse } from "next/server";
import prisma from '@/utils/prismaDB';

export const POST = async (req: NextRequest) => {
  const { cart: items, paymentMethod, buyerName, buyerPhone } = await req.json();

  try {
    // Validate the incoming data
    if (!Array.isArray(items) || items.some(item => typeof item !== 'object')) {
      return NextResponse.json({ error: 'Invalid input format' }, { status: 400 });
    }

    // Start a transaction
    const transaction = await prisma.$transaction(async (prisma) => {
      let totalPrice = 0;

      for (const item of items) {
        const { medicineId, batchId, quantity } = item;

        // Fetch the batch details
        const medicine_db = await prisma.medicine.findFirst({
          where: { id: medicineId },
        });
        const batch_db = await prisma.batch.findFirst({
          where: { medicineId, batchId },
        });

        if (!batch_db || !medicine_db) {
          throw new Error(`Batch with ID ${batchId} for medicine ID ${medicineId} not found`);
        }

        if (batch_db.quantity < quantity) {
          throw new Error(`Insufficient quantity in batch ${batchId}`);
        }

        // Calculate the price based on the batch's sale price
        const itemTotalPrice = quantity * medicine_db?.price; // Use `price` for selling
        totalPrice += itemTotalPrice;

        // Reduce the quantity in the batch
        await prisma.batch.update({
          where: { batchId },
          data: {
            quantity: {
              decrement: quantity,
            },
          },
        });
        item.totalPrice = itemTotalPrice;
        item.salePrice = medicine_db.price;
        item.supplierId = batch_db.supplierId;
      }

      // Record the order
      const order = await prisma.order.create({
        data: {
          totalPrice,
          status: paymentMethod === 'DEBT' ? 'UNPAID' : 'PAID', // Set status based on payment method
          paymentMethod, // Record the payment method
          buyerName: paymentMethod === 'DEBT' ? buyerName : null, // Only save if DEBT
          buyerPhone: paymentMethod === 'DEBT' ? buyerPhone : null, // Only save if DEBT
          items: {
            create: items.map(item => ({
              medicineId: item.medicineId,
              supplierId: item.supplierId,
              batchId: item.batchId,
              quantity: item.quantity,
              totalPrice: item.totalPrice, // Include totalPrice for each item
            })),
          },
        },
      });

      return order;
    });

    // Respond with the created order
    return NextResponse.json({ success: true, error: null }, { status: 200 });
  } catch (error) {
    console.error('Error processing order:', error);
    return NextResponse.json({ error: "Cannot process the order" }, { status: 500 });
  }
};

export const GET = async (req: NextRequest) => {
  const page = Number(req.nextUrl.searchParams.get('page')) || 1;
  const limit = Number(req.nextUrl.searchParams.get('pageSize')) || 10;
  const orderDate = req.nextUrl.searchParams.get('orderDate');
  const sort = req.nextUrl.searchParams.get('sort');
  const status = req.nextUrl.searchParams.get('status'); // Added status filter

  const where: any = {};

  try {
    // Filter by orderDate
    if (orderDate) where.createdAt = new Date(orderDate);

    // Filter by status
    if (status) where.status = status; // Added status filter

    // Pagination
    const skip = (page - 1) * limit;
    const take = limit;

    // Fetch orders
    const orders = await prisma.order.findMany({
      where,
      include: {
        items: { include: { batch: true, medicine: true, supplier: true } },
      },
      skip,
      take,
      orderBy: {
        createdAt: 'desc', // Default sorting order
      },
    });

    // Calculate total quantity for sorting/filtering
    const ordersWithQuantities = orders.map(order => ({
      ...order,
      totalQuantity: order.items.reduce((acc, item) => acc + item.quantity, 0),
    }));

    // Sorting by totalQuantity and date
    if (sort === 'quantity_asc') {
      ordersWithQuantities.sort((a, b) => a.totalQuantity - b.totalQuantity);
    } else if (sort === 'quantity_desc') {
      ordersWithQuantities.sort((a, b) => b.totalQuantity - a.totalQuantity);
    } else if (sort === 'date_asc') {
      ordersWithQuantities.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
    } else if (sort === 'date_desc') {
      ordersWithQuantities.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    }

    // Calculate total count
    const total = await prisma.order.count({ where });

    // Apply pagination after sorting
    const paginatedOrders = ordersWithQuantities.slice(skip, skip + take);

    return NextResponse.json({ orders: paginatedOrders, total: Math.ceil(total / limit) }, { status: 200 });
  } catch (error) {
    console.error('Error fetching orders:', error);
    return NextResponse.json({ orders: [], total: 0 }, { status: 422 });
  }
};



export const PUT = async (req: NextRequest) => {
  try {
    // Parse the request body to get the order ID
    const { orderId } = await req.json();

    // Validate the input
    if (!orderId) {
      return NextResponse.json({ error: "Order ID is required" }, { status: 400 });
    }

    // Fetch the order from the database
    const order = await prisma.order.findUnique({
      where: { id: orderId },
    });

    if (!order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    // Check if the order is already paid
    if (order.status === 'PAID') {
      return NextResponse.json({ error: "Order is already paid" }, { status: 400 });
    }

    // Update the order status to "PAID" and clear the buyer's name and phone number
    await prisma.order.update({
      where: { id: orderId },
      data: {
        status: 'PAID',
        buyerName: null,
        buyerPhone: null,
      },
    });
   
    // Return the updated order as a response
    return NextResponse.json({ success: true }, { status: 200 });

  } catch (error) {
    console.error("Error paying debt:", error);
    return NextResponse.json({ error: "Failed to process payment" }, { status: 500 });
  }
};