import React from 'react'
import WarningMedicines from './WarningOverview'
import ExpiredMedicines from './ExpiredOverview'
import { BatchWithMedicineProps } from '@/types.dt'

interface OverViewProps{
 warnItems:BatchWithMedicineProps[]
 expiredItems:BatchWithMedicineProps[]
}
const OverviewMedicines:React.FC<OverViewProps> = async({expiredItems,warnItems}) => {

  return (
    <div className='w-full md:w-2/4 flex flex-col gap-4 justify-center'> 
     <WarningMedicines medicines={warnItems}/>
     <ExpiredMedicines medicines={expiredItems}/>
    </div>
  )
}

export default OverviewMedicines