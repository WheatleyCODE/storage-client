import { IClientItemData } from 'types';

export const getWorkplaceUrl = (item: IClientItemData): string => {
  return `/storage/${item.type.toLocaleLowerCase()}s/${item.id}`;
};
