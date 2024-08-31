import React from 'react'
import OrderList from './components/OrderList'
import Header from '@/components/Header'

const orderPage = async() => {

  return (
    <div className='bg-slate-100'>
     <Header title='الطلبات'/>
      <OrderList  />
    </div>
  )
}

export default orderPage