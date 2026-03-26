import { IsOptional, IsString } from 'class-validator';

export class RefreshTokenDto {
  // Only required for mobile — web reads the cookie automatically
  @IsOptional()
  @IsString()
  refreshToken?: string;
}