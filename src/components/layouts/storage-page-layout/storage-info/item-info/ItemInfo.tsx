import React, { FC, memo } from 'react';
import { calcAndFormatSize, getColorClassName, transformAccess, transformDate } from 'utils';
import { storageWorkplaceAccessIcons, storageWorkplaceIcons } from 'consts';
import { WorkplaceItem } from 'types';
import './ItemInfo.scss';

export interface IItemInfoProps {
  item: WorkplaceItem;
  userId: string;
}

export const ItemInfo: FC<IItemInfoProps> = memo(({ item, userId }) => {
  const MemoAccessIcon = memo(storageWorkplaceAccessIcons[item?.accessType]);
  const MemoIcon = memo(storageWorkplaceIcons[item.type]);

  return (
    <div className="item-info">
      <div className={`item-info__img ${getColorClassName(item)}`}>
        <MemoIcon />
      </div>

      <div className="item-info__access">
        <div className="item-info__title">Совместный доступ</div>
        <div className="item-info__access-block">
          <div className="item-info__access-icon">
            <MemoAccessIcon />
          </div>
          <div className="item-info__access-text">{transformAccess(item.accessType)}</div>
        </div>
        <div className="item-info__link">Настроить доступ</div>
      </div>

      <div className="item-info__properties">
        <div className="item-info__title">Свойства</div>

        <div className="item-info__properties-row">
          <div className="item-info__properties-title">Владелец:</div>
          <div className="item-info__properties-text">
            {userId === item.user ? 'Я' : 'Вы не владелец'}
          </div>
        </div>

        <div className="item-info__properties-row">
          <div className="item-info__properties-title">Открыто:</div>
          <div className="item-info__properties-text">{transformDate(item.openDate)}</div>
        </div>

        <div className="item-info__properties-row">
          <div className="item-info__properties-title">Создано:</div>
          <div className="item-info__properties-text">{transformDate(item.creationDate)}</div>
        </div>

        <div className="item-info__properties-row">
          <div className="item-info__properties-title">Размер:</div>
          <div className="item-info__properties-text">{calcAndFormatSize(item, true)}</div>
        </div>
      </div>
    </div>
  );
});
