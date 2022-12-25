import { createSelector, Selector } from 'reselect';

import { AuthState, RootState, User } from '@/types';

export const getAuthState = (state: RootState) => state.auth;

export const getCurrentUser: Selector<RootState, User | null | undefined> = createSelector(
  getAuthState,
  (state: AuthState) => state.user
);

export const getIsAuthenticated: Selector<RootState, boolean | null | undefined> = createSelector(
  getAuthState,
  (state: AuthState) => state.isAuthenticated
);

export const getAccessToken: Selector<RootState, string | null | undefined> = createSelector(
  getAuthState,
  (state: AuthState) => state.accessToken
);
