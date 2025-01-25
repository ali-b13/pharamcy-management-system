import axios from "axios"
import { config } from "dotenv";
config()
const API_URL = process.env.NEXTAUTH_URL;

export const getSalesReport=async({startDate,endDate,timeFrame}:{startDate:Date,endDate:Date,timeFrame:string})=>{
   
    try {
        const res=await axios.get(`/api/reports/salesReport`,{params:{
           startDate,
           endDate,
           timeFrame
        }})
        
            return res.data
        
    } catch (error) {
        return {error:"لم يتم استكمال الطلب",success:false}
    }
}

export const getInventoryReport=async({type}:{type:string})=>{
   
    try {
        const res=await axios.get(`/api/reports/inventoryReport`,{params:{
         type
        }})
       
            return res.data
        
    } catch (error) {
        return {error:"لم يتم استكمال الطلب",success:false}
    }
}

export const getLowStockReport=async({type}:{type:string})=>{
   
    try {
        const res=await axios.get(`/api/reports/lowStockReport`,{params:{type:type}})
       
            return res.data
        
    } catch (error) {
        return {error:"لم يتم استكمال الطلب",success:false}
    }
}