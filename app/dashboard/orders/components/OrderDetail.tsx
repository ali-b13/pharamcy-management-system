import React from 'react';
import { OrderProps, OrderItem } from '@/types.dt'; // Adjust import according to your actual type definitions
import dayjs from 'dayjs';

interface OrderDetailProps {
  order: OrderProps;
  onRefund: (orderId: string) => void;
  onPayDebt: (orderId: string) => void; // New prop to handle payment of debt
}

const OrderDetail: React.FC<OrderDetailProps> = ({ order, onRefund, onPayDebt }) => {
  const getStatusClass = (status: string) => {
    switch (status) {
      case 'REFUNDED':
        return 'bg-yellow-100 text-yellow-800';
      case 'PAID':
        return 'bg-green-200 text-green-800';
      case 'UNPAID':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-200 text-gray-800';
    }
  };

  return (
    <div className="bg-white shadow-sm rounded-lg p-4 sm:p-6 mb-4 sm:mb-6 border border-gray-200 max-w-4xl mx-auto">
      <h2 className="text-xl sm:text-2xl font-semibold mb-4">رمز الطلب : {order.id}</h2>
      <p className="text-gray-700 mb-2 text-sm sm:text-base">تاريخ الطلب: {dayjs(order.createdAt).format('MMMM D, YYYY')}</p>
      <p className="text-gray-700 mb-4 text-sm sm:text-base">السعر كامل: {order.totalPrice.toFixed(2)} ريال</p>

      <div className={`p-2 mb-4 rounded-md ${getStatusClass(order.status)}`}>
        <strong>حالة الطلب: </strong>
        {order.status === 'REFUNDED' ? 'تمت إرجاعه' : order.status === 'PAID' ? 'مدفوع' : 'غير مدفوع'}
      </div>

      {/* Show buyer information if the status is UNPAID */}
      {order.status === 'UNPAID' && (
        <div className="text-sm p-3 mb-4 rounded-md bg-red-50 border border-red-200">
          <h3 className=" font-semibold text-red-800 mb-2">معلومات المشتري</h3>
          <p className="text-gray-700"><strong>اسم المشتري: </strong>{order?.buyerName}</p>
          <p className="text-gray-700"><strong>رقم الهاتف: </strong>{order?.buyerPhone}</p>
        </div>
      )}

      <div className="border-t border-gray-300 mt-4 pt-4">
        <h3 className="text-lg sm:text-xl font-semibold mb-3">العناصر</h3>
        {order.items.length > 0 ? (
          <ul className="space-y-3">
            {order.items.map((item: OrderItem, index: number) => (
              <li key={index} className="p-3 bg-gray-50 border rounded-md shadow-sm text-sm sm:text-base">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-2">
                  <h4 className="font-semibold">{item.medicine.name}</h4>
                  <span className="text-gray-500 mt-1 sm:mt-0">رقم الدفعة : {item.batch.batchNumber}</span>
                </div>
                <p className="text-gray-600">الكمية: {item.quantity}</p>
                <p className="text-gray-600">اسم المورد : {item.supplier.name}</p>
                <p className="text-gray-600">السعر لكل وحدة: {item.medicine.price.toFixed(2)} ريال</p>
                <p className="text-gray-600">سعر الكمية: {item.totalPrice.toFixed(2)} ريال</p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500 text-sm">لا طلبات موجودة.</p>
        )}
      </div>

      {/* Display refund button only if order is not yet refunded */}
      {order.status !== 'REFUNDED' && (
        <div className="mt-6 flex space-x-4 gap-3">
          <button
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
            onClick={() => onRefund(order.id)}
          >
            ارجاع
          </button>

          {/* Display pay debt button only if order is unpaid */}
          {order.status === 'UNPAID' && (
            <button
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              onClick={() => onPayDebt(order.id)}
            >
              دفع الدين
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default OrderDetail;
