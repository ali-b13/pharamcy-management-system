
import BatchesList from './components/BatchesList'
import { getBatches } from '../../actions/batch/queries';
import SuppliersOverview from './components/SuppliersOverview'
import BatchesSkelton from './components/BatchesSkelton';

const batchesPage = async() => {
   const {batches,totalPages} =await getBatches()
    if(!batches.length){
      return <BatchesSkelton/>
    }
  return (
   
     <div className='w-full flex flex-col md:flex-row gap-3'>
     <BatchesList batches={batches} totalPages={totalPages}/>
       <div className='w-full md:w-2/4'>
        <SuppliersOverview />
      </div>
    </div>
  )
}

export default batchesPage