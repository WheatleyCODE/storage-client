import { notifierActions } from 'store';
import { INotifierCreateMessage } from 'types';

export const getActionMessage = ({
  color,
  text,
  restoreActionName,
  restoreParams,
}: INotifierCreateMessage) => {
  return notifierActions.notifierAddMessage({
    id: Date.now(),
    color,
    text,
    restoreActionName,
    restoreParams,
  });
};
