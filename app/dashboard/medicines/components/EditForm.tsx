"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import TextInput from "@/components/inputs/TextInput";
import FileInput from "@/components/inputs/FileInput";
import LoadingSpinner from "@/components/LoadingSpinner";
import { getMedicine, updateMedicine } from "@/app/actions/medicine/queries";
import NumberInput from "@/components/inputs/NumberInput";
import CheckboxInput from "@/components/inputs/CheckBoxInput";
import { MedicineType } from "@/types.dt";

const EditMedicineForm = ({ id }: { id: string }) => {
  const router = useRouter();
  const [formData, setFormData] = useState<MedicineType>({
    name: "",
    basePrice: 0,
    batches: [],
    price: 0,
    brand: "",
    dosageForm: "",
    id: id,
    image: "",
    createdAt: new Date(),
  });

  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [serverError, setServerError] = useState<string | null>(null);
  const [keepImage, setKeepImage] = useState(true);

  useEffect(() => {
    const fetchDataMedicine = async () => {
      const res = await getMedicine(id);
      setFormData(res.medicine);
    };

    fetchDataMedicine();
  }, [id]);

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!formData.name) newErrors.name = "اسم الدواء مطلوب";
    if (!formData.brand) newErrors.brand = "الشركة مطلوبة";
    if (!formData.dosageForm) newErrors.dosageForm = "نوع الجرعة مطلوب";
    if (formData.basePrice <= 0) newErrors.basePrice = "سعر الشراء مطلوب";
    if (formData.price <= 0) newErrors.price = "سعر البيع مطلوب";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    const data = new FormData();
    data.append("id", formData.id);
    data.append("name", formData.name);
    data.append("brand", formData.brand);
    data.append("dosageForm", formData.dosageForm);
    data.append("price", formData.price.toString());
    data.append("basePrice", formData.basePrice.toString());
    if (!keepImage && image) data.append("image", image);

    try {
      const { error, success } = await updateMedicine(data);
      if (error) {
        setServerError(error);
      } else if (success) {
        router.push("/dashboard/medicines");
      }
    } catch (error) {
      setServerError("حدث خطأ غير متوقع");
    } finally {
      setLoading(false);
    }
  };
   if(!formData.name|| formData.name==""){
    return <SkeletonLoader/>
   }

  return (
    <div className="w-full md:w-2/4 container p-4">
      <h1 className="text-2xl font-bold mb-4">تعديل الدواء</h1>
      <form onSubmit={handleSubmit}>
        <TextInput
          label="ألاسم"
          name="name"
          value={formData.name}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, name: e.target.value }))
          }
        />
        {errors.name && <p className="text-red-500">{errors.name}</p>}

        <TextInput
          label="الشركه"
          name="brand"
          value={formData.brand}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, brand: e.target.value }))
          }
        />
        {errors.brand && <p className="text-red-500">{errors.brand}</p>}

        <TextInput
          label="نوع الجرعة"
          name="dosageForm"
          value={formData.dosageForm}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, dosageForm: e.target.value }))
          }
        />
        {errors.dosageForm && (
          <p className="text-red-500">{errors.dosageForm}</p>
        )}

        <NumberInput
          label="سعر الشراء"
          name="basePrice"
          value={formData.basePrice}
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              basePrice: parseFloat(e.target.value),
            }))
          }
        />
        {errors.basePrice && (
          <p className="text-red-500">{errors.basePrice}</p>
        )}

        <NumberInput
          label="سعر البيع"
          name="price"
          value={formData.price}
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              price: parseFloat(e.target.value),
            }))
          }
        />
        {errors.price && <p className="text-red-500">{errors.price}</p>}

        <CheckboxInput
          name="موافق"
          checked={keepImage}
          onChange={() => setKeepImage((prev) => !prev)}
          label="الحفاظ على الصورة الحالية"
        />
        {!keepImage && (
          <FileInput
            disabled={false}
            name="image"
            label="الصورة الجديدة"
            value={image}
            onChange={setImage}
          />
        )}
        <button
          type="submit"
          className="w-full mt-4 bg-green-500 text-center text-white py-2 px-4 rounded hover:bg-green-700"
          disabled={loading}
        >
          {loading ? <LoadingSpinner /> : "تحديث الدواء"}
        </button>
      </form>
    </div>
  );
};

export default EditMedicineForm;








const SkeletonLoader = () => (
    <div className="w-full md:w-2/4 container p-4 animate-pulse">
      <div className="h-8 bg-gray-200 rounded w-1/3 mb-6"></div>
      
      <div className="space-y-4">
        {/* Name Input Skeleton */}
        <div className="space-y-2">
          <div className="h-4 bg-gray-200 rounded w-1/4"></div>
          <div className="h-10 bg-gray-200 rounded"></div>
        </div>

        {/* Brand Input Skeleton */}
        <div className="space-y-2">
          <div className="h-4 bg-gray-200 rounded w-1/4"></div>
          <div className="h-10 bg-gray-200 rounded"></div>
        </div>

        {/* Dosage Form Skeleton */}
        <div className="space-y-2">
          <div className="h-4 bg-gray-200 rounded w-1/4"></div>
          <div className="h-10 bg-gray-200 rounded"></div>
        </div>

        {/* Price Inputs Skeleton */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 rounded w-1/3"></div>
            <div className="h-10 bg-gray-200 rounded"></div>
          </div>
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 rounded w-1/3"></div>
            <div className="h-10 bg-gray-200 rounded"></div>
          </div>
        </div>

        {/* Checkbox Skeleton */}
        <div className="flex items-center gap-2">
          <div className="h-5 w-5 bg-gray-200 rounded"></div>
          <div className="h-4 bg-gray-200 rounded w-1/4"></div>
        </div>

        {/* File Input Skeleton */}
        <div className="space-y-2">
          <div className="h-4 bg-gray-200 rounded w-1/4"></div>
          <div className="h-24 bg-gray-200 rounded"></div>
        </div>

        {/* Submit Button Skeleton */}
        <div className="h-10 bg-gray-200 rounded mt-4"></div>
      </div>
    </div>
  );