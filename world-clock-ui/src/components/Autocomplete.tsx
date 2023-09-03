import React, { useState } from 'react';
import { useStore } from '../store';
import Select, { SingleValue } from 'react-select';

interface AutocompleteProps {
  options: string[];
}

const Autocomplete: React.FC<AutocompleteProps> = ({ options }) => {
  const { selectedOptions, setSelectedOptions } = useStore();
  const [value, setValue] = useState<{ value: string; label: string }>({ value: '', label: '' });

  const handleOptionSelect = (option: SingleValue<{ value: string; label: string }>) => {
    option?.value && setSelectedOptions([...selectedOptions, option.value]);
    setValue({ value: '', label: '' });
  };

  const getOptions = () => {
    return options.filter((option) => !selectedOptions.includes(option)).map((option) => ({ value: option, label: option }));
  };

  return (
    <Select
      isLoading={!options.length}
      options={getOptions()}
      hideSelectedOptions={true}
      onChange={handleOptionSelect}
      placeholder="Search..."
      value={value}
      isSearchable={true}
      closeMenuOnSelect={true}
    />
  );
};

export default Autocomplete;
