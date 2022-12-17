import React, { FC, memo, useCallback, useState } from 'react';
import { MdCheck } from 'react-icons/md';
import { emitMessage } from 'helpers';
import { formatSize } from 'utils';
import './FileUploader.scss';

export interface IFileUploaderProps {
  label: string;
  accept: string;
  acceptExt: string[];
  setFile: (file: File) => void;
  initFile?: File | null;
}

export interface IUploadFileInfo {
  name: string;
  size: number;
}

export const FileUploader: FC<IFileUploaderProps> = memo((props) => {
  const { label, accept, setFile, initFile, acceptExt } = props;

  const initFileInfo: IUploadFileInfo | null = initFile
    ? { name: initFile.name, size: initFile.size }
    : null;

  const [fileInfo, setFileInfo] = useState<IUploadFileInfo | null>(initFileInfo);
  const MemoIcon = memo(MdCheck);

  const htmlId = `id:${Math.random()}`;

  const onChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files) {
        const file = e.target.files[0];
        const { name, size } = file;

        const ext = file.name.split('.').pop() || '';

        if (!acceptExt.includes(ext)) {
          emitMessage({ color: 'red', text: `Для загрузки доступны только [${acceptExt}] файлы` });
          return;
        }

        setFileInfo({ name, size });
        setFile(file);
      }
    },
    [setFile, emitMessage]
  );

  return (
    <div className="file-uploader">
      <label className={`file-uploader__label ${fileInfo ? 'icon' : ''}`} htmlFor={htmlId}>
        {label}

        {fileInfo && (
          <div className="file-uploader__icon">
            <MemoIcon />
          </div>
        )}

        <input
          accept={accept}
          multiple={false}
          onChange={onChange}
          type="file"
          id={htmlId}
          className="file-uploader__textfild"
        />
      </label>

      {fileInfo && (
        <div className="file-uploader__file-info">
          <div className="file-uploader__name">{fileInfo.name}</div>
          <div className="file-uploader__size">{formatSize(fileInfo.size)}</div>
        </div>
      )}
    </div>
  );
});
