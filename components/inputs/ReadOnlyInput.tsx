import React from 'react';

interface TextInputProps {
  label: string;
  name: string;
  value: string;

}

const ReadOnlyInput: React.FC<TextInputProps> = ({ label, name, value }) => (
  <div className='mt-1'>
    <label className="block text-sm md:text-lg font-medium text-gray-700">{label}</label>
    <input
     readOnly
      type="text"
      name={name}
      value={value}
      className="mt-1 block w-full border bg-neutral-300 border-gray-300 rounded-md p-3"
      required
    />
  </div>
);

export default ReadOnlyInput;
