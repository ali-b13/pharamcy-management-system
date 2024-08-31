// components/Pagination.tsx
import React from 'react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <div className="flex justify-center items-center gap-3 mt-4">
      <button
        onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
        disabled={currentPage === 1}
        className="bg-gray-300 text-gray-700 py-1 px-3 rounded"
      >
        السابق
      </button>
      <p>الصفحه {currentPage} من {totalPages}</p>
      <button
        onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
        disabled={currentPage === totalPages}
        className="bg-gray-300 text-gray-700 py-1 px-3 rounded"
      >
        التالي
      </button>
    </div>
  );
};

export default Pagination;
