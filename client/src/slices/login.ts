import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { LoginParams, LoginState } from '@/types';

export const initialState: LoginState = {
  loading: false,
  error: ''
};

const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    login: (state, { payload }: PayloadAction<LoginParams>) => {
      state.loading = true;
    },
    loginSuccess: (state) => {
      state.loading = false;
    },
    loginError: (state, { payload }: PayloadAction<string>) => {
      state.error = payload;
      state.loading = false;
    },
    clearError: (state) => {
      state.error = '';
    }
  }
});

export const { login, loginSuccess, loginError, clearError } = loginSlice.actions;

export default loginSlice.reducer;
