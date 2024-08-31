import React from 'react';
import LoadingSpinner from './LoadingSpinner';

interface ModalProps {
  show: boolean;
  title: string;
  message: string;
  loading:boolean
  onConfirm: () => void;
  onCancel: () => void;
}

const ModalBox: React.FC<ModalProps> = ({ show, title, message, onConfirm, onCancel ,loading}) => {
  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center transition-opacity ${show ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
      <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity" onClick={onCancel}></div>
      <div className={`bg-white p-6 rounded-lg shadow-lg transition-transform transform ${show ? 'scale-100' : 'scale-95'}`}>
        <h2 className="text-lg font-bold mb-4">{title}</h2>
        <p className="mb-4">{message} {loading&&<LoadingSpinner/>}</p>
        <div className="flex justify-end gap-4">
          <button
            onClick={onCancel}
            className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-300"
          >
            الغاء
          </button>
          <button
            onClick={onConfirm}
            className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-300"
          >
            تاكيد الحذف
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalBox;
