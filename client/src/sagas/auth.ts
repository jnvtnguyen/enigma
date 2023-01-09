import { all, takeLatest, call, select } from 'redux-saga/effects';

import { authenticate, logout } from '@/slices/auth';
import { AuthenticateAction } from '@/types';
import urls from '@/util/urls';
import { httpRequest } from '@/util/http-request';

/*
const logoutRequest = async (accessToken: string) => {
  const response = await fetch(urls.api.user.logout, {
    method: 'POST',
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
*/

function* authenticateSaga({ payload }: AuthenticateAction): any {
  try {
    localStorage.setItem('user', JSON.stringify(payload));
  } catch (error) {
    console.error(error);
  }
}

function* logoutSaga(): any {
  try {
    yield call(httpRequest().post, urls.api.user.logout, true);

    localStorage.removeItem('user');
    window.location.replace(urls.login);
    return;
  } catch (error) {
    localStorage.removeItem('user');
    window.location.replace(urls.login);
    return;
  }
}

export default function* rootAuthSaga() {
  yield all([takeLatest(authenticate.type, authenticateSaga), takeLatest(logout.type, logoutSaga)]);
}
