import React, { Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import loadable from '@loadable/component';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import LoadingPage from '@/components/LoadingPage';
import { getCurrentUser, getIsAuthenticated } from '@/selectors/auth';
import UserWrapper from './UserWrapper';
import NotFound from '@/components/NotFound';

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

const UserRoutesLoadable = loadable(() => import('@/containers/UserRoutes'));

const App: React.FC = () => {
  const { finishedLanding } = useSelector(getCurrentUser) ?? {};
  const isAuthenticated = useSelector(getIsAuthenticated);

  return (
    <Suspense fallback={<LoadingPage />}>
      {!isAuthenticated ? (
        <Routes>
          <Route path="/signup" element={<SignupLoadable />} />
          <Route path="/login" element={<LoginLoadable />} />
          <Route path="*" element={<Navigate replace to="/login" />} />
        </Routes>
      ) : (
        <UserWrapper>
          <Routes>
            {!finishedLanding ? (
              <React.Fragment>
                <Route path="/landing" element={<LandingLoadable />} />
                <Route path="*" element={<Navigate replace to="/landing" />} />
              </React.Fragment>
            ) : (
              <React.Fragment>
                <Route path="*" element={<UserRoutesLoadable />} />
              </React.Fragment>
            )}
          </Routes>
        </UserWrapper>
      )}
      <Routes>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
};

export default App;
