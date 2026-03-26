import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
} from 'typeorm';
import { User } from './user.entity';

export enum OtpPurpose {
  LOGIN = 'login',
  EMAIL_VERIFICATION = 'email_verification',
  PASSWORD_RESET = 'password_reset',
}

@Entity('otp_records')
export class OtpRecord {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, (user) => user.otpRecords, { onDelete: 'CASCADE' })
  @JoinColumn()
  user: User;

  @Column()
  userId: string;

  // bcrypt hash of the 6-digit OTP — never store raw
  @Column()
  codeHash: string;

  @Column({ type: 'enum', enum: OtpPurpose })
  purpose: OtpPurpose;

  // How many times user has tried a wrong code — invalidate after max
  @Column({ default: 0 })
  attempts: number;

  // Whether this OTP has been used or invalidated
  @Column({ default: false })
  isUsed: boolean;

  // OTP expires after 10 minutes
  @Column({ type: 'timestamptz' })
  expiresAt: Date;

  // Rate limiting: how many OTPs requested in the current window
  @Column({ default: 1 })
  requestCount: number;

  // Start of the rate limit window (resets after 15 min)
  @Column({ type: 'timestamptz' })
  requestWindowStart: Date;

  @CreateDateColumn()
  createdAt: Date;
}