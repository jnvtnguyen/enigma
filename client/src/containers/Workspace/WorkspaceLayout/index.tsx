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
};

const WorkspaceLayout: React.FC<Props> = ({
  header,
  breadcrumbs,
  workspace,
  children,
  title,
  subTitle
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
          <h1 className={styles.header}>
            {workspace.name} / {header}
          </h1>
          {subTitle && <h4 className={styles.subHeader}>{subTitle}</h4>}
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
