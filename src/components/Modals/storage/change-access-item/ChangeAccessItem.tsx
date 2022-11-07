import React, { FC, useCallback, useState } from 'react';
import { Confirm, Select } from 'components';
import { useActions } from 'hooks';
import { storageWorkplaceAccessIcons } from 'consts';
import { transformAccess } from 'utils';
import { AccessTypes, WorkplaceItem } from 'types';
import './ChangeAccessItem.scss';

export interface IChangeAccessItem {
  currentItems: WorkplaceItem[];
  onClose: () => void;
}

const items = [
  {
    text: transformAccess(AccessTypes.PRIVATE),
    Icon: storageWorkplaceAccessIcons[AccessTypes.PRIVATE],
    value: AccessTypes.PRIVATE,
  },
  {
    text: transformAccess(AccessTypes.LINK),
    Icon: storageWorkplaceAccessIcons[AccessTypes.LINK],
    value: AccessTypes.LINK,
  },
  {
    text: transformAccess(AccessTypes.PUBLIC),
    Icon: storageWorkplaceAccessIcons[AccessTypes.PUBLIC],
    value: AccessTypes.PUBLIC,
  },
];

export const ChangeAccessItem: FC<IChangeAccessItem> = ({ currentItems, onClose }) => {
  const item = currentItems[0];
  const [activeIndex, setActiveIndex] = useState<number | null>(
    items.findIndex((itm) => itm.value === item.accessType)
  );
  const { changeAccessType } = useActions();

  const changeAccessTypeHandler = useCallback(() => {
    if (activeIndex === null || !item) return;
    const { value } = items[activeIndex];

    const { id, type } = item;

    changeAccessType({
      id,
      type,
      accessType: value,
      prevAccessType: item.accessType,
      isCanRestore: true,
    });
    onClose();
  }, [activeIndex, item, items]);

  return (
    <Confirm upproveText="Изменить доступ" onClose={onClose} onUpprove={changeAccessTypeHandler}>
      <div className="change-access-item">
        <h1 className="change-access-item__title">Изменить доступ</h1>

        <Select
          activeIndex={activeIndex}
          setActiveIndex={setActiveIndex}
          items={items}
          placeholder="Тип доступа"
        />
      </div>
    </Confirm>
  );
};
