import http from 'http';
import https from 'https';
import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { requestLogger, responseLogger } from 'axios-logger';

const addLogging = (instance: AxiosInstance) => {
  instance.interceptors.request.use((req) =>
    requestLogger(req, {
      prefixText: false,
      logger: console.log,
      headers: true,
    })
  );
  instance.interceptors.response.use((res) =>
    responseLogger(res, {
      prefixText: false,
      logger: console.log,
    })
  );
};

const request = (config: AxiosRequestConfig) => {
  const httpsAgent = new https.Agent({ rejectUnauthorized: false });
  const httpAgent = new http.Agent();
  const req = axios.create({ httpsAgent, httpAgent });

  const isLoggingEnabled = !!process.env.DEBUG;

  if (isLoggingEnabled) {
    addLogging(req);
  }

  const defaultConfig = { validateStatus: () => true };

  return req({ ...defaultConfig, ...config });
};

export const get = (url: string, config: AxiosRequestConfig = {}) => request({ ...config, method: 'GET', url });
export const post = (url: string, config: AxiosRequestConfig = {}) => request({ ...config, method: 'POST', url });
export const put = (url: string, config: AxiosRequestConfig = {}) => request({ ...config, method: 'PUT', url });
export const del = (url: string, config: AxiosRequestConfig = {}) => request({ ...config, method: 'DELETE', url });
