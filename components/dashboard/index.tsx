"use client"
import { useEffect, useState } from 'react';
import SalesComponent from './Sales'
import Statistics, { StatisticsProps } from './Satastics'
import { getSalesData, getSatasticsData } from '@/app/actions/dashboard/actions';

interface DashboardStatistics extends StatisticsProps {}

const Dashboard = () => {
  const [salesData, setSalesData] = useState<any[]>([]);
  const [statistics, setStatistics] = useState<DashboardStatistics>({
    totalSoldProducts: 0,
    totalBatches: 0,
    totalMedicines: 0,
    totalReceivedAmount: 0,
    totalWarningMedicines: 0,
    totalExpiredMedicines: 0
  });
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    try {
      const [salesResponse, statsResponse] = await Promise.all([
        getSalesData(),
        getSatasticsData()
      ]);

      setSalesData(salesResponse || []);
      setStatistics({
        totalSoldProducts: statsResponse?.totalSoldProducts ?? 0,
        totalBatches: statsResponse?.totalBatches ?? 0,
        totalMedicines: statsResponse?.totalMedicines ?? 0,
        totalReceivedAmount: statsResponse?.totalReceivedAmount ?? 0,
        totalWarningMedicines: statsResponse?.totalWarningMedicines ?? 0,
        totalExpiredMedicines: statsResponse?.totalExpiredMedicines ?? 0
      });
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Skeleton Loader Components
  const StatisticsSkeleton = () => (
    <div className="w-full pt-4 bg-gray-50">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {[...Array(6)].map((_, index) => (
          <div key={index} className="bg-gray-200 text-white shadow-lg rounded-lg overflow-hidden border border-gray-300 flex items-center justify-center p-2">
            <div className="flex flex-col items-center">
              <div className="h-6 w-6 bg-gray-300 rounded-full mb-1 animate-pulse" />
              <div className="h-4 w-24 bg-gray-300 rounded mb-1 animate-pulse" />
              <div className="h-6 w-16 bg-gray-300 rounded animate-pulse" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const ChartSkeleton = () => (
    <div className="w-full mt-8 p-4 bg-white rounded-lg shadow-lg border border-gray-300">
      <div className="h-6 w-48 bg-gray-200 rounded mb-4 animate-pulse" />
      <div className="h-64 bg-gray-200 rounded-lg animate-pulse" />
    </div>
  );

  return (
    <div className="dashboard-container">
      {isLoading ? (
        <>
          <StatisticsSkeleton />
          <ChartSkeleton />
        </>
      ) : (
        <>
          <Statistics {...statistics} />
          <SalesComponent data={salesData} />
        </>
      )}
    </div>
  );
};

export default Dashboard;