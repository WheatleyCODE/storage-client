import { $api } from 'api';
import { AxiosResponse } from 'axios';
import { IUser } from 'types';

export class UserService {
  static async deleteUser(id: string): Promise<AxiosResponse<IUser>> {
    return $api.post<IUser>(`/api/user/delete/${id}`);
  }

  static async changeRole(filds: any): Promise<AxiosResponse<IUser>> {
    return $api.post<IUser>('/api/user/change/role', filds);
  }
}
