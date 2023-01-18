import { Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Config } from 'src/shared/entities/Config.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { ConfigDTO } from 'src/shared/dto/config.dto';

@Injectable()
export class AdminService {
  constructor(
    private jwtService: JwtService,
    @InjectRepository(Config)
    private configRepository: Repository<Config>,
  ) {}

  async initialLaunch(): Promise<Partial<Config>> {
    const config = new Config();

    config.mainPageContent = 'PEDIA starting page. Admin password is 123456';
    config.password = await bcrypt.hash('123456', 10);
    config.title = 'PEDIA Template';

    const newConfig = await this.configRepository.save(config);

    return newConfig;
  }

  async getConfig(returnPass = true): Promise<Partial<Config>> {
    const configArr = await this.configRepository.find();

    if (!configArr || configArr.length === 0) {
      return await this.initialLaunch();
    }

    if (!returnPass) {
      const { password, ...rest } = configArr[0];

      return rest;
    }

    return configArr[0];
  }

  async updateConfig(body: Partial<ConfigDTO>): Promise<boolean> {
    const config = await this.getConfig();

    // TODO update password with hash
    // if (body.password && this.validatePassword(body.password)) {}

    const { affected } = await this.configRepository.update(config._id, {
      ...body,
    });

    return affected === 1;
  }

  async validatePassword(pass: string): Promise<boolean> {
    const config = await this.getConfig();

    return config && (await bcrypt.compare(pass, config.password));
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
