"use client"
import React, { useState } from 'react';
import PrimaryButton from '@/components/buttons/PrimaryButton';
import SelectFilter from '@/components/inputs/SelectFilter';
import TextInputWithoutLabel from '@/components/inputs/TextInputWithoutLabel';
import Link from 'next/link';
interface NavbarProps {
  handleOnSubmit: (query: any) => void;
  handleBatchNumber: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleFilterStatus: (value: string) => void; // Change to string
  handleSortOrderSelect: (value: string) => void; // Change to string
  filter: string;
  batchNumber: string;
  sortOrder: string;
}
const MobileNavBar:React.FC<NavbarProps> = ({handleOnSubmit,handleBatchNumber,handleFilterStatus,filter,batchNumber,handleSortOrderSelect,sortOrder}) => {
 
  const [showSearchOptions, setShowSearchOptions] = useState(false);


const handleSearch = () => {
    setShowSearchOptions(!showSearchOptions);
  };

  const handleSearchSubmit = () => {
    const query = { batchNumber, filter };
   handleOnSubmit(query)
  };
 

  return (
    <div className="p-4 bg-gray-100 rounded-lg shadow-md flex flex-col  items-center gap-4">
    {showSearchOptions && (
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
        )}
       <div className='flex gap-2 items-center w-full'>
       <Link className='bg-green-500 text-white p-2 rounded-lg w-full text-center hover:bg-green-800' href={'/batches/add-batch'}> اضافة دفعه جديدة</Link>
       <Link className='bg-blue-900 text-white p-2 rounded-lg w-2/4 hover:bg-blue-600' href={'/batches/add-supplier'}> اضافة  مورد جديد</Link>
       </div>

       <PrimaryButton label='ابحث' className=' w-full md:w-2/4 mt-2 md:mt-0 p-2 bg-blue-500 text-white rounded-md
        hover:bg-blue-700 transition duration-300'  onClick={showSearchOptions ? handleSearchSubmit : handleSearch}/>
          {showSearchOptions&&<button className='text-blue-500  rounded-lg p-1' onClick={handleSearch}>{showSearchOptions ?"اخفاء":""}</button>} 
    </div>
  );
};

export default MobileNavBar;
