import { authenticate } from '@/slices/auth';
import { fetchProjectsSuccess } from '@/slices/project';
import { fetchWorkspace } from './slices/workspace';

//Signup
export interface SignupParams {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export enum SignupError {
  DUPLICATE_EMAIL = 'email.duplicate'
}

//Login
export interface LoginParams {
  email: string;
  password: string;
}

export enum LoginError {
  INCORRECT_EMAIL_PASSWORD = 'incorrect_email_password'
}

//Workspace
export interface Workspace {
  id?: string;
  name: string;
  key: string;
  createdDate: string;
  modifiedDate: string;
}

export enum CreateWorkspaceError {
  KEY_DUPLICATE = 'key.duplicate'
}

export enum FetchWorkspaceError {
  NOT_AUTHORIZED = 'unauthorized'
}

//Auth
export interface User {
  id?: string;
  email: string;
  firstName: string;
  lastName: string;
  defaultWorkspace: Workspace;
  finishedLanding: boolean;
  password?: string;
  createdDate: string;
  modifiedDate: string;
}

//Project
export interface Project {
  name: string;
  description: string;
  ownerId: string;
  createdDate?: string;
  modifiedDate?: string;
}

export interface FetchProjectsFilters {
  search?: string;
}

export interface FetchProjectsQuery {
  filters: FetchProjectsFilters;
}

export interface FetchProjectsParams {
  workspaceKey: string;
  query: FetchProjectsQuery;
}

export interface AuthenticationData {
  accessToken?: string;
}

//State
//Auth State
export interface AuthState {
  isAuthenticated: boolean;
  accessToken: string;
  user: User;
}

//Project State
export interface ProjectState {
  projects: Project[];
  loading: boolean;
  error: string;
}

//Workspace State
export interface WorkspaceState {
  workspace: Workspace;
  loading: boolean;
  error: string;
}

//Root
export interface RootState {
  auth: AuthState;
  workspace: WorkspaceState;
  project: ProjectState;
}

//Actions
//Auth
export interface AuthenticateAction {
  type: typeof authenticate.type;
  payload: AuthenticationData;
}

//Project
export interface FetchProjectsAction {
  type: typeof fetchProjectsSuccess.type;
  payload: FetchProjectsParams;
}

//Workspace
export interface FetchWorkspaceAction {
  type: typeof fetchWorkspace.type;
  payload: string;
}
