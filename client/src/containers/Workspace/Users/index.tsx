import React from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import WorkspaceLayout from '@/containers/Workspace/WorkspaceLayout';
import { getCurrentWorkspace } from '@/selectors/workspace';
import BreadcrumbItem from '@/components/Breadcrumbs/BreadcrumbItem';

const Users: React.FC = () => {
  const { t } = useTranslation();

  const workspace = useSelector(getCurrentWorkspace);

  return (
    <React.Fragment>
      <WorkspaceLayout
        header={t('Users')}
        workspace={workspace}
        title={t('Users')}
        breadcrumbs={<BreadcrumbItem text={t('Users')} href={`/${workspace.key}/users`} />}
      >
        <div></div>
      </WorkspaceLayout>
    </React.Fragment>
  );
};

export default Users;
