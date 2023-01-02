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
      fetchProjects: (workspaceKey: string, queryParams: object) => {
        return `/api/workspaces/${workspaceKey}/projects${stringifyQuery(queryParams)}`;
      }
    },
    workspace: {
      index: (key: string) => {
        return `/api/workspaces/${key}`;
      },
      create: '/api/workspaces/create',
      setDefault: '/api/user/workspace/set-default'
    },
    user: {
      index: '/api/user',
      logout: '/api/user/logout'
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
