import React, { FC, memo } from 'react';
import { useNavigate } from 'react-router';
import { IItemProperties } from 'types';
import { getColorClassName, getWorkplaceIcon, getWorkplaceUrl } from 'utils';
import './StorageLastItem.scss';

export interface IStorageLastItemProps {
  itemData: IItemProperties;
  isActive: boolean;
  changeActive: (i: number) => void;
  index: number;
}

export const StorageLastItem: FC<IStorageLastItemProps> = memo((props) => {
  const { itemData, changeActive, index, isActive } = props;
  const navigate = useNavigate();
  const MemoIcon = memo(getWorkplaceIcon(itemData));

  const onClick = () => {
    changeActive(index);
  };

  const openWorkplaceItem = () => {
    navigate(getWorkplaceUrl(itemData));
  };

  return (
    <div
      aria-hidden
      onClick={onClick}
      onContextMenu={onClick}
      onDoubleClick={openWorkplaceItem}
      className={`storage-last-item ${isActive ? 'active' : ''}`}
    >
      <div className={`storage-last-item__icon ${getColorClassName(itemData)}`}>
        <MemoIcon />
      </div>
      <div className="storage-last-item__name">{itemData.name}</div>
    </div>
  );
});
