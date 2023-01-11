import React from 'react';
import { useTranslation } from 'react-i18next';

import { User } from '@/types';
import BaseTableHeader from '@/components/BaseTable/Header';
import BaseTable from '@/components/BaseTable';
import MemberTableRow from './Member';

type Props = {
  loading: boolean;
  error: string;
  members: User[];
};

const MemberTable: React.FC<Props> = ({ loading, error, members }) => {
  const { t } = useTranslation();

  const renderHeaders = () => {
    return (
      <tr>
        <BaseTableHeader width="35%">{t('Name')}</BaseTableHeader>
        <BaseTableHeader width="40%">{t('Email')}</BaseTableHeader>
        <BaseTableHeader width="25%">{t('Actions')}</BaseTableHeader>
      </tr>
    );
  };

  return (
    <React.Fragment>
      <BaseTable
        loading={loading}
        error={!!error}
        rows={members}
        renderEmptyState={() => <tr></tr>}
        renderHeaders={renderHeaders}
      >
        {(member, index) => <MemberTableRow key={member.id} user={member} />}
      </BaseTable>
    </React.Fragment>
  );
};

export default MemberTable;
