import React, { useState, ChangeEvent, useEffect, useRef } from 'react';
import { useStore } from '../store';

interface AutocompleteProps {
  options: string[];
}

const Autocomplete: React.FC<AutocompleteProps> = ({ options }) => {
  const { filteredOptions, selectedOptions, setFilteredOptions, setSelectedOptions } = useStore();
  const [inputValue, setInputValue] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const blurTimeoutRef = useRef<number | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);

    const filtered = options.filter((option) => !selectedOptions.includes(option) && option.toLowerCase().includes(value.toLowerCase()));
    setFilteredOptions(filtered);
  };

  const handleOptionClick = (option: string) => {
    if (!selectedOptions.includes(option)) {
      setSelectedOptions([...selectedOptions, option]);
      setInputValue('');
      setFilteredOptions([]);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        if (!isFocused) {
          setFilteredOptions([]);
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [setFilteredOptions, isFocused]);

  const handleInputBlur = () => {
    setIsFocused(false);
    blurTimeoutRef.current = window.setTimeout(() => {
      setFilteredOptions([]);
    }, 100);
  };

  const handleInputFocus = () => {
    setIsFocused(true);
    if (blurTimeoutRef.current) {
      window.clearTimeout(blurTimeoutRef.current);
      blurTimeoutRef.current = null;
    }
    const filtered = options.filter((option) => !selectedOptions.includes(option) && option.toLowerCase().includes(inputValue.toLowerCase()));
    setFilteredOptions(filtered);
  };

  return (
    <div className="relative">
      <input
        type="text"
        className="w-full px-4 py-2 border rounded-lg mt-2 focus:outline-none focus:border-blue-500"
        placeholder="Buscar..."
        value={inputValue}
        onChange={handleInputChange}
        onBlur={handleInputBlur}
        onFocus={handleInputFocus}
      />
      {filteredOptions.length > 0 && (
        <ul className="absolute left-0 z-10 w-full mt-2 bg-white border rounded-lg shadow-lg">
          {filteredOptions.map((option) => (
            <li key={option} className="px-4 py-2 cursor-pointer hover:bg-blue-100" onClick={() => handleOptionClick(option)}>
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Autocomplete;
