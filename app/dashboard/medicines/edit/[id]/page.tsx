import { getMedicine } from '@/app/actions/medicine/queries';
import MedicineForm from '../../components/EditForm';

const EditPage =async ({params}:{params:{id:string}}) => {
    const {id}=params;
  
  return (
    <MedicineForm id={id}/>
  )
}

export default EditPage