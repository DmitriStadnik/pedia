import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Config } from 'src/shared/entities/Config.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AdminService {
  constructor(
    private jwtService: JwtService,
    @InjectRepository(Config)
    private configRepository: Repository<Config>,
  ) {}

  async getConfig(): Promise<Config[]> {
    return this.configRepository.find();
  }

  async validatePassword(pass: string): Promise<any> {
    const config = await this.getConfig();

    return config && (await bcrypt.compare(pass, config[0].password));
  }

  async login() {
    const payload = {
      username: `${process.env.ADMIN_LOGIN}`,
      sub: `${process.env.ADMIN_LOGIN}`,
    };
    return {
      token: this.jwtService.sign(payload),
    };
  }
}
