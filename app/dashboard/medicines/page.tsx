import MedicineList from './components/MedicineList'
import OverviewMedicines from './components/OverviewMedicines'
import { getExpiredMedicines, getMedicines, getMedicineWarnings } from '../../actions/medicine/queries'

const medicinePage = async() => {
  const data=await getMedicines()
  const {warningMedicines}=await getMedicineWarnings()
  const {expiredMedicines}=await   getExpiredMedicines()
  return (
    <section className='w-full flex flex-col md:flex-row p-2  gap-4'>
     <MedicineList data={data.length?data:[]}/>
     <OverviewMedicines 
     warnItems={warningMedicines.length?warningMedicines:[]}
      expiredItems={expiredMedicines.length?expiredMedicines:[]}
      />
    </section>
  )
}

export default medicinePage