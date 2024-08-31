import { CartItem } from "@/types.dt"
import axios from "axios"
const API_URL = process.env.NEXT_PUBLIC_API_URL;

interface OrderDetails {
    cart: CartItem[];
    paymentMethod: string;
    buyerName?: string;
    buyerPhone?: string;
  }
export const placeOrder=async(OrderDetails:OrderDetails)=>{
    if(!OrderDetails.cart.length)return  {error:"لم يتم استكمال الطلب",success:false}
    try {
        const res=await axios.post(`${API_URL}/api/orders`,OrderDetails)
        if(res.status==200){
            
            return res.data
        }
    } catch (error) {
        return {error:"لم يتم استكمال الطلب",success:false}
    }
}

interface OrderQueryType {
    page:number
    pageSize?:number
    orderDate?:Date |string
    sort?:string |undefined
    status?:string
}
export const getAllOrders=async({page=1,pageSize=10,orderDate,sort,status}:OrderQueryType)=>{
   
    try {
        const res=await axios.get(`${API_URL}/api/orders`,{params:{
            page,
            pageSize,
            orderDate,
            sort,
            status
        }})
       
            return res.data
        
    } catch (error) {
        return {error:"لم يتم استكمال الطلب",success:false}
    }
}

export const refundOrder=async(orderId:string)=>{
    try {

        const res=await axios.post(`${API_URL}/api/orders/refund`,{orderId})
       
            return res.data
        
    } catch (error) {
        return {error:"لم يتم استكمال الطلب",success:false}
    }
}

export const payDebtOrder=async(orderId:string)=>{
    try {

        const res=await axios.put(`${API_URL}/api/orders`,{orderId})
       
            return res.data
        
    } catch (error) {
        return {error:"لم يتم استكمال الطلب",success:false}
    }
}