import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes, useParams } from 'react-router-dom';
import { UilFolder, UilSetting } from '@iconscout/react-unicons';
import { useTranslation } from 'react-i18next';
import loadable from '@loadable/component';

import PageMeta from '@/components/PageMeta';
import { getCurrentWorkspace, getWorkspaceState } from '@/selectors/workspace';
import { fetchWorkspace } from '@/slices/workspace';
import LoadingPage from '@/components/LoadingPage';
import { FetchWorkspaceError } from '@/types';
import NotAuthorized from '@/components/NotAuthorized';
import SideNavigation from '@/components/SideNavigation';
import Breadcrumbs from '@/components/Breadcrumbs';
import BreadcrumbItem from '@/components/Breadcrumbs/BreadcrumbItem';
import styles from './styles.module.scss';

const ProjectsLoadable = loadable(() => import('@/containers/Projects'));

const Workspace: React.FC = () => {
  const dispatch = useDispatch();
  const { key } = useParams();
  const { t } = useTranslation();

  const workspace = useSelector(getCurrentWorkspace);
  const { loading, error } = useSelector(getWorkspaceState);

  const _fetchWorkspace = (key: string) => dispatch(fetchWorkspace(key));

  useEffect(() => {
    _fetchWorkspace(key);
  }, []);

  if (error == FetchWorkspaceError.NOT_AUTHORIZED) {
    return <NotAuthorized />;
  }

  if (loading || !workspace) {
    return <LoadingPage />;
  }

  return (
    <React.Fragment>
      <PageMeta title={workspace.name} />

      <div className={styles.wrapper}>
        <div className={styles.headerWrapper}>
          <Breadcrumbs className={styles.breadcrumb}>
            <BreadcrumbItem href={`/${key}`} text={`${workspace.name}`} />
          </Breadcrumbs>
          <h1 className={styles.header}>
            {workspace.name} / {t('Projects')}
          </h1>
        </div>
        <div className={styles.contentLine}></div>
        <div className={styles.content}>
          <SideNavigation
            links={[
              {
                text: t('Projects'),
                divider: true
              },
              {
                to: `/${key}`,
                text: t('Projects')
              },
              {
                text: 'Settings',
                divider: true
              },
              {
                to: `/${key}/settings`,
                text: t('Basic Settings')
              },
              {
                to: `/${key}/users`,
                text: t('Users')
              },
              {
                to: `/${key}/groups`,
                text: t('User Groups')
              }
            ]}
          />
          <div className={styles.innerContent}>
            <Routes>
              <Route path="/" element={<ProjectsLoadable />} />
            </Routes>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Workspace;
