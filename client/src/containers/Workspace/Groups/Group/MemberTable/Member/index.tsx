import React from 'react';
import { useTranslation } from 'react-i18next';

import { User } from '@/types';
import BaseTableRow from '@/components/BaseTable/Row';
import BaseTableCell from '@/components/BaseTable/Cell';
import styles from './styles.module.scss';

type Props = {
  user: User;
};

const MemberTableRow: React.FC<Props> = ({ user }) => {
  const { t } = useTranslation();

  const fullName = `${user.firstName} ${user.lastName}`;

  return (
    <BaseTableRow>
      <BaseTableCell>{fullName}</BaseTableCell>
      <BaseTableCell>{user.email}</BaseTableCell>
      <BaseTableCell>
        <span className={styles.viewGroups}>{t('View Groups')}</span>
      </BaseTableCell>
    </BaseTableRow>
  );
};

export default MemberTableRow;
