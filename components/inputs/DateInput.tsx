import React from 'react';
import DatePicker from 'react-datepicker';

interface DATEINPUTPROPS {
  label: string;
  name: string;
  value: Date|undefined;
  onChange: (value: Date) => void
}

const DateInput: React.FC<DATEINPUTPROPS> = ({ label, name, value, onChange }) => (
  <div className='mt-1  '>
    <label className="block text-xs md:text-sm font-medium text-gray-700  pb-1">{label}</label>
      <DatePicker
                selected={value}
                onChange={(date)=>onChange(date as Date)}
                className=" block  border border-gray-300 rounded-md p-2 "
              />
  </div>
);

export default DateInput;
