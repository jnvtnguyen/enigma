import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes, useParams } from 'react-router-dom';
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
const GroupLoadable = loadable(() => import('@/containers/Workspace/Groups/Group'));

const Workspace: React.FC = () => {
  const dispatch = useDispatch();
  const { workspaceKey } = useParams();

  const workspace = useSelector(getCurrentWorkspace);
  const { loading, error } = useSelector(getWorkspaceState);

  const _fetchWorkspace = (key: string) => dispatch(fetchWorkspace(key));

  useEffect(() => {
    _fetchWorkspace(workspaceKey);
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
        <Route path="/groups/:groupName" element={<GroupLoadable />} />
      </Routes>
    </React.Fragment>
  );
};

export default Workspace;
