import React, { FC, useCallback, useState } from 'react';
import { Confirm, Select, Backdrop, Modal, Portal } from 'components';
import { useActions } from 'hooks';
import { changeAccessItems } from 'consts';
import { IClientItemData } from 'types';
import './ChangeAccessModal.scss';

export interface IChangeAccessModal {
  currentItemData: IClientItemData;
  onClose: () => void;
}

export const ChangeAccessModal: FC<IChangeAccessModal> = ({ currentItemData, onClose }) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(
    changeAccessItems.findIndex((itm) => itm.value === currentItemData.accessType)
  );
  const { changeAccessType } = useActions();

  const changeAccessTypeHandler = useCallback(() => {
    if (activeIndex === null || !currentItemData) return;
    const { value } = changeAccessItems[activeIndex];

    changeAccessType({
      accessType: value,
      items: [currentItemData],
    });
    onClose();
  }, [activeIndex, currentItemData, changeAccessType, onClose]);

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
