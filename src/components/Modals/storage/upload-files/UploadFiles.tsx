import React, { FC } from 'react';
import { Confirm } from 'components';
import './UploadFiles.scss';

export interface IUploadFilesProps {
  onClose: () => void;
}

export const UploadFiles: FC<IUploadFilesProps> = ({ onClose }) => {
  return (
    <Confirm upproveText="Загрузить" onClose={onClose} onUpprove={() => {}}>
      <div className="upload-files">
        <h1>upload-files</h1>
      </div>
    </Confirm>
  );
};
