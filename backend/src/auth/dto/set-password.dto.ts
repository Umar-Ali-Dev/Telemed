import { IsString, MinLength } from 'class-validator';

export class SetPasswordDto {
  @IsString()
  token: string;  // the one-time token sent in the approval email

  @IsString()
  @MinLength(8, { message: 'Password must be at least 8 characters' })
  password: string;
}