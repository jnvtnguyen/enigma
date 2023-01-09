import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes, useParams } from 'react-router-dom';
import { UilFolder, UilSetting } from '@iconscout/react-unicons';
import { useTranslation } from 'react-i18next';
import loadable from '@loadable/component';

import WorkspaceSideNavigation from '@/containers/Workspace/SideNavigation';
import PageMeta from '@/components/PageMeta';
import { getCurrentWorkspace, getWorkspaceState } from '@/selectors/workspace';
import { fetchWorkspace } from '@/slices/workspace';
import LoadingPage from '@/components/LoadingPage';
import { FetchWorkspaceError } from '@/types';
import NotAuthorized from '@/components/NotAuthorized';

const ProjectsLoadable = loadable(() => import('@/containers/Workspace/Projects'));

const SettingsLoadable = loadable(() => import('@/containers/Workspace/Settings'));
const UsersLoadable = loadable(() => import('@/containers/Workspace/Users'));
const GroupsLoadable = loadable(() => import('@/containers/Workspace/Groups'));

const Workspace: React.FC = () => {
  const dispatch = useDispatch();
  const { key } = useParams();

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
      <WorkspaceSideNavigation workspaceKey={workspace.key} />
      <Routes>
        <Route path="/" element={<ProjectsLoadable />} />
        <Route path="/settings" element={<SettingsLoadable />} />
        <Route path="/users" element={<UsersLoadable />} />
        <Route path="/groups" element={<GroupsLoadable />} />
      </Routes>
    </React.Fragment>
  );
};

export default Workspace;
