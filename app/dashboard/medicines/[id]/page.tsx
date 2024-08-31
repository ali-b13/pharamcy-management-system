
import { getMedicine } from '@/app/actions/medicine/queries';
import { notFound } from 'next/navigation';
import ShowFullDetails from '../components/ShowFullDetails';

const editMedicinePage =async ({params}:{params:{id:string}}) => {
    const {id}=params;
    const res= await getMedicine(id)
    if(res.error)return notFound()
  return (
     <ShowFullDetails medicine={res.medicine}/>
  )
}

export default editMedicinePage