import { IChangeIsTrashFilds } from 'types';

export const createChangeIsTrashMessage = (filds: IChangeIsTrashFilds): string => {
  const { items, isTrash } = filds;

  if (items.length === 1 && isTrash) {
    return `${items[0].type} в корзину`;
  }

  if (items.length === 1 && !isTrash) {
    return `${items[0].type} из корзины`;
  }

  if (isTrash) {
    return `(${items.length}) объектов перемещено в корзину`;
  }

  return `(${items.length}) объектов востановлено`;
};
