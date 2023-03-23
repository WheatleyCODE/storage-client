import { Middleware } from 'redux';
import { restoreActions } from 'store/restore/restore.slice';
import { copyObject, isTypeFulfilled, isTypePending, isTypeRejected } from 'utils';
import { restoreActionTypes } from 'consts';
import { IServerItemData, IStorageState } from 'types';
import { generateMessageByAction } from 'helpers';

const KEY = 'PREV_ITEMS';
const prevItems: { [KEY]: IServerItemData[] } = {
  [KEY]: [],
};

export const restoreMiddleware: Middleware = (api) => (next) => (action) => {
  if (restoreActionTypes[action.type]) {
    if (isTypePending(action.type)) {
      const storage = copyObject<IStorageState>(api.getState().storage);

      let itemsArr: { id: string; type: string }[] = [];

      // ! Fix types
      const { items, id, type } = action.meta.arg;

      console.log(action, 'action');

      if (items) {
        itemsArr = items;
      } else if (id && type) {
        itemsArr = [{ id, type }];
      }

      const itemsPrevState: IServerItemData[] = [];

      itemsArr.forEach((item) => {
        const findedItem = storage.allItems.find((storageItem) => item.id === storageItem.id);

        if (findedItem) itemsPrevState.push(findedItem);
      });

      prevItems[KEY] = itemsPrevState;
    }

    if (isTypeFulfilled(action.type)) {
      const items = prevItems[KEY];
      const text = generateMessageByAction(action, items);

      api.dispatch(
        restoreActions.addMessageAndPrevItem({
          message: { color: 'default', text, isRestore: true },
          items,
        })
      );
    }

    if (isTypeRejected(action.type)) {
      prevItems[KEY] = [];
    }
  }

  return next(action);
};
