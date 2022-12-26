import { combineReducers, Reducer } from 'redux';

import { RootState } from '@/types';
import authReducer from './auth';
import projectReducer from './project';

const rootReducer: Reducer<RootState> = combineReducers<RootState>({
  auth: authReducer,
  project: projectReducer
});

export default rootReducer;
