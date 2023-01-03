import React from 'react';
import SideNavigationLink from './Link';

import styles from './styles.module.scss';

export type Link = {
  to?: string;
  text: string;
  divider?: boolean;
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
              <React.Fragment key={`side-navigation-component-${index}`}>
                {link.divider ? (
                  <div className={styles.divider}>
                    <span>{link.text}</span>
                  </div>
                ) : (
                  <SideNavigationLink to={link.to} text={link.text} links={link.links} />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideNavigation;
