import React, { FC, memo } from 'react';
import { Button } from 'components';
import { MdClose } from 'react-icons/md';
import { FcSafe } from 'react-icons/fc';
import { IClientItemData } from 'types';
import { getColorClassName, getWorkplaceIcon } from 'utils';
import { DriveInfo } from '../drive-info/DriveInfo';
import { ItemInfo } from '../item-info/ItemInfo';
import './StorageInfoMain.scss';

export interface IStorageInfoMainProps {
  itemData?: IClientItemData;
  onClose: () => void;
  openChangeAccessModal: () => void;
  userId: string;
}

export const StorageInfoMain: FC<IStorageInfoMainProps> = memo((props) => {
  const { itemData, onClose, openChangeAccessModal, userId } = props;

  const MemoWPIcon = itemData ? memo(getWorkplaceIcon(itemData)) : memo(FcSafe);

  return (
    <div className="storage-info-main">
      <div aria-hidden onClick={onClose} className="storage-info-main__close-button">
        <Button
          color="none-dark"
          radius="rounded"
          outline="fill"
          onClick={onClose}
          type="icon"
          Icon={MdClose}
        />
      </div>

      <div className="storage-info-main__head">
        <div className={`storage-info-main__icon ${itemData && getColorClassName(itemData)}`}>
          <MemoWPIcon />
        </div>
        {itemData && <div className="storage-info-main__name">{itemData.name}</div>}
        {!itemData && <div className="storage-info-main__name">Хранилище</div>}
      </div>

      {itemData && (
        <ItemInfo
          openChangeAccessModal={openChangeAccessModal}
          itemData={itemData}
          userId={userId}
        />
      )}
      {!itemData && <DriveInfo />}
    </div>
  );
});
