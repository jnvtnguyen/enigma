import React, { useMemo, useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import qs from 'qs';

import { getProjects, getProjectState } from '@/selectors/project';
import { fetchProjects } from '@/slices/project';
import { FetchProjectsQuery } from '@/types';
import history from '@/util/history';
import { parseQuery, toQueryParams } from './query';
import PageMeta from '@/components/PageMeta';
import { getCurrentWorkspace } from '@/selectors/workspace';
import BaseTable from '@/components/BaseTable';
import ProjectRow from './Project';
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
      history.push(`${pathname}${newQueryString}`);
    },
    [history, pathname, queryParams]
  );
  return { setQuery, query };
};

const Projects: React.FC = () => {
  const { t } = useTranslation();

  const { loading, error } = useSelector(getProjectState);
  const projects = useSelector(getProjects);
  const workspace = useSelector(getCurrentWorkspace);

  const dispatch = useDispatch();

  const _fetchProjects = (query: FetchProjectsQuery) =>
    dispatch(fetchProjects({ workspaceKey: workspace.key, query: query }));

  const { setQuery, query } = useProjectsQuery();

  useEffect(() => {
    _fetchProjects(query);
  }, []);

  return (
    <React.Fragment>
      <PageMeta title={`${workspace.name} / ${t('Projects')}`} />

      <div className={styles.content}>
        <BaseTable
          loading={loading}
          error={!!error}
          rows={projects}
          renderEmptyState={() => <tr></tr>}
        >
          {(project, index) => <ProjectRow key={project.id} project={project} />}
        </BaseTable>
      </div>
    </React.Fragment>
  );
};

export default Projects;
