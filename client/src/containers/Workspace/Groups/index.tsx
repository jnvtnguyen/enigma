import React from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import WorkspaceLayout from '@/containers/Workspace/WorkspaceLayout';
import { getCurrentWorkspace } from '@/selectors/workspace';
import BreadcrumbItem from '@/components/Breadcrumbs/BreadcrumbItem';

const Groups: React.FC = () => {
  const { t } = useTranslation();

  const workspace = useSelector(getCurrentWorkspace);

  const getGroups = () => {};

  return (
    <React.Fragment>
      <WorkspaceLayout
        header={t('User Groups')}
        workspace={workspace}
        title={t('User Groups')}
        breadcrumbs={<BreadcrumbItem text={t('User Groups')} href={`/${workspace.key}/groups`} />}
      >
        <div></div>
      </WorkspaceLayout>
    </React.Fragment>
  );
};
export default Groups;
