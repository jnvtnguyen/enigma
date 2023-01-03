import React from 'react';
import cn from 'classnames';

import styles from './styles.module.scss';

type Props = {
  children: React.ReactNode;
  className?: string;
};

const Breadcrumbs: React.FC<Props> = ({ children, className }) => {
  return <ol className={cn(styles.breadcrumbs, className)}>{children}</ol>;
};

export default Breadcrumbs;
