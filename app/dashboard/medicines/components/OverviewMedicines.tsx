"use client"
import React, { useEffect, useState } from 'react'
import WarningMedicines from './WarningOverview'
import ExpiredMedicines from './ExpiredOverview'
import { BatchWithMedicineProps } from '@/types.dt'
import { getExpiredMedicines, getMedicineWarnings } from '@/app/actions/medicine/queries'


const OverviewMedicines =() => {
  const [warnItems,setWarnItems]=useState<BatchWithMedicineProps[]>()
  const [expiredItems,setExpiredItems]=useState<BatchWithMedicineProps[]>()
  const fetchData=async()=>{
    const {warningMedicines}=await getMedicineWarnings()
    const {expiredMedicines}=await getExpiredMedicines()
    setWarnItems(warningMedicines)
    setExpiredItems(expiredMedicines)

  }
  useEffect(()=>{
    fetchData()
  },[])
  return (
    <div className='w-full md:w-2/4 flex flex-col gap-4 '> 
     <WarningMedicines medicines={warnItems||[]}/>
     <ExpiredMedicines medicines={expiredItems||[]}/>
    </div>
  )
}

export default OverviewMedicines