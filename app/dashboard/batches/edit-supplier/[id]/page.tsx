import React from 'react'
import SupplierForm from '../../components/SupplierForm'
import { getSupplierById } from '@/app/actions/batch/queries'

const editSupplierPage =async ({params}:{params:{id:string}}) => {
  const {supplier}=await  getSupplierById(params.id)
  return (
    <SupplierForm isEditable item={supplier} label='تعديل بيانات المورد'/>
  )
}

export default editSupplierPage