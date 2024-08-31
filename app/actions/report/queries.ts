import axios from "axios"
const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const getSalesReport=async({startDate,endDate,timeFrame}:{startDate:Date,endDate:Date,timeFrame:string})=>{
   
    try {
        const res=await axios.get(`${API_URL}/api/reports/salesReport`,{params:{
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
        const res=await axios.get(`${API_URL}/api/reports/inventoryReport`,{params:{
         type
        }})
       
            return res.data
        
    } catch (error) {
        return {error:"لم يتم استكمال الطلب",success:false}
    }
}

export const getLowStockReport=async({type}:{type:string})=>{
   
    try {
        const res=await axios.get(`${API_URL}/api/reports/lowStockReport`,{params:{type:type}})
       
            return res.data
        
    } catch (error) {
        return {error:"لم يتم استكمال الطلب",success:false}
    }
}