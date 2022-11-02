import React, { FC } from 'react';
import { Confirm } from 'components';
import './UploadFiles.scss';

export const UploadFiles: FC = () => {
  return (
    <Confirm upproveText="Загрузить" onClose={() => {}} onUpprove={() => {}}>
      <div className="upload-files">
        <h1>upload-files</h1>
      </div>
    </Confirm>
  );
};
