import { IItemProperties } from 'types';

export const getWorkplaceUrl = (item: IItemProperties): string => {
  return `/storage/${item.type.toLocaleLowerCase()}s/${item.id}`;
};
