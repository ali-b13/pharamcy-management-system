"use client";
import React, { useEffect, useState } from 'react';
import { OrderProps } from '@/types.dt';
import OrderDetailComponent from './OrderDetail';
import FilterControls, { Filter } from './FilterControls';
import { getAllOrders, payDebtOrder, refundOrder } from '@/app/actions/order/queries';
import Pagination from '@/components/Pagination';
import AlertBox from '@/components/Alert';

const OrderList = () => {
  const [ordersData, setOrders] = useState<OrderProps[]>([]);
  const [totalOrders, setTotalOrders] = useState<number>(0);
  const [page, setPage] = useState<number>(1);
  const [filter, setFilter] = useState<Filter>({});
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [successTitle,setsuccessTitle]=useState<string>("")
  const [successMessage,setSuccessMessage]=useState<string>("")

  const fetchOrders = async (page: number, filter: Filter) => {
    try {
      const response = await getAllOrders({
        page,
        orderDate: filter.orderDate,
        pageSize: 10,
        sort: filter.sort,
        status: filter.status, // Include status in the request
      });
      setOrders(response.orders);
      setTotalOrders(response.total);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  useEffect(() => {
    fetchOrders(page, filter);
  }, [page, filter]);

  const onRefund = async (orderId: string) => {
    try {
      const res = await refundOrder(orderId);
      if (res.success) {
        setsuccessTitle("استرجاع الطلب")
        setSuccessMessage("تم استرجاع الطلب بنجاح")
        setShowSuccessAlert(true);
        // Refresh orders after refund
        fetchOrders(page, filter);
      }
    } catch (error) {
      console.error('Error processing refund:', error);
    }
  };
 const handleDebtPayment=async(orderId:string)=>{
   try {
    const res=await payDebtOrder(orderId)
    if(res.success){
      setsuccessTitle("دفع الدين ")
      setSuccessMessage("تم دفع الدين بنجاح")
      setShowSuccessAlert(true);
      fetchOrders(page, filter);
    }
   } catch (error) {
    console.log(error)
   }
 }
  const handleFilterChange = (newFilter: Filter) => {
    setFilter(newFilter);
    setPage(1); // Reset to first page on filter change
  };

  const handlePageChange = (page: number) => {
    setPage(page);
  };

  return (
    <div className="container mx-auto p-1 md:p-4 min-h-[80vh]">
      <FilterControls onFilterChange={handleFilterChange} />
      {ordersData.length ? (
        ordersData.map((order) => (
          <OrderDetailComponent onPayDebt={handleDebtPayment} key={order.id} order={order} onRefund={onRefund} />
        ))
      ) : (
        <div className="text-gray-500 text-center">لا يوجد لديك طلبات</div>
      )}
      {showSuccessAlert && (
        <AlertBox
          type="success"
          title={successTitle}
          show={showSuccessAlert}
          onCancel={() => setShowSuccessAlert(false)}
          message={successMessage}
        />
      )}
      <Pagination
        totalPages={Math.ceil(totalOrders / 10)} // Adjust page count calculation as needed
        onPageChange={handlePageChange}
        currentPage={page}
      />
    </div>
  );
};

export default OrderList;
