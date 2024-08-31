// components/SearchBar.tsx
import React from 'react';

interface SearchBarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  className?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ searchQuery, setSearchQuery, className }) => {
  return (
    <div className={`${className} flex items-center rounded-full overflow-hidden border-2 border-neutral-500/80 shadow-md`}>
      <input
        type="text"
        className='w-full p-1 md:p-2   outline-none border-none'
        placeholder='البحث...'
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <button className="bg-teal-500 p-2 md:py-2 flex items-center justify-center">
        <svg className='w-4 h-4 md:w-6 md:h-6 text-white' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M15.7955 15.8111L21 21M18 10.5C18 14.6421 14.6421 18 10.5 18C6.35786 18 3 14.6421 3 10.5C3 6.35786 6.35786 3 10.5 3C14.6421 3 18 6.35786 18 10.5Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
    </div>
  );
};

export default SearchBar;
