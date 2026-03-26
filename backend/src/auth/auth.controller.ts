import {
  Controller,
  Post,
  Body,
  Req,
  Res,
  UseGuards,
  Param,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { RolesGuard } from './guards/roles.guard';
import { Roles } from './decorators/roles.decorator';

import { LoginDto } from './dto/login.dto';
import { VerifyOtpDto } from './dto/verify-otp.dto';
import { RegisterProviderDto } from './dto/register-provider.dto';
import { RegisterPatientDto } from './dto/register-patient.dto';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { SetPasswordDto } from './dto/set-password.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  // POST /api/v1/auth/login
  // Body: { email, password }
  // Returns: { message, email } — actual tokens come after OTP verification
  @Post('login')
  @HttpCode(HttpStatus.OK)
  login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }

  // POST /api/v1/auth/verify-otp
  // Body: { email, otp, purpose }
  // Returns: sets cookies (web) or returns tokens in body (mobile)
  @Post('verify-otp')
  @HttpCode(HttpStatus.OK)
  verifyOtp(
    @Body() dto: VerifyOtpDto,
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.authService.verifyOtp(dto, req, res);
  }

  // POST /api/v1/auth/register/provider
  // Body: { email, firstName, lastName, ... }
  // Returns: { message, email } — sends email verification OTP
  @Post('register/provider')
  registerProvider(@Body() dto: RegisterProviderDto) {
    return this.authService.registerProvider(dto);
  }

  // POST /api/v1/auth/register/patient
  // Body: { email, password, firstName, lastName }
  // Returns: { message, email }
  @Post('register/patient')
  registerPatient(@Body() dto: RegisterPatientDto) {
    return this.authService.registerPatient(dto);
  }

  // POST /api/v1/auth/forgot-password
  // Body: { email }
  @Post('forgot-password')
  @HttpCode(HttpStatus.OK)
  forgotPassword(@Body() dto: ForgotPasswordDto) {
    return this.authService.forgotPassword(dto);
  }

  // POST /api/v1/auth/reset-password
  // Body: { email, otp, newPassword }
  @Post('reset-password')
  @HttpCode(HttpStatus.OK)
  resetPassword(@Body() dto: ResetPasswordDto) {
    return this.authService.resetPassword(dto);
  }

  // POST /api/v1/auth/set-password
  // Body: { token, password }
  // Used by providers after admin approval
  @Post('set-password')
  @HttpCode(HttpStatus.OK)
  setPassword(@Body() dto: SetPasswordDto) {
    return this.authService.setPassword(dto);
  }

  // POST /api/v1/auth/refresh
  // Web: reads refresh_token cookie automatically
  // Mobile: Body: { refreshToken }
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  refresh(
    @Body() dto: RefreshTokenDto,
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.authService.refresh(dto, req, res);
  }

  // POST /api/v1/auth/logout
  // Requires valid access token
  @Post('logout')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  logout(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.authService.logout(req, res);
  }

  // POST /api/v1/auth/providers/:userId/approve
  // Admin only
  @Post('providers/:userId/approve')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  approveProvider(@Param('userId') userId: string) {
    return this.authService.approveProvider(userId);
  }

  // POST /api/v1/auth/providers/:userId/reject
  // Admin only
  @Post('providers/:userId/reject')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  rejectProvider(@Param('userId') userId: string) {
    return this.authService.rejectProvider(userId);
  }
}