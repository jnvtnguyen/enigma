import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import WorkspaceLayout from '@/containers/Workspace/WorkspaceLayout';
import { getCurrentWorkspace } from '@/selectors/workspace';
import BreadcrumbItem from '@/components/Breadcrumbs/BreadcrumbItem';
import { httpRequest } from '@/util/http-request';
import { WorkspaceGroup } from '@/types';
import GroupTable from '@/components/GroupTable';
import urls from './urls';
import styles from './styles.module.scss';

const Groups: React.FC = () => {
  const { t } = useTranslation();

  const [groups, setGroups] = useState<WorkspaceGroup[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const workspace = useSelector(getCurrentWorkspace);

  const getGroups = async (): Promise<WorkspaceGroup[]> => {
    const response = await httpRequest<any>().get(urls.api.all(workspace.key));
    const groups = response.groups;

    return groups;
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
        setError(error.message);
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
    </React.Fragment>
  );
};
export default Groups;
