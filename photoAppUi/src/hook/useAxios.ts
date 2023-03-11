import axios, { AxiosRequestConfig } from 'axios';
import { getTokenLocalStorageItem } from './useLocastorage';
import refreshToken from './useRefreshToken';

export interface iJwtDecode {
  exp: bigint;
  userId: string;
}

const useAxios = axios.create({
  baseURL: 'http://localhost:8080/', // set baseURL for all requests
  headers: {
    'Content-Type': 'application/json', // set headers for all requests
  },
  timeout: 3000, // set timeout for all requests
  withCredentials: true,
});

useAxios.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    const condition =
      config.url?.includes('/auth/login') ||
      config.url?.includes('/auth/register') ||
      config.url?.includes('/auth/refreshToken');
    if (condition) return config;

    const token = getTokenLocalStorageItem('token');
    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${token}`,
    } as any;

    return config;
  },
  (err) => {
    console.log(err);
    return Promise.reject(err);
  }
);

useAxios.interceptors.response.use(
  (response) => response,
  async (err) => {
    console.log(err);
    const prevRequest = err?.response;
    if (err?.response?.status === 403 && !err?.sent) {
      prevRequest.sent = true;
      const newAccessToken = await refreshToken();
      prevRequest.headers = {
        ...prevRequest,
        Authorization: `Bearer ${newAccessToken}`,
      } as any;
      return useAxios(prevRequest);
    }
    return Promise.reject(err);
  }
);

export default useAxios;
