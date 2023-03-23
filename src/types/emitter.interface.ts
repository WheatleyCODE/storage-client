export enum EventNames {
  OPEN_FILES = 'OPEN_FILES',
  FOCUS_MAIN = 'FOCUS_MAIN',
}

export type OpenFiles = {
  type: EventNames.OPEN_FILES;
};

export type FocusMain = {
  type: EventNames.FOCUS_MAIN;
};

export type IEmitterData = OpenFiles | FocusMain;
