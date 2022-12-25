import React from 'react';
import { useTranslation } from 'react-i18next';

import LandingCreateWorkspaceForm from './Form';
import styles from './styles.module.scss';

const LandingCreateWorkspace: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className={styles.pageContainer}>
      <main className={styles.contentContainer}>
        <div>
          <h1 className={styles.header}>{t('Create your first workspace.')}</h1>
          <p className={styles.subHeader}>
            {t(
              'A workspace is a place where you can invite and organize your team to work on projects.'
            )}
          </p>

          <LandingCreateWorkspaceForm />
        </div>
      </main>
    </div>
  );
};

export default LandingCreateWorkspace;
