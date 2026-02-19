import React, { useState, useEffect, type ChangeEvent } from "react";
import { HiOutlineSearch } from "react-icons/hi";

interface SearchInputProps {
  debounceTimeout?: number;
  placeholder?: string;
  value: string;
  onChange: (searchTerm: string) => void;
  className?: string;
}

const SearchInput: React.FC<SearchInputProps> = ({
  debounceTimeout = 300,
  placeholder = "Patient name",
  onChange,
  value,
  className = "",
}) => {
  const [searchTerm, setSearchTerm] = useState(value);

  useEffect(() => {
    if (value !== searchTerm) {
      setSearchTerm(value);
    }
  }, [value]);

  useEffect(() => {
    const handler = setTimeout(() => {
      if (searchTerm !== value) {
        onChange(searchTerm);
      }
    }, debounceTimeout);

    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm, debounceTimeout, onChange, value]);

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div className={`relative min-w-[280px] ${className}`}>
      <input
        type="text"
        placeholder={placeholder}
        value={searchTerm}
        onChange={handleSearchChange}
        className="
          w-full 
          h-[48px]
          bg-white 
          border 
          border-[#D4CFCC] 
          rounded-xl
          py-2.5 
          pl-4 
          pr-12 
          text-[14px] 
          text-[#271100] 
          placeholder-[#999999]/60
          focus:border-[#705295]
          focus:outline-none 
          transition-all
        "
      />
      <HiOutlineSearch
        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
        size={20}
      />
    </div>
  );
};

export default SearchInput;
