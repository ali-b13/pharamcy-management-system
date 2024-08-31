"use client"
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import TextInput from '@/components/inputs/TextInput';
import FileInput from '@/components/inputs/FileInput';
import LoadingSpinner from '@/components/LoadingSpinner';
import { addNewMedicine, updateMedicine } from '@/app/actions/medicine/queries';
import NumberInput from '@/components/inputs/NumberInput';
import CheckboxInput from '@/components/inputs/CheckBoxInput';
import { MedicineType } from '@/types.dt';
 interface FormProps {
  isEditable?:boolean,
  item?:MedicineType
  label:string
 }
const MedicineForm: React.FC<FormProps> = ({label,isEditable,item}) => {
  const router = useRouter();
  const [name, setName] = useState(item?item.name:'');
  const [brand, setBrand] = useState(item?item.brand:'');
  const [dosageForm, setDosageForm] = useState(item?item.dosageForm:'');
  const [price, setPrice] = useState<number>(item?item.price:0);
  const [basePrice, setBasePrice] = useState<number>(item?item.basePrice:0);

  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
 const [serverError,setServerError]=useState(null)
 const [isImageModified,setImageModified]=useState(false)
  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!name) newErrors.name = 'Name is required';
    if (!brand) newErrors.brand = 'الشركه مطلوبه';
    if (!dosageForm) newErrors.dosageForm = 'نوع الجرعة مطلوبه';
    if (!basePrice || basePrice <= 0) newErrors.basePrice = 'سعر الشراء مطلوب';
    if (!price || price <= 0) newErrors.price = 'سعر البيع مطلوب';
    if (!image &&!isEditable) newErrors.image = 'الصوره مطلوبه';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    const formData = new FormData();
    formData.append("id",item?.id||"")
    formData.append('name', name);
    formData.append('brand', brand);
    formData.append('dosageForm', dosageForm);
    formData.append('price', price.toString());
    formData.append('basePrice', basePrice.toString());
    if (image) {
      formData.append('image', image);
    }

    try {
      if(isEditable){
        const {error,success}= await updateMedicine(formData);
        console.log(error,success)
        if(error && !success){
         setServerError(error)
        }else {
          router.push('/medicines');
         setLoading(false)
        }

      }else {
      const {error,success}= await addNewMedicine(formData);
     console.log(error,success)
     if(error && !success){
      setServerError(error)
     }else {
       router.push('/medicines');
      setLoading(false)
     }
      }
      
    } catch (error) {
      console.error('Failed to add medicine', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full md:w-2/4 container p-4">
      <h1 className="text-2xl font-bold mb-4">{label}</h1>
      <form onSubmit={handleSubmit}>
        <TextInput
          label="ألاسم"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        {errors.name && <p className="text-red-500">{errors.name}</p>}
        <TextInput
          label="الشركه"
          name="brand"
          value={brand}
          onChange={(e) => setBrand(e.target.value)}
        />
        {errors.brand && <p className="text-red-500">{errors.brand}</p>}
        <TextInput
          label="نوع الجرعة"
          name="dosageForm"
          value={dosageForm}
          onChange={(e) => setDosageForm(e.target.value)}
        />
        {errors.dosageForm && <p className="text-red-500">{errors.dosageForm}</p>}
        <NumberInput
          label="سعر الشراء"
          name="basePrice"
          value={basePrice}
          onChange={(e) => setBasePrice(Number(e.target.value))}
        />
        {errors.price && <p className="text-red-500">{errors.price}</p>}
        <NumberInput
          label="سعر البيع"
          name="price"
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
        />
        {errors.price && <p className="text-red-500">{errors.price}</p>}
        {isEditable &&<CheckboxInput checked={isImageModified} onChange={()=>setImageModified(prev=>!prev)} name='موافق' label='عدم تغيير الصوره' />}
        <FileInput
          label="الصوره"
          disabled={isImageModified}
          name="image"
          value={image}
          onChange={setImage}
        />
        {errors.image && <p className="text-red-500">{errors.image}</p>}
        <button
          type="submit"
          className="w-full mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          disabled={loading}
        >
          {loading ? <LoadingSpinner /> :isEditable?"تعديل الدواء": 'اضافه الدواء '}
        </button>
        {serverError&&<p className="text-red-500">{serverError}</p>}
      </form>
    </div>
  );
};

export default MedicineForm;
