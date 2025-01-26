"use client";

import Header from '@/components/Header';
import NumberInput from '@/components/inputs/NumberInput';
import SelectFilter from '@/components/inputs/SelectFilter';
import TextInput from '@/components/inputs/TextInput';
import { CartItem } from '@/types.dt';
import React, { ChangeEvent, useState } from 'react';

interface CartComponentProps {
  cart: CartItem[];
  onQuantityChange: (index: number, newQuantity: number) => void;
  totalPrice: number;
  amountReceived: number;
  onAmountReceivedChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onPayment: (paymentMethod: string, buyerName?: string, buyerPhone?: string) => void;
}

const CartComponent: React.FC<CartComponentProps> = ({
  cart,
  onQuantityChange,
  totalPrice,
  amountReceived,
  onAmountReceivedChange,
  onPayment,
}) => {
  const [paymentMethod, setPaymentMethod] = useState<string>('CASH');
  const [buyerName, setBuyerName] = useState<string>('');
  const [buyerPhone, setBuyerPhone] = useState<string>('');

  const handlePayment = () => {
    if (paymentMethod === 'DEBT') {
      onPayment(paymentMethod, buyerName, buyerPhone);
    } else {
      onPayment(paymentMethod);
    }
  };

  return (
    <div className="md:col-span-2 bg-white p-6 rounded-xl shadow-lg border border-emerald-50">
      <Header title="المحصلة" className="text-emerald-800 mb-6" />
      
      <div className="overflow-x-auto rounded-lg border border-emerald-50">
        <table className="w-full">
          <thead className="bg-emerald-50/50">
            <tr className="text-emerald-800 text-sm">
              <th className="p-3 text-right font-medium">الدواء</th>
              <th className="p-3 text-center font-medium">رقم الدفعة</th>
              <th className="p-3 text-center font-medium">الكمية</th>
              <th className="p-3 text-center font-medium">سعر الوحدة</th>
              <th className="p-3 text-center font-medium">السعر الإجمالي</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-emerald-50">
            {cart.map((item, index) => (
              <tr key={index} className="hover:bg-emerald-50/30 transition-colors">
                <td className="p-3 text-right font-medium text-emerald-900">{item.name}</td>
                <td className="p-3 text-center text-emerald-600">{item.batchNumber}</td>
                <td className="p-3">
                  <div className="flex justify-center items-center gap-2">
                    <button
                      onClick={() => onQuantityChange(index, item.quantity - 1)}
                      className="w-8 h-8 flex items-center justify-center bg-emerald-100 text-emerald-700 rounded-lg hover:bg-emerald-200 transition-colors"
                      disabled={item.quantity === 0}
                    >
                      -
                    </button>
                    <span className="w-8 text-center text-emerald-900">{item.quantity}</span>
                    <button
                      onClick={() => onQuantityChange(index, item.quantity + 1)}
                      className="w-8 h-8 flex items-center justify-center bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
                    >
                      +
                    </button>
                  </div>
                </td>
                <td className="p-3 text-center text-emerald-600">{item.salePrice.toFixed(2)}</td>
                <td className="p-3 text-center font-medium text-emerald-900">
                  {(item.quantity * item.salePrice).toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-6 p-4 bg-emerald-50 rounded-lg">
        <h3 className="text-xl font-bold text-emerald-800 text-center">
          المجموع الكلي: {totalPrice.toFixed(2)} ريال
        </h3>
      </div>

      <div className="my-6">
        <SelectFilter
          label="طريقة الدفع"
          value={paymentMethod}
          options={[
            { name: "نقدي", id: "CASH" },
            { name: "دين", id: "DEBT" }
          ]}
          onChange={setPaymentMethod}
          className="ring-emerald-500 focus:ring-emerald-600"
        />
      </div>

      {paymentMethod === 'CASH' && (
        <div className="my-4">
          <NumberInput
            name="amountReceived"
            label="المبلغ المدفوع"
            value={amountReceived}
            onChange={onAmountReceivedChange}
            className="ring-emerald-500 focus:ring-emerald-600"
          />
        </div>
      )}

      {paymentMethod === 'DEBT' && (
        <>
          <div className="my-4">
            <TextInput
              label="اسم المشتري"
              name="buyerName"
              value={buyerName}
              onChange={(e) => setBuyerName(e.target.value)}
              placeholder="أدخل اسم المشتري"
              className="ring-emerald-500 focus:ring-emerald-600"
            />
          </div>
          <div className="my-4">
            <TextInput
              label="رقم الهاتف"
              name="buyerPhone"
              value={buyerPhone}
              onChange={(e) => setBuyerPhone(e.target.value)}
              placeholder="أدخل رقم الهاتف"
              className="ring-emerald-500 focus:ring-emerald-600"
            />
          </div>
        </>
      )}

      <button
        disabled={!cart.length || (paymentMethod === 'DEBT' && (!buyerName || !buyerPhone))}
        onClick={handlePayment}
        className="w-full py-3 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white rounded-xl font-semibold
                  hover:from-emerald-700 hover:to-emerald-800 transition-all shadow-lg hover:shadow-emerald-100
                  disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed"
      >
        تأكيد الطلب
      </button>

      {paymentMethod === 'CASH' && amountReceived >= totalPrice && (
        <div className="mt-4 p-3 bg-emerald-100 rounded-lg text-center">
          <h4 className="text-emerald-700 font-bold">
            المبلغ المسترد: {(amountReceived - totalPrice).toFixed(2)} ريال
          </h4>
        </div>
      )}
    </div>
  );
};

export default CartComponent;