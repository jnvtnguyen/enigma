import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import cn from 'classnames';

import { Link as LinkType } from '@/components/SideNavigation';
import styles from './styles.module.scss';

type Props = {
  to?: string;
  text: string;
  links?: LinkType[];
};

const SideNavigationLink: React.FC<Props> = ({ to, text, links }) => {
  const location = useLocation();

  const contentClassNames = cn(styles.content, location.pathname == to && styles.contentSelected);

  return (
    <div className={contentClassNames}>
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
