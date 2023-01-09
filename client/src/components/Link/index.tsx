import React from 'react';
import { Link as BaseLink } from 'react-router-dom';
import cn from 'classnames';

import styles from './styles.module.scss';

type Props = {
  to: string;
  className?: string;
  children?: React.ReactNode;
};

const Link: React.FC<Props> = ({ to, className, children }) => {
  return (
    <BaseLink to={to} className={cn(styles.link, className)}>
      {children}
    </BaseLink>
  );
};

export default Link;
