import axios, { AxiosRequestConfig } from 'axios';
import { getTokenFormLocalStorage } from '@/utils/auth';

export const BASE_URL = 'https://api.codisabled.com/api/v1';

export const TEST_URL = 'http://ec2-3-38-225-110.ap-northeast-2.compute.amazonaws.com:8080/api/v1/';

const instance = () => {
  return axios.create({
    baseURL: TEST_URL,
    headers: {
      Authorization: getTokenFormLocalStorage()?.access.value
        ? getTokenFormLocalStorage()?.access.value
        : '',
    },
  });
};

const customAxios = {
  get: (url: string, options?: AxiosRequestConfig) => {
    return instance().get(url, {
      ...options,
    });
  },
  post: (url: string, data?: object, options?: AxiosRequestConfig) => {
    return instance().post(url, data, {
      ...options,
    });
  },

  patch: (url: string, data?: object, options?: AxiosRequestConfig) => {
    return instance().patch(url, data, {
      ...options,
    });
  },

  delete: (url: string, data?: object, options?: AxiosRequestConfig) => {
    return instance().delete(url, {
      ...options,
    });
  },
  put: (url: string, data?: object, options?: AxiosRequestConfig) => {
    return instance().put(url, data, {
      ...options,
    });
  },
};

export default customAxios;
