import axios, {
  AxiosRequestConfig,
  AxiosError,
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
    if (!config.headers['authorization']) {
      console.log('it does not');
      config.headers['authorization'] = `Bearer ${state.auth.accessToken}`;
    }
    console.log(config);
    return config;
  },
  (error) => Promise.reject(error)
);

axiosPrivate.interceptors.response.use(
  (response) => response,
  async (error: ICustomAxiosError) => {
    //  const state = store.getState();
    const prevRequest = error.config;
    console.log(prevRequest);
    if (error.response && error.response.status === 500 && !prevRequest.sent) {
      prevRequest.sent = true;
      const rest = await store.dispatch(refreshToken()).unwrap();
      return axiosPrivate({
        ...prevRequest,
        headers: { authorization: `Bearer ${rest.accessToken}` },
      });
    }
    return Promise.reject(error);
  }
);

export default { axiosPublic, axiosPrivate };
