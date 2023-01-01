import { combineReducers, Reducer } from 'redux';

import { RootState } from '@/types';
import authReducer from './auth';
import projectReducer from './project';
import workspaceReducer from './workspace';

const rootReducer: Reducer<RootState> = combineReducers<RootState>({
  auth: authReducer,
  project: projectReducer,
  workspace: workspaceReducer
});

export default rootReducer;
