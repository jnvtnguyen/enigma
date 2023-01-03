import React from 'react';
import { useTranslation } from 'react-i18next';

import BaseTable from '@/components/BaseTable';
import BaseTableHeader from '@/components/BaseTable/Header';
import { Project } from '@/types';
import ProjectTableRow from './Project';
import styles from './styles.module.scss';

type Props = {
  loading: boolean;
  error: string;
  projects: Project[];
};

const ProjectTable: React.FC<Props> = ({ loading, error, projects }) => {
  const { t } = useTranslation();

  const renderHeaders = () => {
    return (
      <tr>
        <BaseTableHeader width="30%">{t('Name')}</BaseTableHeader>
        <BaseTableHeader width="40%">{t('Description')}</BaseTableHeader>
        <BaseTableHeader width="30%">{t('Modified Date')}</BaseTableHeader>
      </tr>
    );
  };

  return (
    <React.Fragment>
      <BaseTable
        loading={loading}
        error={!!error}
        rows={projects}
        renderEmptyState={() => <tr></tr>}
        renderHeaders={renderHeaders}
      >
        {(project, index) => <ProjectTableRow key={project.id} project={project} />}
      </BaseTable>
    </React.Fragment>
  );
};

export default ProjectTable;
