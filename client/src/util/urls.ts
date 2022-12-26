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
    },
    workspace: {
      create: '/api/workspaces/create',
      setDefault: '/api/user/workspace/set-default'
    },
    user: {
      index: '/api/user'
    },
    landing: {
      finish: '/api/user/landing/finish'
    }
  },
  login: '/login',
  signup: '/signup',
  landing: '/landing',
  workspace: {
    index: (key: string) => {
      return `/${key}`;
    }
  }
};

export default urls;
