import React from 'react'
import SalesComponent from './Sales'
import Satastics from './Satastics'
import { getSalesData, getSatasticsData } from '@/app/actions/dashboard/actions'

const Dashboard = async() => {
  const salesData =await getSalesData()
  const {
    totalSoldProducts,
    totalBatches,
    totalMedicines,
    totalReceivedAmount,
    totalWarningMedicines,
    totalExpiredMedicines,
  } = await getSatasticsData();
  return (
   <>
   <Satastics   
    totalSoldProducts={totalSoldProducts}
    totalBatches={totalBatches}
    totalMedicines={totalMedicines}
    totalReceivedAmount={totalReceivedAmount}
    totalWarningMedicines={totalWarningMedicines}
    totalExpiredMedicines={totalExpiredMedicines}
    />
   <SalesComponent data={salesData}/>
   </>
  )
}

export default Dashboard