import React from 'react';
import { useTranslation } from 'react-i18next';
import { UilFolder, UilSetting, UilUser, UilUsersAlt } from '@iconscout/react-unicons';

import SideNavigation from '@/components/SideNavigation';

type Props = {
  workspaceKey: string;
};

const WorkspaceSideNavigation: React.FC<Props> = ({ workspaceKey }) => {
  const { t } = useTranslation();

  return (
    <SideNavigation
      links={[
        {
          to: `/${workspaceKey}`,
          text: t('Projects')
        },
        {
          to: `/${workspaceKey}/settings`,
          text: t('Basic Settings')
        },
        {
          to: `/${workspaceKey}/users`,
          text: t('Users')
        },
        {
          to: `/${workspaceKey}/groups`,
          text: t('User Groups')
        }
      ]}
    />
  );
};

export default WorkspaceSideNavigation;
