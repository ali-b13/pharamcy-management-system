import axios from "axios"

export const getSatasticsData=async()=>{
    try {
        const res=await axios.get(`http://localhost:3000/api/dashboard/satastics`)
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
        const res=await axios.get(`http://localhost:3000/api/dashboard/sales`,{params:{timeFrame}})
        if(res.status==200){
            
            return res.data
        }
    } catch (error) {
        console.log(error,'')
        return []
    }
}
