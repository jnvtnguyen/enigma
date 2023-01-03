import React from 'react';

import styles from './styles.module.scss';

type Props = {
  children?: React.ReactNode;
  width?: string;
};

const BaseTableHeader: React.FC<Props> = ({ children, width }) => {
  return (
    <th className={styles.th} style={{ width: width }}>
      {children}
    </th>
  );
};

export default BaseTableHeader;
