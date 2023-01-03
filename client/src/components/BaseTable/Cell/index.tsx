import React from 'react';
import cn from 'classnames';

import styles from './styles.module.scss';

type Props = {
  children?: React.ReactNode;
  className?: string;
};

const BaseTableCell: React.FC<Props> = ({ children, className }) => {
  return <td className={cn(styles.td, className)}>{children}</td>;
};

export default BaseTableCell;
