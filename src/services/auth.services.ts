import axios from '../utils/axios';
import { ILoginCredentials, ILoginResponse } from '../types/user.types';

const logIn = async (
  credentials: ILoginCredentials
): Promise<ILoginResponse> => {
  const response = await axios.axiosPublic.post(`/auth/login`, credentials);
  if (credentials.rememberMe) {
    localStorage.setItem('persist', 'true');
  }
  return response.data;
};

const refreshToken = async () => {
  const response = await axios.axiosPublic.get('/refresh');
  return response.data;
};

const logOut = async () => {
  const response = await axios.axiosPrivate.get('/logout');
  localStorage.removeItem('persist');
  return response;
};

export default { logIn, refreshToken, logOut };
