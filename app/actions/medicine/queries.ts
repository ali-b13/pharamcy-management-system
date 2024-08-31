import axios from "axios"

export const getMedicines=async(searchQuery:string="",currentPage:number=1,pageSize:number=7)=>{
    try {
        const res=await axios.get(`http://localhost:3000/api/medicine`,{params: {
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
    const res=await axios.post(`http://localhost:3000/api/medicine`,form,{headers: {'Content-Type': 'multipart/form-data'}})
    return {error:res.data.error,success:res.data.success}
  }catch (error) {
    console.log(error,'error')
    return {error:"خطاء يرجئ المعاوده مره اخرئ",success:false}
  }
}
export const getMedicine=async(id:string)=>{
 try {
     const res =await axios.get(`http://localhost:3000/api/medicine/one-medicine`,{params:{id:id}})
     if(res.status==200){
        return {error:false,success:true,medicine:res.data.medicine}
     }else{
      return {error:true,success:false}
     }
 } catch (error) {
     return {error:true,success:false}
 }
}

export const updateMedicine=async(form:FormData)=>{
  try {
    const res =await axios.put(`http://localhost:3000/api/medicine/one-medicine`,form,{headers: {'Content-Type': 'multipart/form-data'}})
    return {error:res.data.error,success:res.data.success}
  }catch (error) {
    console.log(error,'error')
    return {error:"خطاء يرجئ المعاوده مره اخرئ",success:false}
  }
}

export const deleteMedicine=async(id:string)=>{
  try {
    const res =await axios.delete(`http://localhost:3000/api/medicine/one-medicine`,{params:{id:id}})
    return {error:res.data.error,success:res.data.success}
  }catch (error) {
    console.log(error,'error')
    return {error:"خطاء يرجئ المعاوده مره اخرئ",success:false}
  }
}

export const getMedicineWarnings=async(currentPage:number=1,pageSize:number=4)=>{
  try {
    const res =await axios.get(`http://localhost:3000/api/medicine/warning`,{params:{currentPage,pageSize}})
    
    return {error:res.data.error,success:res.data.success,warningMedicines:res.data.batches,totalPages:res.data.totalPages}
  }catch (error) {
    console.log(error,'error')
    return {error:"خطاء يرجئ المعاوده مره اخرئ",success:false}
  }
}

export const getExpiredMedicines=async(currentPage:number=1,pageSize:number=4)=>{
  try {
    const res =await axios.get(`http://localhost:3000/api/medicine/expired`,{params:{currentPage,pageSize}})
    return {error:res.data.error,success:res.data.success,expiredMedicines:res.data.batches,totalPages:res.data.totalPages}
  }catch (error) {
    console.log(error,'error')
    return {error:"خطاء يرجئ المعاوده مره اخرئ",success:false}
  }
}