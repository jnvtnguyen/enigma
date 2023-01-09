import React from 'react';
import cn from 'classnames';

import styles from './styles.module.scss';

type Props = {
  text: string;
  className?: string;
};

const Badge: React.FC<Props> = ({ text, className }) => {
  return (
    <span className={cn(styles.badge, className)}>
      <span className={styles.text}>{text}</span>
    </span>
  );
};

export default Badge;
