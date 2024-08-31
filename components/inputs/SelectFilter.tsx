// components/FilterSelect.tsx
import React from 'react';

interface FilterSelectProps {
  options:{
    name:string;
    id:string
  }[]
  value: string;
  onChange: (value: string) => void;
  label:string
}

const SelectFilter: React.FC<FilterSelectProps> = ({ value, onChange,options ,label}) => {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full p-3 border border-gray-300 rounded-md"
    >
        <option value="">{label}</option>
        {options.length?options.map(option=>{
            return <option key={option.id} value={option.id}>{option.name}</option>
        }):null
    }
     
      
    </select>
  );
};

export default SelectFilter;
