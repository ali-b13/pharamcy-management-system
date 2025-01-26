"use client";
import React from 'react';
import { useRouter } from 'next/navigation';
import { BatchWithMedicineProps } from '../../../../types.dt';
import { calculateRemainingDaysWithText } from '@/utils/helpers';

export interface WarningProps {
  medicines: BatchWithMedicineProps[];
}

const WarningMedicines = ({ medicines }: WarningProps) => {
  const router = useRouter();

  const handleViewAll = () => {
    router.push('/dashboard/medicines/warning-medicines');
  };

  return (
    <div className="p-6 bg-white rounded-xl shadow-lg border border-yellow-50">
      {/* Header */}
      <h2 className="text-2xl font-bold text-yellow-700 mb-6">الادوية المتبقي شهر من الانتهاء</h2>

      {/* Medicine List */}
      <ul className="space-y-3">
        {medicines?.length ? (
          medicines.map((batch: BatchWithMedicineProps) => (
            <li
              key={batch.batchId}
              className="p-4 bg-yellow-50 rounded-lg hover:bg-yellow-100 transition-colors duration-200"
            >
              <div className="flex flex-col gap-2">
                {/* Medicine Name and Brand */}
                <div className="flex flex-col md:flex-row gap-1 md:items-center">
                  <span className="font-semibold text-yellow-800">
                    {batch.medicine.name}
                  </span>
                  <span className="text-sm text-gray-600 md:ml-2">
                    - {batch.medicine.brand}
                  </span>
                </div>

                {/* Batch Details */}
                <div className="text-sm text-gray-700">
                  <span>رقم الدفعه: {batch.batchNumber}</span>
                  <span className="mx-2">|</span>
                  <span>الكميه: {batch.quantity}</span>
                  <span className="mx-2">|</span>
                  <span className="text-yellow-600 font-medium">
                    {calculateRemainingDaysWithText(batch.expiryDate)}
                  </span>
                </div>
              </div>
            </li>
          ))
        ) : (
          <div className="text-center py-4 text-gray-500">لا يوجد أدوية قريبة من الانتهاء</div>
        )}
      </ul>

      {/* View All Button */}
      <button
        onClick={handleViewAll}
        className="mt-6 w-full md:w-auto px-6 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-colors duration-200"
      >
        استكشاف الكل
      </button>
    </div>
  );
};

export default WarningMedicines;