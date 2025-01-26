"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import PrimaryButton from '@/components/buttons/PrimaryButton';
import TextInput from '@/components/inputs/TextInput';
import AlertBox from '@/components/Alert';
import { addNewSupplier, updateSupplier } from '@/app/actions/batch/queries';
import LoadingSpinner from '@/components/LoadingSpinner';
import { SupplierType } from '@/types.dt';
import SuccessMessage from './SuccessMessage';
import { BiAddToQueue } from 'react-icons/bi';

interface SupplierFormProps {
  item?: SupplierType;
  isEditable?: boolean;
  label: string;
}

const SupplierForm: React.FC<SupplierFormProps> = ({ item, isEditable, label }) => {
  const [name, setName] = useState(item ? item.name : '');
  const [address, setAddress] = useState(item ? item.address : '');
  const [mobileNumber, setMobileNumber] = useState(item ? item.phoneNumber : '');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    try {
      setLoading(true);
      if (isEditable) {
        const { success, error } = await updateSupplier(item?.id as string, { address, mobileNumber, name });
        if (success) {
          setSuccess(true);
          resetForm();
          cancel();
        } else {
          setError(error);
        }
      } else {
        const { success, error } = await addNewSupplier({ name, address, mobileNumber });
        if (success) {
          setSuccess(true);
          resetForm();
          cancel();
        } else {
          setError(error);
        }
      }
    } catch (error) {
      console.log(error);
      setError('خطاء غير متوقع.');
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setName('');
    setAddress('');
    setMobileNumber('');
  };

  const cancel = () => {
    setError(null);
    router.push('/dashboard/batches');
  };

  return (
    <div className="min-h-[90vh] flex flex-col items-center justify-center bg-gray-50 p-4">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md border border-gray-100">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">{label}</h2>
        {error && (
          <AlertBox
            title="خطاء"
            type="error"
            show
            message={error}
            onCancel={() => setError(null)}
          />
        )}
        <form onSubmit={handleSubmit} className="space-y-6">
          <TextInput
            name="name"
            label="اسم المورد"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="ادخل اسم المورد"
          />
          <TextInput
            name="address"
            label="العنوان"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="ادخل العنوان"
          />
          <TextInput
            name="phone_number"
            label="رقم الهاتف"
            value={mobileNumber}
            onChange={(e) => setMobileNumber(e.target.value)}
            placeholder="ادخل رقم الهاتف"
          />
          <PrimaryButton
            label={isEditable ? 'تعديل بيانات المورد' : 'اضافة المورد'}
            icon={loading ? LoadingSpinner :BiAddToQueue}
            className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 active:bg-blue-800 transition-all duration-200"
            type="submit"
          />
          {success && (
            <SuccessMessage
              title={isEditable ? 'تم تعديل البيانات بنجاح' : 'تمت الاضافه بنجاح'}
            />
          )}
        </form>
      </div>
    </div>
  );
};

export default SupplierForm;