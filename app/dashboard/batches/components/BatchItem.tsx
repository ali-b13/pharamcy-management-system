import React from 'react';
import { BatchWithMedicineProps } from '../../../../types.dt';
import Link from 'next/link';
import { MdDelete } from 'react-icons/md';
import { CiEdit } from 'react-icons/ci';
import OutlinedButton from '@/components/buttons/OutlinedButton';
import PrimaryButton from '@/components/buttons/PrimaryButton';
import dayjs from 'dayjs';

const BatchItem = ({ item, onDelete, onEdit }: { item: BatchWithMedicineProps, onDelete: (id: string) => void, onEdit: (id: string) => void }) => {
  return (
    <li className="flex flex-col md:flex-row justify-between items-center p-4 border mb-4 rounded-lg shadow-lg bg-white">
      <div className="flex flex-col gap-2 md:gap-4 w-full md:w-2/3">
        <div className="flex flex-col md:flex-row gap-2 items-center">
          <Link href={`/batches/${item.batchId}`} className="text-blue-600 hover:text-blue-800 hover:underline font-semibold">
            رقم الدفعة: {item.batchNumber}
          </Link>
          <p className="text-sm text-gray-700 md:ml-4">
            اسم الدواء: {item.medicine.name} - الشركة: {item.medicine.brand}
          </p>
        </div>
        <div className="flex flex-col md:flex-row gap-2">
          <div className="text-sm text-green-700 font-bold">
            الكمية: {item.quantity}
          </div>
          <div className="text-sm text-gray-700 md:ml-4">
            تاريخ الانتهاء: {dayjs(item.expiryDate).format('YYYY-MM-DD')}
          </div>
        </div>
      </div>
      <div className="flex gap-2 mt-4 md:mt-0">
        <Link href={`/batches/edit/${item.batchId}`} className="flex items-center gap-1 p-2 rounded-lg text-yellow-600 border border-yellow-300 bg-yellow-100 hover:bg-yellow-200">
          <span>تعديل</span>
          <CiEdit />
        </Link>
        <PrimaryButton className="text-white bg-red-500 hover:bg-red-600" label="حذف" icon={MdDelete} onClick={() => onDelete(item.batchId)} />
      </div>
    </li>
  );
};

export default BatchItem;
