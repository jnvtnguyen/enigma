import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { AuthState, AuthenticationData, User } from '@/types';

//Hydrate Inital State with Local Storage
let authenticationData: AuthenticationData;
if (localStorage.getItem('user')) {
  authenticationData = JSON.parse(localStorage.getItem('user'));
} else {
  authenticationData = { accessToken: undefined };
}

const { accessToken: initialAccessToken } = authenticationData;
const initialIsAuthenticated = initialAccessToken != undefined;

export const initialState: AuthState = {
  isAuthenticated: initialIsAuthenticated,
  accessToken: initialAccessToken,
  user: null
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    authenticate: (state, { payload }: PayloadAction<AuthenticationData>) => {
      state.isAuthenticated = true;
      state.accessToken = payload.accessToken;
    },
    setUser: (state, { payload }: PayloadAction<User>) => {
      state.user = payload;
    },
    logout: (state) => {}
  }
});

export const { authenticate, setUser, logout } = authSlice.actions;

export default authSlice.reducer;
