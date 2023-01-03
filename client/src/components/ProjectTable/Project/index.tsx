import React from 'react';

import { Project } from '@/types';
import BaseTableCell from '@/components/BaseTable/Cell';
import styles from './styles.module.scss';

type Props = {
  project: Project;
};

const ProjectTableRow: React.FC<Props> = ({ project }) => {
  return (
    <tr className={styles.row}>
      <BaseTableCell>{project.name}</BaseTableCell>
      <BaseTableCell>{project.description}</BaseTableCell>
      <BaseTableCell>{project.modifiedDate}</BaseTableCell>
    </tr>
  );
};

export default ProjectTableRow;
