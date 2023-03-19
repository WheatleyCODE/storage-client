import { EventNames, INotifierCreateMessage } from 'types';
import { Emitter } from './emitter';

const emitter = Emitter.getInstance();

export const emitOpenFiles = () => {
  emitter.emit({ type: EventNames.OPEN_FILES });
};

export const emitFocusMain = () => {
  emitter.emit({ type: EventNames.FOCUS_MAIN });
};

export const emitMessage = ({ color, text }: INotifierCreateMessage) => {
  emitter.emit({
    type: EventNames.ADD_MESSAGE,
    data: {
      color,
      id: Date.now(),
      text,
    },
  });
};
