import { INotifierMessage, MessageColor } from 'types';

export enum EventNames {
  DISPATCH_MESSAGE = 'DISPATCH_MESSAGE',
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

export const emitMessage = ({ color, message }: { color: MessageColor; message: string }) => {
  emitter.emit(EventNames.DISPATCH_MESSAGE, {
    color,
    id: Date.now(),
    message,
  });
};
