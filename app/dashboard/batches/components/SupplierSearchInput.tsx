"use client";
import React, { useState } from 'react';
import TextInput from '@/components/inputs/TextInput';
import LoadingSpinner from '@/components/LoadingSpinner';
import { SupplierType } from '@/types.dt';
import { getAllSuppliers } from '@/app/actions/batch/queries';

interface SupplierSearchInputProps {
  onSelect: (sup: SupplierType) => void;
  selectedSupplier: {name:string,id:string};
}

const SupplierSearchInput: React.FC<SupplierSearchInputProps> = ({ onSelect, selectedSupplier }) => {
  const [supplier, setSupplier] = useState(selectedSupplier);
  const [filteredSuppliers, setFilteredSuppliers] = useState<SupplierType[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const debounce = (func: (...args: any[]) => void, delay: number) => {
    let debounceTimer: NodeJS.Timeout;
    return (...args: any[]) => {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => func(...args), delay);
    };
  };

  const fetchSuppliers = async (query: string) => {
    setIsLoading(true);
    try {
      const data = await getAllSuppliers({ search: query, page: '1' });
      setFilteredSuppliers(data.suppliers);
    } catch (error) {
      console.error('Error fetching suppliers:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchValue = e.target.value;
    setSupplier({name:searchValue,id:supplier.id});
    if (searchValue) {
      debounceFetchSuppliers(searchValue);
    } else {
      setFilteredSuppliers([]);
    }
  };

  const debounceFetchSuppliers = debounce(fetchSuppliers, 300);

  const handleSupplierSelect = (sup: SupplierType) => {
    onSelect(sup);
    setSupplier(sup);  // Set the input value to the selected supplier's name
    setFilteredSuppliers([]);
  };

  return (
    <div className="relative mt-4">
      <TextInput
        label="اسم المورد"
        name="supplier"
        value={supplier.name}
        onChange={handleSearchChange}
      />
      {isLoading && <LoadingSpinner />}
      {filteredSuppliers?.length > 0 && (
        <ul className="absolute bg-white border border-gray-300 w-full max-h-40 overflow-y-auto z-10">
          {filteredSuppliers.map((sup) => (
            <li
              key={sup.id}
              className="p-2 cursor-pointer hover:bg-gray-200"
              onClick={() => handleSupplierSelect(sup)}
            >
              {sup.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SupplierSearchInput;
