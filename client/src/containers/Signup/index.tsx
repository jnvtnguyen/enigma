import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import PageMeta from '@/components/PageMeta';
import urls from '@/util/urls';
import { httpRequest } from '@/util/http-request';
import SignupForm from './SignupForm';
import authStyles from '@/containers/shared/auth.module.scss';

const Signup: React.FC = () => {
  const { t } = useTranslation();

  const [loading, setLoading] = useState<boolean>(false);

  const [error, setError] = useState<string>(null);

  const handleSubmit = async (
    firstName: string,
    lastName: string,
    email: string,
    password: string
  ) => {
    try {
      setLoading(true);
      setError(null);
      await httpRequest<any>({ authorized: false }).post(urls.api.signup, {
        firstName,
        lastName,
        email,
        password
      });
      window.location.replace(urls.login);
    } catch (error) {
      console.error(error);
      setError(error.error);
    }

    setLoading(false);
  };

  return (
    <React.Fragment>
      <PageMeta title={t('Sign Up')} />

      <div className={authStyles.pageContainer}>
        <main className={authStyles.contentContainer}>
          <div>
            <h1 className={authStyles.header}>{t('Sign Up')}</h1>
          </div>
          <SignupForm onSubmit={handleSubmit} loading={loading} error={error} />
          <div className={authStyles.bottom}>
            <span>
              Have an account? <Link to={urls.login}>Login</Link>
            </span>
          </div>
        </main>
      </div>
    </React.Fragment>
  );
};

export default Signup;
