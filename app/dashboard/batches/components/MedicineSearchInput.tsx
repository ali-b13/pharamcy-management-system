"use client";
import React, { useState } from 'react';
import TextInput from '@/components/inputs/TextInput';
import LoadingSpinner from '@/components/LoadingSpinner';
import { MedicineType } from '@/types.dt';
import { getMedicines } from '@/app/actions/medicine/queries';

interface MedicineSearchInputProps {
  onSelect: (med: MedicineType) => void;
  selectedMedicine: {name:string,id:string};
}

const MedicineSearchInput: React.FC<MedicineSearchInputProps> = ({ onSelect, selectedMedicine }) => {
  const [medicine, setMedicine] = useState(selectedMedicine);
  const [filteredMedicines, setFilteredMedicines] = useState<MedicineType[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const debounce = (func: (...args: any[]) => void, delay: number) => {
    let debounceTimer: NodeJS.Timeout;
    return (...args: any[]) => {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => func(...args), delay);
    };
  };

  const fetchMedicines = async (query: string) => {
    setIsLoading(true);
    try {
      const data = await getMedicines(query, 1, 7);
      setFilteredMedicines(data.medicines);
    } catch (error) {
      console.error('Error fetching medicines:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchValue = e.target.value;
    setMedicine({name:searchValue,id:medicine.id});
    if (searchValue) {
      debounceFetchMedicines(searchValue);
    } else {
      setFilteredMedicines([]);
    }
  };

  const debounceFetchMedicines = debounce(fetchMedicines, 300);

  const handleMedicineSelect = (med: MedicineType) => {
    onSelect(med);
    setMedicine(med);  // Set the input value to the selected medicine's name
    setFilteredMedicines([]);
  };

  return (
    <div className="relative">
      <TextInput
        label="أسم الدواء"
        name="name"
        value={medicine.name}
        onChange={handleSearchChange}
      />
      {isLoading && <LoadingSpinner />}
      {filteredMedicines?.length > 0 && (
        <ul className="absolute bg-white border border-gray-300 w-full max-h-40 overflow-y-auto z-10">
          {filteredMedicines.map((med) => (
            <li
              key={med.id}
              className="p-2 cursor-pointer hover:bg-gray-200"
              onClick={() => handleMedicineSelect(med)}
            >
              {med.name} - <span className='text-neutral-400 text-sm'>{med.brand}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MedicineSearchInput;
