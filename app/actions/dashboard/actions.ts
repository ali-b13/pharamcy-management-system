import axios from "axios"
import {config} from "dotenv"
config()
const API_URL = process.env.NEXTAUTH_URL;

export const getSatasticsData=async()=>{
    try {
        const res=await axios.get(`${API_URL}/api/dashboard/statistics`)
        if(res.status==200){
            
            return res.data.statistics||[]
        }
    } catch (error) {
        console.log(error)
        return {totalSoldProducts: 0 ,
            totalBatches: 0,
            totalMedicines: 0,
            totalReceivedAmount:  0.00,
            totalWarningMedicines: 0,
            totalExpiredMedicines:0}
    }
}

export const getSalesData=async(timeFrame:string="monthly")=>{
    try {
        const res=await axios.get(`${API_URL}/api/dashboard/sales`,{params:{timeFrame}})
        if(res.status==200){
            
            return res.data.salesData
        }
    } catch (error) {
        console.log(error,'')
        return []
    }
}
