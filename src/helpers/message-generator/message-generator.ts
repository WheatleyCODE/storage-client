import { changeAlbumData } from 'store/album/album.actions';
import { changeColor } from 'store/folder/folder.actions';
import {
  changeIsTrash,
  changeName,
  changeParent,
  createAccessLink,
  changeAccessType,
} from 'store/items/items.actions';
import { changeTrackData } from 'store/track/track.actions';
import { changeVideoData } from 'store/video/video.actions';

export interface IMessages {
  [x: string]: {
    single: string;
    many: string;
  };
}

export const messages: IMessages = {
  [changeColor.fulfilled.type]: {
    single: 'Цвет был изменен',
    many: 'Цвета были изменены',
  },

  [changeAlbumData.fulfilled.type]: {
    single: 'Данные альбома изменены',
    many: 'Такой кейс не возможен? O_O',
  },

  [changeIsTrash.fulfilled.type]: {
    single: 'Элемент перемещён в корзину',
    many: 'Элементы перемещены в корзину',
  },

  [changeName.fulfilled.type]: {
    single: 'Имя элемента изменено',
    many: 'Такой кейс не возможен? O_O',
  },

  [changeParent.fulfilled.type]: {
    single: 'Элемент перемещён',
    many: 'Элементы перемещены',
  },

  [createAccessLink.fulfilled.type]: {
    single: 'Ссылка для элемента создана',
    many: 'Такой кейс не возможен? O_O',
  },

  [changeAccessType.fulfilled.type]: {
    single: 'Тип доступа для элемента изменен',
    many: 'Типы доступа для элементов изменены',
  },

  [changeTrackData.fulfilled.type]: {
    single: 'Данные трека изменены',
    many: 'Такой кейс не возможен? O_O',
  },

  [changeVideoData.fulfilled.type]: {
    single: 'Данные видео изменены',
    many: 'Такой кейс не возможен? O_O',
  },
};

export const generateMessageByAction = (action: { type: string }, arr: any[]) => {
  const isMany = arr.length > 1;
  const message = messages[action.type];
  return isMany ? message.many : message.single;
};
