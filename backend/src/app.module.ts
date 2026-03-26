import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ThrottlerModule } from '@nestjs/throttler';

import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { MailModule } from './mail/mail.module';

import { User } from './users/entities/user.entity';
import { ProviderProfile } from './users/entities/provider-profile.entity';
import { PatientProfile } from './users/entities/patient-profile.entity';
import { RefreshToken } from './users/entities/refresh-token.entity';
import { OtpRecord } from './users/entities/otp-record.entity';

@Module({
  imports: [
    // Load .env and make ConfigService available globally — no need to import ConfigModule in every module
    ConfigModule.forRoot({ isGlobal: true }),

    // Rate limiting — protects all endpoints from abuse
    // Max 20 requests per minute per IP by default
    ThrottlerModule.forRoot([{ ttl: 60000, limit: 20 }]),

    // PostgreSQL connection — reads from .env via ConfigService
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: config.get<string>('DB_HOST'),
        port: config.get<number>('DB_PORT'),
        username: config.get<string>('DB_USERNAME'),
        password: config.get<string>('DB_PASSWORD'),
        database: config.get<string>('DB_NAME'),
        entities: [User, ProviderProfile, PatientProfile, RefreshToken, OtpRecord],
        // synchronize: true auto-creates tables from entities — use only in dev
        // In production, use migrations instead
        synchronize: config.get<string>('NODE_ENV') !== 'production',
        logging: config.get<string>('NODE_ENV') === 'development',
      }),
    }),

    AuthModule,
    UsersModule,
    MailModule,
  ],
})
export class AppModule {}