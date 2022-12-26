import React from 'react';
import { useSelector } from 'react-redux';

import PageMeta from '@/components/PageMeta';
import LandingCreateWorkspace from '@/components/Landing/CreateWorkspace';
import urls from '@/util/urls';
import { getAccessToken } from '@/selectors/auth';
import { authorizationHeaders } from '@/util/headers';

const Landing: React.FC = () => {
  const accessToken = useSelector(getAccessToken);

  const handleLandingFinish = async (workspaceKey: string) => {
    await fetch(urls.api.landing.finish, {
      method: 'POST',
      headers: {
        ...authorizationHeaders(accessToken)
      }
    });
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
