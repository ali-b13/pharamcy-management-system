"use client"
import SalesComponent from './Sales'
import Satastics, { StatisticsProps } from './Satastics'
 
 interface DashboardProps{
  salesData :any;
  satastics:StatisticsProps
 }
const Dashboard :React.FC<DashboardProps>= ({salesData,satastics}) => {

  return (
   <>
   <Satastics   
    totalSoldProducts={satastics.totalSoldProducts}
    totalBatches={satastics.totalBatches}
    totalMedicines={satastics.totalMedicines}
    totalReceivedAmount={satastics.totalReceivedAmount}
    totalWarningMedicines={satastics.totalWarningMedicines}
    totalExpiredMedicines={satastics.totalExpiredMedicines}
    />
   <SalesComponent data={salesData}/>
   </>
  )
}

export default Dashboard