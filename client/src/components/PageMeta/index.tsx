import React from 'react';
import { Helmet } from 'react-helmet';

interface Props {
  title?: string;
}

const BASE_TITLE = 'Enigma';

const PageMeta: React.FC<Props> = ({ title }) => {
  return <Helmet title={`${title} | ${BASE_TITLE}`} />;
};

export default PageMeta;
