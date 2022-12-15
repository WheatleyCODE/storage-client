import React, { FC, useCallback, useState } from 'react';
import { Confirm, Select, Backdrop, Modal, Portal } from 'components';
import { useActions } from 'hooks';
import { changeAccessItems } from 'consts';
import { WorkplaceItem } from 'types';
import './ChangeAccessModal.scss';

export interface IChangeAccessModal {
  currentItems: WorkplaceItem[];
  onClose: () => void;
}

export const ChangeAccessModal: FC<IChangeAccessModal> = ({ currentItems, onClose }) => {
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
    <Portal>
      <Backdrop onClose={onClose}>
        <Modal onClose={onClose}>
          <Confirm
            upproveText="Изменить доступ"
            onClose={onClose}
            onUpprove={changeAccessTypeHandler}
          >
            <div className="change-access-modal">
              <h1 className="change-access-modal__title">Изменить доступ</h1>

              <Select
                activeIndex={activeIndex}
                setActiveIndex={setActiveIndex}
                items={changeAccessItems}
                placeholder="Тип доступа"
              />
            </div>
          </Confirm>
        </Modal>
      </Backdrop>
    </Portal>
  );
};
