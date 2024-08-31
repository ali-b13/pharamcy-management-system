// components/SalesBarChart.js
import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const SalesBarChart = ({ salesData, timeFrame }:any) => {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: `بيانات المبيعات - ${timeFrame=='weekly'?'اسبوعيا':timeFrame=='monthly'?'شهريا':'سنويا'}`,

      },
    },
  };

  const labels = salesData?.map((data:any) => data.label);
  const data = {
    labels,
    datasets: [
      {
        label: 'المبيعات',
        data: salesData.map((data:any) => data.value),
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  return <Bar options={options as any} data={data} />;
};

export default SalesBarChart;
