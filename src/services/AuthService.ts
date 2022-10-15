import { AxiosResponse } from 'axios';
import { IAuthData, IResetPasswordData, IChangePasswordData } from 'types';
import { $api } from '../http';

export class AuthService {
  static async login(email: string, password: string): Promise<AxiosResponse<IAuthData>> {
    return $api.post<IAuthData>('/api/auth/login', { email, password });
  }

  static async registration(
    name: string,
    email: string,
    password: string
  ): Promise<AxiosResponse<IAuthData>> {
    return $api.post<IAuthData>('/api/auth/registration', {
      name,
      email,
      password,
    });
  }

  static async logout(): Promise<void> {
    return $api.post('/api/auth/logout');
  }

  static async resetPassword(email: string): Promise<AxiosResponse<IResetPasswordData>> {
    return $api.post<IResetPasswordData>('/api/auth/reset/password', { email });
  }

  static async changePassword(
    password: string,
    link: string
  ): Promise<AxiosResponse<IChangePasswordData>> {
    return $api.post<IChangePasswordData>('/api/auth/change/password', {
      password,
      resetPasswordLink: link,
    });
  }
}
