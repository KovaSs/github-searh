import React from 'react';

import type { Props as InputProps } from '../Input/Input';
import { SearchIcon } from '../../assets/icons';
import { Input } from '../Input';

type Props = Omit<InputProps, 'leftIcon'>;

export const SearchBar: React.FC<Props> = ({ value, placeholder, max, onChange }) => {
  return (
    <Input value={value} placeholder={placeholder} max={max} onChange={onChange} leftIcon={<SearchIcon />} />
  );
};