import { $api } from 'api';
import { AxiosResponse } from 'axios';
import {
  IAlbum,
  IChangeAlbumDataFilds,
  IChangeAlbumImageFilds,
  ICreateAlbumFilds,
  ISearchPublicAlbumFilds,
} from 'types';

export class AlbumService {
  static async createAlbum(filds: ICreateAlbumFilds): Promise<AxiosResponse<IAlbum>> {
    const formData = new FormData();
    Object.keys(filds).forEach((key) => formData.append(key, (filds as any)[key]));
    return $api.post<IAlbum>('/api/album/create', formData);
  }

  static async changeImage(filds: IChangeAlbumImageFilds): Promise<AxiosResponse<IAlbum>> {
    const formData = new FormData();
    Object.keys(filds).forEach((key) => formData.append(key, (filds as any)[key]));
    return $api.post<IAlbum>('/api/album/change/image', formData);
  }

  static async changeData(filds: IChangeAlbumDataFilds): Promise<AxiosResponse<IAlbum>> {
    const formData = new FormData();
    Object.keys(filds).forEach((key) => formData.append(key, (filds as any)[key]));
    return $api.post<IAlbum>('/api/album/change/data', formData);
  }

  static async getAllPublic(count: number, offset: number): Promise<AxiosResponse<IAlbum[]>> {
    return $api.get<IAlbum[]>(`/api/album/public?count=${count}&offset=${offset}`);
  }

  static async searchPublic(filds: ISearchPublicAlbumFilds): Promise<AxiosResponse<IAlbum[]>> {
    return $api.post<IAlbum[]>('/api/album/search', filds);
  }
}
