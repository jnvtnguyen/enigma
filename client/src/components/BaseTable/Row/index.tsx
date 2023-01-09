import React from 'react';
import cn from 'classnames';

import styles from './styles.module.scss';

type Props = {
  className?: string;
  children?: React.ReactNode;
};

const BaseTableRow: React.FC<Props> = ({ className, children }) => {
  return <tr className={cn(styles.row, className)}>{children}</tr>;
};

export default BaseTableRow;
