import React from 'react';

interface AlertBoxModalProps {
  show: boolean;
  type: "warning" | "error" | "success";
  title: string;
  message: string;
  onCancel: () => void;
}

const AlertBox: React.FC<AlertBoxModalProps> = ({ show, title, message, onCancel, type }) => {
  const typeStyles = {
    success: "bg-green-100 border-green-400 text-green-800",
    warning: "bg-yellow-100 border-yellow-400 text-yellow-800",
    error: "bg-red-100 border-red-400 text-red-800",
  };

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center transition-opacity ${show ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
      <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"></div>
      <div className={`w-full md:w-1/3 flex flex-col bg-white p-6 rounded-lg shadow-lg transition-transform transform ${show ? 'scale-100' : 'scale-95'}`}>
        <h2 className="text-lg text-center font-bold mb-4">{title}</h2>
        <div className={`mb-4 p-4 border-l-4 ${typeStyles[type]} rounded-lg`}>
          <p className="text-center text-xl">{message}</p>
        </div>
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-300"
          onClick={onCancel}
        >
          اغلاق
        </button>
      </div>
    </div>
  );
};

export default AlertBox;
