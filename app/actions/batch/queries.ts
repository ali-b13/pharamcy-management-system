import axios from "axios"

export const getBatches=async(searchQuery:
    {batchNumber:string,status:string,sortOrder:string}={
        status:"all",batchNumber:"",sortOrder:""},
        currentPage:number=1,pageSize:number=6)=>{
    try {
        const res=await axios.get(`http://localhost:3000/api/batches`,{params: {
            searchQuery: searchQuery,
            pageSize: pageSize,
            currentPage: currentPage,
          },})
        if(res.status==200){
            
            return res.data
        }
    } catch (error) {
        return []
    }
}

export const getBatch=async(id:string)=>{
    try {
        const res=await axios.get(`http://localhost:3000/api/batches/add-batch`,{params: {
           id:id
          }})
        if(res.status==200){
            
            return res.data
        }
    } catch (error) {
        return {error:"invalid id for batch",success:false}
    }
}

export const addBatch=async(formData:FormData)=>{
    try {
        const res=await axios.post(`http://localhost:3000/api/batches/add-batch`,formData)
        if(res.status==200){
            
            return res.data
        }
    } catch (error) {
        return {error:"error in creating new batch",success:false}
    }
}

export const updateBatch=async(formData:FormData)=>{
    console.log(formData.get("medicineId"),formData.get("supplierId"))
    try {
        const res=await axios.put(`http://localhost:3000/api/batches/add-batch`,formData)
        if(res.status==200){
            
            return res.data
        }
    } catch (error) {
        return {error:"خطاء :لايمكن تعديل البيانات الان عاود لاحقا",success:false}
    }
}

export const deleteBatch=async(id:string)=>{
    try {
        const res=await axios.delete(`http://localhost:3000/api/batches/add-batch`,{params:{id:id}})
        if(res.status==200){
            
            return res.data
        }
    } catch (error) {
        return {error:"لم يتم الحذف حاول مجدداّ" ,success:false}
    }
}


type SupplierType ={
    name:string,
    address:string,
    mobileNumber:string
}

export const addNewSupplier =async({name,address,mobileNumber}:SupplierType)=>{
    try {
        const res=await axios.post(`http://localhost:3000/api/batches/suppliers`,{name,address,mobileNumber})  
        return res.data
        
    } catch (error) {
        return {error:"لم يتم الاضافه حاول مجدداّ" ,success:false}
    }
}
export const getAllSuppliers =async({page="1",search=""}:{page:string,search:string})=>{
    try {
        const res=await axios.get(`http://localhost:3000/api/batches/suppliers`,{params:{page,search}})
        if(res.status==200){
            
            return res.data
        }
    } catch (error) {
        return {error:"لم يتم العثور علئ شي حاول مجدداّ" ,success:false}
    }
}
export const getSupplierById =async(id:string)=>{
    try {
        const res=await axios.get(`http://localhost:3000/api/batches/suppliers/supplier`,{params:{id:id}})
        if(res.status==200){
            
            return res.data
        }
    } catch (error) {
        return {error:"لم يتم العثور علئ شي حاول مجدداّ" ,success:false}
    }
}
export const updateSupplier =async(id:string,{address,mobileNumber,name}:SupplierType)=>{
    try {
        const res=await axios.put(`http://localhost:3000/api/batches/suppliers/supplier`,{id,address,name,phoneNumber:mobileNumber})
        if(res.status==200){
            
            return res.data
        }
    } catch (error) {
        return {error:"لم يتم تحديثة  حاول مجدداّ" ,success:false}
    }
}
export const deleteSupplier =async(id:string)=>{
    try {
        const res=await axios.delete(`http://localhost:3000/api/batches/suppliers/supplier`,{params:{id}})
        if(res.status==200){
            
            return res.data
        }
    } catch (error) {
        return {error:"لم يتم حذف المورد ,  حاول مجدداّ" ,success:false}
    }
}