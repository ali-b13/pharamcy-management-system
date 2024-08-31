import ExpiredList from "../components/ExpiredList"
import { getExpiredMedicines, getMedicineWarnings } from '../../../actions/medicine/queries';
import WarningList from "../components/WarningList";


const warningMedicinePage = async() => {
    const {warningMedicines,totalPages}=await getMedicineWarnings()
  return (<WarningList medicines={warningMedicines} totalPages={totalPages}/> )
}

export default warningMedicinePage