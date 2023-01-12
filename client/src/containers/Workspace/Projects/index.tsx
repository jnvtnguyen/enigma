import React, { useMemo, useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import qs from 'qs';

import { FetchProjectsFilters, FetchProjectsQuery, Project } from '@/types';
import history from '@/util/history';
import { parseQuery, toQueryParams } from './query';
import { getCurrentWorkspace } from '@/selectors/workspace';
import { httpRequest } from '@/util/http-request';
import WorkspaceLayout from '@/containers/Workspace/WorkspaceLayout';
import urls from '@/util/urls';
import ProjectsFilters from './Filters';
import ProjectTable from './ProjectTable';
import styles from './styles.module.scss';

//Projects Query Hook
interface UseProjectsQuery {
  setQuery: (query: FetchProjectsQuery) => void;
  query: FetchProjectsQuery;
}

export const useProjectsQuery = (): UseProjectsQuery => {
  const { search, pathname } = useLocation();

  const queryParams = useMemo(() => qs.parse(search, { ignoreQueryPrefix: true }), [search]);

  const query = useMemo(() => parseQuery(queryParams), [queryParams]);

  const setQuery = useCallback(
    (fetchProjectsQuery: FetchProjectsQuery) => {
      const newQueryString = qs.stringify(
        { ...queryParams, ...toQueryParams(fetchProjectsQuery) },
        { skipNulls: true }
      );
      history.push(`${pathname}?${newQueryString}`);
    },
    [history, pathname, queryParams]
  );
  return { setQuery, query };
};

const Projects: React.FC = () => {
  const { t } = useTranslation();

  const workspace = useSelector(getCurrentWorkspace);

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>(null);
  const [projects, setProjects] = useState<Project[]>([]);

  const { setQuery, query } = useProjectsQuery();

  const getProjects = async () => {
    setLoading(true);
    try {
      const response = await httpRequest<any>().get(
        urls.api.project.fetchProjects(workspace.key, toQueryParams(query))
      );

      const { projects } = response;

      setProjects(projects);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setError(error.error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getProjects();
  }, [query]);

  const handleFilterChange = (filters: FetchProjectsFilters) => {
    setQuery({
      filters
    });
  };

  return (
    <React.Fragment>
      <WorkspaceLayout header={t('Projects')} workspace={workspace} title={t('Projects')}>
        <div className={styles.content}>
          <ProjectsFilters filters={query.filters} onFilterChange={handleFilterChange} />
          <ProjectTable loading={loading} error={error} projects={projects} />
        </div>
      </WorkspaceLayout>
    </React.Fragment>
  );
};

export default Projects;
