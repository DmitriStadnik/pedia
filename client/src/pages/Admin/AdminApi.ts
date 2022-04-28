import { Api } from './../../utils/api';
import { AxiosResponse } from 'axios';

export class AdminApi extends Api {
  async testError(): Promise<AxiosResponse> {
    return this.axios.get('article/test-error');
  }
}
