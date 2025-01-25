import { getExpiredMedicines, getMedicines, getMedicineWarnings } from "@/app/actions/medicine/queries";
import MedicineList from "./components/MedicineList";
import OverviewMedicines from "./components/OverviewMedicines";

const MedicinePage = async() => {
  const data = await getMedicines() || [];

  return (
    <section className='w-full flex flex-col md:flex-row p-2 gap-4'>
      <MedicineList data={data?.length ? data : []} />
      <OverviewMedicines />
    </section>
  )
}
export default MedicinePage