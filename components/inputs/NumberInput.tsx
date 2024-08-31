import React from 'react';

interface NumberInputProps {
  label: string;
  name: string;
  value: number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const NumberInput: React.FC<NumberInputProps> = ({ label, name, value, onChange }) => (
  <div className='mt-1'>
    <label className="block text-sm md:text-lg font-medium text-gray-700">{label}</label>
    <input
      type="number"
      name={name}
      value={value}
      onChange={onChange}
      className="mt-1 block w-full border border-gray-300 rounded-md p-3"
      required
    />
  </div>
);

export default NumberInput;
