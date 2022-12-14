import { notifierActions } from 'store';
import { INotifierCreateMessage, INotifierMessage } from 'types';
import { Emitter, EventNames } from './emitter.helpers';

const emitter = Emitter.getInstance();

export const emitOpenFiles = () => {
  emitter.emit(EventNames.OPEN_FILES, {} as INotifierMessage);
};

export const emitMessage = ({ color, text }: INotifierCreateMessage) => {
  emitter.emit(EventNames.ADD_MESSAGE, {
    color,
    id: Date.now(),
    text,
  });
};

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
