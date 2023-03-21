import { ItemTypes } from './storage-workplace.intarface';
import { IUser } from './user.interfaces';

export interface IComment {
  id: string;
  user: IUser;
  text: string;
  answerFor?: string;
  createDate: number;
}

export interface ICreateCommentFilds {
  id: string;
  type: ItemTypes;
  text: string;
  answerFor?: string;
}

export interface IDeleteCommentFilds {
  id: string;
  type: ItemTypes;
  comment: string;
}
