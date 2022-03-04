import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getApiPage(): string {
    return 'This is PEDIA API';
  }
}
