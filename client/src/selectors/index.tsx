import { RootState } from '@/types';

export const getSignupState = (state: RootState) => state.signupState;
export const getLoginState = (state: RootState) => state.loginState;
export const getAuthState = (state: RootState) => state.authState;
