import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AdminService } from './admin.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private adminService: AdminService) {
    super();
  }

  async validate(username: string, password: string): Promise<any> {
    const passValid = await this.adminService.validatePassword(password);

    if (!passValid) {
      throw new UnauthorizedException();
    }

    return passValid;
  }
}
