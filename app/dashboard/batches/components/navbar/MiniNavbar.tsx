"use client";
import React from 'react';
import Link from 'next/link';
import PrimaryButton from '@/components/buttons/PrimaryButton';
import SelectFilter from '@/components/inputs/SelectFilter';
import TextInputWithoutLabel from '@/components/inputs/TextInputWithoutLabel';
import YearSelect from '@/components/inputs/YearFilter';

interface NavbarProps {
  handleOnSubmit: (query: any) => void;
  handleBatchNumber: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleFilterStatus: (value: string) => void; // Change to string
  handleSortOrderSelect: (value: string) => void; // Change to string
  filter: string;
  batchNumber: string;
  sortOrder: string;
}
const MiniNavbar: React.FC<NavbarProps> = ({
  handleOnSubmit,
  handleBatchNumber,
  handleFilterStatus,
  handleSortOrderSelect, // Receive the handleSortOrderSelect prop
  filter,
  batchNumber,
  sortOrder // Receive the sortOrder state
}) => {
  const handleSearchSubmit = () => {
    const query = { batchNumber, filter, sortOrder };
    handleOnSubmit(query);
  };

  return (
    <div className="p-4 bg-gray-100 rounded-lg shadow-md flex flex-col md:flex-row items-center gap-4">
      <Link className='bg-green-500 text-center text-sm lg:text-md text-white p-3 rounded-lg w-2/4 hover:bg-green-900' href={'/batches/add-batch'}> اضافة دفعه </Link>
      <Link className='bg-blue-900 text-center text-sm lg:text-md text-white p-3 rounded-lg w-2/4 hover:bg-blue-500' href={'/batches/add-supplier'}> اضافة  مورد </Link>
      <>
        <TextInputWithoutLabel
          name="BatchNumber"
          value={batchNumber}
          placeholder="رقم الدفعه"
          onChange={handleBatchNumber}
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
        />
       
        <SelectFilter
          label="ترتيب حسب الكمية"
          options={[
            { id: 'asc', name: 'منخفض إلى مرتفع' },
            { id: 'desc', name: 'مرتفع إلى منخفض' },
          ]}
          value={sortOrder}
          onChange={handleSortOrderSelect}
        />
      </>
      <PrimaryButton
        label='ابحث'
        className='w-full md:w-2/4 mt-2 md:mt-0 px-4 py-2 bg-teal-500 text-white rounded-md hover:bg-teal-700 transition duration-300'
        onClick={handleSearchSubmit}
      />
    </div>
  ); 
};

export default MiniNavbar;
