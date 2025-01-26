"use client"
import { calculateRemainingDays } from '@/utils/helpers';
import dayjs from 'dayjs';
import { MedicineWithBatchesProps } from '@/types.dt';
import StatusMedicine from '../../../../components/StatusMedicine';

import { FaCapsules, FaMoneyBillWave, FaTag, FaBarcode, FaBoxOpen, FaCalendarPlus, FaCalendarTimes, FaIndustry, FaIdCard } from 'react-icons/fa';
import { GiMedicinePills } from 'react-icons/gi';
import Image from 'next/image';
import { useCallback, useEffect, useState } from 'react';
import { getMedicine } from '@/app/actions/medicine/queries';
import { notFound } from 'next/navigation';

const ShowFullDetails = ({ id }: { id: string }) => {
  const [medicine, setMedicine] = useState<MedicineWithBatchesProps | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchMedicineData = useCallback(async () => {
    try {
      const result = await getMedicine(id);
      setMedicine(result.medicine || null);
    } catch (error) {
      console.error('Error fetching medicine:', error);
      setMedicine(null);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchMedicineData();
  }, [fetchMedicineData]);

  if (loading) {
    return (
      <div className="max-w-5xl mx-auto md:my-10 p-4 md:p-6 bg-white shadow-md rounded-lg animate-pulse">
        <div className="flex flex-col md:flex-row gap-3">
          {/* Image Skeleton */}
          <div className="md:w-1/3 flex justify-center items-start md:border-l-2">
            <div className="w-full h-64 bg-gray-200 rounded-lg mb-4 md:mb-0" />
          </div>
          
          {/* Content Skeleton */}
          <div className="md:w-2/3 md:pl-6 space-y-4">
            <div className="h-8 bg-gray-200 rounded w-3/4 mb-6" />
            
            <div className="flex flex-wrap gap-4">
              {/* Details Skeleton */}
              <div className="w-full md:w-1/2 space-y-4">
                <div className="h-6 bg-gray-200 rounded w-1/4 mb-4" />
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="flex justify-between">
                    <div className="h-4 bg-gray-200 rounded w-1/3" />
                    <div className="h-4 bg-gray-200 rounded w-1/4" />
                  </div>
                ))}
              </div>

              {/* Batches Skeleton */}
              <div className="w-full md:w-1/2 space-y-4">
                <div className="h-6 bg-gray-200 rounded w-1/4 mb-4" />
                {[...Array(2)].map((_, i) => (
                  <div key={i} className="space-y-2 border-b-2 pb-2">
                    {[...Array(5)].map((_, j) => (
                      <div key={j} className="flex justify-between">
                        <div className="h-4 bg-gray-200 rounded w-1/3" />
                        <div className="h-4 bg-gray-200 rounded w-1/4" />
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!medicine) {
    return notFound()
  }

  return (
    <div className="max-w-5xl mx-auto md:my-10 p-4 md:p-8 bg-white rounded-2xl shadow-xl border border-gray-50">
    <div className="flex flex-col md:flex-row gap-6 md:gap-8">
      {/* Image Section */}
      <div className="md:w-1/3 flex justify-center items-start">
        <div className="w-full h-72 bg-gradient-to-br from-teal-50 to-teal-100 rounded-2xl shadow-lg flex items-center justify-center p-4 transition-all duration-300 hover:shadow-xl">
          
            <div className="flex flex-col items-center gap-2">
              <GiMedicinePills className="text-4xl text-teal-600" />
              <span className="text-2xl font-bold text-teal-600 text-center">
                {medicine.name}
              </span>
            </div>
          
        </div>
      </div>

      {/* Content Section */}
      <div className="md:w-2/3 space-y-6">
        {/* Medicine Header */}
        <div className="border-b border-teal-100 pb-4">
          <h1 className="text-3xl font-extrabold text-gray-800 tracking-tight flex items-center gap-2">
            <FaCapsules className="text-teal-600" />
            {medicine.name}
          </h1>
          <p className="text-teal-600 mt-1 font-medium flex items-center gap-2">
            <FaIndustry className="text-base" />
            {medicine.brand}
          </p>
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Basic Information */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-4 border-l-4 border-teal-500 pl-3">
              <h2 className="text-xl font-bold text-gray-800">
                التفاصيل الأساسية
              </h2>
            </div>
            
            <div className="space-y-3">
              <DetailItem 
                label="نوع الاستعمال" 
                value={medicine.dosageForm}
                icon={<FaCapsules className="text-teal-600" />}
              />
              <DetailItem
                label="السعر"
                value={`${medicine.price.toLocaleString()} ريال يمني`}
                icon={<FaMoneyBillWave className="text-teal-600" />}
              />
              <DetailItem
                label="السعر الأساسي"
                value={`${medicine.basePrice?.toLocaleString() || 'N/A'} ريال يمني`}
                icon={<FaTag className="text-teal-600" />}
              />
            </div>
          </div>

          {/* Batches Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-4 border-l-4 border-teal-500 pl-3">
              <h2 className="text-xl font-bold text-gray-800">
                تفاصيل الدفعات
              </h2>
            </div>

            <div className="space-y-4">
              {medicine.batches.map((batch) => (
                <div 
                  key={batch.batchId}
                  className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
                >
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <DetailItem 
                      label="رقم الدفعة" 
                      value={batch.batchNumber}
                      icon={<FaBarcode className="text-sm text-teal-600" />}
                    />
                    <DetailItem 
                      label="الكمية المتبقية" 
                      value={batch.quantity}
                      icon={<FaBoxOpen className="text-sm text-teal-600" />}
                    />
                    <DetailItem 
                      label="المورد" 
                      value={`${batch.supplier.name}`}
                      icon={<FaIndustry className="text-sm text-teal-600" />}
                    />
                    <DetailItem 
                      label="تاريخ الإضافة" 
                      value={dayjs(batch.createdAt).format('DD/MM/YYYY')}
                      icon={<FaCalendarPlus className="text-sm text-teal-600" />}
                    />
                    <DetailItem 
                      label="تاريخ الانتهاء" 
                      value={dayjs(batch.expiryDate).format('DD/MM/YYYY')}
                      icon={<FaCalendarTimes className="text-sm text-teal-600" />}
                    />
                    <div className="col-span-2">
                      <DetailItem
                        label="الحالة"
                        value={
                          <StatusMedicine 
                            days={calculateRemainingDays(batch.expiryDate)} 
                            className="text-sm px-3 py-1 rounded-full" 
                          />
                        }
                        icon={<FaIdCard className="text-sm text-teal-600" />}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  
);
};

export default ShowFullDetails;

// Reusable DetailItem component
const DetailItem = ({ label, value, icon }: { label: string, value: any, icon?: React.ReactNode }) => (
  <div className="flex justify-between items-center gap-2">
    <span className="text-gray-600 font-medium flex items-center gap-2">
      {icon && <span className="shrink-0">{icon}</span>}
      {label}
    </span>
    <span className="text-gray-800 font-semibold text-end">
      {value}
    </span>
  </div>
);























