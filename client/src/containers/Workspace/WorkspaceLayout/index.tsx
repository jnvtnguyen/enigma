import React from 'react';

import { Workspace } from '@/types';
import Breadcrumbs from '@/components/Breadcrumbs';
import BreadcrumbItem from '@/components/Breadcrumbs/BreadcrumbItem';
import PageMeta from '@/components/PageMeta';

import styles from './styles.module.scss';

type Props = {
  header: string;
  breadcrumbs?: React.ReactNode;
  workspace: Workspace;
  children: React.ReactNode;
  title: string;
  subTitle?: string;
  actions?: React.ReactNode;
};

const WorkspaceLayout: React.FC<Props> = ({
  header,
  breadcrumbs,
  workspace,
  children,
  title,
  subTitle,
  actions
}) => {
  return (
    <React.Fragment>
      <PageMeta title={`${workspace.name} / ${title}`} />
      <div className={styles.wrapper}>
        <div className={styles.headerWrapper}>
          <Breadcrumbs>
            <BreadcrumbItem href={`/${workspace.key}`} text={`${workspace.name}`} />
            {breadcrumbs}
          </Breadcrumbs>
          <div className={styles.innerHeaderWrapper}>
            <div>
              <h1 className={styles.header}>{header}</h1>
              {subTitle && <h4 className={styles.subHeader}>{subTitle}</h4>}
            </div>

            {actions && <div>{actions}</div>}
          </div>
        </div>
        <div className={styles.contentLine}></div>
        <div className={styles.content}>
          <div className={styles.innerContent}>{children}</div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default WorkspaceLayout;
