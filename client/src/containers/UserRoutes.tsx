import React from 'react';
import { Route, Routes } from 'react-router-dom';
import loadable from '@loadable/component';

import Navigation from '@/components/Navigation';

const WorkspaceLoadable = loadable(() => import('@/containers/Workspace'));

const UserRoutes: React.FC = () => {
  return (
    <React.Fragment>
      <Navigation />
      <Routes>
        <Route path="/:key" element={<WorkspaceLoadable />} />
      </Routes>
    </React.Fragment>
  );
};

export default UserRoutes;
