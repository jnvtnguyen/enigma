import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import CreateWorkspaceForm from '@/components/CreateWorkspaceForm';
import urls from '@/util/urls';
import { authorizationHeaders } from '@/util/headers';
import { getAccessToken } from '@/selectors/auth';
import styles from './styles.module.scss';

interface Props {
  onFinish: (workspaceKey: string) => void;
}

const LandingCreateWorkspace: React.FC<Props> = ({ onFinish }) => {
  const { t } = useTranslation();

  const [loading, setLoading] = useState<boolean>(false);

  const [error, setError] = useState<string>('');

  const accessToken = useSelector(getAccessToken);

  const handleSubmit = async (name: string, key: string) => {
    setLoading(true);

    const body = {
      name: name,
      key: key
    };

    const response = await fetch(urls.api.workspace.create, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...authorizationHeaders(accessToken)
      },
      body: JSON.stringify(body)
    });

    const data = await response.json();

    if (response.ok) {
      await fetch(urls.api.workspace.setDefault, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...authorizationHeaders(accessToken)
        },
        body: JSON.stringify({
          workspaceId: data.workspace.id
        })
      });
      onFinish(key);
    }

    setLoading(false);
    setError(data.error);
  };

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

          <CreateWorkspaceForm onSubmit={handleSubmit} error={error} loading={loading} />
        </div>
      </main>
    </div>
  );
};

export default LandingCreateWorkspace;
