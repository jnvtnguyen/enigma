import { all, takeLatest } from 'redux-saga/effects';

import { authenticate } from '@/slices/auth';
import { AuthenticateAction } from '@/types';

function* authenticateSaga({ payload }: AuthenticateAction): any {
  try {
    sessionStorage.setItem('user', JSON.stringify(payload));
  } catch (error) {
    console.error(error);
  }
}

export default function* rootAuthSaga() {
  yield all([takeLatest(authenticate.type, authenticateSaga)]);
}
