import React, { FC, useCallback, useRef } from 'react';
import { Confirm, Backdrop, Modal, Portal } from 'components';
import { useActions, useTypedDispatch } from 'hooks';
import { getActionMessage } from 'helpers';
import { WorkplaceItem } from 'types';
import './GetLinkModal.scss';

export interface IGetLinkModal {
  currentItems: WorkplaceItem[];
  onClose: () => void;
}

export const GetLinkModal: FC<IGetLinkModal> = ({ currentItems, onClose }) => {
  const item = currentItems[0];
  const dispatch = useTypedDispatch();
  const { createAccessLink } = useActions();
  const ref = useRef<null | HTMLInputElement>(null);

  const getLink = useCallback(() => {
    if (!item) return;

    const { id, type } = item;
    createAccessLink({ id, type });
  }, [item]);

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

  const isLink = !!item.accesLink;

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
                value={item.accesLink || 'Ссылка не сгенерирована'}
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
