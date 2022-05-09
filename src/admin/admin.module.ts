import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { LocalStrategy } from './local.strategy';
import { AdminController } from './admin.controller';
import { JwtStrategy } from './jwt.strategy';
import { JwtAuthGuard } from './jwt-auth.guard';
import { APP_GUARD } from '@nestjs/core';

@Module({
  controllers: [AdminController],
  imports: [
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '24h' },
    }),
  ],
  providers: [
    AdminService,
    LocalStrategy,
    JwtStrategy,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
  exports: [AdminService],
})
export class AdminModule {}
