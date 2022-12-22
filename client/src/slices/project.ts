import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { FetchProjectsParams, Project, ProjectState } from '@/types';

export const initialState: ProjectState = {
  projects: [],
  loading: false,
  error: ''
};

const projectSlice = createSlice({
  name: 'project',
  initialState,
  reducers: {
    fetchProjects: (state, { payload }: PayloadAction<FetchProjectsParams>) => {
      state.loading = true;
    },
    fetchProjectsSuccess: (state, { payload }: PayloadAction<Project[]>) => {
      state.loading = false;
      state.projects = payload;
    },
    fetchProjectsError: (state, { payload }: PayloadAction<string>) => {
      state.error = payload;
      state.loading = false;
    }
  }
});

export const { fetchProjects, fetchProjectsSuccess, fetchProjectsError } = projectSlice.actions;

export default projectSlice.reducer;
