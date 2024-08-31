"use client"
import React, { useCallback, useEffect, useState } from 'react';
import SalesBarChart from '@/components/chart/SalesBarChart';
import { getSalesData } from '@/app/actions/dashboard/actions';


const SalesComponent = ({data}:any) => {
  const [salesData,setSalesData]=useState(data)
  const [timeFrame, setTimeFrame] = useState('monthly');
   useEffect(()=>{
     fetchSalesData()
   },[timeFrame])
   const fetchSalesData=useCallback(async()=>{
      const data=await  getSalesData(timeFrame)
      setSalesData(data)
   },[timeFrame])

  return (
    <div className='w-full flex flex-col-reverse  md:flex-row md:items-center '>
      <div className='flex flex-col gap-3 p-2'>
      <h1 className='text-xl font-semibold'>المبيعات بالرسم البياني</h1>
        <button className='bg-green-400 hover:bg-green-800 text-white outline-none rounded-lg p-1' onClick={() => setTimeFrame('weekly')}>اسبوعيا</button>
        <button className='bg-blue-400 hover:bg-blue-800 text-white outline-none rounded-lg p-1' onClick={() => setTimeFrame('monthly')}>شهريا</button>
        <button className='bg-purple-400 hover:bg-purple-800 text-white outline-none rounded-lg p-1' onClick={() => setTimeFrame('annually')}>سنويا</button>
      </div>
     <div className='w-full  md:w-3/5 p-2'>
     <SalesBarChart salesData={salesData} timeFrame={timeFrame} />
     </div>
    
    </div>
  );
};

export default SalesComponent;
