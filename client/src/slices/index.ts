import { combineReducers, Reducer } from 'redux';

import { RootState } from '@/types';
import signupReducer from './signup';
import loginReducer from './login';
import authReducer from './auth';

const rootReducer: Reducer<RootState> = combineReducers<RootState>({
  signupState: signupReducer,
  loginState: loginReducer,
  authState: authReducer
});

export default rootReducer;
