import React from 'react';

interface TextInputProps {
  label: string;
  name: string;
  placeholder?:string
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const TextInput: React.FC<TextInputProps> = ({ label, name, value, onChange,placeholder }) => (
  <div className='mt-1'>
    <label className="block text-sm md:text-lg font-medium text-gray-700">{label}</label>
    <input
      type="text"
      placeholder={placeholder}
      name={name}
      value={value}
      onChange={onChange}
      className="mt-1 block w-full border border-gray-300 rounded-md p-3 outline-blue-400"
      required
    />
  </div>
);

export default TextInput;
