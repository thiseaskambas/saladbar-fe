import { AxiosRequestConfig, AxiosError, AxiosRequestHeaders } from 'axios';
import { refreshToken } from '../store/auth.slice';

import axios from '../utils/axios';

interface ICustomAxiosReqConfig extends AxiosRequestConfig {
  sent: boolean;
  headers: AxiosRequestHeaders;
}
interface ICustomAxiosError extends AxiosError {
  config: ICustomAxiosReqConfig;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const setup = (store: any) => {
  axios.axiosPrivate.interceptors.request.use(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (config: any | AxiosRequestConfig) => {
      const state = store.getState();
      if (!config.headers['Authorization']) {
        config.headers['Authorization'] = `Bearer ${state.auth.accessToken}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  axios.axiosPrivate.interceptors.response.use(
    (response) => response,
    async (error: ICustomAxiosError) => {
      const prevRequest = error.config;
      const state = store.getState();
      if (error?.response?.status === 500 && !prevRequest?.sent) {
        prevRequest.sent = true;
        console.log(state.auth.accessToken);
        prevRequest.headers[
          'Authorization'
        ] = `Bearer ${state.auth.accessToken}`;
        store.dispatch(refreshToken());
        console.log('refreshed');
        return axios.axiosPrivate(prevRequest);
      }
      return Promise.reject(error);
    }
  );
};

export default setup;
