import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';

import PageMeta from '@/components/PageMeta';
import LoginForm from '@/components/LoginForm';
import urls from '@/util/urls';
import { authenticate } from '@/slices/auth';
import authStyles from '@/containers/shared/auth.module.scss';

const Login: React.FC = () => {
  const { t } = useTranslation();

  const dispatch = useDispatch();

  const _authenticate = (accessToken: string) =>
    dispatch(authenticate({ accessToken: accessToken }));

  const [loading, setLoading] = useState<boolean>(false);

  const [error, setError] = useState<string>('');

  const handleSubmit = async (email: string, password: string) => {
    try {
      setLoading(true);
      const response = await fetch(urls.api.login, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (response.ok) {
        const { accessToken, user } = data.data;

        _authenticate(accessToken);

        if (!user.finishedLanding) {
          window.location.replace(urls.landing);
        } else {
          window.location.replace(urls.workspace.index(user.defaultWorkspace.key));
        }
      }
      setError(data.error);
    } catch (error) {
      console.error(error);
      setError('request_error');
    }

    setLoading(false);
  };

  return (
    <React.Fragment>
      <PageMeta title={t('Login')} />

      <div className={authStyles.pageContainer}>
        <main className={authStyles.contentContainer}>
          <div>
            <h1 className={authStyles.header}>{t('Login')}</h1>
          </div>
          <LoginForm onSubmit={handleSubmit} loading={loading} error={error} />
          <div className={authStyles.bottom}>
            <span>
              Need an account? <Link to={urls.signup}>Sign Up</Link>
            </span>
          </div>
        </main>
      </div>
    </React.Fragment>
  );
};

export default Login;
