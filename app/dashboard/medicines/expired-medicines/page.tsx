import ExpiredList from "../components/ExpiredList"
import { getExpiredMedicines } from '../../../actions/medicine/queries';


const expiredMedicinePage = async() => {
    const {expiredMedicines,totalPages}=await getExpiredMedicines()
  return (<ExpiredList medicines={expiredMedicines} totalPages={totalPages}/> )
}

export default expiredMedicinePage