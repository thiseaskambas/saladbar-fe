import axios, {
  AxiosError,
  AxiosRequestConfig,
  AxiosRequestHeaders,
} from 'axios';
import { refreshToken } from '../store/auth.slice';
import store from '../store/store';

interface ICustomAxiosReqConfig extends AxiosRequestConfig {
  sent: boolean;
  headers: AxiosRequestHeaders;
}
interface ICustomAxiosError extends AxiosError {
  config: ICustomAxiosReqConfig;
}

const baseURL = '/api/v1/';

const axiosPublic = axios.create({
  baseURL,
  withCredentials: true,
});

const axiosPrivate = axios.create({
  baseURL,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
});

axiosPrivate.interceptors.request.use(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (config: any | AxiosRequestConfig) => {
    const state = store.getState();
    if (!config.headers['authorization'] && state.auth.accessToken) {
      config.headers['authorization'] = `Bearer ${state.auth.accessToken}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

axiosPrivate.interceptors.response.use(
  (response) => response,
  async (error: ICustomAxiosError) => {
    const prevRequest = error.config;
    if (error.response && error.response.status === 500 && !prevRequest.sent) {
      prevRequest.sent = true;
      const res = await store.dispatch(refreshToken()).unwrap();
      return axiosPrivate({
        ...prevRequest,
        headers: { authorization: `Bearer ${res.accessToken}` },
      });
    }
    return Promise.reject(error);
  }
);

export default { axiosPublic, axiosPrivate };
