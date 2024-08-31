import React from 'react';

interface CheckboxInputProps {
  label: string;
  name: string;
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const CheckboxInput: React.FC<CheckboxInputProps> = ({ label, name, checked, onChange }) => (
  <div className="flex items-center w-full mt-2  gap-2 justify-start ">
    <input
      type="checkbox"
      name={name}
      checked={checked}
      onChange={onChange}
      className="mr-2 h-6 w-6"
    />
    <label className="block text-sm font-medium text-gray-700">{label}</label>
  </div>
);

export default CheckboxInput;
