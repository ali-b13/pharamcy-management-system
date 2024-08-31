import axios from "axios"

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const getSatasticsData=async()=>{
    try {
        const res=await axios.get(`${API_URL}/api/dashboard/satastics`)
        if(res.status==200){
            
            return res.data
        }
    } catch (error) {
        console.log(error)
        return []
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
