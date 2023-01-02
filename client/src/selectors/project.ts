import { createSelector, Selector } from 'reselect';

import { Project, ProjectState, RootState } from '@/types';

export const getProjectState = (state: RootState) => state.project;

export const getProjects: Selector<RootState, Project[] | null | undefined> = createSelector(
  getProjectState,
  (state: ProjectState) => state.projects
);
