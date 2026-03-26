import { IsEmail } from 'class-validator';
import { IsEnum } from 'class-validator';
import { OtpPurpose } from '../../users/entities/otp-record.entity';

export class ResendOtpDto {
  @IsEmail()
  email: string;

  @IsEnum(OtpPurpose)
  purpose: OtpPurpose;
}