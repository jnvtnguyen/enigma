import { all } from 'redux-saga/effects';

import signupSaga from './signup';
import loginSaga from './login';
import authSaga from './auth';

function* rootSaga() {
  yield all([signupSaga(), loginSaga(), authSaga()]);
}

export default rootSaga;
