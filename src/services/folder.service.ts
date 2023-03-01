import { $api } from 'api';
import { AxiosResponse } from 'axios';
import { IChangeColorFilds, ICreateFolderFilds, IFolder } from 'types';

export class FolderService {
  static async createFolder(filds: ICreateFolderFilds): Promise<AxiosResponse<IFolder>> {
    return $api.post<IFolder>('/api/folder/create', filds);
  }

  static async changeColor(filds: IChangeColorFilds): Promise<AxiosResponse<IFolder[]>> {
    return $api.post<IFolder[]>('/api/folder/change/color', filds);
  }
}
