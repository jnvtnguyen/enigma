import React from 'react';

import PageMeta from '@/components/PageMeta';
import LandingCreateWorkspace from '@/components/Landing/CreateWorkspace';
import urls from '@/util/urls';
import { httpRequest } from '@/util/http-request';

const Landing: React.FC = () => {
  const handleLandingFinish = async (workspaceKey: string) => {
    await httpRequest().post(urls.api.landing.finish, {});
    window.location.replace(urls.workspace.index(workspaceKey));
  };

  return (
    <React.Fragment>
      <PageMeta title={'Landing'} />

      <LandingCreateWorkspace onFinish={handleLandingFinish} />
    </React.Fragment>
  );
};

export default Landing;
