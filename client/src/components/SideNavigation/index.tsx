import React from 'react';
import SideNavigationLink from './Link';

import styles from './styles.module.scss';

export type Link = {
  icon?: React.ReactNode;
  to?: string;
  text: string;
  links?: Link[];
};

type Props = {
  header?: string;
  links: Link[];
};

const SideNavigation: React.FC<Props> = ({ header, links }) => {
  return (
    <div className={styles.sideNavigation}>
      <div className={styles.navigation}>
        <div className={styles.content}>
          <div className={styles.linksContainer}>
            {links.map((link, index) => (
              <SideNavigationLink key={index} icon={link.icon} to={link.to} text={link.text} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideNavigation;
