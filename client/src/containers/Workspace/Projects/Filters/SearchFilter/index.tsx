import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { debounce } from 'lodash';

import Search from '@/components/Search';
import styles from './styles.module.scss';

type Props = {
  search: string | null | undefined;
  onFilterChange: (filter: { search: string }) => void;
};

const DEBOUNCE_DELAY = 300;

const ProjectsSearchFilter: React.FC<Props> = ({ search, onFilterChange }) => {
  const { t } = useTranslation();

  const [currentSearch, setCurrentSearch] = useState<string>(search);

  const notifyFilterChanged = (search: string) => {
    onFilterChange({ search });
  };

  const debounceChange = debounce(notifyFilterChanged, DEBOUNCE_DELAY);

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    const value: string = e.currentTarget.value;

    setCurrentSearch(value);
    debounceChange(value);
  };

  return (
    <div className={styles.searchFilter}>
      <Search
        name="projectsSearch"
        placeholder={t('Search projects')}
        value={currentSearch}
        onChange={handleChange}
      />
    </div>
  );
};

export default ProjectsSearchFilter;
