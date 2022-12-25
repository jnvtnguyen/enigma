import qs from 'qs';

const API_GLOBAL_PREFIX = '/api';

const stringifyQuery = (params: object): string => {
  return qs.stringify(params, {
    addQueryPrefix: true,
    skipNulls: true
  });
};

const urls = {
  api: {
    signup: `${API_GLOBAL_PREFIX}/user/signup`,
    login: `${API_GLOBAL_PREFIX}/user/login`,
    project: {
      fetchProjects: (queryParams: object) => {
        return `/api/projects${stringifyQuery(queryParams)}`;
      }
    }
  },
  login: '/login',
  signup: '/signup',
  landing: '/landing'
};

export default urls;
