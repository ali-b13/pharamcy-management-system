
import BatchesList from './components/BatchesList'
import { getBatches } from '../../actions/batch/queries';
import SuppliersOverview from './components/SuppliersOverview'

const batchesPage = async() => {
   const {batches,totalPages} =await getBatches()
  
  return (
   
     <div className='w-full flex flex-col md:flex-row gap-3'>
     <BatchesList batches={batches.length?batches:[]} totalPages={totalPages}/>
       <div className='w-full md:w-2/4'>
        <SuppliersOverview />
      </div>
    </div>
  )
}

export default batchesPage