"use client"
import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import SearchBar from '@/components/SearchBar';
import MedicineItem from './MedicineItem';
import Pagination from '@/components/Pagination';
import Link from 'next/link';
import { MedicineType } from '../../../../types.dt';
import { deleteMedicine, getMedicines } from '@/app/actions/medicine/queries';
import { useRouter } from 'next/navigation';
import ModalBox from '@/components/ModalBox';
import Header from '@/components/Header';

const PAGE_SIZE = 7;

interface MedicineProps {
  data: {
    medicines: MedicineType[],
    totalPages: number
  }
}

const MedicineList: React.FC<MedicineProps> = ({ data: { medicines, totalPages } }) => {
  const router =useRouter()
  const [medicineData, setMedicines] = useState<MedicineType[]>(medicines);
  const [currentPage, setCurrentPage] = useState(1);
  const [overAllPages, setTotalPages] = useState(totalPages);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedMedicine, setSelectedMedicine] = useState<string | null>(null);
  const fetchMedicines = useCallback(async (query: string, page: number) => {
    console.log("will call api")
    setLoading(true);
    setError(null);
    try {
      const data = await getMedicines(query, page, PAGE_SIZE);
      setMedicines(data.medicines.length?data.medicines:[]);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.error('Error fetching medicines:', error);
      setError('Failed to fetch medicines. Please try again.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMedicines(searchQuery, currentPage);
  }, [fetchMedicines, searchQuery, currentPage]);

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1); // Reset to first page on new search
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleEdit = (id: string) => {
    router.push(`/dashboard/medicines/edit/${id}`)
    
  };
  const handleDelete = async (id: string) => {
    setSelectedMedicine(id);
    setShowModal(true);
  };
  const confirmDelete = async () => {
    if (selectedMedicine) {
      try {
        await deleteMedicine(selectedMedicine)
        fetchMedicines(searchQuery,1)
        setShowModal(false);
      } catch (error) {
        console.error('Error deleting medicine:', error);
        setError('Failed to delete medicine. Please try again.');
        setShowModal(false);
      }
    }
  };

  const cancelDelete = () => {
    setShowModal(false);
    setSelectedMedicine(null);
  };


  return (
    <div className="container md:mx-auto md:p-4">
     <Header title='الادوية'/>

      <div className='flex flex-col md:flex-row gap-3 md:items-center border-neutral-400 border-b-2 pb-4'>
        <SearchBar className="w-full  md:w-2/4" searchQuery={searchQuery} setSearchQuery={handleSearchChange} />
        <Link className=' w-1/3  bg-teal-500  text-center text-white p-1 md:p-2 rounded-lg hover:bg-teal-700  hover:transition-all duration-200' href={'/medicines/add-medicine'}>
          اضافه دواء جديد
        </Link>
      </div>

      {loading && <p>جاري التحميل...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <ul className='m-2'>
        {medicineData?.length ? medicineData.map(medicine => (
          <MedicineItem
            key={medicine.id}
            id={medicine.id}
            brand={medicine.brand}
            name={medicine.name}
            dosageForm={medicine.dosageForm}
            price={medicine.price}
            onDelete={handleDelete}
            onEdit={handleEdit}
          />
        )):<div>لاتوجد نتائج </div>
    }
      </ul>

      {medicineData && medicineData.length > 0 && (
        <Pagination
          currentPage={currentPage}
          totalPages={overAllPages}
          onPageChange={handlePageChange}
        />
      )}
      <ModalBox
      loading={loading}
        show={showModal}
        title="تاكيد حذف الدواء"
        message="هل انت متاكد من حذف هاذا الدواء؟ كل الدفعات والطلبات المتعلقه باسم هاذا الدواء سيتم حذفها معاّ."
        onConfirm={confirmDelete}
        onCancel={cancelDelete}
      />
    </div>
  );
};

export default MedicineList;
