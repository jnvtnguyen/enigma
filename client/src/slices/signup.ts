import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { SignupParams, SignupState } from '@/types';

export const initialState: SignupState = {
  loading: false,
  error: ''
};

const signupSlice = createSlice({
  name: 'signup',
  initialState,
  reducers: {
    signup: (state, { payload }: PayloadAction<SignupParams>) => {
      state.loading = true;
    },
    signupSuccess: (state) => {
      state.loading = false;
    },
    signupError: (state, { payload }: PayloadAction<string>) => {
      state.error = payload;
      state.loading = false;
    },
    clearError: (state) => {
      state.error = '';
    }
  }
});

export const { signup, signupSuccess, signupError, clearError } = signupSlice.actions;

export default signupSlice.reducer;
