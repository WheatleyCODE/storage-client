import React, { FC, useCallback, useRef } from 'react';
import { Confirm, Backdrop, Modal, Portal } from 'components';
import { useActions, useTypedDispatch } from 'hooks';
import { getActionMessage } from 'helpers';
import { IItemProperties } from 'types';
import './GetLinkModal.scss';

export interface IGetLinkModal {
  currentItemData: IItemProperties;
  onClose: () => void;
}

export const GetLinkModal: FC<IGetLinkModal> = ({ currentItemData, onClose }) => {
  const dispatch = useTypedDispatch();
  const { createAccessLink } = useActions();
  const ref = useRef<null | HTMLInputElement>(null);

  const getLink = useCallback(() => {
    if (!currentItemData) return;

    const { id, type } = currentItemData;
    createAccessLink({ id, type });
  }, [currentItemData]);

  const copyLink = useCallback(() => {
    if (!ref.current) return;
    ref.current.select();
    document.execCommand('copy');

    dispatch(
      getActionMessage({
        color: 'default',
        text: 'Ссылка скопирована',
      })
    );
  }, []);

  const selectLink = useCallback(() => {
    if (!ref.current) return;
    ref.current.select();
  }, []);

  const isLink = !!currentItemData.accessLink;

  return (
    <Portal>
      <Backdrop onClose={onClose}>
        <Modal onClose={onClose}>
          <Confirm
            upproveText={isLink ? 'Копировать ссылку' : 'Получить ссылку'}
            onClose={onClose}
            onUpprove={isLink ? copyLink : getLink}
          >
            <div className="get-link-modal">
              <h1 className="get-link-modal__title">Получить ссылку</h1>

              <input
                readOnly
                onClick={isLink ? selectLink : undefined}
                value={currentItemData.accessLink || 'Ссылка не сгенерирована'}
                ref={ref}
                className={`get-link-modal__input ${!isLink ? 'grey' : ''}`}
              />
            </div>
          </Confirm>
        </Modal>
      </Backdrop>
    </Portal>
  );
};
