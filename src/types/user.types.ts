export interface INewUserEntry {
  username: string;
  email: string;
  password: string;
  fullName: string;
  passwordConfirm: string;
}

export type IRole = 'user' | 'admin' | 'dev';

export interface IUser {
  role: IRole;
  username: string;
  fullName?: string;
  id: string;
  email: string;
}

export interface IAuthInitialState {
  user: IUser | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  accessToken: string;
  persist: boolean;
}

export interface ILoginCredentials {
  password: string;
  email: string;
  rememberMe?: boolean;
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
  persist?: boolean;
}

export interface IUsersState {
  users: IUser[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
}
