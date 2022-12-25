import React from 'react';

import PageMeta from '@/components/PageMeta';
import LandingCreateWorkspace from '@/components/Landing/CreateWorkspace';

const Landing: React.FC = () => {
  return (
    <React.Fragment>
      <PageMeta title={'Landing'} />

      <LandingCreateWorkspace />
    </React.Fragment>
  );
};

export default Landing;
