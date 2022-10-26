import React, { FC, memo } from 'react';
import { HiChevronRight } from 'react-icons/hi';
import { PathItem } from './path-item/PathItem';
import { PathMore } from './path-more/PathMore';
import './StoragePath.scss';

export const StoragePath: FC = memo(() => {
  const folders = [
    {
      title: 'Новая папка',
    },
    {
      title: 'Лучшая папка',
    },
    {
      title: 'Старая папка',
    },
  ];

  const MemoIcon = memo(HiChevronRight);

  const getDefaultPath = () => {
    return folders.map(({ title }, i) => (
      <>
        <div className="storage-path__right">
          <MemoIcon />
        </div>
        <PathItem isLast={folders.length === i + 1} title={title} />
      </>
    ));
  };

  const getMorePath = () => {
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
  };

  const pathItems = folders.length >= 3 ? getMorePath() : getDefaultPath();

  return (
    <div className="storage-path">
      <div className="storage-path__my-drive">Хранилище</div>
      {pathItems}
    </div>
  );
});
