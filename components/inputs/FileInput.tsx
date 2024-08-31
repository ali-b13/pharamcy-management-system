import React, { useRef, useState } from 'react';

interface FileInputProps {
  label: string;
  name: string;
  disabled:boolean
  value: File | null;
  onChange: (file: File | null) => void;
}

const FileInput: React.FC<FileInputProps> = ({ label, name, value,disabled, onChange }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [fileName, setFileName] = useState(value?.name || 'لم يتم اختيار الملف للان');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      setFileName(file.name);
    } else {
      setFileName('لم يتم اختيار الملف للان');
    }
    onChange(file);
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className={`mt-1 ${disabled?"hidden":"block"}`}>
      <label className="w-full block text-sm md:text-lg font-medium text-gray-700">{label}</label>
      <div className="mt-1 flex flex-col w-full ">
        <button
          type="button"
          onClick={handleClick}
          className=" w-full  p-3 border border-gray-300 rounded-md bg-white text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          اختر الملف
        </button>
        <div className="text-yellow-700">{fileName}</div>
      </div>
      <input
        type="file"
        name={name}
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
      />
    </div>
  );
};

export default FileInput;
