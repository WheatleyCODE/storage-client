import { $api } from 'api';
import { IUploadFilesFilds, WorkplaceItem } from 'types';
import { ThunkDispatch } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';
import { uploaderActions } from 'store';

export class UploadService {
  static async uploadFiles(
    filds: IUploadFilesFilds,
    dispatch: ThunkDispatch<any, any, any>
  ): Promise<AxiosResponse<WorkplaceItem[]>> {
    const formData: any = new FormData();
    filds.files.forEach((file) => formData.append('files', file));

    if (filds.parent) {
      formData.append('parent', filds.parent);
    }

    return $api.post<WorkplaceItem[]>('/api/uploader/files', formData, {
      onUploadProgress: (progressEvent) => {
        const progress = progressEvent?.progress?.toFixed(2) || 0;
        dispatch(uploaderActions.setProgress(Math.floor(+progress * 100)));
      },
    });
  }
}
