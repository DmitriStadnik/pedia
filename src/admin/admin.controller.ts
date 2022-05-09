import { Controller, Request, Post, UseGuards, Get } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AdminService } from './admin.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { LocalAuthGuard } from './local-auth.guard';

@Controller('/admin/')
export class AdminController {
  constructor(private adminService: AdminService) {}

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req) {
    return this.adminService.login();
  }

  @UseGuards(JwtAuthGuard)
  @Get('config')
  getProfile(): any {
    return this.adminService.getConfig();
  }
}
