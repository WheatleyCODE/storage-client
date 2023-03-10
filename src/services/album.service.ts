import { $api } from 'api';
import { AxiosResponse } from 'axios';
import {
  IAlbum,
  IChangeAlbumDataFilds,
  IChangeAlbumImageFilds,
  IChangeAlbumTracksFilds,
  ICreateAlbumFilds,
  ISearchPublicAlbumFilds,
} from 'types';
import { createFormData } from 'utils';

export class AlbumService {
  static async createAlbum(filds: ICreateAlbumFilds): Promise<AxiosResponse<IAlbum>> {
    const formData = createFormData(filds);
    return $api.post<IAlbum>('/api/album/create', formData);
  }

  static async changeImage(filds: IChangeAlbumImageFilds): Promise<AxiosResponse<IAlbum>> {
    const formData = createFormData(filds);
    return $api.post<IAlbum>('/api/album/change/image', formData);
  }

  static async changeData(filds: IChangeAlbumDataFilds): Promise<AxiosResponse<IAlbum>> {
    return $api.post<IAlbum>('/api/album/change/data', filds);
  }

  static async changeTracks(filds: IChangeAlbumTracksFilds): Promise<AxiosResponse<IAlbum>> {
    return $api.post<IAlbum>('/api/album/change/tracks', filds);
  }

  static async getAllPublic(count: number, offset: number): Promise<AxiosResponse<IAlbum[]>> {
    return $api.get<IAlbum[]>(`/api/album/public?count=${count}&offset=${offset}`);
  }

  static async searchPublic(filds: ISearchPublicAlbumFilds): Promise<AxiosResponse<IAlbum[]>> {
    return $api.post<IAlbum[]>('/api/album/search', filds);
  }
}
