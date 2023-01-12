import { select, call, put, all, takeLatest } from 'redux-saga/effects';

import { FetchWorkspaceAction } from '@/types';
import urls from '@/util/urls';
import { fetchWorkspace, fetchWorkspaceError, fetchWorkspaceSuccess } from '@/slices/workspace';
import { httpRequest } from '@/util/http-request';

function* fetchWorkspaceSaga({ payload }: FetchWorkspaceAction): any {
  try {
    const response = yield call(httpRequest().get, urls.api.workspace.index(payload));

    yield put(fetchWorkspaceSuccess(response.workspace));
  } catch (error) {
    console.error(error);
    yield put(fetchWorkspaceError(error.error));
  }
}

export default function* rootWorkspaceSaga() {
  yield all([takeLatest(fetchWorkspace.type, fetchWorkspaceSaga)]);
}
