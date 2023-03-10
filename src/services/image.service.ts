import { $api } from 'api';
import { AxiosResponse } from 'axios';
import { IImage } from 'types';
import { createFormData } from 'utils';

export class ImageService {
  static async create(filds: any): Promise<AxiosResponse<IImage>> {
    const formData = createFormData(filds);
    return $api.post<IImage>('/api/image/create', formData);
  }
}
