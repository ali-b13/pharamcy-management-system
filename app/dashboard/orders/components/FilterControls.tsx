import DateInput from '@/components/inputs/DateInput';
import dayjs from 'dayjs';
import React, { useState } from 'react';


interface FilterControlsProps {
  onFilterChange: (filter: Filter) => void;
}

export interface Filter {
  orderDate?: Date |string;
  sort?: string;
  status?: string; // New field for status
}

const FilterControls: React.FC<FilterControlsProps> = ({ onFilterChange }) => {
  const [orderDate, setOrderDate] = useState<Date>();
  const [sort, setSort] = useState<string | undefined>();
  const [status, setStatus] = useState<string | undefined>(); // New state for status

  const handleFilterChange = () => {
    onFilterChange({ orderDate, sort, status });
  };

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 bg-white shadow-sm rounded-lg border border-gray-200 max-w-4xl mx-auto mb-2">
      <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 w-full md:items-center ">
        <div >
       <DateInput value={ orderDate} onChange={setOrderDate} name='date' label='بحث بالتاريخ'/>
    
        </div>
        <div className="">
          <label className="block text-xs md:text-sm font-medium text-gray-700">ترتيب بالتاريخ</label>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="w-full mt-1 p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">لايوجد</option>
            <option value="date_asc">من الأقدم إلى الأحدث</option>
            <option value="date_desc">من الأحدث إلى الأقدم</option>
          </select>
        </div>
        <div className="">
          <label className="block text-xs md:text-sm font-medium text-gray-700">ترتيب بالكمية</label>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="w-full mt-1 p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">لايوجد</option>
            <option value="quantity_asc">الأقل إلى الأكثر</option>
            <option value="quantity_desc">الأكثر إلى الأقل</option>
          </select>
        </div>
        <div className="">
          <label className="block text-xs md:text-sm font-medium text-gray-700">حالة الطلب</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full mt-1 p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">لايوجد</option>
            <option value="PAID">مدفوع</option>
            <option value="UNPAID">دين غير مدفوع</option>
            <option value="REFUNDED">مسترد</option>
          </select>
        </div>
        <button
          onClick={handleFilterChange}
          className="self-end w-full md:w-1/4 md:mb-1 sm:mt-0 sm:ml-4 px-4 py-2 bg-blue-600 text-white rounded-lg shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        >
          ابحث
        </button>
      </div>
    </div>
  );
};

export default FilterControls;
