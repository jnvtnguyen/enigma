import { combineReducers, Reducer } from 'redux';

import { RootState } from '@/types';
import signupReducer from './signup';
import loginReducer from './login';
import authReducer from './auth';
import projectReducer from './project';

const rootReducer: Reducer<RootState> = combineReducers<RootState>({
  signup: signupReducer,
  login: loginReducer,
  auth: authReducer,
  project: projectReducer
});

export default rootReducer;
