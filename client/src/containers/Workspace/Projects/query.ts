import { FetchProjectsQuery } from '@/types';

export const parseQuery = (query: any): FetchProjectsQuery => {
  return {
    filters: {
      search: query.search || null
    }
  };
};

export const toQueryParams = (query: FetchProjectsQuery): { [param: string]: any } => {
  const { filters } = query;
  const { search } = filters;

  return {
    search: search || null
  };
};
