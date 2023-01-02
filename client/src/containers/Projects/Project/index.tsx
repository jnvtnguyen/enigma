import React from 'react';

import { Project } from '@/types';
import styles from './styles.module.scss';

type Props = {
  project: Project;
};

const ProjectRow: React.FC<Props> = ({ project }) => {
  return <tr className={styles.container}></tr>;
};

export default ProjectRow;
