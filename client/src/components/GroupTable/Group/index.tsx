import React from 'react';
import { useTranslation } from 'react-i18next';

import { Workspace, WorkspaceGroup } from '@/types';
import Link from '@/components/Link';
import BaseTableRow from '@/components/BaseTable/Row';
import BaseTableCell from '@/components/BaseTable/Cell';
import Badge from '@/components/Badge';
import styles from './styles.module.scss';

type Props = {
  group: WorkspaceGroup;
  isDefault: boolean;
};

const GroupTableRow: React.FC<Props> = ({ group, isDefault }) => {
  const { t } = useTranslation();

  const getUsers = () => {
    if (group.userCount > 1) {
      return `${group.userCount} ${t('Users')}`;
    } else if (!(group.userCount > 1) && group.userCount > 0) {
      return `${group.userCount} ${t('User')}`;
    }

    return t('No Users');
  };

  return (
    <BaseTableRow>
      <BaseTableCell>
        <Link to={group.name.toLowerCase()}>{group.name}</Link>
        {isDefault && <Badge className={styles.badge} text={t('Default Group')} />}
      </BaseTableCell>
      <BaseTableCell>{getUsers()}</BaseTableCell>
      <BaseTableCell></BaseTableCell>
    </BaseTableRow>
  );
};

export default GroupTableRow;
