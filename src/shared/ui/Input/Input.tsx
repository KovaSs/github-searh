import React from 'react';

import { SearchIcon } from '../../assets/icons';
import { HStack } from '../Stack';

import cls from './styles.module.css';

export interface Props {
  onChange(value: string): void;
  value: string;
  
  leftIcon?: React.ReactNode;
  placeholder?: string;
  max?: boolean;
}


export const Input: React.FC<Props> = ({ value, placeholder, max, onChange, leftIcon }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <HStack className={cls.inputContainer} gap="8" max={max}>
      {leftIcon}
      <input 
        className={cls.inputField}
        placeholder={placeholder}
        onChange={handleChange}
        value={value}
        type="text" 
      />
    </HStack>
  );
};