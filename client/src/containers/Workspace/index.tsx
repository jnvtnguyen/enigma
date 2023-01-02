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
      <SideNavigation
        links={[
          {
            icon: <UilFolder />,
            to: `/${key}`,
            text: t('Projects')
          },
          {
            icon: <UilSetting />,
            text: t('Settings')
          }
        ]}
      />
      <div className={styles.content}>
        <Routes>
          <Route path="/" element={<ProjectsLoadable />} />
        </Routes>
      </div>
    </React.Fragment>
  );
};

export default Workspace;
