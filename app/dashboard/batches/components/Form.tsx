"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import MedicineSearchInput from './MedicineSearchInput';
import SupplierSearchInput from './SupplierSearchInput';
import NumberInputField from './NumberInputField';
import DateInputField from './DateInput';
import SuccessMessage from './SuccessMessage';
import ErrorMessage from './ErrorMessage';
import { addBatch, updateBatch } from '../../../actions/batch/queries';
import LoadingSpinner from '@/components/LoadingSpinner';
import ReadOnlyInput from '@/components/inputs/ReadOnlyInput';
import { BatchWithMedicineProps } from '@/types.dt';
import dayjs from 'dayjs';


interface FormProps {
  isEditable?: boolean;
  item?: BatchWithMedicineProps;
  label: string;
}

const BatchForm: React.FC<FormProps> = ({ label, isEditable, item }) => {
  
  const [quantity, setQuantity] = useState(item?.quantity ?? 0);
  const [date, setDate] = useState(item?.expiryDate ?item.expiryDate : new Date());
  const [selectedMedicine, setSelectedMedicine] = useState(item?.medicine ? item.medicine : {name:"",id:""});
  const [selectedSupplier, setSelectedSupplier] = useState(item?.supplierId ? item.supplier : {name:"",id:""});
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [successStatus, setSuccessStatus] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const router = useRouter();

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!quantity || quantity <= 0) newErrors.quantity = 'الكمية مطلوبة';
    if (!date) newErrors.date = 'تاريخ انتهاء الصلاحية مطلوب';
    if (!selectedMedicine) newErrors.medicine = 'الدواء مطلوب';
    if (!selectedSupplier) newErrors.supplier = 'المورد مطلوب';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const formData = new FormData();
    formData.append("medicineId", selectedMedicine.id);
    formData.append("supplierId", selectedSupplier.id );
    formData.append('quantity', String(quantity));
    formData.append('expiryDate', String(date) );
    formData.append("batchId",item?.batchId as string)
    setLoading(true);

    try {
      const response = isEditable
        ? await updateBatch(formData)
        : await addBatch(formData);

      if (response.success) {
        setSuccessStatus(true);
        setTimeout(() => {
          router.push('/batches');
        }, 1000);
        setServerError(null)
      } else {
        setServerError(response.error);
      }
    } catch (error) {
      console.error('Error submitting batch:', error);
      setServerError('خطأ في الخادم');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full md:w-2/4 container p-4">
      <h1 className="text-2xl font-bold mb-4">{label}</h1>
      <form onSubmit={handleSubmit}>
        {isEditable && item && <ReadOnlyInput name='batchNumber' value={item.batchNumber} label='رقم الدفعة' />}
        
        <MedicineSearchInput
          onSelect={(med) => setSelectedMedicine(med)}
          selectedMedicine={selectedMedicine}
        />
        {errors.medicine && <ErrorMessage message={errors.medicine} />}

        <SupplierSearchInput
          onSelect={(sup) => setSelectedSupplier(sup)}
          selectedSupplier={selectedSupplier}
        />
        {errors.supplier && <ErrorMessage message={errors.supplier} />}

        <NumberInputField
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
          name='quantity'
          label='الكمية'
          error={errors.quantity}
        />
        <DateInputField
          value={date}
          onChange={(date) => setDate(date )}
          name='date'
          label='تاريخ انتهاء الصلاحية'
          error={errors.date}
        />

        {successStatus && <SuccessMessage title={isEditable?"تم التعديل بنجاح" :"تم الاضافة بنجاح"} />}
        
        <button
          type="submit"
          className={`w-full flex items-center justify-center gap-2 mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
          disabled={loading}
        >
          {loading ? <LoadingSpinner /> : isEditable ? "تعديل الدفعة" : 'إنشاء الدفعة'}
        </button>

        {serverError && <ErrorMessage message={serverError} />}
      </form>
    </div>
  );
};

export default BatchForm;
