import React, { FC, memo, useCallback, useMemo } from 'react';
import { FcFolder } from 'react-icons/fc';
import { HiChevronRight } from 'react-icons/hi';
import { IFolder } from 'types';
import { PathItem } from './path-item/PathItem';
import { PathMore } from './path-more/PathMore';
import './StoragePath.scss';

export interface StoragePathProps {
  parents: IFolder[];
}

export const StoragePath: FC<StoragePathProps> = memo(({ parents }) => {
  const folders = parents.map((parent) => ({ title: parent.name, Icon: FcFolder }));

  const MemoIcon = memo(HiChevronRight);

  const getDefaultPath = useCallback(() => {
    return folders.map(({ title }, i) => (
      <>
        <div className="storage-path__right">
          <MemoIcon />
        </div>
        <PathItem isLast={folders.length === i + 1} title={title} />
      </>
    ));
  }, [MemoIcon, folders]);

  const getMorePath = useCallback(() => {
    const copyFolders = [...folders];
    copyFolders.pop();

    return (
      <>
        <div className="storage-path__right">
          <MemoIcon />
        </div>
        <div className="storage-path__more">
          <PathMore folders={copyFolders} />
        </div>
        <div className="storage-path__right">
          <MemoIcon />
        </div>
        <PathItem isLast title={folders[folders.length - 1].title} />
      </>
    );
  }, [MemoIcon, folders]);

  const pathItems = folders.length >= 3 ? getMorePath() : getDefaultPath();

  return (
    <div className="storage-path">
      <div className="storage-path__my-drive">Хранилище</div>
      {pathItems}
    </div>
  );
});
