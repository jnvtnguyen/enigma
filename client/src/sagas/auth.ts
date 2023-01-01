import { all, takeLatest, call, select } from 'redux-saga/effects';

import { authenticate, logout } from '@/slices/auth';
import { AuthenticateAction } from '@/types';
import urls from '@/util/urls';
import { authorizationHeaders } from '@/util/headers';
import { getAccessToken } from '@/selectors/auth';

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

function* authenticateSaga({ payload }: AuthenticateAction): any {
  try {
    localStorage.setItem('user', JSON.stringify(payload));
  } catch (error) {
    console.error(error);
  }
}

function* logoutSaga(): any {
  try {
    const accessToken = yield select(getAccessToken);

    const { response, data } = yield call(logoutRequest, accessToken);

    if (response.ok || response.status === 401) {
      localStorage.removeItem('user');
      window.location.replace(urls.login);
      return;
    }

    console.error(data.error);
  } catch (error) {
    console.error(error);
  }
}

export default function* rootAuthSaga() {
  yield all([takeLatest(authenticate.type, authenticateSaga), takeLatest(logout.type, logoutSaga)]);
}
