import { all, put, takeLatest, call } from 'redux-saga/effects';

import { login, loginSuccess, loginError } from '@/slices/login';
import { authenticate } from '@/slices/auth';
import { LoginAction, LoginParams } from '@/types';
import urls from '@/util/urls';

const loginRequest = async (payload: LoginParams) => {
  const response = await fetch(urls.api.login, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  });

  const data = await response.json();

  return {
    response,
    data
  };
};

function* loginSaga({ payload }: LoginAction): any {
  try {
    const { response, data } = yield call(loginRequest, payload);

    if (response.ok) {
      yield put(loginSuccess());
      yield put(authenticate(data.data));

      window.location.replace(urls.project.listing);

      return;
    }

    yield put(loginError(data.error));
  } catch (error) {
    console.error(error);
    yield put(loginError('request_error'));
  }
}

export default function* rootLoginSaga() {
  yield all([takeLatest(login.type, loginSaga)]);
}
