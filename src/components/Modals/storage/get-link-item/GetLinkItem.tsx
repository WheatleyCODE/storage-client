import React, { FC, useCallback, useRef } from 'react';
import { Confirm } from 'components';
import { useActions, useTypedDispatch } from 'hooks';
import { getActionMessage } from 'helpers';
import { WorkplaceItem } from 'types';
import './GetLinkItem.scss';

export interface IGetLinkItem {
  currentItems: WorkplaceItem[];
  onClose: () => void;
}

export const GetLinkItem: FC<IGetLinkItem> = ({ currentItems, onClose }) => {
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
    <Confirm
      upproveText={isLink ? 'Копировать ссылку' : 'Получить ссылку'}
      onClose={onClose}
      onUpprove={isLink ? copyLink : getLink}
    >
      <div className="get-link-item">
        <h1 className="get-link-item__title">Получить ссылку</h1>

        <input
          readOnly
          onClick={isLink ? selectLink : undefined}
          value={item.accesLink || 'Ссылка не сгенерирована'}
          ref={ref}
          className={`get-link-item__input ${!isLink ? 'grey' : ''}`}
        />
      </div>
    </Confirm>
  );
};
