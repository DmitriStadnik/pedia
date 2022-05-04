import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

const baseUrl = process.env.REACT_APP_API_URL;

export class Api {
  protected axios: AxiosInstance;

  constructor() {
    this.axios = axios.create({
      baseURL: baseUrl,
    });

    this.axios.interceptors.request.use((config: AxiosRequestConfig) => {
      console.log(`${config.method} -- ${config.baseURL}/${config.url}`);

      return config;
    });
  }

  public async get(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse> {
    return this.axios.get(url, config);
  }
}
