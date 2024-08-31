import { calculateRemainingDays, calculateRemainingDaysWithText } from '@/utils/helpers';
import dayjs from 'dayjs';
import { BatchType, MedicineWithBatchesProps } from '@/types.dt';
import StatusMedicine from '../../../../components/StatusMedicine';
import Image from 'next/image';

const ShowFullDetails = ({ medicine }: { medicine: MedicineWithBatchesProps }) => {
  if (!medicine) {
    return <div className="text-center text-red-500">لايوجد اي معلومات حول هاذا الدواء</div>;
  }

  return (
    <div className="max-w-5xl mx-auto md:my-10 p-4 md:p-6 bg-white shadow-md rounded-lg">
      <div className="flex flex-col md:flex-row gap-3">
        <div className="md:w-1/3 flex justify-center items-start md:border-l-2">
          {medicine.image ? (
            <img
              src={medicine.image}
              alt={medicine.name}
              
              className="rounded-lg shadow-lg mb-4 md:mb-0 max-w-full max-h-full object-cover"
            />
          ) : (
            <div className="bg-gray-200 rounded-lg shadow-lg mb-4 md:mb-0 flex items-center justify-center w-full h-48">
              <span className="text-gray-500 text-lg">{medicine.name}</span>
            </div>
          )}
        </div>
        <div className="md:w-2/3 md:pl-6">
          <h1 className="text-3xl font-bold mb-4 border-b-2 border-gray-200 pb-2">{medicine.name}</h1>
          <div className="flex flex-wrap">
            <div className="w-full md:w-1/2 mb-4 md:border-l-2 md:px-2">
              <h2 className="text-xl font-semibold mb-2 border-b-2 border-gray-200 pb-2">التفاصيل</h2>
              <div className="mb-2 flex justify-between">
                <span className="font-medium text-gray-700">الشركه المصنعة:</span>
                <span className="text-gray-600">{medicine.brand}</span>
              </div>
              <div className="mb-2 flex justify-between">
                <span className="font-medium text-gray-700">نوع الاستعمال:</span>
                <span className="text-gray-600">{medicine.dosageForm}</span>
              </div>
              <div className="mb-2 flex justify-between">
                <span className="font-medium text-gray-700">سعر المنتج:</span>
                <span className="text-gray-600">{medicine.price} ريال يمني</span>
              </div>
            </div>
            <div className="w-full md:w-1/2 mb-4 md:border-l-2 md:px-2">
              <h2 className="text-xl font-semibold mb-2 border-b-2 border-gray-200 pb-2">الدفعات</h2>
              <ul className="text-gray-600 space-y-2">
                {medicine.batches.map((batch) => (
                  <li key={batch.batchId} className="mb-2 border-b-2">
                    <div className="flex justify-between">
                      <span className="font-medium text-gray-700">رقم الدفعه:</span>
                      <span>{batch.batchNumber}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium text-gray-700">الكميه المتبقيه:</span>
                      <span>{batch.quantity}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium text-gray-700">تاريخ الاضافه:</span>
                      <span>{dayjs(batch.createdAt).format('YYYY-MM-DD')}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium text-gray-700">تاريخ الانتهاء:</span>
                      <span>{dayjs(batch.expiryDate).format('YYYY-MM-DD')}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium text-gray-700">الايام المتبقيه:</span>
                      <span>{calculateRemainingDaysWithText(batch.expiryDate)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium text-gray-700">الحاله:</span>
                      <span><StatusMedicine days={calculateRemainingDays(batch.expiryDate)} /></span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShowFullDetails;
