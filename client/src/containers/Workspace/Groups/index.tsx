import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import WorkspaceLayout from '@/containers/Workspace/WorkspaceLayout';
import { getCurrentWorkspace } from '@/selectors/workspace';
import BreadcrumbItem from '@/components/Breadcrumbs/BreadcrumbItem';
import { httpRequest } from '@/util/http-request';
import { WorkspaceGroup } from '@/types';
import Button from '@/components/Button';
import GroupTable from './GroupTable';
import urls from './urls';
import CreateGroupModal from './CreateGroupModal';
import styles from './styles.module.scss';

const Groups: React.FC = () => {
  const { t } = useTranslation();

  const [groups, setGroups] = useState<WorkspaceGroup[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>(null);

  const [createGroupModalOpen, setCreateGroupModalOpen] = useState<boolean>(false);

  const workspace = useSelector(getCurrentWorkspace);

  const getGroups = async (): Promise<WorkspaceGroup[]> => {
    const response = await httpRequest<any>().get(urls.api.groups(workspace.key));
    const { groups } = response;

    return groups;
  };

  const openCreateGroupModal = () => {
    setCreateGroupModalOpen(true);
  };

  const closeCreateGroupModal = () => {
    setCreateGroupModalOpen(false);
  };

  useEffect(() => {
    setLoading(true);
    const fetchGroups = async () => {
      try {
        const groups = await getGroups();

        setGroups(groups);
        setLoading(false);
      } catch (error) {
        console.error(error);

        setError(error.error);
        setLoading(false);
      }
    };

    fetchGroups();
  }, []);

  return (
    <React.Fragment>
      <WorkspaceLayout
        header={t('User Groups')}
        workspace={workspace}
        title={t('User Groups')}
        breadcrumbs={<BreadcrumbItem text={t('User Groups')} href={`/${workspace.key}/groups`} />}
        actions={
          <Button size="small" onClick={openCreateGroupModal}>
            {t('Create Group')}
          </Button>
        }
      >
        <div className={styles.content}>
          <GroupTable
            loading={loading}
            error={error}
            groups={groups}
            defaultGroupId={workspace.defaultGroupId}
          />
        </div>
      </WorkspaceLayout>

      {createGroupModalOpen && <CreateGroupModal onClose={closeCreateGroupModal} />}
    </React.Fragment>
  );
};
export default Groups;
