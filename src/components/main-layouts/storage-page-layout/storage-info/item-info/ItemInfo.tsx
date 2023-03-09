import React, { FC, memo, useCallback } from 'react';
import { storageWorkplaceAccessIcons } from 'consts';
import { IClientItemData } from 'types';
import { useTypedDispatch } from 'hooks';
import { modalsActions } from 'store';
import {
  getImageLink,
  getWorkplaceIcon,
  transformAccess,
  transformDate,
  getColorClassName,
  formatSize,
} from 'utils';
import './ItemInfo.scss';

export interface IItemInfoProps {
  itemData: IClientItemData;
  userId: string;
  openChangeAccessModal: () => void;
}

export const ItemInfo: FC<IItemInfoProps> = memo(({ itemData, userId, openChangeAccessModal }) => {
  const dispatch = useTypedDispatch();
  const MemoAccessIcon = memo(storageWorkplaceAccessIcons[itemData.accessType]);
  const MemoIcon = memo(getWorkplaceIcon(itemData));
  const imageLink = getImageLink(itemData);

  const openImage = useCallback(() => {
    dispatch(modalsActions.changeIsModal({ key: 'isImage', boolean: true }));
  }, []);

  return (
    <div className="item-info">
      <div className={`item-info__img ${getColorClassName(itemData)}`}>
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
          <div className="item-info__access-text">{transformAccess(itemData.accessType)}</div>
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
            {userId === itemData.user ? 'Я' : 'Вы не владелец'}
          </div>
        </div>

        <div className="item-info__properties-row">
          <div className="item-info__properties-title">Открыто:</div>
          <div className="item-info__properties-text">{transformDate(itemData.openDate)}</div>
        </div>

        <div className="item-info__properties-row">
          <div className="item-info__properties-title">Создано:</div>
          <div className="item-info__properties-text">{transformDate(itemData.createDate)}</div>
        </div>

        <div className="item-info__properties-row">
          <div className="item-info__properties-title">Размер:</div>
          <div className="item-info__properties-text">{formatSize(itemData.getSize())}</div>
        </div>
      </div>
    </div>
  );
});
