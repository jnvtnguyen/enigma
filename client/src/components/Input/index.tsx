import React, { InputHTMLAttributes, ReactNode } from 'react';
import cn from 'classnames';

import styles from './styles.module.scss';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: boolean;
  errorMessage?: string | ReactNode;
  width?: 'full';
}

const Input: React.FC<Props> = ({ label, error, errorMessage, width = 'full', ...props }) => {
  const inputClassNames = cn(styles.input, error && styles.error, styles[width]);

  return (
    <React.Fragment>
      <div className={styles.wrapper}>
        <label htmlFor={props.name} className={styles.label}>
          {label}
        </label>
        <input className={inputClassNames} {...props} />
        <span className={cn(styles.errorMessage, error && styles.errorMessageVisible)}>
          {errorMessage}
        </span>
      </div>
    </React.Fragment>
  );
};

export default Input;
