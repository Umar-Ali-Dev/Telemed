import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategies/jwt.strategy';

import { UsersModule } from '../users/users.module';
import { MailModule } from '../mail/mail.module';

import { ProviderProfile } from '../users/entities/provider-profile.entity';
import { PatientProfile } from '../users/entities/patient-profile.entity';
import { RefreshToken } from '../users/entities/refresh-token.entity';

@Module({
  imports: [
    // JwtModule without secret — we pass secret per sign/verify call in the service
    // This allows us to use different secrets for access vs refresh tokens
    JwtModule.register({}),

    // Entities needed directly in AuthService (not via UsersService)
    TypeOrmModule.forFeature([ProviderProfile, PatientProfile, RefreshToken]),

    UsersModule, // gives us UsersService
    MailModule,  // gives us MailService
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}