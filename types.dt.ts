

export interface MedicineType{
    id:string,
    name:string,
    brand:string,
    dosageForm:string,
    price:number,
    image:string,
    createdAt:Date
    basePrice : number
    batches:BatchType[]
}

export interface MedicineListProps{
    medicines:MedicineType[]
}

export interface BatchType {
    batchId:string
    batchNumber:string
    expiryDate:Date
    quantity:number
    medicineId:string
    supplierId:string
    createdAt:Date
}
export interface BatchWithMedicineProps {
    batchNumber: string;
    batchId: string;
    supplierId:string
    expiryDate: Date;
    quantity: number;
    medicine: MedicineType;
    supplier:SupplierType
    createdAt:Date
  }
  export interface MedicineWithBatchesProps {
    id:string,
    name:string,
    brand:string,
    dosageForm:string,
    price:number,
    image:string,
    createdAt:Date
    batches:BatchType[]
  }

  export interface SupplierType {
    id: string 
    name :string 
    address :string 
    phoneNumber:string
  }

 export interface CartItem {
    medicineId: string;
    name: string;
    batchId: string;
    batchNumber: string;
    quantity: number;
    availableQuantity: number;
    salePrice: number;
  }


export interface OrderProps {
  id:string
  createdAt :Date
  items:OrderItem[]
  totalPrice:number
  status:string
  buyerName :string
  buyerPhone:string
}

export interface OrderItem {
  batch :BatchType
  medicine: MedicineType
  supplier:SupplierType
  quantity:number
  supplierId:string
  totalPrice:number
}


export interface USERType {
  id:string
  username:string
  role: string
  mobile_number: string
}