import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import cn from 'classnames';

import { Link as LinkType } from '@/components/SideNavigation';
import styles from './styles.module.scss';

type Props = {
  icon?: React.ReactNode;
  to?: string;
  text: string;
  links?: LinkType[];
};

const SideNavigationLink: React.FC<Props> = ({ icon, to, text, links }) => {
  const location = useLocation();

  const contentClassNames = cn(styles.content, location.pathname == to && styles.contentSelected);

  return (
    <div className={contentClassNames}>
      {icon && <span className={styles.icon}>{icon}</span>}
      {links ? (
        <div className={styles.link}>
          <span className={styles.text}>{text}</span>
        </div>
      ) : (
        <Link to={to} className={styles.link}>
          <span className={styles.text}>{text}</span>
        </Link>
      )}
    </div>
  );
};

export default SideNavigationLink;
