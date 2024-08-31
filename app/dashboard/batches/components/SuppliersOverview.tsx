"use client"
import PrimaryButton from '@/components/buttons/PrimaryButton'
import Header from '@/components/Header'
import ModalBox from '@/components/ModalBox'
import { SupplierType } from '@/types.dt'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { CiEdit } from 'react-icons/ci'
import { MdDelete } from 'react-icons/md'
import { deleteSupplier, getAllSuppliers } from '../../../actions/batch/queries';
import AlertBox from '@/components/Alert'


const SuppliersOverview = () => {
    const [suppliers,setSuppliers]=useState<SupplierType[]>([])
    const [selectSupplier,setSelectSupplier]=useState<SupplierType|null>(null)
    const [showModal ,setShowModal]=useState(false)
    const [error,setError]=useState<string>('')
    const [loading,setLoading]=useState(false)
    const [showAlert,setShowAlert]=useState(false)
   
    const handleDelete = async (item: any) => {
        setSelectSupplier(item);
        setShowModal(true);
      };
      const confirmDelete = async () => {
        setLoading(true)
        if (selectSupplier) {
          try {
           const res= await deleteSupplier(selectSupplier?.id)
           
           if(res.success){
             setSuppliers(prev=>prev.filter(item=>item.id !==selectSupplier.id))
               setShowModal(false);
               setSelectSupplier(null)
             }else {
                setError('فشل في حذف المورد , حاول مجدداّ');
                setShowAlert(true)
              setShowModal(false);
             }
            
          } catch (error) {
              console.error('Error deleting medicine:', error);
              setError('فشل في حذف المورد , حاول مجدداّ');
              setShowAlert(true)
            setShowModal(false);
          } finally{
            setLoading(false)
          }
        }
      };
    
      const cancelDelete = () => {
        setShowModal(false);
        setSelectSupplier(null);
      };
      const fetchSuppliers=async()=>{
        const data=await getAllSuppliers({page:"1",search:""}) 
        if(data.success){
          setSuppliers(data.suppliers)
        }
      }

      useEffect(()=>{
        fetchSuppliers()
      },[])
  return (
    <div className='w-full flex flex-col gap-3  md:text-center text-sm md:text-md p-1 md:p-3 border-2'>
        <Header title='الموردين'/>
      {suppliers?.length?suppliers.map(item=>{
        return  <div key={item.id} className='flex justify-between items-center shadow-lg  bg-white text-gray-700  rounded-lg p-2'>
        <div className='flex flex-col items-start text-md  '>
            <p> الاسم : {item.name}</p>
            <p>العنوان: {item.address}</p>
            <p> الهاتف: {item.phoneNumber}</p>
        </div>
        <div className="flex gap-2 mt-4 md:mt-0">
        <Link href={`/batches/edit-supplier/${item.id}`} className="flex items-center gap-1 p-2 rounded-lg text-yellow-600 border border-yellow-300 bg-yellow-100 hover:bg-yellow-200">
          <span>تعديل</span>
          <CiEdit />
        </Link>
        <PrimaryButton className="text-white bg-red-500 hover:bg-red-600" label="حذف" icon={MdDelete} onClick={() => handleDelete(item)} />
      </div>
     </div>
      }):<div className='bg-blue-500 text-white p-2'> لايوجد موردين لديك</div>
    }
     <ModalBox loading={loading} title='حذف المورد' show={showModal}  onConfirm={confirmDelete} onCancel={cancelDelete} message={` هل انت متاكد من حذف المورد ,كل الدفعات والطلبات الخاصه بمنتجات هاذا المورد :${selectSupplier?.name?selectSupplier?.name:""} سيتم حذفها ايضاّ`}/>
     {showAlert&&<AlertBox  type='error'  title='خطاء في الحذف' show={showAlert} onCancel={()=>setShowAlert(false)} message={error}/>}
    </div>
  )
}

export default SuppliersOverview