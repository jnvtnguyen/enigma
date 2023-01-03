import React from 'react';
import { Link } from 'react-router-dom';

import styles from './styles.module.scss';

type Props = {
  href?: string;
  text: string;
};

const BreadcrumbItem: React.FC<Props> = ({ href, text }) => {
  return (
    <li className={styles.breadcrumbItem}>
      <Link to={href} className={styles.link}>
        <span className={styles.text}>{text}</span>
      </Link>
    </li>
  );
};

export default BreadcrumbItem;
