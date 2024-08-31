import { getBatch } from '@/app/actions/batch/queries'
import { notFound } from 'next/navigation'
import React from 'react'
import ShowFullDetails from '../components/FullDetailsBatch'

const DetailBatchPage = async({params}:{params:{id:string}}) => {
   const {batch,error,success} =await getBatch(params.id)
   if(!success || error)return notFound()
  return (
    <ShowFullDetails batch={batch}/>
  )
}

export default DetailBatchPage