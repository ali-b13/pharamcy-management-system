import React from 'react';

interface TextInputProps {
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder:string
}

const TextInputWithoutLabel: React.FC<TextInputProps> = ({  name, value, onChange,placeholder }) => (
  <div className='mt-1 w-full'>
    <input
      type="text"
      name={name}
      value={value}
      onChange={onChange}
      className="w-full  block  border border-gray-300 rounded-md p-3"
      required
      placeholder={placeholder}
    />
  </div>
);

export default TextInputWithoutLabel;
