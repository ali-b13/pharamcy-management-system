import axios from "axios"
import {config} from "dotenv"
config()

const API_URL = process.env.NEXTAUTH_URL;

export const getMedicines=async(searchQuery:string="",currentPage:number=1,pageSize:number=7)=>{
    try {
        const res=await axios.get(`/api/medicine`,{params: {
            page: currentPage,
            pageSize: pageSize,
            search: searchQuery,
          },})
        if(res.status==200){
            
            return res.data
        }
    } catch (error) {
        return []
    }
}

export const addNewMedicine=async(form:FormData)=>{
  try {
    const res=await axios.post(`/api/medicine`,form,{headers: {'Content-Type': 'multipart/form-data'}})
    return {error:res.data.error,success:res.data.success}
  }catch (error) {
    console.log(error,'error')
    return {error:"خطاء يرجئ المعاوده مره اخرئ",success:false}
  }
}
export const getMedicine=async(id:string)=>{
 try {
     const res =await axios.get(`/api/medicine/one-medicine`,{params:{id:id}})
     if(res){
        return {error:false,success:true,medicine:res.data.medicine}
     }else{
      return {error:true,success:false,res}
     }
 } catch (error) {
     return {error:error,success:false,not:"not resp"}
 }
}

export const updateMedicine=async(form:FormData)=>{
  try {
    const res =await axios.put(`/api/medicine/one-medicine`,form,{headers: {'Content-Type': 'multipart/form-data'}})
    return {error:res.data.error,success:res.data.success}
  }catch (error) {
    console.log(error,'error')
    return {error:"خطاء يرجئ المعاوده مره اخرئ",success:false}
  }
}

export const deleteMedicine=async(id:string)=>{
  try {
    const res =await axios.delete(`/api/medicine/one-medicine`,{params:{id:id}})
    return {error:res.data.error,success:res.data.success}
  }catch (error) {
    console.log(error,'error')
    return {error:"خطاء يرجئ المعاوده مره اخرئ",success:false}
  }
}

export const getMedicineWarnings=async(currentPage:number=1,pageSize:number=4)=>{
  try {
    const res =await axios.get(`/api/medicine/warning`,{params:{currentPage,pageSize}})
    
    return {error:res.data.error,success:res.data.success,warningMedicines:res.data.batches,totalPages:res.data.totalPages}
  }catch (error) {
    console.log(error,'error')
    return {error:"خطاء يرجئ المعاوده مره اخرئ",success:false}
  }
}

export const getExpiredMedicines=async(currentPage:number=1,pageSize:number=4)=>{
  try {
    const res =await axios.get(`/api/medicine/expired`,{params:{currentPage,pageSize}})
    return {error:res.data.error,success:res.data.success,expiredMedicines:res.data.batches,totalPages:res.data.totalPages}
  }catch (error) {
    console.log(error,'error')
    return {error:"خطاء يرجئ المعاوده مره اخرئ",success:false}
  }
}