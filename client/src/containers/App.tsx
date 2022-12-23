import React, { Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import loadable from '@loadable/component';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import LoadingPage from '@/components/LoadingPage';
import { getAuthState } from '@/selectors';

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

const ProjectsLoadable = loadable(() => import('@/containers/Projects'));

const App: React.FC = () => {
  const { isAuthenticated } = useSelector(getAuthState);

  return (
    <React.Fragment>
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
              <Route path="/projects" element={<ProjectsLoadable />} />
            </React.Fragment>
          )}
        </Routes>
      </Suspense>
    </React.Fragment>
  );
};

export default App;
