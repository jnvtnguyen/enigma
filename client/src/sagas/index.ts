import { all } from 'redux-saga/effects';

import authSaga from './auth';
import workspaceSaga from './workspace';

function* rootSaga() {
  yield all([authSaga(), workspaceSaga()]);
}

export default rootSaga;
