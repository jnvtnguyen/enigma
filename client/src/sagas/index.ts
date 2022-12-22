import { all } from 'redux-saga/effects';

import signupSaga from './signup';
import loginSaga from './login';
import authSaga from './auth';
import projectSaga from './project';

function* rootSaga() {
  yield all([signupSaga(), loginSaga(), authSaga(), projectSaga()]);
}

export default rootSaga;
