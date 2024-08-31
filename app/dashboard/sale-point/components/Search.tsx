"use client";

import React, { ChangeEvent } from 'react';
import { CartItem, MedicineType } from '@/types.dt';
import Header from '@/components/Header';

interface SearchComponentProps {
  searchTerm: string;
  searchResults: MedicineType[];
  onSearchChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onAddToCart: (medicineId: string) => void;
  cart: CartItem[];
  isLoading: boolean;
  hasSearched: boolean;
}

const SearchComponent: React.FC<SearchComponentProps> = ({ 
  searchTerm, 
  searchResults, 
  onSearchChange, 
  onAddToCart, 
  cart, 
  isLoading, 
  hasSearched 
}) => (
  <div className="md:col-span-1 bg-white p-6 rounded-lg shadow-md">
    <Header title='نقطة البيع' />
    <div className="relative mb-4">
      <input
        type="text"
        value={searchTerm}
        onChange={onSearchChange}
        placeholder="البحث ..."
        className="w-full p-4 border border-blue-300 rounded-lg focus:outline-none focus:ring focus:border-blue-300"
      />
    </div>
    <div className="space-y-4">
      {isLoading && <p className="text-center text-gray-500">جارٍ البحث...</p>}
      {!isLoading && hasSearched && searchResults.length === 0 && (
        <p className="text-center text-gray-500">لا توجد بيانات.</p>
      )}
      {!isLoading && !hasSearched && (
        <p className="text-center text-gray-500">ابدأ البحث عن الدواء.</p>
      )}
      {!isLoading && searchResults.length > 0 && searchResults.map((medicine) => {
        // Determine if the medicine is out of stock
        const hasBatches = medicine.batches && medicine.batches.length > 0;
        const totalQuantity = hasBatches ? medicine.batches.reduce((sum, batch) => sum + batch.quantity, 0) : 0;
        const isOutOfStock = totalQuantity <= 0;

        return (
          <div key={medicine.id} className={`flex justify-between items-center p-4 border rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 ${isOutOfStock ? 'bg-gray-200' : 'bg-white'}`}>
            <div className=' flex flex-col gap-1 justify-start'>
              <p className="font-semibold">{medicine.name}</p>
             <div className='flex gap-3 items-center'>
             <p className="text-neutral-400 text-sm">{medicine.brand}</p>
              {isOutOfStock && (
                <span className="text-red-500 font-semibold text-xs bg-red-100 px-2 py-1 rounded-full">غير متوفر حاليا</span>
              )}
             </div>
            </div>
            <button
              onClick={() => onAddToCart(medicine.id)}
              className={`rounded-lg px-4 py-2 transition-colors duration-300 ${isOutOfStock ? 'bg-gray-500 text-gray-300 cursor-not-allowed' : 'bg-teal-700  text-white hover:bg-teal-700 '}`}
              disabled={isOutOfStock}
            >
              {cart.some(item => item.medicineId === medicine.id) ? 'اضافة المزيد' : 'اضافة'}
            </button>
          </div>
        );
      })}
    </div>
  </div>
);

export default SearchComponent;
