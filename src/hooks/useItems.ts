import { useMemo } from 'react';
import { AccessTypes, ItemTypes, IServerItemData } from 'types';
import { useTypedSelector } from './redux/useTypedSelector';

export interface IUseItemsParams {
  isTrash?: boolean;
  sortByDate?: boolean;
  isParent?: boolean;
  onlyTypes?: ItemTypes[];
  onlyAccess?: AccessTypes[];
}

export const useItems = (params: IUseItemsParams): IServerItemData[] => {
  const { isTrash = false, isParent = false, sortByDate = false, onlyTypes, onlyAccess } = params;
  const { allItems } = useTypedSelector((state) => state.storage);

  const items = useMemo(() => {
    let current = allItems;

    if (isTrash) {
      current = current.filter((item) => item.isTrash);
    } else {
      current = current.filter((item) => !item.isTrash);
    }

    if (!isParent) {
      current = current.filter((item) => !item.parent);
    }

    if (onlyTypes) {
      current = current.filter((item) => {
        let isElem = false;

        onlyTypes.forEach((type) => {
          if (item.type === type) {
            isElem = true;
          }
        });

        return isElem;
      });
    }

    if (onlyAccess) {
      current = current.filter((item) => {
        let isElem = false;

        onlyAccess.forEach((type) => {
          if (item.accessType === type) {
            isElem = true;
          }
        });

        return isElem;
      });
    }

    if (sortByDate) {
      current = current.sort((a, b) => a.openDate - b.openDate);
    }

    return current.splice(0);
  }, [allItems, isParent, isTrash, onlyAccess, onlyTypes, sortByDate]);

  return items;
};
