"use client";
import React, { useState } from 'react';
import PrimaryButton from '@/components/buttons/PrimaryButton';
import SelectFilter from '@/components/inputs/SelectFilter';
import TextInputWithoutLabel from '@/components/inputs/TextInputWithoutLabel';
import Link from 'next/link';

interface NavbarProps {
  handleOnSubmit: (query: any) => void;
  handleBatchNumber: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleFilterStatus: (value: string) => void;
  handleSortOrderSelect: (value: string) => void;
  filter: string;
  batchNumber: string;
  sortOrder: string;
}

const MobileNavBar: React.FC<NavbarProps> = ({
  handleOnSubmit,
  handleBatchNumber,
  handleFilterStatus,
  handleSortOrderSelect,
  filter,
  batchNumber,
  sortOrder,
}) => {
  const [showSearchOptions, setShowSearchOptions] = useState(false);

  const handleSearch = () => {
    setShowSearchOptions(!showSearchOptions);
  };

  const handleSearchSubmit = () => {
    const query = { batchNumber, filter, sortOrder };
    handleOnSubmit(query);
  };

  return (
    <div className="p-4 bg-white rounded-xl shadow-lg border border-gray-100 flex flex-col items-center gap-4">
      {/* Add Batch and Add Supplier Buttons */}
      <div className="flex flex-col md:flex-row gap-4 w-full">
        <Link
          href="/dashboard/batches/add-batch"
          className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition-colors duration-200 text-center flex-1"
        >
          اضافة دفعه جديدة
        </Link>
        <Link
          href="/dashboard/batches/add-supplier"
          className="bg-blue-900 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200 text-center flex-1"
        >
          اضافة مورد جديد
        </Link>
      </div>

      {/* Search Options */}
      {showSearchOptions && (
        <div className="w-full space-y-4">
          <TextInputWithoutLabel
            name="BatchNumber"
            value={batchNumber}
            placeholder="رقم الدفعه"
            onChange={handleBatchNumber}
            className="w-full"
          />
          <SelectFilter
            label="اختر حاله المنتج"
            options={[
              { id: 'good', name: 'متوفر' },
              { id: 'warning', name: 'ينتهي قريباّ' },
              { id: 'expired', name: 'منتهي الصلاحية' },
            ]}
            value={filter}
            onChange={handleFilterStatus}
            className="w-full"
          />
          <SelectFilter
            label="ترتيب حسب الكمية"
            options={[
              { id: 'asc', name: 'منخفض إلى مرتفع' },
              { id: 'desc', name: 'مرتفع إلى منخفض' },
            ]}
            value={sortOrder}
            onChange={handleSortOrderSelect}
            className="w-full"
          />
        </div>
      )}

      {/* Search Button */}
      <div className="w-full flex flex-col items-center gap-2">
        <PrimaryButton
          label={showSearchOptions ? 'ابحث' : 'اظهار خيارات البحث'}
          className="w-full px-6 py-3 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-colors duration-200"
          onClick={showSearchOptions ? handleSearchSubmit : handleSearch}
        />
        {showSearchOptions && (
          <button
            className="text-blue-500 hover:text-blue-700 transition-colors duration-200"
            onClick={handleSearch}
          >
            اخفاء
          </button>
        )}
      </div>
    </div>
  );
};

export default MobileNavBar;