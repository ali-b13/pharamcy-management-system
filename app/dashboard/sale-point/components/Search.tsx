"use client";

import React, { ChangeEvent } from 'react';
import { CartItem, MedicineType } from '@/types.dt';
import Header from '@/components/Header';
import { FiSearch, FiPlus, FiPlusCircle } from 'react-icons/fi';

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
  <div className="md:col-span-1 bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
    <Header title='نقطة البيع' className="text-emerald-800 mb-6" />
    
    <div className="relative mb-6">
      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
        <FiSearch className="w-5 h-5" />
      </div>
      <input
        type="text"
        value={searchTerm}
        onChange={onSearchChange}
        placeholder="ابحث عن دواء..."
        className="w-full pl-12 pr-4 py-3 border-2 border-emerald-100 rounded-xl focus:outline-none focus:border-emerald-300 focus:ring-2 focus:ring-emerald-50 text-lg transition-all"
      />
    </div>

    <div className="space-y-3">
      {isLoading ? (
        [...Array(3)].map((_, i) => (
          <div key={i} className="animate-pulse p-4 rounded-xl bg-gray-50">
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
            <div className="h-3 bg-gray-200 rounded w-1/2"></div>
          </div>
        ))
      ) : hasSearched && searchResults.length === 0 ? (
        <div className="p-6 text-center text-gray-400 bg-emerald-50 rounded-xl">
          <p>لم يتم العثور على نتائج</p>
        </div>
      ) : !hasSearched ? (
        <div className="p-6 text-center text-gray-400 bg-emerald-50 rounded-xl">
          <p>ابدأ الكتابة للبحث عن الأدوية</p>
        </div>
      ) : (
        searchResults.map((medicine) => {
          const hasBatches = medicine.batches?.length > 0;
          const totalQuantity = hasBatches ? 
            medicine.batches.reduce((sum, batch) => sum + batch.quantity, 0) : 0;
          const isOutOfStock = totalQuantity <= 0;
          const inCart = cart.some(item => item.medicineId === medicine.id);

          return (
            <div 
              key={medicine.id}
              className={`group flex items-center justify-between p-4 rounded-xl transition-all
                ${isOutOfStock ? 'bg-gray-100 opacity-75' : 'bg-emerald-50 hover:bg-emerald-100'}`}
            >
              <div className="flex-1 min-w-0">
                <h3 className="text-lg font-semibold text-emerald-900 truncate">{medicine.name}</h3>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-sm text-emerald-600">{medicine.brand}</span>
                  {isOutOfStock && (
                    <span className="text-xs px-2 py-1 bg-rose-100 text-rose-800 rounded-full">
                      <FiPlusCircle className="inline mr-1" /> غير متوفر
                    </span>
                  )}
                </div>
              </div>
              
              <button
                onClick={() => onAddToCart(medicine.id)}
                disabled={isOutOfStock}
                className={`ml-4 px-4 py-2 rounded-lg font-medium transition-all
                  ${isOutOfStock ? 
                    'bg-gray-300 text-gray-500 cursor-not-allowed' : 
                    `flex items-center gap-2 ${inCart ? 
                      'bg-emerald-800 text-white hover:bg-emerald-900' : 
                      'bg-emerald-600 text-white hover:bg-emerald-700'}`
                  }`}
              >
                <FiPlus className="w-4 h-4" />
                {inCart ? 'إضافة أخرى' : 'إضافة'}
              </button>
            </div>
          );
        })
      )}
    </div>
  </div>
);

export default SearchComponent;