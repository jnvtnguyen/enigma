import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { WorkspaceState, Workspace } from '@/types';

export const initialState: WorkspaceState = {
  currentWorkspace: null,
  loading: false,
  error: ''
};

const workspaceSlice = createSlice({
  name: 'workspace',
  initialState,
  reducers: {
    fetchWorkspace: (state, { payload }: PayloadAction<string>) => {
      state.loading = true;
    },
    fetchWorkspaceSuccess: (state, { payload }: PayloadAction<Workspace>) => {
      state.currentWorkspace = payload;
      state.loading = false;
    },
    fetchWorkspaceError: (state, { payload }: PayloadAction<string>) => {
      state.error = payload;
      state.loading = false;
    }
  }
});

export const { fetchWorkspace, fetchWorkspaceSuccess, fetchWorkspaceError } =
  workspaceSlice.actions;

export default workspaceSlice.reducer;
