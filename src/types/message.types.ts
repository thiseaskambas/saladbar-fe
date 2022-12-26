import { IUser } from './user.types';

export interface IMessageEntry {
  createdAt: Date;
  title: string;
  text: string;
  importance?: number;
}
export interface IMessage extends IMessageEntry {
  createdBy: IUser;
}
export interface IMessageResponse {
  data: IMessage;
  status: 'string';
}

export interface IMessageState {
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  messages: IMessage[];
}
