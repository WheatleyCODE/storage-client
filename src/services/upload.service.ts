import { $api } from 'api';
import { IUploadFilesFilds, IServerItemData } from 'types';
import { ThunkDispatch } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';
import { uploaderActions } from 'store';
import { createFormData } from 'utils';

export class UploadService {
  static async uploadFiles(
    filds: IUploadFilesFilds,
    dispatch: ThunkDispatch<any, any, any>
  ): Promise<AxiosResponse<IServerItemData[]>> {
    const formData = createFormData(filds);

    if (filds.parent) {
      formData.append('parent', filds.parent);
    }

    return $api.post<IServerItemData[]>('/api/uploader/files', formData, {
      onUploadProgress: (progressEvent) => {
        const progress = progressEvent?.progress?.toFixed(2) || 0;
        dispatch(uploaderActions.setProgress(Math.floor(+progress * 100)));
      },
    });
  }
}
