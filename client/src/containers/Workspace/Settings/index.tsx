import React from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import WorkspaceLayout from '@/containers/Workspace/WorkspaceLayout';
import { getCurrentWorkspace } from '@/selectors/workspace';
import BreadcrumbItem from '@/components/Breadcrumbs/BreadcrumbItem';

const Settings: React.FC = () => {
  const { t } = useTranslation();

  const workspace = useSelector(getCurrentWorkspace);

  return (
    <React.Fragment>
      <WorkspaceLayout
        header={t('Basic Settings')}
        workspace={workspace}
        title={t('Basic Settings')}
        breadcrumbs={
          <BreadcrumbItem text={t('Basic Settings')} href={`/${workspace.key}/settings`} />
        }
      >
        <div></div>
      </WorkspaceLayout>
    </React.Fragment>
  );
};

export default Settings;
