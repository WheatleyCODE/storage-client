import React, { FC, memo } from 'react';
import { IClientItemData } from 'types';
import { getWorkplaceIcon } from 'utils';
import './ItemSelectorElement.scss';

export interface ItemSelectorElementProps {
  item: IClientItemData;
  isSelect: boolean;
  selectItem: (item: IClientItemData) => void;
  deleteItem: (item: IClientItemData) => void;
}

export const ItemSelectorElement: FC<ItemSelectorElementProps> = memo(
  ({ item, isSelect, selectItem, deleteItem }) => {
    const MemoIcon = memo(getWorkplaceIcon(item));

    const callback = isSelect ? () => deleteItem(item) : () => selectItem(item);

    return (
      <div
        onClick={callback}
        aria-hidden
        className={`item-selector-element ${isSelect && 'selected'}`}
      >
        <div className="item-selector-element__icon">
          <MemoIcon />
        </div>
        <div className="item-selector-element__name">{item.name}</div>
      </div>
    );
  }
);
