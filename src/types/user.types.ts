export interface INewUserEntry {
  username: string;
  email: string;
  password: string;
  fullName: string;
  passwordConfirm: string;
}

export type Role = 'user' | 'admin' | 'dev';

export interface IUser
  extends Omit<INewUserEntry, 'password' | 'passwordConfirm'> {
  role: Role;
  refreshToken: string;
}

export interface IAuthInitialState {
  user: IUser;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
}

export interface ILoginCredentials {
  password: string;
  email: string;
}
