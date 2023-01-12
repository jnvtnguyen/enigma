import React from 'react';
import { useTranslation } from 'react-i18next';

import BaseTable from '@/components/BaseTable';
import BaseTableHeader from '@/components/BaseTable/Header';
import { Project } from '@/types';
import Button from '@/components/Button';
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

  const renderEmptyState = () => {
    return (
      <tr>
        <td colSpan={12}>
          <div className={styles.emptyState}>
            <div className={styles.emptyStateContent}>
              <h2 className={styles.emptyStateHeader}>{t('No Projects Created')}</h2>
              <span>
                {t(
                  'Projects that have been created in this workspace will show up here. Try creating one.'
                )}
              </span>
              <div className={styles.buttonWrapper}>
                <Button size="small">{t('Create Project')}</Button>
              </div>
            </div>
          </div>
        </td>
      </tr>
    );
  };

  return (
    <React.Fragment>
      <BaseTable
        loading={loading}
        error={!!error}
        rows={projects}
        renderEmptyState={renderEmptyState}
        renderHeaders={renderHeaders}
      >
        {(project, index) => <ProjectTableRow key={project.id} project={project} />}
      </BaseTable>
    </React.Fragment>
  );
};

export default ProjectTable;
