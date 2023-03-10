import React from 'react';
import { UilSearch } from '@iconscout/react-unicons';

import Input from '@/components/Input';
import styles from './styles.module.scss';

type Props = {
  name: string;
  label?: string;
  placeholder?: string;
  onFocus?: () => void;
  onBlur?: () => void;
  onChange?: (e: React.FormEvent<HTMLInputElement>) => void;
  value?: string;
};

const Search: React.FC<Props> = ({
  name,
  label,
  placeholder,
  onFocus,
  onBlur,
  onChange,
  value
}) => {
  return (
    <Input
      size="small"
      name={name}
      label={label}
      placeholder={placeholder}
      onChange={onChange}
      onFocus={onFocus}
      onBlur={onBlur}
      elementAfterInput={<UilSearch size="15" />}
      value={value || ''}
    />
  );
};

export default Search;
