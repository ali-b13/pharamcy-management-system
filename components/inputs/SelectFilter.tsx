// components/FilterSelect.tsx
import React from 'react';

interface FilterSelectProps {
  className?:string
  options:{
    name:string;
    id:string
  }[]
  value: string;
  onChange: (value: string) => void;
  label:string
}

const SelectFilter: React.FC<FilterSelectProps> = ({ value, onChange,options ,label,className}) => {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={`w-full p-3 border border-gray-300 rounded-md ${className&&className}`}
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
