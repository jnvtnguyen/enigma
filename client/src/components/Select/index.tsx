import React from 'react';
import BaseSelect, { GroupBase, Props } from 'react-select';
import cn from 'classnames';

import styles from './styles.module.scss';

export type SelectOption = {
  label: string;
  value: string;
};

declare module 'react-select/dist/declarations/src/Select' {
  export interface Props<Option, IsMulti extends boolean, Group extends GroupBase<Option>> {
    required?: boolean;
    label?: string;
  }
}

function Select<
  Option,
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>
>(props: Props<Option, IsMulti, Group>) {
  const { label, name, required } = props;

  return (
    <React.Fragment>
      <div className={styles.wrapper}>
        {label && (
          <label htmlFor={name} className={styles.label}>
            {label}
            {required && <span className={styles.requiredSymbol}>*</span>}
          </label>
        )}
        <BaseSelect
          {...props}
          name={name}
          styles={{
            control: (css, state) => {
              let borderColor: string = state.isFocused
                ? 'rgb(76, 154, 255)'
                : 'rgba(9, 30, 66, 0.2)';

              let backgroundColor: string = state.isFocused ? '#fff' : 'rgba(9, 30, 66, 0.03)';

              let backgroundColorHover: string = state.isFocused ? '#fff' : 'rgba(9, 30, 66, 0.1)';

              return {
                ...css,
                height: '44px',
                borderStyle: 'solid',
                borderWidth: '2px',
                borderRadius: '3px',
                transition: 'background-color 0.2s ease-in-out 0s',
                cursor: 'pointer',
                outline: 'none',
                boxShadow: 'none',
                borderColor: borderColor,
                backgroundColor: backgroundColor,
                ':hover': {
                  cursor: 'pointer',
                  backgroundColor: backgroundColorHover,
                  borderColor: borderColor
                }
              };
            }
          }}
        />
      </div>
    </React.Fragment>
  );
}

export default Select;
