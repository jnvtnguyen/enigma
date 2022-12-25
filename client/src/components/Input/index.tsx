import React, { InputHTMLAttributes, ReactNode } from 'react';
import cn from 'classnames';

import styles from './styles.module.scss';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: boolean;
  errorMessage?: string | ReactNode;
  width?: 'full';
  prefix?: string;
  required?: boolean;
}

const Input: React.FC<Props> = ({
  label,
  error,
  errorMessage,
  width = 'full',
  prefix,
  required,
  ...props
}) => {
  const inputClassNames = cn(
    styles.input,
    error && styles.error,
    styles[width],
    prefix && styles.inputWithPrefix
  );

  return (
    <React.Fragment>
      <div className={styles.wrapper}>
        <label htmlFor={props.name} className={styles.label}>
          {label}
          {required && <span className={styles.requiredSymbol}>*</span>}
        </label>
        <div className={styles.inputWrapper}>
          {prefix && (
            <div className={styles.inputPrefix}>
              <span>{prefix}</span>
            </div>
          )}
          <input className={inputClassNames} {...props} />
        </div>
        <span className={cn(styles.errorMessage, error && styles.errorMessageVisible)}>
          {errorMessage}
        </span>
      </div>
    </React.Fragment>
  );
};

export default Input;
