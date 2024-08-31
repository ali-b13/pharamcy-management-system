// components/YearSelect.tsx
import React from 'react';

interface YearSelectProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const YearSelect: React.FC<YearSelectProps> = ({ value, onChange }) => {
  const startYear = 2015;
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: currentYear - startYear + 1 }, (_, i) => startYear + i);

  return (
    <select
      value={value}
      onChange={onChange}
      className="w-full p-3 border border-gray-300 rounded-md"
    >
      <option value="">اختر تاريخ الدفعه</option>
      {years.map((year) => (
        <option key={year} value={year}>
          {year}
        </option>
      ))}
    </select>
  );
};

export default YearSelect;
