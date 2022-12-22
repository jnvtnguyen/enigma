import React from 'react';

import Spinner from '../Spinner';
import styles from './styles.module.scss';

const LoadingPage: React.FC = () => {
  return (
    <div className={styles.pageContainer}>
      <Spinner />
    </div>
  );
};

export default LoadingPage;
