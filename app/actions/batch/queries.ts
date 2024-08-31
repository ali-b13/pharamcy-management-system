import axios from "axios";

// Base API URL from environment variables
const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const getBatches = async (
  searchQuery = { batchNumber: "", status: "all", sortOrder: "" },
  currentPage = 1,
  pageSize = 6
) => {
  try {
    const res = await axios.get(`${API_URL}/api/batches`, {
      params: {
        searchQuery,
        pageSize,
        currentPage,
      },
    });
    if (res.status === 200) {
      return res.data;
    }
  } catch (error) {
    return [];
  }
};

export const getBatch = async (id:string) => {
  try {
    const res = await axios.get(`${API_URL}/api/batches/add-batch`, {
      params: { id },
    });
    if (res.status === 200) {
      return res.data;
    }
  } catch (error) {
    return { error: "invalid id for batch", success: false };
  }
};

export const addBatch = async (formData:FormData) => {
  try {
    const res = await axios.post(`${API_URL}/api/batches/add-batch`, formData);
    if (res.status === 200) {
      return res.data;
    }
  } catch (error) {
    return { error: "error in creating new batch", success: false };
  }
};

export const updateBatch = async (formData:FormData) => {
  console.log(formData.get("medicineId"), formData.get("supplierId"));
  try {
    const res = await axios.put(`${API_URL}/api/batches/add-batch`, formData);
    if (res.status === 200) {
      return res.data;
    }
  } catch (error) {
    return { error: "خطاء :لايمكن تعديل البيانات الان عاود لاحقا", success: false };
  }
};

export const deleteBatch = async (id:any) => {
  try {
    const res = await axios.delete(`${API_URL}/api/batches/add-batch`, {
      params: { id },
    });
    if (res.status === 200) {
      return res.data;
    }
  } catch (error) {
    return { error: "لم يتم الحذف حاول مجدداّ", success: false };
  }
};

export const addNewSupplier = async ({ name, address, mobileNumber }:any) => {
  try {
    const res = await axios.post(`${API_URL}/api/batches/suppliers`, {
      name,
      address,
      mobileNumber,
    });
    return res.data;
  } catch (error) {
    return { error: "لم يتم الاضافه حاول مجدداّ", success: false };
  }
};

export const getAllSuppliers = async ({ page = "1", search = "" }) => {
  try {
    const res = await axios.get(`${API_URL}/api/batches/suppliers`, {
      params: { page, search },
    });
    if (res.status === 200) {
      return res.data;
    }
  } catch (error) {
    return { error: "لم يتم العثور علئ شي حاول مجدداّ", success: false };
  }
};

export const getSupplierById = async (id:string) => {
  try {
    const res = await axios.get(`${API_URL}/api/batches/suppliers/supplier`, {
      params: { id },
    });
    if (res.status === 200) {
      return res.data;
    }
  } catch (error) {
    return { error: "لم يتم العثور علئ شي حاول مجدداّ", success: false };
  }
};

export const updateSupplier = async (id:string, { address, mobileNumber, name }:any) => {
  try {
    const res = await axios.put(`${API_URL}/api/batches/suppliers/supplier`, {
      id,
      address,
      name,
      phoneNumber: mobileNumber,
    });
    if (res.status === 200) {
      return res.data;
    }
  } catch (error) {
    return { error: "لم يتم تحديثة  حاول مجدداّ", success: false };
  }
};

export const deleteSupplier = async (id:string) => {
  try {
    const res = await axios.delete(`${API_URL}/api/batches/suppliers/supplier`, {
      params: { id },
    });
    if (res.status === 200) {
      return res.data;
    }
  } catch (error) {
    return { error: "لم يتم حذف المورد ,  حاول مجدداّ", success: false };
  }
};
