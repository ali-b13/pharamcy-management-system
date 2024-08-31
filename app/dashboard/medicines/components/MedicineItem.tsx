import React from 'react';
import OutlinedButton from '@/components/buttons/OutlinedButton';
import PrimaryButton from '@/components/buttons/PrimaryButton';
import { MdDelete } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
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

const MedicineItem: React.FC<MedicineItemProps> = ({ id, name, price, brand, dosageForm, onDelete, onEdit }) => {
  return (
    <li className="flex flex-col md:flex-row justify-between items-center p-4 border mb-4 rounded-lg shadow-lg bg-white">
      <div className=" flex flex-col gap-2 w-full md:w-2/3">
        <div className="flex flex-col md:flex-row gap-2 items-center">
          <Link href={`/dashboard/medicines/${id}`} className="text-blue-600 hover:text-blue-800 hover:underline font-semibold">
            {name}
          </Link>
          <p className="text-sm text-gray-700 md:ml-4">
            {brand}
          </p>
        </div>
        <div className="flex flex-col md:flex-row gap-2">
          <span className="text-sm text-gray-700">
            {dosageForm}
          </span>
          <p className="text-sm text-green-700 md:ml-4">
            {price.toFixed(2)} ريال
          </p>
        </div>
      </div>
      <div className="flex gap-2 mt-4 md:mt-0">
        <Link href={`/dashboard/medicines/edit/${id}`} className="flex items-center gap-1 p-2 rounded-lg text-yellow-600 border border-yellow-300 bg-yellow-100 hover:bg-yellow-200">
          <span>تعديل</span>
          <CiEdit />
        </Link>
        <PrimaryButton className="text-white bg-red-500 hover:bg-red-600" label="حذف" icon={MdDelete} onClick={() => onDelete(id)} />
      </div>
    </li>
  );
};

export default MedicineItem;
