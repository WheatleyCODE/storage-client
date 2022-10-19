import { IUser } from './user.interfaces';

export interface ILoginFilds {
  email: string;
  password: string;
}

export interface IRegisterFilds extends ILoginFilds {
  name: string;
}

export interface IChangePassworrdFilds {
  password: string;
  link: string;
}

export interface IAuthData {
  accessToken: string;
  refreshToken: string;
  user: IUser;
}

export interface IResetPasswordData {
  message: string;
  email: string;
}

export interface IChangePasswordData {
  message: string;
}

export interface IAuthMessage {
  color: 'green' | 'yellow' | 'red';
  text: string;
}

export interface IAuthState extends IAuthData {
  isLoading: boolean;
  isAuth: boolean;
  message: null | IAuthMessage;
}
