import React from 'react'
import MedicineForm from '../../components/Form';
import { getMedicine } from '@/app/actions/medicine/queries';
import { notFound } from 'next/navigation';

const editMedicinePage =async ({params}:{params:{id:string}}) => {
    const {id}=params;
    const {medicine}= await getMedicine(id)
    if(!medicine)return notFound()
  return (
    <MedicineForm item={medicine} label='تعديل معلومات الدواء' isEditable/>
  )
}

export default editMedicinePage