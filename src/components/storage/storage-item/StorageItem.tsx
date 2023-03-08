import React, { FC, memo } from 'react';
import { IClientItemData } from 'types';
import { getWorkplaceIcon } from 'utils';
import './StorageItem.scss';

export interface StorageItemProps {
  itemData: IClientItemData;
  isSelect?: boolean;
  selectItem?: (item: IClientItemData) => void;
  deleteItem?: (item: IClientItemData) => void;
}

export const StorageItem: FC<StorageItemProps> = memo(
  ({ itemData, isSelect, selectItem, deleteItem }) => {
    const MemoIcon = memo(getWorkplaceIcon(itemData));

    const onClick = () => {
      if (isSelect && deleteItem) deleteItem(itemData);
      if (!isSelect && selectItem) selectItem(itemData);
    };

    return (
      <div onClick={onClick} aria-hidden className={`storage-item ${isSelect && 'selected'}`}>
        <div className="storage-item__icon">
          <MemoIcon />
        </div>
        <div className="storage-item__name">{itemData.name}</div>
      </div>
    );
  }
);
