import { all, select, takeLatest, put, call } from 'redux-saga/effects';

import urls from '@/util/urls';
import { fetchProjects, fetchProjectsError, fetchProjectsSuccess } from '@/slices/project';
import { FetchProjectsAction } from '@/types';
import { toQueryParams } from '@/containers/Workspace/Projects/query';
import { httpRequest } from '@/util/http-request';

function* fetchProjectsSaga({ payload }: FetchProjectsAction): any {
  try {
    const response = yield call(
      httpRequest().get,
      urls.api.project.fetchProjects(payload.workspaceKey, toQueryParams(payload.query))
    );

    yield put(fetchProjectsSuccess(response.projects));
  } catch (error) {
    console.error(error);
    yield put(fetchProjectsError(error.message));
  }
}

export default function* rootAuthSaga() {
  yield all([takeLatest(fetchProjects.type, fetchProjectsSaga)]);
}
