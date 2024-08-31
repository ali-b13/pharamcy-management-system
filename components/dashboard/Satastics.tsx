import { getSatasticsData } from '@/app/actions/dashboard/actions';
import { FaAccusoft, FaMoneyBillWave, FaPills, FaExclamationTriangle } from 'react-icons/fa';
import { BiSolidPackage } from "react-icons/bi";

interface StatisticsProps{
  totalSoldProducts:number
  totalBatches:number
  totalMedicines:number
  totalReceivedAmount:number
  totalWarningMedicines:number
  totalExpiredMedicines:number
}
const Statistics :React.FC<StatisticsProps>= ({totalBatches,
  totalExpiredMedicines,
  totalMedicines,totalReceivedAmount,
  totalSoldProducts,totalWarningMedicines}) => {
 

  return (
    <div className="w-full pt-4 bg-gray-50">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Card 1 */}
        <div className="bg-gradient-to-r from-pink-400 to-pink-600 text-white shadow-lg rounded-lg overflow-hidden border border-gray-300 flex items-center justify-center p-2">
          <div className="flex flex-col items-center">
          <FaAccusoft className="text-2xl mb-1" />
          <h3 className="text-xs font-semibold mb-1">اجمالي المنتجات المباعة</h3>
            <p className="text-lg font-bold">{totalSoldProducts}</p>
          </div>
        </div>
        {/* Card 2 */}
        <div className="bg-gradient-to-r from-blue-400 to-blue-600 text-white shadow-lg rounded-lg overflow-hidden border border-gray-300 flex items-center justify-center p-2">
          <div className="flex flex-col items-center">
            <BiSolidPackage className="text-2xl mb-1" />
            <h3 className="text-xs font-semibold mb-1">اجمالي الدفعات</h3>
            <p className="text-lg font-bold">{totalBatches}</p>
          </div>
        </div>
        {/* Card 3 */}
        <div className="bg-gradient-to-r from-purple-400 to-purple-600 text-white shadow-lg rounded-lg overflow-hidden border border-gray-300 flex items-center justify-center p-2">
          <div className="flex flex-col items-center">
            <FaPills className="text-2xl mb-1" />
            <h3 className="text-xs font-semibold mb-1">مجموع الادوية</h3>
            <p className="text-lg font-bold">{totalMedicines}</p>
          </div>
        </div>
        {/* Card 4 */}
        <div className="bg-gradient-to-r from-green-400 to-green-600 text-white shadow-lg rounded-lg overflow-hidden border border-gray-300 flex items-center justify-center p-2">
          <div className="flex flex-col items-center">
            <FaMoneyBillWave className="text-2xl mb-1" />
            <h3 className="text-xs font-semibold mb-1">الاموال المستلمه</h3>
            <p className="text-lg font-bold">{totalReceivedAmount} ريال</p>
          </div>
        </div>
        {/* Card 5 */}
        <div className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-white shadow-lg rounded-lg overflow-hidden border border-gray-300 flex items-center justify-center p-2">
          <div className="flex flex-col items-center">
            <FaExclamationTriangle className="text-2xl mb-1" />
            <h3 className="text-xs font-semibold mb-1">اجمالي الادوية في شهر الانتهاء</h3>
            <p className="text-lg font-bold">{totalWarningMedicines}</p>
          </div>
        </div>
        {/* Card 6 */}
        <div className="bg-gradient-to-r from-red-400 to-red-600 text-white shadow-lg rounded-lg overflow-hidden border border-gray-300 flex items-center justify-center p-2">
          <div className="flex flex-col items-center">
          <FaExclamationTriangle className="text-2xl mb-1" />
          <h3 className="text-xs font-semibold mb-1">اجمالي الادوية المنتهية</h3>
            <p className="text-lg font-bold">{totalExpiredMedicines}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Statistics;
