import React, {
  forwardRef,
  InputHTMLAttributes,
  ReactNode,
  useCallback,
  useRef,
  useState
} from 'react';
import cn from 'classnames';

import styles from './styles.module.scss';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: boolean;
  errorMessage?: string | ReactNode;
  prefix?: string;
  required?: boolean;
  elementBeforeInput?: ReactNode;
  size?: 'small' | 'normal';
}

const Input = forwardRef<HTMLInputElement, Props>(
  (
    {
      label,
      error,
      errorMessage,
      prefix,
      required,
      elementBeforeInput,
      onMouseDown,
      size = 'normal',
      ...props
    },
    ref
  ) => {
    const inputRef = useRef<HTMLInputElement>(null);

    const wrapperClassNames = cn(
      styles.inputWrapper,
      error && styles.error,
      prefix && styles.inputWithPrefix,
      styles[size]
    );

    const handleMouseDown = useCallback(
      (event: React.MouseEvent<HTMLInputElement>) => {
        const target: HTMLInputElement = event.target as HTMLInputElement;
        if (target.tagName !== 'INPUT') {
          event.preventDefault();
        }

        if (inputRef && inputRef.current && document.activeElement !== inputRef.current) {
          inputRef.current.focus();
        }

        onMouseDown && onMouseDown(event);
      },
      [onMouseDown]
    );

    const setInputRef = useCallback(
      (inputElement: HTMLInputElement | null) => {
        inputRef.current = inputElement;

        if (!ref) {
          return;
        }

        if (typeof ref === 'object') {
          ref.current = inputElement;
        }

        if (typeof ref === 'function') {
          ref(inputElement);
        }
      },
      [ref]
    );

    return (
      <div className={styles.wrapper}>
        <div className={styles.input}>
          {label && (
            <label htmlFor={props.name} className={styles.label}>
              {label}
              {required && <span className={styles.requiredSymbol}>*</span>}
            </label>
          )}

          <div className={wrapperClassNames} onMouseDown={handleMouseDown}>
            {prefix && (
              <div className={styles.inputPrefix}>
                <span>{prefix}</span>
              </div>
            )}
            <div className={styles.innerInputWrapper}>
              {elementBeforeInput && (
                <span className={styles.elementBeforeInput}>{elementBeforeInput}</span>
              )}
              <input ref={setInputRef} className={styles.input} {...props} />
            </div>
          </div>
          {errorMessage && (
            <span className={cn(styles.errorMessage, error && styles.errorMessageVisible)}>
              {errorMessage}
            </span>
          )}
        </div>
      </div>
    );
  }
);

export default Input;
