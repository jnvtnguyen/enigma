import React from 'react';
import { Route, Routes } from 'react-router-dom';
import loadable from '@loadable/component';

import Navigation from '@/components/Navigation';
import styles from './styles.module.scss';

const WorkspaceLoadable = loadable(() => import('@/containers/Workspace'));

const UserRoutes: React.FC = () => {
  return (
    <div className={styles.wrapper}>
      <Navigation />
      <Routes>
        <Route path="/:key" element={<WorkspaceLoadable />} />
      </Routes>
    </div>
  );
};

export default UserRoutes;
