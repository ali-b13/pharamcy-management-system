"use client";
import React, { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { calculateRemainingDaysWithText } from '@/utils/helpers';
import Pagination from '@/components/Pagination';
import { BatchWithMedicineProps } from '@/types.dt';
import dayjs from 'dayjs';
import { getExpiredMedicines } from '@/app/actions/medicine/queries';
import Header from '@/components/Header';

interface ExpiredMedicinesProps {
    medicines: BatchWithMedicineProps[];
    totalPages: number;
}

const ExpiredList = ({ medicines, totalPages }: ExpiredMedicinesProps) => {
    const [expiredMedicines, setMedicines] = useState<BatchWithMedicineProps[]>(medicines);
    const [overAllPages, setTotalPages] = useState(totalPages);
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchMedicines = useCallback(async (page: number) => {
        setLoading(true);
        setError(null);
        try {
            const data = await getExpiredMedicines(page, 4);
            setMedicines(data.expiredMedicines);
            setTotalPages(data.totalPages);
        } catch (error) {
            console.error('خطاء غير متوقع', error);
            setError('خطاء غير متوقع');
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchMedicines(currentPage);
    }, [fetchMedicines, currentPage]);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    return (
        <div className="p-6 bg-gray-100 min-h-screen md:max-w-3xl  md:my-8 rounded-2xl shadow-lg">
            <Header title='الأدوية المنتهية' />
            <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
                <ul className="space-y-4">
                    {expiredMedicines?.length ? expiredMedicines.map((batch: BatchWithMedicineProps) => (
                        <li key={batch.batchNumber} className="p-5 bg-white rounded-lg shadow-sm border border-gray-300">
                            <div className="flex items-center justify-start gap-3  mb-6">
                                <div className="text-lg font-bold text-red-600 "> الدواء : {batch.medicine.name}</div>
                                <div className="text-sm font-medium text-red-500"> الشركه : {batch.medicine.brand}</div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-700">
                                <div className="flex items-center">
                                    <span className="font-medium w-1/3">رقم الدفعة:</span>
                                    <span className="w-2/3">{batch.batchNumber}</span>
                                </div>
                                <div className="flex items-center">
                                    <span className="font-medium w-1/3">الكمية المتبقية:</span>
                                    <span className="w-2/3">{batch.quantity}</span>
                                </div>
                                <div className="flex items-center">
                                    <span className="font-medium w-1/3">تاريخ الإضافة:</span>
                                    <span className="w-2/3">{dayjs(batch.createdAt).format('YYYY-MM-DD')}</span>
                                </div>
                                <div className="flex items-center">
                                    <span className="font-medium w-1/3">تاريخ الانتهاء:</span>
                                    <span className="w-2/3">{dayjs(batch.expiryDate).format('YYYY-MM-DD')}</span>
                                </div>
                                <div className="flex items-center col-span-1">
                                    <span className="font-medium w-1/3">الأيام المتبقية:</span>
                                    <span className="w-2/3">{calculateRemainingDaysWithText(batch.expiryDate)}</span>
                                </div>
                            </div>
                        </li>
                    )) : <div className="text-center text-gray-600">لا توجد أدوية منتهية</div>}
                </ul>
                <div className="mt-6 flex justify-center">
                    {expiredMedicines && expiredMedicines.length > 0 && (
                        <Pagination
                            currentPage={currentPage}
                            totalPages={overAllPages}
                            onPageChange={handlePageChange}
                        />
                    )}
                </div>
                {loading && (
                    <div className="mt-4 text-center text-blue-600">
                        جاري التحميل...
                    </div>
                )}
                {error && (
                    <div className="mt-4 text-center text-red-600">
                        {error}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ExpiredList;
