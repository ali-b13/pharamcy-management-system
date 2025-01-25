// Dashboard component
"use client"
import { useEffect, useState } from 'react';
import SalesComponent from './Sales'
import Statistics, { StatisticsProps } from './Satastics' // Fixed component name
import { getSalesData, getSatasticsData } from '@/app/actions/dashboard/actions';

// Interface should match StatisticsProps from component
interface DashboardStatistics extends StatisticsProps {
  // No changes needed here since we're using the component's props directly
}

const Dashboard = () => {
  const [salesData, setSalesData] = useState<any[]>([]); // Add proper type for salesData
  const [statistics, setStatistics] = useState<DashboardStatistics>({
    totalSoldProducts: 0,
    totalBatches: 0,
    totalMedicines: 0,
    totalReceivedAmount: 0,
    totalWarningMedicines: 0,
    totalExpiredMedicines: 0
  });

  const fetchData = async () => {
    try {
      const salesResponse = await getSalesData();
      const statsResponse = await getSatasticsData();
      
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
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <Statistics {...statistics} />
      <SalesComponent data={salesData} />
    </>
  );
};

export default Dashboard;