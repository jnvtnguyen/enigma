import { createSelector, Selector } from 'reselect';

import { RootState, Workspace, WorkspaceState } from '@/types';

export const getWorkspaceState = (state: RootState) => state.workspace;

export const getCurrentWorkspace: Selector<RootState, Workspace | null | undefined> =
  createSelector(getWorkspaceState, (state: WorkspaceState) => state.workspace);
