import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import PageMeta from '@/components/PageMeta';
import { getCurrentWorkspace, getWorkspaceState } from '@/selectors/workspace';
import { fetchWorkspace } from '@/slices/workspace';
import LoadingPage from '@/components/LoadingPage';
import { FetchWorkspaceError } from '@/types';
import NotAuthorized from '@/components/NotAuthorized';

import styles from './styles.module.scss';

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
    </React.Fragment>
  );
};

export default Workspace;
