import React, { FC, memo, useCallback } from 'react';
import { MdFolder } from 'react-icons/md';
import { IFolder } from 'types';
import './ChangeParentFolder.scss';

export interface IChangeParentFolder {
  folder: IFolder;
  isActive: boolean;
  setActiveHandler: (i: number) => void;
  index: number;
}

export const ChangeParentFolder: FC<IChangeParentFolder> = memo((props) => {
  const { folder, isActive, setActiveHandler, index } = props;
  const { name, color } = folder;

  const MemoIcon = memo(MdFolder);

  const onClick = useCallback(() => {
    setActiveHandler(index);
  }, [index, setActiveHandler]);

  return (
    <div
      aria-hidden
      onClick={onClick}
      className={`change-parent-folder ${isActive ? 'active' : ''}`}
    >
      <div className={`change-parent-folder__icon ${color.toLocaleLowerCase()}`}>
        <MemoIcon />
      </div>
      <div className="change-parent-folder__name">{name}</div>
    </div>
  );
});
