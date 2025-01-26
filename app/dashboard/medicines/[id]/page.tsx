
import ShowFullDetails from '../components/ShowFullDetails';
const medicinePage =async ({params}:{params:{id:string}}) => {
  return (
     <ShowFullDetails id={params.id}/>
  )
}

export default medicinePage