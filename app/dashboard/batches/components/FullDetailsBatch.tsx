import { calculateRemainingDays, calculateRemainingDaysWithText } from '@/utils/helpers';
import dayjs from 'dayjs';
import { BatchWithMedicineProps } from '@/types.dt';
import StatusMedicine from '../../../../components/StatusMedicine';
import Image from 'next/image';

const ShowFullDetails = ({ batch }: { batch: BatchWithMedicineProps }) => {
  if (!batch) {
    return <div className="text-center text-red-500 py-6">لا يوجد أي معلومات حول هذه الدفعة</div>;
  }

  return (
    <div className="max-w-5xl mx-auto md:my-10 p-6 bg-white rounded-xl shadow-lg border border-gray-100">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Image Section */}
        <div className="md:w-1/3 flex justify-center items-start">
          {false ? (
            <Image
              height={200}
              width={200}
              src={batch.medicine.image}
              alt={batch.medicine.name}
              className="rounded-lg shadow-lg object-cover"
            />
          ) : (
            <div className="bg-gray-100 rounded-lg shadow-lg flex items-center justify-center w-full h-48">
              <span className="text-gray-500 text-xl font-semibold">{batch.medicine.name}</span>
            </div>
          )}
        </div>

        {/* Details Section */}
        <div className="md:w-2/3">
          <h1 className="text-3xl font-bold text-gray-800 mb-6 border-b-2 border-gray-200 pb-4">
            {batch.batchNumber}
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Product Details */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-800 border-b-2 border-gray-200 pb-2">
                المنتج
              </h2>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="font-medium text-gray-700">اسم الدواء:</span>
                  <span className="text-gray-600">{batch.medicine.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium text-gray-700">الشركة المصنعة:</span>
                  <span className="text-gray-600">{batch.medicine.brand}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium text-gray-700">نوع الاستعمال:</span>
                  <span className="text-gray-600">{batch.medicine.dosageForm}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium text-gray-700">سعر المنتج:</span>
                  <span className="text-gray-600">{batch.medicine.price} ريال يمني</span>
                </div>
              </div>
            </div>

            {/* Batch Details */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-800 border-b-2 border-gray-200 pb-2">
                تفاصيل الدفعة
              </h2>
              <ul className="space-y-3">
                <li className="flex justify-between">
                  <span className="font-medium text-gray-700">رقم الدفعة:</span>
                  <span className="text-gray-600">{batch.batchNumber}</span>
                </li>
                <li className="flex justify-between">
                  <span className="font-medium text-gray-700">مورد الدفعة:</span>
                  <span className="text-gray-600">{batch.supplier.name}</span>
                </li>
                <li className="flex justify-between">
                  <span className="font-medium text-gray-700">الكمية المتبقية:</span>
                  <span className="text-gray-600">{batch.quantity}</span>
                </li>
                <li className="flex justify-between">
                  <span className="font-medium text-gray-700">تاريخ الإضافة:</span>
                  <span className="text-gray-600">{dayjs(batch.createdAt).format('YYYY-MM-DD')}</span>
                </li>
                <li className="flex justify-between">
                  <span className="font-medium text-gray-700">تاريخ الانتهاء:</span>
                  <span className="text-gray-600">{dayjs(batch.expiryDate).format('YYYY-MM-DD')}</span>
                </li>
                <li className="flex justify-between">
                  <span className="font-medium text-gray-700">الأيام المتبقية:</span>
                  <span className="text-gray-600">{calculateRemainingDaysWithText(batch.expiryDate)}</span>
                </li>
                <li className="flex justify-between">
                  <span className="font-medium text-gray-700">الحالة:</span>
                  <span className="text-gray-600">
                    <StatusMedicine days={calculateRemainingDays(batch.expiryDate)} />
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShowFullDetails;