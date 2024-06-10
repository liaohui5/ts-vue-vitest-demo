import axios from "axios";
import { getToken, hasToken } from "./token";
import { errorHandler, DEFAULT_ERR_MSG } from "./httpErrorHandler";
import { showErrorMsg } from "./msgs";
import type { AxiosError, AxiosInstance, AxiosResponse } from "axios";

/* @ts-ignore */
const baseURL = import.meta.env.VITE_APP_BASE_URL;

// 为了保证测试的稳定性能, 应该使用常量, 而不是字符串道理和 RouteNames 一样
export const TOKEN_HEADER_KEY = "token";
export const http: AxiosInstance = axios.create({
  baseURL,
  timeout: 5 * 1000, // 5s
  headers: {
    "Content-Type": "application/json",
  },
});

// global request interceptors
http.interceptors.request.use((config) => {
  if (hasToken()) {
    config.headers![TOKEN_HEADER_KEY] = getToken();
  }

  return config;
});

// global reponse interceptors
http.interceptors.response.use(
  ({ data: response }: AxiosResponse) => {
    const { success, data, msg } = response;
    if (success) {
      return data;
    }
    showErrorMsg(msg || DEFAULT_ERR_MSG);
    return Promise.reject(msg);
  },
  (err: AxiosError) => {
    /* @ts-ignore */
    errorHandler(err.response!.status, err.response?.data);
    return Promise.reject(err);
  }
);
