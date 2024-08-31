"use client";

import Header from '@/components/Header';
import NumberInput from '@/components/inputs/NumberInput';
import SelectFilter from '@/components/inputs/SelectFilter';
import TextInput from '@/components/inputs/TextInput';
import { CartItem } from '@/types.dt';
import React, { ChangeEvent, useState } from 'react';
TextInput

interface CartComponentProps {
  cart: CartItem[];
  onQuantityChange: (index: number, newQuantity: number) => void;
  totalPrice: number;
  amountReceived: number;
  onAmountReceivedChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onPayment: (paymentMethod: string, buyerName?: string, buyerPhone?: string) => void; // Optional buyer info
}

const CartComponent: React.FC<CartComponentProps> = ({
  cart,
  onQuantityChange,
  totalPrice,
  amountReceived,
  onAmountReceivedChange,
  onPayment,
}) => {
  const [paymentMethod, setPaymentMethod] = useState<string>('CASH'); // Default to 'CASH'
  const [buyerName, setBuyerName] = useState<string>(''); // State for buyer's name
  const [buyerPhone, setBuyerPhone] = useState<string>(''); // State for buyer's phone number

  const handlePayment = () => {
    if (paymentMethod === 'DEBT') {
      onPayment(paymentMethod, buyerName, buyerPhone); // Pass buyer info only if payment method is DEBT
    } else {
      onPayment(paymentMethod); // No need for buyer info if payment is CASH
    }
  };

  return (
    <div className="md:col-span-2 bg-white p-6 rounded-lg shadow-md">
      <Header title="المحصلة" />
      <table className="w-full border rounded-lg min-h-20">
        <thead>
          <tr className="bg-gray-200 text-sm text-center">
            <th className="p-2 border">الدواء</th>
            <th className="p-2 border">رقم الدفعة</th>
            <th className="p-2 border">الكمية</th>
            <th className="p-2 border">سعر الوحدة</th>
            <th className="p-2 border">السعر مع الكمية</th>
          </tr>
        </thead>
        <tbody>
          {cart.map((item, index) => (
            <tr className="text-xs md:text-md text-center" key={index}>
              <td className="md:p-4 border">{item.name}</td>
              <td className="md:p-4 border">{item.batchNumber}</td>
              <td className="md:p-4 border text-center">
                <div className="flex justify-center items-center gap-1 md:gap-3">
                  <button
                    onClick={() => onQuantityChange(index, item.quantity - 1)}
                    className="bg-red-500 text-white rounded-lg px-2 hover:bg-red-600 transition-colors duration-300"
                    disabled={item.quantity === 0}
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    onClick={() => onQuantityChange(index, item.quantity + 1)}
                    className="bg-teal-700  text-white rounded-lg px-2 hover:bg-teal-700  transition-colors duration-300"
                  >
                    +
                  </button>
                </div>
              </td>
              <td className="p-4 border">{item.salePrice.toFixed(2)}</td>
              <td className="p-4 border">{(item.quantity * item.salePrice).toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-4">
        <h3 className="text-xl font-bold text-gray-700">المجموع كامل: {totalPrice.toFixed(2)} ريال</h3>
      </div>

      <div className="my-4">
      <SelectFilter
        label='طريقة الدفع'
          value={paymentMethod}
          options={[{name:"نقد",id:"CASH"},{name:"دين",id:"DEBT"}]}
          onChange={ setPaymentMethod}
        />
      </div>

      {paymentMethod === 'CASH' && (
        <div className="my-4">
          <NumberInput
          name='amountReceived'
          label='المال المدفوع'
            value={amountReceived}
            onChange={onAmountReceivedChange}
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
          />
          </div>

          <div className="my-4">
          <TextInput
            label="رقم الهاتف"
            name="buyerPhone"
            value={buyerPhone}
            onChange={(e) => setBuyerPhone(e.target.value)}
            placeholder="أدخل رقم الهاتف"
          />
          </div>
        </>
      )}

      <button
        disabled={!cart.length || (paymentMethod === 'DEBT' && (!buyerName || !buyerPhone))}
        onClick={handlePayment}
        className="bg-teal-600  w-full disabled:bg-neutral-600 text-white rounded-lg px-4 py-2 hover:bg-teal-800  transition-colors duration-300"
      >
        تسجيل الطلب
      </button>

      {paymentMethod === 'CASH' && amountReceived >= totalPrice && (
        <div className="text-green-700 font-bold mt-4">
          <h4>الباقي: {(amountReceived - totalPrice).toFixed(2)} ريال</h4>
        </div>
      )}
    </div>
  );
};

export default CartComponent;
