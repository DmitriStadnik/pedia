import { Controller, Get } from '@nestjs/common';
import { Public } from './admin/public.guard';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Public()
  @Get()
  getApiPage(): string {
    return this.appService.getApiPage();
  }
}
