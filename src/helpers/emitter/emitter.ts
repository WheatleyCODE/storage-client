/* eslint-disable no-constructor-return */
import { EventNames, IEmitterData } from 'types';

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

  emit(arg: IEmitterData): void {
    const { type } = arg;

    if (Array.isArray(this.subscribers[type])) {
      this.subscribers[type].forEach((callback) => callback(arg));
    }
  }

  subscribe(type: EventNames, callback: (a: IEmitterData) => void): () => void {
    this.subscribers[type] = this.subscribers[type] || [];
    this.subscribers[type].push(callback);

    return () => {
      this.subscribers[type] = this.subscribers[type].filter((fn) => fn !== callback);
    };
  }
}
