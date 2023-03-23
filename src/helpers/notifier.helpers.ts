import { restoreActions } from 'store';
import { IRestoreAlertMessage } from 'types';

export const getActionMessage = ({ color, text, isRestore }: IRestoreAlertMessage) => {
  return restoreActions.addCurrentMessage({
    color,
    text,
    isRestore,
  });
};
