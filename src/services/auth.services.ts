import axios from 'axios';
import { ILoginCredentials, ILoginResponse } from '../types/user.types';
const baseUrl = '/api/v1/auth';

// // eslint-disable-next-line @typescript-eslint/no-unused-vars
let token: string | null = null;

const logIn = async (
  credentials: ILoginCredentials
): Promise<ILoginResponse> => {
  const response = await axios.post(`${baseUrl}/login`, credentials);
  return response.data;
};

const setToken = (newToken: string): void => {
  token = `bearer ${newToken}`;
  console.log(token);
};

const getToken = () => token;

export default { logIn, setToken, getToken };
