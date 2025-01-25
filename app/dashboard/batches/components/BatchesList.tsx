"use client";
import React, { useCallback, useEffect, useState } from "react";
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

const BatchesList = () => {
  const router = useRouter();
  const [batchesData, setBatches] = useState<BatchWithMedicineProps[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [batchNumber, setBatchNumber] = useState('');
  const [filter, setFilter] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedBatch, setSelectedBatch] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showAlert, setShowAlert] = useState(false);

  const fetchBatches = useCallback(async (page: number) => {
    setLoading(true);
    setError(null);
    try {
      const { batches, totalPages } = await getBatches(
        { status: filter, batchNumber, sortOrder },
        page,
        6
      );
      setBatches(batches);
      setTotalPages(totalPages);
    } catch (error) {
      setError("فشل في جلب بيانات الدفعات");
    } finally {
      setLoading(false);
    }
  }, [filter, batchNumber, sortOrder]);

  useEffect(() => {
    fetchBatches(currentPage);
  }, [fetchBatches, currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleSearchSubmit = (query: any) => {
    setCurrentPage(1);
    setFilter(query.filter);
    setBatchNumber(query.batchNumber);
    setSortOrder(query.sortOrder);
  };

  const handleDeleteInit = (id: string) => {
    setSelectedBatch(id);
    setShowModal(true);
  };

  const confirmDelete = async () => {
    if (!selectedBatch) return;
    
    setLoading(true);
    try {
      const { success } = await deleteBatch(selectedBatch);
      if (success) {
        await fetchBatches(currentPage); // Refresh data after delete
      }
    } catch (error) {
      setError("فشل في حذف الدفعة");
      setShowAlert(true);
    } finally {
      setLoading(false);
      setShowModal(false);
      setSelectedBatch(null);
    }
  };

  return (
    <div className="w-full pb-3">
      <NavBar
        handleSubmit={handleSearchSubmit}
        handleBatchNumber={(e) => setBatchNumber(e.target.value)}
        handleFilterStatus={setFilter}
        batchNumber={batchNumber}
        filter={filter}
        sortOrder={sortOrder}
        handleSortOrderSelect={setSortOrder}
      />
      
      <Header title="الدفعات" />
      
      <div className="border-b-2 min-h-40">
        {loading ? (
          <BatchesSkelton />
        ) : error ? (
          <AlertBox 
            type="error" 
            show 
            title="خطأ" 
            message={error}
            onCancel={() => setError(null)}
          />
        ) : batchesData.length > 0 ? (
          batchesData.map((batch) => (
            <BatchItem 
              key={batch.batchId} 
              item={batch} 
              onEdit={(id) => router.push(`/dashboard/batches/edit/${id}`)}
              onDelete={handleDeleteInit}
            />
          ))
        ) : (
          <div className="text-center py-4">لا توجد دفعات متاحة</div>
        )}
      </div>

      {batchesData.length > 0 && totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}

      <ModalBox
        show={showModal}
        title="تأكيد حذف الدفعة"
        message="هل أنت متأكد من حذف هذه الدفعة؟ جميع الطلبات المرتبطة بها سيتم حذفها."
        onConfirm={confirmDelete}
        onCancel={() => setShowModal(false)}
        loading={loading}
      />
    </div>
  );
};

export default BatchesList;