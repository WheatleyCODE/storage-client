import React, { FC, useCallback, useEffect } from 'react';
import { useItems } from 'hooks';
import { PropertyFactory } from 'helpers';
import { IClientItemData, ItemTypes } from 'types';
import { ItemSelectorElement } from './item-selector-element/ItemSelectorElement';
import './ItemSelector.scss';

export interface ItemSelectorProps {
  height?: number;
  onlyTypes?: ItemTypes[];
  setSelectedItems: React.Dispatch<React.SetStateAction<IClientItemData[]>>;
  selectedItems: IClientItemData[];
}

export const ItemSelector: FC<ItemSelectorProps> = (props) => {
  const { height = 120, onlyTypes, setSelectedItems, selectedItems } = props;
  const items = useItems({ onlyTypes });
  const itemsData = items.map((item) => PropertyFactory.create(item));

  useEffect(() => {
    setSelectedItems(selectedItems);
  }, [selectedItems]);

  const selectItem = useCallback((item: IClientItemData) => {
    setSelectedItems((prev) => [...prev, item]);
  }, []);

  const deleteItem = useCallback((item: IClientItemData) => {
    setSelectedItems((prev) => prev.filter((itm) => itm.id !== item.id));
  }, []);

  const isSelect = (item: IClientItemData) => {
    return !!selectedItems.find((itm) => item.id === itm.id);
  };

  return (
    <div style={{ height: `${height}px` }} className="item-selector">
      {itemsData.map((item) => (
        <ItemSelectorElement
          key={item.id}
          isSelect={isSelect(item)}
          selectItem={selectItem}
          deleteItem={deleteItem}
          item={item}
        />
      ))}
    </div>
  );
};
