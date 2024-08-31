import React from 'react';
import NumberInput from '@/components/inputs/NumberInput';

interface NumberInputFieldProps {
  value: number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  name: string;
  label: string;
  error?: string;
}

const NumberInputField: React.FC<NumberInputFieldProps> = ({ value, onChange, name, label, error }) => (
  <div>
    <NumberInput value={value} onChange={onChange} name={name} label={label} />
    {error && <p className="text-red-500">{error}</p>}
  </div>
);

export default NumberInputField;
