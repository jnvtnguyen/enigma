import React, { ButtonHTMLAttributes } from 'react';
import cn from 'classnames';

import styles from './styles.module.scss';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  theme?: 'default' | 'secondary';
  size?: 'small' | 'normal';
}

const Button: React.FC<Props> = ({
  children,
  theme = 'default',
  size = 'normal',
  className,
  ...props
}) => {
  const buttonClassNames = cn(styles.button, styles[theme], styles[size], className);

  return (
    <button className={buttonClassNames} {...props}>
      {children}
    </button>
  );
};

export default Button;
