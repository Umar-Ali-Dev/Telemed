import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, MoreThan } from 'typeorm';
import { User } from './entities/user.entity';
import { RefreshToken } from './entities/refresh-token.entity';
import { OtpRecord, OtpPurpose } from './entities/otp-record.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepo: Repository<User>,

    @InjectRepository(RefreshToken)
    private refreshTokenRepo: Repository<RefreshToken>,

    @InjectRepository(OtpRecord)
    private otpRepo: Repository<OtpRecord>,
  ) {}

  // ─── User queries ───────────────────────────────────────────────────────────

  async findByEmail(email: string): Promise<User | null> {
    return this.usersRepo.findOne({
      where: { email },
      relations: ['providerProfile', 'patientProfile'],
    });
  }

  async findById(id: string): Promise<User | null> {
    return this.usersRepo.findOne({
      where: { id },
      relations: ['providerProfile', 'patientProfile'],
    });
  }

  async save(user: User): Promise<User> {
    return this.usersRepo.save(user);
  }

  async create(data: Partial<User>): Promise<User> {
    const user = this.usersRepo.create(data);
    return this.usersRepo.save(user);
  }

  // ─── Refresh token queries ───────────────────────────────────────────────────

  async saveRefreshToken(token: Partial<RefreshToken>): Promise<RefreshToken> {
    const record = this.refreshTokenRepo.create(token);
    return this.refreshTokenRepo.save(record);
  }

  async findRefreshTokensByUser(userId: string): Promise<RefreshToken[]> {
    return this.refreshTokenRepo.find({
      where: { userId },
    });
  }

  async findRefreshTokenByDevice(userId: string, deviceId: string): Promise<RefreshToken | null> {
    return this.refreshTokenRepo.findOne({ where: { userId, deviceId } });
  }

  async deleteRefreshToken(id: string): Promise<void> {
    await this.refreshTokenRepo.delete(id);
  }

  async deleteAllRefreshTokensForUser(userId: string): Promise<void> {
    await this.refreshTokenRepo.delete({ userId });
  }

  // ─── OTP queries ─────────────────────────────────────────────────────────────

  // Get the latest non-used OTP for a user+purpose
  async findLatestOtp(userId: string, purpose: OtpPurpose): Promise<OtpRecord | null> {
    return this.otpRepo.findOne({
      where: { userId, purpose, isUsed: false },
      order: { createdAt: 'DESC' },
    });
  }

  async saveOtp(otp: Partial<OtpRecord>): Promise<OtpRecord> {
    const record = this.otpRepo.create(otp);
    return this.otpRepo.save(record);
  }

  async markOtpUsed(id: string): Promise<void> {
    await this.otpRepo.update(id, { isUsed: true });
  }

  async incrementOtpAttempts(id: string, attempts: number): Promise<void> {
    await this.otpRepo.update(id, { attempts });
  }

  // Invalidate all previous OTPs for a user+purpose when a new one is created
  async invalidatePreviousOtps(userId: string, purpose: OtpPurpose): Promise<void> {
    await this.otpRepo.update(
      { userId, purpose, isUsed: false },
      { isUsed: true },
    );
  }
}