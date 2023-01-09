import React from 'react';

import { Project } from '@/types';
import BaseTableCell from '@/components/BaseTable/Cell';
import BaseTableRow from '@/components/BaseTable/Row';
import styles from './styles.module.scss';

type Props = {
  project: Project;
};

const ProjectTableRow: React.FC<Props> = ({ project }) => {
  return (
    <BaseTableRow>
      <BaseTableCell>{project.name}</BaseTableCell>
      <BaseTableCell>{project.description}</BaseTableCell>
      <BaseTableCell>{project.modifiedDate}</BaseTableCell>
    </BaseTableRow>
  );
};

export default ProjectTableRow;
