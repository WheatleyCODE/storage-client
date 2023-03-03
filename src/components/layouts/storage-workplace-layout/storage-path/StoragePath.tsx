import { PropertyFactory } from 'helpers';
import React, { FC, memo, useCallback } from 'react';
import { HiChevronRight } from 'react-icons/hi';
import { useNavigate } from 'react-router';
import { IFolder, PathRoutes } from 'types';
import { getColorClassName, getWorkplaceIcon, getWorkplaceUrl } from 'utils';
import { PathItem } from './path-item/PathItem';
import { PathMore } from './path-more/PathMore';
import './StoragePath.scss';

export interface StoragePathProps {
  parents: IFolder[];
}

export const StoragePath: FC<StoragePathProps> = memo(({ parents }) => {
  const navigate = useNavigate();
  const items = parents.map((parent) => {
    const itemData = PropertyFactory.create(parent);

    return {
      title: parent.name,
      Icon: getWorkplaceIcon(itemData),
      path: getWorkplaceUrl(itemData),
      iconColor: getColorClassName(itemData),
      folder: parent,
    };
  });

  const MemoIcon = memo(HiChevronRight);

  const navigateToMyDrive = useCallback(() => navigate(PathRoutes.STORAGE_MY_DRIVE), []);

  const getDefaultPath = useCallback(() => {
    return items.map(({ title, path, iconColor, folder }, i) => (
      <React.Fragment key={folder.id}>
        <div className="storage-path__right">
          <MemoIcon />
        </div>
        <PathItem
          folder={folder}
          iconColor={iconColor}
          path={path}
          isLast={items.length === i + 1}
          title={title}
        />
      </React.Fragment>
    ));
  }, [MemoIcon, items]);

  const getMorePath = useCallback(() => {
    const copyItems = [...items];
    copyItems.pop();

    const { folder, iconColor, path, title } = items[items.length - 1];

    return (
      <>
        <div className="storage-path__right">
          <MemoIcon />
        </div>
        <div className="storage-path__more">
          <PathMore items={copyItems} />
        </div>
        <div className="storage-path__right">
          <MemoIcon />
        </div>
        <PathItem folder={folder} iconColor={iconColor} path={path} isLast title={title} />
      </>
    );
  }, [MemoIcon, items]);

  const pathItems = items.length >= 3 ? getMorePath() : getDefaultPath();

  return (
    <div className="storage-path">
      <div aria-hidden onClick={navigateToMyDrive} className="storage-path__my-drive">
        Хранилище
      </div>
      {pathItems}
    </div>
  );
});
