/* eslint-disable no-constructor-return */
import { INotifierMessage } from 'types';

export enum EventNames {
  ADD_MESSAGE = 'ADD_MESSAGE',
  OPEN_FILES = 'OPEN_FILES',
}

export type IEmitterData = INotifierMessage;

export class Emitter {
  private subscribers: { [propName: string]: Array<(a: IEmitterData) => void> } = {};
  private static instance: Emitter;
  private static exists: boolean;

  constructor() {
    if (Emitter.exists) return Emitter.instance;

    Emitter.instance = this;
    Emitter.exists = true;
  }

  public static getInstance(): Emitter {
    if (!Emitter.exists) {
      Emitter.instance = new Emitter();
      Emitter.exists = true;
    }

    return Emitter.instance;
  }

  emit(eventName: EventNames, arg: IEmitterData): void {
    if (Array.isArray(this.subscribers[eventName])) {
      this.subscribers[eventName].forEach((callback) => callback(arg));
    }
  }

  subscribe(eventName: EventNames, callback: (a: IEmitterData) => void): () => void {
    this.subscribers[eventName] = this.subscribers[eventName] || [];
    this.subscribers[eventName].push(callback);

    return () => {
      this.subscribers[eventName] = this.subscribers[eventName].filter((fn) => fn !== callback);
    };
  }
}
