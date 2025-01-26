import React from 'react';

interface SearchBarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  className?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ searchQuery, setSearchQuery, className }) => {
  return (
    <div className={`${className} group relative flex items-center rounded-full transition-all duration-300 border-2 border-emerald-100 hover:border-emerald-300 focus-within:border-emerald-500 focus-within:ring-4 focus-within:ring-emerald-100 shadow-lg hover:shadow-emerald-100`}>
      <input
        type="text"
        className="w-full pl-6 pr-14 py-3 md:py-4 bg-white/80 backdrop-blur-sm outline-none border-none rounded-full text-gray-700 placeholder-gray-400 transition-all duration-300 focus:bg-white"
        placeholder='ابحث هنا...'
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <button className="absolute right-2 bg-gradient-to-r from-emerald-500 to-teal-600 p-2 rounded-full transform transition-all duration-300 hover:scale-105 hover:shadow-lg active:scale-95">
        <div className="relative">
          <svg 
            className="w-5 h-5 md:w-6 md:h-6 text-white transition-transform duration-300 group-hover:scale-110" 
            viewBox="0 0 24 24" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path 
              d="M15.7955 15.8111L21 21M18 10.5C18 14.6421 14.6421 18 10.5 18C6.35786 18 3 14.6421 3 10.5C3 6.35786 6.35786 3 10.5 3C14.6421 3 18 6.35786 18 10.5Z" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            />
          </svg>
          <div className="absolute inset-0 bg-gradient-to-r from-teal-600 to-emerald-500 rounded-full opacity-0 transition-opacity duration-300 hover:opacity-100" />
        </div>
      </button>
    </div>
  );
};

export default SearchBar;