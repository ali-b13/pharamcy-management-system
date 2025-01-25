// batches/page.tsx (Server Component)
import BatchesList from './components/BatchesList'
import SuppliersOverview from './components/SuppliersOverview'

const BatchesPage = () => {
  return (
    <div className='w-full flex flex-col md:flex-row gap-3'>
      <BatchesList />
      <div className='w-full md:w-2/4'>
        <SuppliersOverview />
      </div>
    </div>
  )
}

export default BatchesPage