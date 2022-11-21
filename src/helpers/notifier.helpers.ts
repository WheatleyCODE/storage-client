import { notifierActions } from 'store';
import { INotifierCreateMessage, INotifierMessage } from 'types';

export enum EventNames {
  ADD_MESSAGE = 'ADD_MESSAGE',
  OPEN_FILES = 'OPEN_FILES',
}

class Emitter {
  private subscribers: { [propName: string]: Array<(a: INotifierMessage) => void> } = {};

  emit(eventName: EventNames, arg: INotifierMessage): void {
    if (Array.isArray(this.subscribers[eventName])) {
      this.subscribers[eventName].forEach((callback) => callback(arg));
    }
  }

  subscribe(eventName: EventNames, callback: (a: INotifierMessage) => void): () => void {
    this.subscribers[eventName] = this.subscribers[eventName] || [];
    this.subscribers[eventName].push(callback);

    return () => {
      this.subscribers[eventName] = this.subscribers[eventName].filter((fn) => fn !== callback);
    };
  }
}

export const emitter = new Emitter();

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
