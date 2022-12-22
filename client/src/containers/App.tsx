import React, { Suspense } from 'react';
import { Helmet } from 'react-helmet';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import loadable from '@loadable/component';

import LoadingPage from '@/components/LoadingPage';
import { getAuthState } from '@/selectors';

const SignupLoadable = loadable(() => import('@/containers/Signup'));

const LoginLoadable = loadable(() => import('@/containers/Login'));

const App: React.FC = () => {
  const { isAuthenticated } = useSelector(getAuthState);

  return (
    <React.Fragment>
      <Helmet>
        <title>Grocery List</title>
      </Helmet>
      <Suspense fallback={<LoadingPage />}>
        <Routes>
          {!isAuthenticated && (
            <React.Fragment>
              <Route path="/signup" element={<SignupLoadable />} />
              <Route path="/login" element={<LoginLoadable />} />
            </React.Fragment>
          )}
          {!isAuthenticated ? (
            <Route path="*" element={<Navigate replace to="/login" />} />
          ) : (
            <React.Fragment></React.Fragment>
          )}
        </Routes>
      </Suspense>
    </React.Fragment>
  );
};

export default App;
