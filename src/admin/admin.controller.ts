import {
  Controller,
  Request,
  Post,
  UseGuards,
  Get,
  Body,
  Put,
} from '@nestjs/common';
import { ConfigDTO } from 'src/shared/dto/config.dto';
import { Config } from 'src/shared/entities/Config.entity';
import { AdminService } from './admin.service';
import { LocalAuthGuard } from './local-auth.guard';
import { Public } from './public.guard';

@Controller('/admin/')
export class AdminController {
  constructor(private adminService: AdminService) {}

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req) {
    return this.adminService.login();
  }

  @Public()
  @Get('config')
  async getConfig(): Promise<Partial<Config>> {
    return await this.adminService.getConfig(false);
  }

  @Put('config')
  updateConfig(@Body() body: Partial<ConfigDTO>): Promise<boolean> {
    return this.adminService.updateConfig(body);
  }
}
