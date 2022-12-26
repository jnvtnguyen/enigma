import React, { Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import loadable from '@loadable/component';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import LoadingPage from '@/components/LoadingPage';
import { getCurrentUser, getIsAuthenticated } from '@/selectors/auth';
import UserWrapper from './UserWrapper';

i18n.use(initReactI18next).init({
  resources: {},
  lng: 'en',
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false
  }
});

const SignupLoadable = loadable(() => import('@/containers/Signup'));

const LoginLoadable = loadable(() => import('@/containers/Login'));

const LandingLoadable = loadable(() => import('@/containers/Landing'));

const App: React.FC = () => {
  const { finishedLanding } = useSelector(getCurrentUser) ?? {};
  const isAuthenticated = useSelector(getIsAuthenticated);

  return (
    <UserWrapper>
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
            <React.Fragment>
              {!finishedLanding ? (
                <React.Fragment>
                  <Route path="/landing" element={<LandingLoadable />} />
                  <Route path="*" element={<Navigate replace to="/landing" />} />
                </React.Fragment>
              ) : (
                <React.Fragment></React.Fragment>
              )}
            </React.Fragment>
          )}
        </Routes>
      </Suspense>
    </UserWrapper>
  );
};

export default App;
