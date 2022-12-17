import React, { FC, memo } from 'react';
import { Button } from 'components';
import { MdClose } from 'react-icons/md';
import { FcSafe } from 'react-icons/fc';
import { WorkplaceItem } from 'types';
import { getColorClassName, getWorkplaceIcon } from 'utils';
import { DriveInfo } from '../drive-info/DriveInfo';
import { ItemInfo } from '../item-info/ItemInfo';
import './StorageInfoMain.scss';

export interface IStorageInfoMainProps {
  item?: WorkplaceItem;
  onClose: () => void;
  openChangeAccessModal: () => void;
  userId: string;
}

export const StorageInfoMain: FC<IStorageInfoMainProps> = memo((props) => {
  const { item, onClose, openChangeAccessModal, userId } = props;

  const MemoWPIcon = item ? memo(getWorkplaceIcon(item)) : memo(FcSafe);

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
        <div className={`storage-info-main__icon ${item && getColorClassName(item)}`}>
          <MemoWPIcon />
        </div>
        {item && <div className="storage-info-main__name">{item.name}</div>}
        {!item && <div className="storage-info-main__name">Хранилище</div>}
      </div>

      {item && (
        <ItemInfo openChangeAccessModal={openChangeAccessModal} item={item} userId={userId} />
      )}
      {!item && <DriveInfo />}
    </div>
  );
});
