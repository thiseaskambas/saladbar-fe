import { IUser } from '../types/user.types';
import axios from '../utils/axios';

const initializeUsers = async () => {
  const response = await axios.axiosPrivate.get('/users');
  return response.data.data;
};
const getOne = async (id: IUser['id']) => {
  const response = await axios.axiosPrivate.get(`/users${id}`);
  return response.data.data;
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const updateOne = async (payloadObj: any) => {
  const { id } = payloadObj;
  const response = await axios.axiosPrivate.patch(`/users/${id}`, {
    ...payloadObj,
    id: null,
  });
  return response.data.data;
};

export default { initializeUsers, getOne, updateOne };
