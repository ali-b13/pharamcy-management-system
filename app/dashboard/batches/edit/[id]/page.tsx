import React from 'react'
import BatchForm from '../../components/Form'
import { getBatch } from '@/app/actions/batch/queries'
import { notFound } from 'next/navigation'

const editBatchPage = async({params}:{params:{id:string}}) => {
  const {success,batch,error}=await  getBatch(params.id)
  if(!success || error)return notFound()
  return (
    <BatchForm isEditable label='تعديل بيانات الدفعة' item={batch}/>
  )
}

export default editBatchPage