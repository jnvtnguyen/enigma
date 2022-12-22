import React from 'react';
import cn from 'classnames';

import styles from './styles.module.scss';

interface Props {
  variant?: 'grey' | 'white';
  size?: 'large' | 'medium' | 'small';
}

const Spinner: React.FC<Props> = ({ variant = 'grey', size = 'large', ...props }) => {
  const spinnerClassNames = cn(styles.spinner, styles[variant], styles[size]);

  return <span className={spinnerClassNames} {...props}></span>;
};

export default Spinner;
