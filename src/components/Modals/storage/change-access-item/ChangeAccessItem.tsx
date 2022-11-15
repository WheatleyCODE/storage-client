import React, { FC, useCallback, useState } from 'react';
import { Confirm, Select } from 'components';
import { useActions } from 'hooks';
import { changeAccessItems } from 'consts';
import { WorkplaceItem } from 'types';
import './ChangeAccessItem.scss';

export interface IChangeAccessItem {
  currentItems: WorkplaceItem[];
  onClose: () => void;
}

export const ChangeAccessItem: FC<IChangeAccessItem> = ({ currentItems, onClose }) => {
  const item = currentItems[0];
  const [activeIndex, setActiveIndex] = useState<number | null>(
    changeAccessItems.findIndex((itm) => itm.value === item.accessType)
  );
  const { changeAccessType } = useActions();

  const changeAccessTypeHandler = useCallback(() => {
    if (activeIndex === null || !item) return;
    const { value } = changeAccessItems[activeIndex];

    const { id, type } = item;

    changeAccessType({
      id,
      type,
      accessType: value,
      prevAccessType: item.accessType,
      isCanRestore: true,
    });
    onClose();
  }, [activeIndex, item, changeAccessType, onClose]);

  return (
    <Confirm upproveText="Изменить доступ" onClose={onClose} onUpprove={changeAccessTypeHandler}>
      <div className="change-access-item">
        <h1 className="change-access-item__title">Изменить доступ</h1>

        <Select
          activeIndex={activeIndex}
          setActiveIndex={setActiveIndex}
          items={changeAccessItems}
          placeholder="Тип доступа"
        />
      </div>
    </Confirm>
  );
};
