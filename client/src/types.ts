import { signup } from '@/slices/signup';
import { login } from '@/slices/login';
import { authenticate } from '@/slices/auth';
import { fetchProjectsSuccess } from '@/slices/project';

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

//Auth
export interface User {
  id?: number;
  email: string;
  firstName: string;
  lastName: string;
  password?: string;
  createdDate?: string;
  modifiedDate?: string;
}

//Project
export interface Project {
  name: string;
  ownerId: number;
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
  query: FetchProjectsQuery;
}

export interface AuthenticationData {
  accessToken?: string;
  user?: User;
}

//State
//Signup
export interface SignupState {
  loading: boolean;
  error: string;
}

//Login
export interface LoginState {
  loading: boolean;
  error: string;
}

//Auth
export interface AuthState {
  isAuthenticated: boolean;
  accessToken: string;
  user: User;
}

//Projects State
export interface ProjectState {
  projects: Project[];
  loading: boolean;
  error: string;
}

//Root
export interface RootState {
  signupState: SignupState;
  loginState: LoginState;
  authState: AuthState;
  projectState: ProjectState;
}

//Actions
//Signup
export interface SignupAction {
  type: typeof signup.type;
  payload: SignupParams;
}

//Login
export interface LoginAction {
  type: typeof login.type;
  payload: LoginParams;
}

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
