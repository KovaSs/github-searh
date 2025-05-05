import React from 'react';

interface Props {
  onChange(value: string): void;
  value: string;

  placeholder?: string;
}


export const SearchBar: React.FC<Props> = ({ value, placeholder, onChange }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <input 
      placeholder={placeholder}
      onChange={handleChange}
      value={value}
      type="text" 
    />
  );
};