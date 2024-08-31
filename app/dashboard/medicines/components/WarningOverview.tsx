"use client"
import React from 'react';
import { useRouter } from 'next/navigation';
import { BatchType, BatchWithMedicineProps, MedicineType } from '../../../../types.dt';
import { calculateRemainingDaysWithText } from '@/utils/helpers';


  export interface WarningProps {
    medicines:BatchWithMedicineProps[]
  }
const WarningMedicines = ({ medicines }:WarningProps) => {
  const router = useRouter();
  

  const handleViewAll = () => {
    router.push('/dashboard/medicines/warning-medicines');
  };



  return (
    <div className="p-4 bg-yellow-100 rounded-lg shadow-md min-h-40">
      <h2 className="text-2xl font-bold mb-4">الادوية المتبقي شهر من الانتهاء</h2>
      <ul className="space-y-2">
        {medicines?.length?medicines.map((batch:BatchWithMedicineProps) => (
          <li key={batch.batchId} className="p-2 bg-yellow-200 rounded-md">
            <div className="font-medium">الاسم: {batch.medicine.name} - الشركه:{batch.medicine.brand}</div> 
            <div>رقم الدفعه : {batch.batchNumber} - الكميه :{batch.quantity} - المده المتبقيه:{calculateRemainingDaysWithText(batch.expiryDate)}</div>
          </li>
        ))
        :<div>لايوجد ادويه</div>
    }
      </ul>
      <button 
        onClick={handleViewAll} 
        className="mt-4 px-4 py-2 bg-teal-500  text-white rounded-md hover:bg-teal-700  transition duration-300"
      >
       استكشاف الكل
      </button>
    </div>
  );
};

export default WarningMedicines;
