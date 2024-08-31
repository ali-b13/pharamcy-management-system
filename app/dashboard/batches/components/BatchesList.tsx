"use client";
import React, { useCallback, useState } from "react";
import NavBar from "./navbar";
import { deleteBatch, getBatches } from "@/app/actions/batch/queries";
import { useRouter } from "next/navigation";
import Pagination from "@/components/Pagination";
import ModalBox from "@/components/ModalBox";
import BatchItem from "./BatchItem";
import { BatchWithMedicineProps } from "@/types.dt";
import AlertBox from "@/components/Alert";
import Header from "@/components/Header";
import BatchesSkelton from "./BatchesSkelton";

const BatchesList = ({ batches, totalPages }: { batches: BatchWithMedicineProps[], totalPages: number }) => {
  const router = useRouter();
  const [batchesData, setBatches] = useState<BatchWithMedicineProps[]>(batches);
  const [currentPage, setCurrentPage] = useState(1);
  const [overAllPages, setTotalPages] = useState(totalPages);
  const [batchNumber, setBatchNumber] = useState('');
  const [filter, setFilter] = useState('');
  const [sortOrder, setSortOrder] = useState('asc'); // New state for sorting order
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectBatch, setSelectBatch] = useState<string | null>(null);
  const [error, setError] = useState<string | null>("لم يتم حدف الدواء");
  const [showAlert, setShowAlert] = useState(false);

  const handleBatchNumberOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBatchNumber(e.target.value);
  };

  const fetchBatches = useCallback(async (page: number, query: any) => {
    setLoading(true);
    setError(null);
    try {
      const data = await getBatches(query, page, 6);
      setBatches(data.batches);
      setTotalPages(data.totalPages);
    } catch (error) {
      setError("Failed to fetch batches");
    } finally {
      setLoading(false);
    }
  }, []);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    fetchBatches(page, { status: filter, batchNumber, sortOrder });
  };

  const handleEdit = (id: string) => {
    router.push(`/batches/edit/${id}`);
  };

  const handleDelete = async (id: string) => {
    setSelectBatch(id);
    setShowModal(true);
  };

  const confirmDelete = async () => {
    setLoading(true);
    const { success, error } = await deleteBatch(selectBatch as string);
    if (!success || error) {
      setShowModal(false);
      setError(error || "Failed to delete batch");
      setShowAlert(true);
    } else {
      setError(null);
      setShowAlert(false);
      setSelectBatch(null);
      setShowModal(false);
      setBatches(prev => prev.filter(batch => batch.batchId !== selectBatch));
    }
    setLoading(false);
  };

  const cancelDelete = () => {
    setShowModal(false);
    setSelectBatch(null);
    setLoading(false);
  };

  const handleSubmit = (query: any) => {
    fetchBatches(1, { status: query.filter, batchNumber: query.batchNumber, sortOrder: query.sortOrder });
  };

  return (
    <div className="w-full pb-3">
      <NavBar
      
        handleSubmit={handleSubmit}
        handleBatchNumber={handleBatchNumberOnChange}
        handleFilterStatus={setFilter}
        batchNumber={batchNumber}
        filter={filter}
        sortOrder={sortOrder} // Pass sortOrder to NavBar
        handleSortOrderSelect={setSortOrder} // Pass handleSortOrderSelect to NavBar
      />
      <Header title="الدفعات"/>
     <div className="border-b-2 min-h-40">

     {loading ? <BatchesSkelton/>:batchesData?.length ? (
        batchesData.map((batch) => (
          <BatchItem key={batch.batchId} item={batch} onEdit={handleEdit} onDelete={handleDelete} />
        ))
      ) : (
        <div>لاتوجد معلومات</div>
      )}
     </div>
      {batchesData && batchesData.length > 0 && (
        <Pagination
          currentPage={currentPage}
          totalPages={overAllPages}
          onPageChange={handlePageChange}
        />
      )}
      <ModalBox
        show={showModal}
        title="تاكيد حذف الدفعة"
        message="هل انت متاكد من حذف هاذة الدفعة كل الطلبات المتعلقه باسم هاذا الدفعة سيتم حذفها معاّ."
        onConfirm={confirmDelete}
        onCancel={cancelDelete}
        loading={loading}
      />
      {showAlert && error && <AlertBox type='error' show title='تنبية' onCancel={() => setShowAlert(false)} message={error} />}
    </div>
  );
};

export default BatchesList;
