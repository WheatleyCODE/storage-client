import { IAuthMessage, IAuthData } from 'types';

export interface IAuthState extends IAuthData {
  isLoading: boolean;
  isAuth: boolean;
  message: null | IAuthMessage;
}
