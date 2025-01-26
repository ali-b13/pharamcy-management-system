import React from 'react';
import OutlinedButton from '@/components/buttons/OutlinedButton';
import PrimaryButton from '@/components/buttons/PrimaryButton';
import { MdDelete } from 'react-icons/md';
import { CiEdit } from 'react-icons/ci';
import Link from 'next/link';

interface MedicineItemProps {
  id: string;
  name: string;
  price: number;
  brand: string;
  dosageForm: string;
  onDelete: (id: string) => void;
  onEdit: (id: string) => void;
}

const MedicineItem: React.FC<MedicineItemProps> = ({
  id,
  name,
  price,
  brand,
  dosageForm,
  onDelete,
  onEdit,
}) => {
  return (
    <li className="flex flex-col md:flex-row justify-between items-center p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-100">
      {/* Medicine Details */}
      <div className="flex flex-col gap-3 w-full md:w-2/3">
        {/* Name and Brand */}
        <div className="flex flex-col md:flex-row gap-2 items-start md:items-center">
          <Link
            href={`/dashboard/medicines/${id}`}
            className="text-lg font-semibold text-teal-700 hover:text-teal-900 hover:underline transition-colors duration-200"
          >
            {name}
          </Link>
          <p className="text-sm text-gray-600 md:ml-4 bg-gray-100 px-2 py-1 rounded-full">
            {brand}
          </p>
        </div>

        {/* Dosage Form and Price */}
        <div className="flex flex-col md:flex-row gap-2 text-sm text-gray-700">
          <span className="bg-blue-50 text-blue-700 px-2 py-1 rounded-full">
            {dosageForm}
          </span>
          <p className="text-green-700 font-medium bg-green-50 px-2 py-1 rounded-full">
            {price.toFixed(2)} ريال
          </p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3 mt-4 md:mt-0">
        {/* Edit Button */}
        <Link
          href={`/dashboard/medicines/edit/${id}`}
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
          onClick={() => onDelete(id)}
        />
      </div>
    </li>
  );
};

export default MedicineItem;