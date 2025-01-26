"use client";
import { useEffect, useState } from "react";
import { FaAccusoft, FaMoneyBillWave, FaPills, FaExclamationTriangle } from "react-icons/fa";
import { BiSolidPackage } from "react-icons/bi";
import { getSatasticsData } from "@/app/actions/dashboard/actions";
import { motion } from "framer-motion";

export interface StatisticsProps {
  totalSoldProducts: number;
  totalBatches: number;
  totalMedicines: number;
  totalReceivedAmount: number;
  totalWarningMedicines: number;
  totalExpiredMedicines: number;
}

const Statistics: React.FC = () => {
  const [statistics, setStatistics] = useState<StatisticsProps>({
    totalSoldProducts: 0,
    totalBatches: 0,
    totalMedicines: 0,
    totalReceivedAmount: 0,
    totalWarningMedicines: 0,
    totalExpiredMedicines: 0,
  });

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStatistics = async () => {
      try {
        const statsResponse = await getSatasticsData();
        setStatistics({
          totalSoldProducts: statsResponse?.totalSoldProducts ?? 0,
          totalBatches: statsResponse?.totalBatches ?? 0,
          totalMedicines: statsResponse?.totalMedicines ?? 0,
          totalReceivedAmount: statsResponse?.totalReceivedAmount ?? 0,
          totalWarningMedicines: statsResponse?.totalWarningMedicines ?? 0,
          totalExpiredMedicines: statsResponse?.totalExpiredMedicines ?? 0,
        });
      } catch (error) {
        console.error("Error fetching statistics data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStatistics();
  }, []);

  const formatNumber = (num: number) => num.toLocaleString();
  const formatCurrency = (num: number) => num.toLocaleString("ar-SA");

  if (isLoading) {
    return (
      <div className="w-full p-6 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {[...Array(6)].map((_, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="h-32 bg-white/80 backdrop-blur-sm rounded-xl shadow-sm border border-gray-200/50"
            >
              <div className="h-full flex flex-col justify-center items-center gap-2">
                <div className="h-8 w-8 bg-gray-200 rounded-full animate-pulse" />
                <div className="h-4 w-32 bg-gray-200 rounded-lg" />
                <div className="h-6 w-24 bg-gray-200 rounded-lg" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full p-6 bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        <StatCard
          icon={<FaAccusoft className="text-3xl" />}
          title="اجمالي المنتجات المباعة"
          value={formatNumber(statistics.totalSoldProducts)}
          color="bg-gradient-to-br from-pink-400 to-pink-500"
        />
        <StatCard
          icon={<BiSolidPackage className="text-3xl" />}
          title="اجمالي الدفعات"
          value={formatNumber(statistics.totalBatches)}
          color="bg-gradient-to-br from-blue-400 to-blue-500"
        />
        <StatCard
          icon={<FaPills className="text-3xl" />}
          title="مجموع الادوية"
          value={formatNumber(statistics.totalMedicines)}
          color="bg-gradient-to-br from-purple-400 to-purple-500"
        />
        <StatCard
          icon={<FaMoneyBillWave className="text-3xl" />}
          title="الاموال المستلمه"
          value={`${formatCurrency(statistics.totalReceivedAmount)} ريال`}
          color="bg-gradient-to-br from-green-400 to-green-500"
        />
        <StatCard
          icon={<FaExclamationTriangle className="text-3xl" />}
          title="ادوية في شهر الانتهاء"
          value={formatNumber(statistics.totalWarningMedicines)}
          color="bg-gradient-to-br from-amber-400 to-amber-500"
        />
        <StatCard
          icon={<FaExclamationTriangle className="text-3xl" />}
          title="الادوية المنتهية"
          value={formatNumber(statistics.totalExpiredMedicines)}
          color="bg-gradient-to-br from-red-400 to-red-500"
        />
      </div>
    </div>
  );
};

interface StatCardProps {
  icon: React.ReactNode;
  title: string;
  value: string;
  color: string;
}

const StatCard = ({ icon, title, value, color }: StatCardProps) => (
  <motion.div 
    initial={{ y: 20, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    className="group h-32 bg-white/80 backdrop-blur-sm rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-200/50 hover:border-gray-300/50 relative overflow-hidden"
  >
    <div className="absolute inset-0 w-full h-full opacity-0 group-hover:opacity-100 transition-opacity">
      <div className={`absolute -inset-2 ${color} blur-xl opacity-20 animate-pulse`} />
    </div>
    
    <div className="relative h-full flex items-center p-6 gap-4">
      <div className={`${color} w-14 h-14 rounded-xl flex items-center justify-center text-white shadow-lg`}>
        {icon}
      </div>
      
      <div className="flex-1">
        <h3 className="text-sm font-medium text-gray-500 mb-1">{title}</h3>
        <p className="text-2xl font-bold text-gray-800">{value}</p>
      </div>
    </div>
  </motion.div>
);

export default Statistics;