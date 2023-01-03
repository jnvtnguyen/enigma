import { FetchProjectsFilters } from '@/types';
import React from 'react';
import ProjectsSearchFilter from './SearchFilter';

import styles from './styles.module.scss';

type Props = {
  filters: FetchProjectsFilters;
  onFilterChange: (filters: FetchProjectsFilters) => void;
};

const ProjectsFilters: React.FC<Props> = ({ filters, onFilterChange }) => {
  const handleFilterChange = (filter: Partial<FetchProjectsFilters>): void => {
    onFilterChange({ ...filters, ...filter });
  };

  const { search } = filters;

  return (
    <div className={styles.filters}>
      <ProjectsSearchFilter search={search} onFilterChange={handleFilterChange} />
    </div>
  );
};

export default ProjectsFilters;
