import { $api } from 'api';
import { AxiosResponse } from 'axios';
import { IAlbum, ICreateAlbumFilds } from 'types';

export class AlbumService {
  static async createAlbum(filds: ICreateAlbumFilds): Promise<AxiosResponse<IAlbum>> {
    const formData = new FormData();
    Object.keys(filds).forEach((key) => formData.append(key, (filds as any)[key]));
    return $api.post<IAlbum>('/api/album/create', formData);
  }
}
