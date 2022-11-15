import axios from '../utils/axios';
import { ILoginCredentials, ILoginResponse } from '../types/user.types';

// // eslint-disable-next-line @typescript-eslint/no-unused-vars
let token: string | null = null;

const logIn = async (
  credentials: ILoginCredentials
): Promise<ILoginResponse> => {
  const response = await axios.axiosPublic.post(`/auth/login`, credentials);
  return response.data;
};

const setToken = (newToken: string): void => {
  token = `bearer ${newToken}`;
};

const getToken = () => token;

const refreshToken = async () => {
  const response = await axios.axiosPublic.get('/refresh');
  return response.data;
};

export default { logIn, setToken, getToken, refreshToken };
