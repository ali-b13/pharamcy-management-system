import React from 'react';
import DateInput from '@/components/inputs/DateInput';

interface DateInputFieldProps {
  value: Date;
  onChange: (value: React.SetStateAction<Date>) => void
  name: string;
  label: string;
  error?: string;
}

const DateInputField: React.FC<DateInputFieldProps> = ({ value, onChange, name, label, error }) => (
  <div className='w-full'>
    <DateInput label={label} name={name} onChange={onChange} value={value} />
    
    {error && <p className="text-red-500">{error}</p>}

  </div>
);

export default DateInputField;
