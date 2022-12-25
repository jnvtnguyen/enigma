import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { AuthState, AuthenticationData } from '@/types';

//Hydrate Inital State with Local Storage
let authenticationData: AuthenticationData;
if (localStorage.getItem('user')) {
  authenticationData = JSON.parse(localStorage.getItem('user'));
} else {
  authenticationData = { user: undefined, accessToken: undefined };
}

const { user: initialUser, accessToken: initialAccessToken } = authenticationData;
const initialIsAuthenticated = initialAccessToken != undefined;

export const initialState: AuthState = {
  isAuthenticated: initialIsAuthenticated,
  accessToken: initialAccessToken,
  user: initialUser
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    authenticate: (state, { payload }: PayloadAction<AuthenticationData>) => {
      state.isAuthenticated = true;
      state.accessToken = payload.accessToken;
      state.user = payload.user;
    }
  }
});

export const { authenticate } = authSlice.actions;

export default authSlice.reducer;
