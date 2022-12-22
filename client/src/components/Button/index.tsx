import React, { ButtonHTMLAttributes } from 'react';
import cn from 'classnames';

import styles from './styles.module.scss';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  theme?: 'default';
}

const Button: React.FC<Props> = ({ children, theme = 'default', ...props }) => {
  const buttonClassNames = cn(styles.button, styles[theme]);

  return (
    <button className={buttonClassNames} {...props}>
      {children}
    </button>
  );
};

export default Button;
