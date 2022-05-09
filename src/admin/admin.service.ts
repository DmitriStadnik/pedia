import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

export type User = any;

@Injectable()
export class AdminService {
  constructor(private jwtService: JwtService) {}
  private readonly users = [
    {
      userId: 1,
      username: 'john',
      password: 'changeme',
    },
  ];

  async getConfig(): Promise<User | undefined> {
    return this.users.find((user) => user.userId === 1);
  }

  async validatePassword(pass: string): Promise<any> {
    const user = await this.getConfig();

    return user && user.password === pass;
  }

  async login() {
    const payload = {
      username: `${process.env.ADMIN_LOGIN}`,
      sub: `${process.env.ADMIN_LOGIN}`,
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
