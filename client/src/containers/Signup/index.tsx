import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import PageMeta from '@/components/PageMeta';
import SignupForm from '@/components/SignupForm';
import authStyles from '@/containers/shared/auth.module.scss';
import urls from '@/util/urls';
import { getSignupState } from '@/selectors';
import { signup, clearError } from '@/slices/signup';

const Signup: React.FC = () => {
  const { loading, error } = useSelector(getSignupState);

  const dispatch = useDispatch();

  const _signup = (firstName: string, lastName: string, email: string, password: string) =>
    dispatch(signup({ firstName, lastName, email, password }));

  const _clearError = () => dispatch(clearError());

  const handleSubmit = (firstName: string, lastName: string, email: string, password: string) => {
    _signup(firstName, lastName, email, password);
  };

  useEffect(() => {
    _clearError();
  }, []);

  return (
    <React.Fragment>
      <PageMeta title={'Sign Up'} />

      <div className={authStyles.pageContainer}>
        <main className={authStyles.contentContainer}>
          <div>
            <h1 className={authStyles.header}>Sign Up</h1>
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
