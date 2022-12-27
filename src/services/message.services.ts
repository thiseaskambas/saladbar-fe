import { IMessageResponse } from '../types/message.types';
import axios from '../utils/axios';

const getLatest = async (): Promise<IMessageResponse> => {
  const response = await axios.axiosPrivate.get('/message/latest/');
  return response.data;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const createOne = async (inputObj: any): Promise<IMessageResponse> => {
  const response = await axios.axiosPrivate.post('/message/', inputObj);
  return response.data;
};

export default { getLatest, createOne };
