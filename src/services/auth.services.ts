import axios from 'axios';
import { ILoginCredentials } from '../types/user.types';
const baseUrl = '/api/v1/auth';

const logIn = async (credentials: ILoginCredentials) => {
  const response = await axios.post(`${baseUrl}/login`, credentials);
  return response.data;
};

export default { logIn };
