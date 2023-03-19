import { INotifierMessage } from 'types';

export enum EventNames {
  ADD_MESSAGE = 'ADD_MESSAGE',
  OPEN_FILES = 'OPEN_FILES',
  FOCUS_MAIN = 'FOCUS_MAIN',
}

export type AddMessage = {
  type: EventNames.ADD_MESSAGE;
  data: INotifierMessage;
};

export type OpenFiles = {
  type: EventNames.OPEN_FILES;
};

export type FocusMain = {
  type: EventNames.FOCUS_MAIN;
};

export type IEmitterData = AddMessage | OpenFiles | FocusMain;
