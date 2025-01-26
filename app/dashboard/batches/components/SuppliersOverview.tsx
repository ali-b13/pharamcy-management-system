"use client";
import PrimaryButton from '@/components/buttons/PrimaryButton';
import Header from '@/components/Header';
import ModalBox from '@/components/ModalBox';
import { SupplierType } from '@/types.dt';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { CiEdit } from 'react-icons/ci';
import { MdDelete } from 'react-icons/md';
import { deleteSupplier, getAllSuppliers } from '../../../actions/batch/queries';
import AlertBox from '@/components/Alert';

const SuppliersOverview = () => {
  const [suppliers, setSuppliers] = useState<SupplierType[]>([]);
  const [selectSupplier, setSelectSupplier] = useState<SupplierType | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const handleDelete = async (item: SupplierType) => {
    setSelectSupplier(item);
    setShowModal(true);
  };

  const confirmDelete = async () => {
    setLoading(true);
    if (selectSupplier) {
      try {
        const res = await deleteSupplier(selectSupplier.id);
        if (res.success) {
          setSuppliers((prev) => prev.filter((item) => item.id !== selectSupplier.id));
          setShowModal(false);
          setSelectSupplier(null);
        } else {
          setError('فشل في حذف المورد , حاول مجدداّ');
          setShowAlert(true);
          setShowModal(false);
        }
      } catch (error) {
        console.error('Error deleting supplier:', error);
        setError('فشل في حذف المورد , حاول مجدداّ');
        setShowAlert(true);
        setShowModal(false);
      } finally {
        setLoading(false);
      }
    }
  };

  const cancelDelete = () => {
    setShowModal(false);
    setSelectSupplier(null);
  };

  const fetchSuppliers = async () => {
    const data = await getAllSuppliers({ page: '1', search: '' });
    if (data.success) {
      setSuppliers(data.suppliers.length ? data.suppliers : []);
    }
  };

  useEffect(() => {
    fetchSuppliers();
  }, []);

  return (
    <div className="w-full flex flex-col gap-4 p-4 bg-gray-50 rounded-xl shadow-lg">
      <Header title="الموردين" />

      {/* Suppliers List */}
      {suppliers?.length ? (
        suppliers.map((item) => (
          <div key={item.id} className="flex flex-col md:flex-row justify-between items-center p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
            {/* Supplier Details */}
            <div className="flex flex-col items-start gap-2">
              <p className="text-lg font-semibold text-gray-800">الاسم: {item.name}</p>
              <p className="text-sm text-gray-600">العنوان: {item.address}</p>
              <p className="text-sm text-gray-600">الهاتف: {item.phoneNumber}</p>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2 mt-4 md:mt-0">
              <Link
                href={`/dashboard/batches/edit-supplier/${item.id}`}
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-yellow-700 bg-yellow-50 border border-yellow-200 hover:bg-yellow-100 hover:border-yellow-300 transition-colors duration-200"
              >
                <CiEdit className="w-5 h-5" />
                <span>تعديل</span>
              </Link>
              <PrimaryButton
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-white bg-red-500 hover:bg-red-600 transition-colors duration-200"
                label="حذف"
                icon={MdDelete}
                onClick={() => handleDelete(item)}
              />
            </div>
          </div>
        ))
      ) : (
        <div className="p-4 bg-blue-50 text-blue-700 rounded-lg text-center">
          لا يوجد موردين لديك
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <ModalBox
        loading={loading}
        title="حذف المورد"
        show={showModal}
        onConfirm={confirmDelete}
        onCancel={cancelDelete}
        message={`هل انت متأكد من حذف المورد؟ كل الدفعات والطلبات الخاصة بمنتجات هذا المورد: ${selectSupplier?.name || ''} سيتم حذفها أيضًا.`}
      />

      {/* Error Alert */}
      {showAlert && (
        <AlertBox
          type="error"
          title="خطأ في الحذف"
          show={showAlert}
          onCancel={() => setShowAlert(false)}
          message={error}
        />
      )}
    </div>
  );
};

export default SuppliersOverview;