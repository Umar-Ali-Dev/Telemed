import {
  Injectable,
  BadRequestException,
  UnauthorizedException,
  ForbiddenException,
  ConflictException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import { Response, Request } from 'express';

import { UsersService } from '../users/users.service';
import { MailService } from '../mail/mail.service';

import { User, UserRole } from '../users/entities/user.entity';
import { ProviderProfile, ProviderStatus } from '../users/entities/provider-profile.entity';
import { PatientProfile } from '../users/entities/patient-profile.entity';
import { RefreshToken, Platform } from '../users/entities/refresh-token.entity';
import { OtpRecord, OtpPurpose } from '../users/entities/otp-record.entity';

import { LoginDto } from './dto/login.dto';
import { VerifyOtpDto } from './dto/verify-otp.dto';
import { RegisterProviderDto } from './dto/register-provider.dto';
import { RegisterPatientDto } from './dto/register-patient.dto';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { SetPasswordDto } from './dto/set-password.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private configService: ConfigService,
    private mailService: MailService,

    @InjectRepository(ProviderProfile)
    private providerProfileRepo: Repository<ProviderProfile>,

    @InjectRepository(PatientProfile)
    private patientProfileRepo: Repository<PatientProfile>,

    @InjectRepository(RefreshToken)
    private refreshTokenRepo: Repository<RefreshToken>,
  ) {}

  // ─── Helpers ─────────────────────────────────────────────────────────────────

  // Generate a 6-digit OTP string
  private generateOtp(): string {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }

  // Detect if the request is from a web or mobile client via custom header
  private getClientType(req: Request): 'web' | 'mobile' {
    const header = req.headers['x-client-type'];
    return header === 'mobile' ? 'mobile' : 'web';
  }

  // Create access + refresh JWT tokens
  private async generateTokens(user: User): Promise<{ accessToken: string; refreshToken: string }> {
    const payload = { sub: user.id, email: user.email, role: user.role };

    const accessToken = this.jwtService.sign(payload, {
      secret: this.configService.get<string>('JWT_ACCESS_SECRET'),
      expiresIn: (this.configService.get<string>('JWT_ACCESS_EXPIRES_IN', '15m')) as any,
    });

    const refreshToken = this.jwtService.sign(payload, {
      secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
      expiresIn: (this.configService.get<string>('JWT_REFRESH_EXPIRES_IN', '7d')) as any,
    });

    return { accessToken, refreshToken };
  }

  // Store hashed refresh token in DB per device
  private async storeRefreshToken(
    userId: string,
    refreshToken: string,
    deviceId: string,
    platform: Platform,
  ): Promise<void> {
    const tokenHash = await bcrypt.hash(refreshToken, 10);
    const now = new Date();

    const expiresAt = new Date(now);
    expiresAt.setDate(expiresAt.getDate() + 7); // 7 days rolling

    const absoluteExpiresAt = new Date(now);
    const absoluteDays = parseInt(this.configService.get<string>('JWT_REFRESH_ABSOLUTE_DAYS', '30'), 10);
    absoluteExpiresAt.setDate(absoluteExpiresAt.getDate() + absoluteDays);

    // Upsert: replace existing token for same device
    const existing = await this.usersService.findRefreshTokenByDevice(userId, deviceId);
    if (existing) {
      await this.refreshTokenRepo.update(existing.id, {
        tokenHash,
        expiresAt,
        absoluteExpiresAt,
      });
    } else {
      await this.usersService.saveRefreshToken({
        userId,
        tokenHash,
        deviceId,
        platform,
        expiresAt,
        absoluteExpiresAt,
      });
    }
  }

  // Set JWT cookies for web clients (HttpOnly = JS cannot read them → safe from XSS)
  private setTokenCookies(res: Response, accessToken: string, refreshToken: string): void {
    const isProd = this.configService.get<string>('NODE_ENV') === 'production';

    const cookieOptions = {
      httpOnly: true,
      secure: isProd,
      sameSite: (isProd ? 'none' : 'lax') as 'none' | 'lax',
    };

    res.cookie('access_token', accessToken, {
      ...cookieOptions,
      maxAge: 15 * 60 * 1000, // 15 minutes in ms
    });

    res.cookie('refresh_token', refreshToken, {
      ...cookieOptions,
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in ms
    });
  }

  // Clear cookies on logout
  private clearTokenCookies(res: Response): void {
    res.clearCookie('access_token');
    res.clearCookie('refresh_token');
  }

  // Create and send an OTP — handles rate limiting
  private async createAndSendOtp(user: User, purpose: OtpPurpose): Promise<void> {
    const windowMinutes = parseInt(this.configService.get<string>('OTP_REQUEST_WINDOW_MINUTES', '15'), 10);
    const maxRequests = parseInt(this.configService.get<string>('OTP_MAX_REQUESTS', '3'), 10);
    const expiryMinutes = parseInt(this.configService.get<string>('OTP_EXPIRY_MINUTES', '10'), 10);

    const existing = await this.usersService.findLatestOtp(user.id, purpose);
    const now = new Date();

    if (existing) {
      const windowStart = new Date(existing.requestWindowStart);
      const windowExpiry = new Date(windowStart.getTime() + windowMinutes * 60 * 1000);

      if (now < windowExpiry && existing.requestCount >= maxRequests) {
        // Too many OTP requests in the time window
        throw new BadRequestException({
          code: 'AUTH_008',
          message: 'Too many OTP requests. Please try again later.',
        });
      }
    }

    // Invalidate all previous OTPs for this purpose
    await this.usersService.invalidatePreviousOtps(user.id, purpose);

    const otp = this.generateOtp();
    const codeHash = await bcrypt.hash(otp, 10);
    const expiresAt = new Date(now.getTime() + expiryMinutes * 60 * 1000);

    await this.usersService.saveOtp({
      userId: user.id,
      codeHash,
      purpose,
      expiresAt,
      requestCount: existing ? existing.requestCount + 1 : 1,
      requestWindowStart: existing?.requestWindowStart ?? now,
    });

    await this.mailService.sendOtp(user.email, otp, purpose);
  }

  // ─── Login ────────────────────────────────────────────────────────────────────

  // Step 1: validate credentials → send OTP
  async login(dto: LoginDto): Promise<{ message: string; email: string }> {
    const user = await this.usersService.findByEmail(dto.email);

    if (!user || !user.password) {
      throw new UnauthorizedException({ code: 'AUTH_001', message: 'Invalid credentials' });
    }

    // Check if account is locked
    if (user.lockedUntil && new Date() < user.lockedUntil) {
      throw new ForbiddenException({ code: 'AUTH_002', message: 'Account is temporarily locked. Try again later.' });
    }

    const passwordValid = await bcrypt.compare(dto.password, user.password);

    if (!passwordValid) {
      const maxAttempts = parseInt(this.configService.get<string>('LOGIN_MAX_ATTEMPTS', '5'), 10);
      const lockoutMinutes = parseInt(this.configService.get<string>('LOGIN_LOCKOUT_MINUTES', '15'), 10);

      user.loginAttempts += 1;

      if (user.loginAttempts >= maxAttempts) {
        user.lockedUntil = new Date(Date.now() + lockoutMinutes * 60 * 1000);
        user.loginAttempts = 0;
        await this.usersService.save(user);
        throw new ForbiddenException({ code: 'AUTH_002', message: 'Too many failed attempts. Account locked for 15 minutes.' });
      }

      await this.usersService.save(user);
      throw new UnauthorizedException({ code: 'AUTH_001', message: 'Invalid credentials' });
    }

    // Check account status
    if (!user.isActive) {
      throw new ForbiddenException({ code: 'AUTH_004', message: 'Account is inactive' });
    }

    if (!user.isEmailVerified) {
      throw new ForbiddenException({ code: 'AUTH_005', message: 'Email not verified' });
    }

    if (user.role === UserRole.PROVIDER && user.providerProfile?.status === ProviderStatus.PENDING) {
      throw new ForbiddenException({ code: 'AUTH_003', message: 'Account is pending admin approval' });
    }

    if (user.role === UserRole.PROVIDER && user.providerProfile?.status === ProviderStatus.REJECTED) {
      throw new ForbiddenException({ code: 'AUTH_011', message: 'Account application was rejected' });
    }

    // Reset failed login attempts on successful credential check
    user.loginAttempts = 0;
    user.lockedUntil = null;
    await this.usersService.save(user);

    // Send OTP — user must verify before getting tokens
    await this.createAndSendOtp(user, OtpPurpose.LOGIN);

    return { message: 'OTP sent to your email', email: user.email };
  }

  // Step 2: verify OTP → issue tokens
  async verifyOtp(
    dto: VerifyOtpDto,
    req: Request,
    res: Response,
  ): Promise<{ message: string; role?: string; accessToken?: string; refreshToken?: string }> {
    const user = await this.usersService.findByEmail(dto.email);
    if (!user) throw new UnauthorizedException({ code: 'AUTH_001', message: 'Invalid credentials' });

    const otpRecord = await this.usersService.findLatestOtp(user.id, dto.purpose);

    if (!otpRecord || otpRecord.isUsed || new Date() > otpRecord.expiresAt) {
      throw new BadRequestException({ code: 'AUTH_006', message: 'OTP is invalid or expired' });
    }

    const maxAttempts = parseInt(this.configService.get<string>('OTP_MAX_ATTEMPTS', '5'), 10);

    if (otpRecord.attempts >= maxAttempts) {
      throw new BadRequestException({ code: 'AUTH_007', message: 'Too many incorrect attempts. Request a new OTP.' });
    }

    const valid = await bcrypt.compare(dto.otp, otpRecord.codeHash);

    if (!valid) {
      await this.usersService.incrementOtpAttempts(otpRecord.id, otpRecord.attempts + 1);
      if (otpRecord.attempts + 1 >= maxAttempts) {
        await this.usersService.markOtpUsed(otpRecord.id);
        throw new BadRequestException({ code: 'AUTH_007', message: 'Too many incorrect attempts. Request a new OTP.' });
      }
      throw new BadRequestException({ code: 'AUTH_006', message: 'Invalid OTP' });
    }

    // Mark OTP as used
    await this.usersService.markOtpUsed(otpRecord.id);

    // For email verification, just mark email as verified
    if (dto.purpose === OtpPurpose.EMAIL_VERIFICATION) {
      user.isEmailVerified = true;
      await this.usersService.save(user);
      return { message: 'Email verified successfully' };
    }

    // For login / password reset — issue tokens
    const deviceId = (req.headers['x-device-id'] as string) ?? uuidv4();
    const clientType = this.getClientType(req);
    const platform = clientType === 'mobile'
      ? (req.headers['x-platform'] as Platform ?? Platform.IOS)
      : Platform.WEB;

    const { accessToken, refreshToken } = await this.generateTokens(user);
    await this.storeRefreshToken(user.id, refreshToken, deviceId, platform);

    if (clientType === 'web') {
      this.setTokenCookies(res, accessToken, refreshToken);
      return { message: 'Login successful', role: user.role };
    } else {
      // Mobile: return tokens in body
      return { message: 'Login successful', role: user.role, accessToken, refreshToken };
    }
  }

  // ─── Provider Registration ────────────────────────────────────────────────────

  async registerProvider(dto: RegisterProviderDto): Promise<{ message: string; email: string }> {
    const existing = await this.usersService.findByEmail(dto.email);
    if (existing) {
      throw new ConflictException({ code: 'AUTH_009', message: 'Email already registered' });
    }

    // Create user — no password yet (set after admin approval)
    const user = await this.usersService.create({
      email: dto.email,
      password: null,
      role: UserRole.PROVIDER,
      firstName: dto.firstName,
      lastName: dto.lastName,
      phone: dto.phone ?? null,
      isEmailVerified: false,
      isActive: true,
    });

    // Create provider profile with pending status
    const profile = this.providerProfileRepo.create({
      userId: user.id,
      npiNumber: dto.npiNumber ?? null,
      credentials: dto.credentials ?? null,
      licenseNumber: dto.licenseNumber ?? null,
      licenseState: dto.licenseState ?? null,
      status: ProviderStatus.PENDING,
    });
    await this.providerProfileRepo.save(profile);

    await this.createAndSendOtp(user, OtpPurpose.EMAIL_VERIFICATION);

    return { message: 'Registration successful. Please verify your email.', email: user.email };
  }

  // ─── Patient Registration ─────────────────────────────────────────────────────

  async registerPatient(dto: RegisterPatientDto): Promise<{ message: string; email: string }> {
    const existing = await this.usersService.findByEmail(dto.email);
    if (existing) {
      throw new ConflictException({ code: 'AUTH_009', message: 'Email already registered' });
    }

    const passwordHash = await bcrypt.hash(dto.password, 12);

    const user = await this.usersService.create({
      email: dto.email,
      password: passwordHash,
      role: UserRole.PATIENT,
      firstName: dto.firstName,
      lastName: dto.lastName,
      phone: dto.phone ?? null,
      isEmailVerified: false,
      isActive: true,
    });

    const profile = this.patientProfileRepo.create({ userId: user.id });
    await this.patientProfileRepo.save(profile);

    await this.createAndSendOtp(user, OtpPurpose.EMAIL_VERIFICATION);

    return { message: 'Registration successful. Please verify your email.', email: user.email };
  }

  // ─── Forgot / Reset Password ──────────────────────────────────────────────────

  async forgotPassword(dto: ForgotPasswordDto): Promise<{ message: string }> {
    const user = await this.usersService.findByEmail(dto.email);

    // Always return the same message to prevent email enumeration attacks
    if (!user) return { message: 'If that email exists, an OTP has been sent.' };

    await this.createAndSendOtp(user, OtpPurpose.PASSWORD_RESET);
    return { message: 'If that email exists, an OTP has been sent.' };
  }

  async resetPassword(dto: ResetPasswordDto): Promise<{ message: string }> {
    const user = await this.usersService.findByEmail(dto.email);
    if (!user) throw new BadRequestException({ code: 'AUTH_006', message: 'Invalid OTP' });

    const otpRecord = await this.usersService.findLatestOtp(user.id, OtpPurpose.PASSWORD_RESET);

    if (!otpRecord || otpRecord.isUsed || new Date() > otpRecord.expiresAt) {
      throw new BadRequestException({ code: 'AUTH_006', message: 'OTP is invalid or expired' });
    }

    const valid = await bcrypt.compare(dto.otp, otpRecord.codeHash);
    if (!valid) throw new BadRequestException({ code: 'AUTH_006', message: 'Invalid OTP' });

    await this.usersService.markOtpUsed(otpRecord.id);

    user.password = await bcrypt.hash(dto.newPassword, 12);
    await this.usersService.save(user);

    return { message: 'Password reset successfully' };
  }

  // ─── Provider Set Password (after admin approval) ─────────────────────────────

  async setPassword(dto: SetPasswordDto): Promise<{ message: string }> {
    // The token is a signed JWT with purpose=set_password
    let payload: any;
    try {
      payload = this.jwtService.verify(dto.token, {
        secret: this.configService.get<string>('JWT_ACCESS_SECRET'),
      });
    } catch {
      throw new BadRequestException({ code: 'AUTH_006', message: 'Invalid or expired token' });
    }

    if (payload.purpose !== 'set_password') {
      throw new BadRequestException({ code: 'AUTH_006', message: 'Invalid token' });
    }

    const user = await this.usersService.findById(payload.sub);
    if (!user) throw new BadRequestException({ code: 'AUTH_006', message: 'Invalid token' });

    user.password = await bcrypt.hash(dto.password, 12);
    user.isEmailVerified = true;
    await this.usersService.save(user);

    return { message: 'Password set successfully. You can now log in.' };
  }

  // ─── Refresh Token ────────────────────────────────────────────────────────────

  async refresh(dto: RefreshTokenDto, req: Request, res: Response): Promise<any> {
    const clientType = this.getClientType(req);

    // Get token from cookie (web) or body (mobile)
    const incomingToken = clientType === 'web'
      ? req.cookies?.refresh_token
      : dto.refreshToken;

    if (!incomingToken) {
      throw new UnauthorizedException({ code: 'AUTH_010', message: 'No refresh token provided' });
    }

    // Verify the token signature and expiry
    let payload: any;
    try {
      payload = this.jwtService.verify(incomingToken, {
        secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
      });
    } catch {
      throw new UnauthorizedException({ code: 'AUTH_010', message: 'Invalid refresh token' });
    }

    const user = await this.usersService.findById(payload.sub);
    if (!user) throw new UnauthorizedException({ code: 'AUTH_010', message: 'Invalid refresh token' });

    // Find matching stored token by comparing hash
    const storedTokens = await this.usersService.findRefreshTokensByUser(user.id);
    let matchedToken: RefreshToken | null = null;

    for (const stored of storedTokens) {
      if (await bcrypt.compare(incomingToken, stored.tokenHash)) {
        matchedToken = stored;
        break;
      }
    }

    if (!matchedToken) {
      // Token not found in DB — possible token theft, invalidate all
      await this.usersService.deleteAllRefreshTokensForUser(user.id);
      throw new UnauthorizedException({ code: 'AUTH_010', message: 'Invalid refresh token' });
    }

    // Check absolute expiry
    if (new Date() > matchedToken.absoluteExpiresAt) {
      await this.usersService.deleteRefreshToken(matchedToken.id);
      throw new UnauthorizedException({ code: 'AUTH_010', message: 'Session expired. Please log in again.' });
    }

    // Rotate: delete old token, issue new pair
    await this.usersService.deleteRefreshToken(matchedToken.id);
    const { accessToken, refreshToken } = await this.generateTokens(user);
    await this.storeRefreshToken(user.id, refreshToken, matchedToken.deviceId, matchedToken.platform);

    if (clientType === 'web') {
      this.setTokenCookies(res, accessToken, refreshToken);
      return { message: 'Token refreshed' };
    } else {
      return { message: 'Token refreshed', accessToken, refreshToken };
    }
  }

  // ─── Resend OTP ──────────────────────────────────────────────────────────────

  async resendOtp(email: string, purpose: OtpPurpose): Promise<{ message: string }> {
    const user = await this.usersService.findByEmail(email);
    // Always return same message to prevent email enumeration
    if (!user) return { message: 'If that email exists, a new OTP has been sent.' };

    await this.createAndSendOtp(user, purpose);
    return { message: 'A new OTP has been sent to your email.' };
  }

  // ─── Logout ───────────────────────────────────────────────────────────────────

  async logout(req: Request, res: Response): Promise<{ message: string }> {
    const clientType = this.getClientType(req);
    const incomingToken = clientType === 'web'
      ? req.cookies?.refresh_token
      : req.headers['x-refresh-token'] as string;

    if (incomingToken) {
      // Find and delete only this device's token
      const user = req['user'] as User;
      if (user) {
        const storedTokens = await this.usersService.findRefreshTokensByUser(user.id);
        for (const stored of storedTokens) {
          if (await bcrypt.compare(incomingToken, stored.tokenHash)) {
            await this.usersService.deleteRefreshToken(stored.id);
            break;
          }
        }
      }
    }

    if (clientType === 'web') {
      this.clearTokenCookies(res);
    }

    return { message: 'Logged out successfully' };
  }

  // ─── Admin: Approve / Reject Provider ────────────────────────────────────────

  async approveProvider(userId: string): Promise<{ message: string }> {
    const user = await this.usersService.findById(userId);
    if (!user || !user.providerProfile) {
      throw new BadRequestException({ code: 'HTTP_400', message: 'Provider not found' });
    }

    await this.providerProfileRepo.update(user.providerProfile.id, {
      status: ProviderStatus.APPROVED,
    });

    // Generate a one-time set-password token (24h expiry)
    const token = this.jwtService.sign(
      { sub: user.id, purpose: 'set_password' },
      {
        secret: this.configService.get<string>('JWT_ACCESS_SECRET'),
        expiresIn: '24h',
      },
    );

    await this.mailService.sendProviderApprovalSetPassword(user.email, token);

    return { message: 'Provider approved. Set-password email sent.' };
  }

  async rejectProvider(userId: string): Promise<{ message: string }> {
    const user = await this.usersService.findById(userId);
    if (!user || !user.providerProfile) {
      throw new BadRequestException({ code: 'HTTP_400', message: 'Provider not found' });
    }

    await this.providerProfileRepo.update(user.providerProfile.id, {
      status: ProviderStatus.REJECTED,
    });

    await this.mailService.sendProviderRejection(user.email);

    return { message: 'Provider rejected.' };
  }
}