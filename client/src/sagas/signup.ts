import { call, all, put, takeLatest } from 'redux-saga/effects';

import { signup, signupSuccess, signupError } from '@/slices/signup';
import { SignupAction, SignupParams } from '@/types';
import urls from '@/util/urls';

const signupRequest = async (payload: SignupParams) => {
  const response = await fetch(urls.api.signup, {
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

function* signupSaga({ payload }: SignupAction) {
  try {
    const { response, data } = yield call(signupRequest, payload);

    if (response.ok) {
      yield put(signupSuccess());
      window.location.replace(urls.login);

      return;
    }

    yield put(signupError(data.error));
  } catch (error) {
    console.error(error);
    yield put(signupError('request_error'));
  }
}

export default function* rootSignupSaga() {
  yield all([takeLatest(signup.type, signupSaga)]);
}
