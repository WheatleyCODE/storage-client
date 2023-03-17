import { Image } from 'components/ui/image/Image';
import React, { FC, memo } from 'react';
import { useNavigate } from 'react-router';
import { IClientItemData } from 'types';
import { getColorClassName, getWorkplaceIcon, getWorkplaceUrl } from 'utils';
import './StorageLastItem.scss';

export interface IStorageLastItemProps {
  itemData: IClientItemData;
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
        <div className="storage-last-item__image">
          <Image itemData={itemData} />
        </div>
      </div>
      <div className="storage-last-item__name">{itemData.name}</div>
    </div>
  );
});
