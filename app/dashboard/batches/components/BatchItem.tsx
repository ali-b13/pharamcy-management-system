import React from 'react';
import { BatchWithMedicineProps } from '../../../../types.dt';
import Link from 'next/link';
import { MdDelete } from 'react-icons/md';
import { CiEdit } from 'react-icons/ci';
import PrimaryButton from '@/components/buttons/PrimaryButton';
import dayjs from 'dayjs';

const BatchItem = ({ item, onDelete }: { item: BatchWithMedicineProps; onDelete: (id: string) => void; onEdit: (id: string) => void }) => {
  return (
    <li className="flex flex-col md:flex-row justify-between items-center p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-100">
      {/* Batch Details */}
      <div className="flex flex-col gap-4 w-full md:w-2/3">
        {/* Batch Number and Medicine Info */}
        <div className="flex flex-col md:flex-row gap-2 items-start md:items-center">
          <Link
            href={`/dashboard/batches/${item.batchId}`}
            className="text-lg font-semibold text-blue-600 hover:text-blue-800 hover:underline transition-colors duration-200"
          >
            رقم الدفعة: {item.batchNumber}
          </Link>
          <p className="text-sm text-gray-600 md:ml-4 bg-gray-100 px-2 py-1 rounded-full">
            اسم الدواء: {item.medicine.name} - الشركة: {item.medicine.brand}
          </p>
        </div>

        {/* Quantity and Expiry Date */}
        <div className="flex flex-col md:flex-row gap-2 text-sm text-gray-700">
          <span className="bg-green-50 text-green-700 px-2 py-1 rounded-full font-medium">
            الكمية: {item.quantity}
          </span>
          <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full">
            تاريخ الانتهاء: {dayjs(item.expiryDate).format('YYYY-MM-DD')}
          </span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3 mt-4 md:mt-0">
        {/* Edit Button */}
        <Link
          href={`/dashboard/batches/edit/${item.batchId}`}
          className="flex items-center gap-2 px-4 py-2 rounded-lg text-yellow-700 bg-yellow-50 border border-yellow-200 hover:bg-yellow-100 hover:border-yellow-300 transition-colors duration-200"
        >
          <CiEdit className="w-5 h-5" />
          <span>تعديل</span>
        </Link>

        {/* Delete Button */}
        <PrimaryButton
          className="flex items-center gap-2 px-4 py-2 rounded-lg text-white bg-red-500 hover:bg-red-600 transition-colors duration-200"
          label="حذف"
          icon={MdDelete}
          onClick={() => onDelete(item.batchId)}
        />
      </div>
    </li>
  );
};

export default BatchItem;