import { useMemo } from 'react';
import { AccessTypes, ItemTypes, IServerItemData } from 'types';
import { isUndefined } from 'utils';
import { useTypedSelector } from './redux/useTypedSelector';

export interface IUseItemsParams {
  isTrash?: boolean;
  sortByDate?: boolean;
  isParent?: boolean;
  onlyTypes?: ItemTypes[];
  onlyAccess?: AccessTypes[];
}

// ? Add filters callback
export const useItems = (params: IUseItemsParams, isWorkplaceItem = false): IServerItemData[] => {
  const { isTrash, isParent, sortByDate, onlyTypes, onlyAccess } = params;
  const { allItems, workplaceItems } = useTypedSelector((state) => state.storage);

  const items = useMemo(() => {
    let current = isWorkplaceItem ? workplaceItems : allItems;

    // console.log(current);

    if (isTrash && !isUndefined(isTrash)) {
      current = current.filter((item) => item.isTrash);
    } else if (!isTrash && !isUndefined(isTrash)) {
      current = current.filter((item) => !item.isTrash);
    }

    // console.log(current);
    // console.log(isParent);
    // console.log(!isUndefined(isParent));

    if (isParent && !isUndefined(isParent)) {
      current = current.filter((item) => item.parent);
    } else if (!isParent && !isUndefined(isTrash)) {
      current = current.filter((item) => !item.parent);
    }

    // console.log(current, 'cur');

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
      current = [...current].sort((a, b) => b.openDate - a.openDate);
    }

    return current;
  }, [
    allItems,
    isParent,
    isTrash,
    isWorkplaceItem,
    onlyAccess,
    onlyTypes,
    sortByDate,
    workplaceItems,
  ]);

  return items;
};
