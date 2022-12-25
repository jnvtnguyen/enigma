import { RootState } from '@/types';

export const getSignupState = (state: RootState) => state.signup;
export const getLoginState = (state: RootState) => state.login;
export const getProjectState = (state: RootState) => state.project;
