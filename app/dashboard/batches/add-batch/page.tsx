import React from 'react'
import BatchForm from '../components/Form'
import { getMedicines } from '@/app/actions/medicine/queries'

const addNewBatch = async() => {
    
  return (<BatchForm   label='اضافة دفعة جديدة'/>)
}

export default addNewBatch