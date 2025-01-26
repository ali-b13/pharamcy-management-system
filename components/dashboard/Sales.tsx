"use client";

import React, { useCallback, useEffect, useState } from "react";
import SalesBarChart from "@/components/chart/SalesBarChart";
import { getSalesData } from "@/app/actions/dashboard/actions";
import { FiCalendar, FiArrowUpRight, FiBarChart2 } from "react-icons/fi";

const SalesComponent: React.FC = () => {
  const [salesData, setSalesData] = useState<any>([]);
  const [timeFrame, setTimeFrame] = useState<string>("monthly");
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const fetchSalesData = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await getSalesData(timeFrame);
      setSalesData(data);
    } catch (error) {
      console.error("Error fetching sales data:", error);
    } finally {
      setIsLoading(false);
    }
  }, [timeFrame]);

  useEffect(() => {
    fetchSalesData();
  }, [fetchSalesData]);

  const timeFrames = [
    { id: "weekly", label: "اسبوعيا", icon: <FiArrowUpRight />, color: "from-green-400 to-green-600" },
    { id: "monthly", label: "شهريا", icon: <FiCalendar />, color: "from-blue-400 to-blue-600" },
    { id: "annually", label: "سنويا", icon: <FiBarChart2 />, color: "from-purple-400 to-purple-600" },
  ];

  return (
    <div className="w-full bg-white rounded-xl shadow-lg p-6 transition-all duration-300 hover:shadow-xl">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Control Panel */}
        <div className="flex md:flex-col gap-3 md:w-64">
          <h1 className="text-2xl font-bold text-gray-800 mb-4 hidden md:block">
            المبيعات بالرسم البياني
          </h1>
          <div className="flex flex-row md:flex-col gap-2">
            {timeFrames.map((tf) => (
              <button
                key={tf.id}
                onClick={() => setTimeFrame(tf.id)}
                className={`flex items-center justify-center gap-2 p-3 rounded-lg transition-all duration-200 ${
                  timeFrame === tf.id
                    ? `bg-gradient-to-r ${tf.color} text-white shadow-lg`
                    : "bg-gray-50 hover:bg-gray-100 text-gray-600"
                }`}
              >
                <span className="text-lg">{tf.icon}</span>
                <span className="text-sm font-medium">{tf.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Chart Container */}
        <div className="flex-1 min-h-[400px] bg-gray-50 rounded-xl p-4">
          {isLoading ? (
            <div className="w-full h-full flex items-center justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
            </div>
          ) : (
            <SalesBarChart salesData={salesData} timeFrame={timeFrame} />
          )}
        </div>
      </div>

      {/* Mobile Title */}
      <h1 className="text-xl font-bold text-gray-800 mt-4 md:hidden">
        المبيعات بالرسم البياني
      </h1>
    </div>
  );
};

export default SalesComponent;