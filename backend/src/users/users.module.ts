import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { ProviderProfile } from './entities/provider-profile.entity';
import { PatientProfile } from './entities/patient-profile.entity';
import { RefreshToken } from './entities/refresh-token.entity';
import { OtpRecord } from './entities/otp-record.entity';

@Module({
  // TypeOrmModule.forFeature registers these entities for this module's repos
  imports: [
    TypeOrmModule.forFeature([
      User,
      ProviderProfile,
      PatientProfile,
      RefreshToken,
      OtpRecord,
    ]),
  ],
  providers: [UsersService],
  exports: [UsersService], // exported so AuthModule can use it
})
export class UsersModule {}