import React, { FC, memo } from 'react';
import { MdCheck } from 'react-icons/md';
import './UploaderItem.scss';

export interface IUploaderItemProps {
  title: string;
  isUpload: boolean;
}

export const UploaderItem: FC<IUploaderItemProps> = memo(({ title, isUpload }) => {
  const MemoIcon = memo(MdCheck);
  return (
    <div className="uploader-item">
      {isUpload && <MemoIcon className="uploader-item__icon" />}
      <div>{title}</div>
    </div>
  );
});
