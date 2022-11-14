export interface INewUserEntry {
  username: string;
  email: string;
  password: string;
  fullName: string;
  passwordConfirm: string;
}

export type Role = 'user' | 'admin' | 'dev';

export interface IUser {
  role: Role;
  username: string;
  name: string;
  id: string;
}

export interface IAuthInitialState {
  user: IUser;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
}

export interface ILoginCredentials {
  password: string;
  email: string;
}

export interface IToken {
  username: string;
  id: string;
  iat: string;
  exp: string;
}

export interface ILoginResponse {
  accessToken: string;
  loggedUser: IUser;
}
