import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import PageMeta from '@/components/PageMeta';
import LoginForm from '@/components/LoginForm';
import authStyles from '@/containers/shared/auth.module.scss';
import urls from '@/util/urls';
import { getLoginState } from '@/selectors';
import { clearError, login } from '@/slices/login';

const Login: React.FC = () => {
  const { t } = useTranslation();

  const { loading, error } = useSelector(getLoginState);

  const dispatch = useDispatch();

  const _login = (email: string, password: string) => dispatch(login({ email, password }));

  const _clearError = () => dispatch(clearError());

  const handleSubmit = (email: string, password: string) => {
    _login(email, password);
  };

  useEffect(() => {
    _clearError();
  }, []);

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
