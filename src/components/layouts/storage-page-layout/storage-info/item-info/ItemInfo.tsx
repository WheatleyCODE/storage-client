import React, { FC, memo, useCallback } from 'react';
import {
  // calcAndFormatSize,
  getColorClassName,
  getImageLink,
  getWorkplaceIcon,
  transformAccess,
  transformDate,
} from 'utils';
import { storageWorkplaceAccessIcons } from 'consts';
import { WorkplaceItem } from 'types';
import './ItemInfo.scss';
import { useTypedDispatch } from 'hooks';
import { modalsActions } from 'store';
import { PropertyFactory } from 'helpers';

export interface IItemInfoProps {
  item: WorkplaceItem;
  userId: string;
  openChangeAccessModal: () => void;
}

export const ItemInfo: FC<IItemInfoProps> = memo(({ item, userId, openChangeAccessModal }) => {
  const dispatch = useTypedDispatch();
  const MemoAccessIcon = memo(storageWorkplaceAccessIcons[item?.accessType]);
  const MemoIcon = memo(getWorkplaceIcon(item));
  const imageLink = getImageLink(item);
  const ItemData = PropertyFactory.create(item);

  const openImage = useCallback(() => {
    dispatch(modalsActions.changeIsModal({ key: 'isImage', boolean: true }));
  }, []);

  return (
    <div className="item-info">
      {/* // !Fix */}
      <div className={`item-info__img ${getColorClassName(item)}`}>
        {imageLink ? (
          <div aria-hidden onClick={openImage} className="item-info__image">
            <img src={imageLink} alt="Картика" />
          </div>
        ) : (
          <MemoIcon />
        )}
      </div>

      <div className="item-info__access">
        <div className="item-info__title">Совместный доступ</div>
        <div className="item-info__access-block">
          <div className="item-info__access-icon">
            <MemoAccessIcon />
          </div>
          <div className="item-info__access-text">{transformAccess(ItemData.accessType)}</div>
        </div>
        <div aria-hidden onClick={openChangeAccessModal} className="item-info__link">
          Настроить доступ
        </div>
      </div>

      <div className="item-info__properties">
        <div className="item-info__title">Свойства</div>

        <div className="item-info__properties-row">
          <div className="item-info__properties-title">Владелец:</div>
          <div className="item-info__properties-text">
            {userId === ItemData.user ? 'Я' : 'Вы не владелец'}
          </div>
        </div>

        <div className="item-info__properties-row">
          <div className="item-info__properties-title">Открыто:</div>
          <div className="item-info__properties-text">{transformDate(ItemData.openDate)}</div>
        </div>

        <div className="item-info__properties-row">
          <div className="item-info__properties-title">Создано:</div>
          <div className="item-info__properties-text">{transformDate(ItemData.createDate)}</div>
        </div>

        <div className="item-info__properties-row">
          <div className="item-info__properties-title">Размер:</div>
          <div className="item-info__properties-text">{ItemData.getSize()}</div>
        </div>
      </div>
    </div>
  );
});
