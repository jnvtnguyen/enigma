import { select, call, put, all, takeLatest } from 'redux-saga/effects';

import { authorizationHeaders } from '@/util/headers';
import { FetchWorkspaceAction } from '@/types';
import urls from '@/util/urls';
import { getAccessToken } from '@/selectors/auth';
import { fetchWorkspace, fetchWorkspaceError, fetchWorkspaceSuccess } from '@/slices/workspace';

const fetchWorkspaceRequest = async (key: string, accessToken: string) => {
  const response = await fetch(urls.api.workspace.index(key), {
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

function* fetchWorkspaceSaga({ payload }: FetchWorkspaceAction): any {
  try {
    const accessToken = yield select(getAccessToken);

    const { response, data } = yield call(fetchWorkspaceRequest, payload, accessToken);

    if (response.ok) {
      yield put(fetchWorkspaceSuccess(data.workspace));

      return;
    }

    yield put(fetchWorkspaceError(data.error));
  } catch (error) {
    console.error(error);
    yield put(fetchWorkspaceError('request_error'));
  }
}

export default function* rootWorkspaceSaga() {
  yield all([takeLatest(fetchWorkspace.type, fetchWorkspaceSaga)]);
}
