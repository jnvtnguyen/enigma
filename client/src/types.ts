import { signup } from '@/slices/signup';
import { login } from '@/slices/login';
import { authenticate } from '@/slices/auth';

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

//Root
export interface RootState {
  signupState: SignupState;
  loginState: LoginState;
  authState: AuthState;
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
