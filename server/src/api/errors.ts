export enum SignupError {
  EMAIL_DUPLICATE = 'email.duplicate'
}

export enum LoginError {
  INCORRECT_EMAIL_PASSWORD = 'incorrect_email_password'
}

export enum CommonError {
  UNAUTHORIZED = 'unauthorized',
  UNKNOWN = 'unknown'
}

export enum CreateProjectError {
  NAME_DUPLICATE = 'name.duplicate',
  KEY_DUPLICATE = 'key.duplicate'
}

export enum CreateWorkspaceError {
  KEY_DUPLICATE = 'key.duplicate'
}
