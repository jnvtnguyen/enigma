import { all, select, takeLatest, put, call } from 'redux-saga/effects';

import urls from '@/util/urls';
import { authorizationHeaders } from '@/util/headers';
import { fetchProjects, fetchProjectsError, fetchProjectsSuccess } from '@/slices/project';
import { FetchProjectsAction, FetchProjectsQuery } from '@/types';
import { toQueryParams } from '@/containers/Projects/query';
import { getAccessToken } from '@/selectors/auth';

const fetchProjectsRequest = async (query: FetchProjectsQuery, accessToken: string) => {
  const response = await fetch(urls.api.project.fetchProjects(toQueryParams(query)), {
    method: 'GET',
    headers: {
      ...authorizationHeaders(accessToken)
    }
  });

  const data = await response.json();

  return {
    response,
    data
  };
};

function* fetchProjectsSaga({ payload }: FetchProjectsAction): any {
  try {
    const accessToken = yield select(getAccessToken);

    const { response, data } = yield call(fetchProjectsRequest, payload.query, accessToken);

    if (response.ok) {
      yield put(fetchProjectsSuccess(data.projects));

      return;
    }

    yield put(fetchProjectsError(data.error));
  } catch (error) {
    console.error(error);
    yield put(fetchProjectsError('request_error'));
  }
}

export default function* rootAuthSaga() {
  yield all([takeLatest(fetchProjects.type, fetchProjectsSaga)]);
}
