import React from 'react';
import { useTranslation } from 'react-i18next';

import { Workspace, WorkspaceGroup } from '@/types';
import BaseTableHeader from '@/components/BaseTable/Header';
import BaseTable from '@/components/BaseTable';
import GroupTableRow from './Group';

type Props = {
  loading: boolean;
  error: string;
  groups: WorkspaceGroup[];
  defaultGroupId: string;
};

const GroupTable: React.FC<Props> = ({ loading, error, groups, defaultGroupId }) => {
  const { t } = useTranslation();

  const renderHeaders = () => {
    return (
      <tr>
        <BaseTableHeader width="60%">{t('Name')}</BaseTableHeader>
        <BaseTableHeader width="20%">{t('Users')}</BaseTableHeader>
        <BaseTableHeader width="20%">{t('Actions')}</BaseTableHeader>
      </tr>
    );
  };

  return (
    <React.Fragment>
      <BaseTable
        loading={loading}
        error={!!error}
        rows={groups}
        renderEmptyState={() => <tr></tr>}
        renderHeaders={renderHeaders}
      >
        {(group, index) => (
          <GroupTableRow key={group.id} group={group} isDefault={group.id === defaultGroupId} />
        )}
      </BaseTable>
    </React.Fragment>
  );
};

export default GroupTable;
