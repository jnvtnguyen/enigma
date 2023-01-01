import { all } from 'redux-saga/effects';

import authSaga from './auth';
import projectSaga from './project';
import workspaceSaga from './workspace';

function* rootSaga() {
  yield all([authSaga(), projectSaga(), workspaceSaga()]);
}

export default rootSaga;
