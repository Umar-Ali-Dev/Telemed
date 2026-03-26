import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  OneToMany,
} from 'typeorm';
import { ProviderProfile } from './provider-profile.entity';
import { PatientProfile } from './patient-profile.entity';
import { RefreshToken } from './refresh-token.entity';
import { OtpRecord } from './otp-record.entity';

export enum UserRole {
  ADMIN = 'admin',
  PROVIDER = 'provider',
  PATIENT = 'patient',
}

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  // Nullable because providers don't set a password at signup — admin approves first
  @Column({ nullable: true })
  password: string | null;

  @Column({ type: 'enum', enum: UserRole })
  role: UserRole;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ nullable: true })
  phone: string | null;

  // Whether the user account is active (admin can deactivate)
  @Column({ default: true })
  isActive: boolean;

  // Whether the user verified their email via OTP
  @Column({ default: false })
  isEmailVerified: boolean;

  // Failed login attempt counter — resets on successful login
  @Column({ default: 0 })
  loginAttempts: number;

  // If set, login is blocked until this timestamp
  @Column({ type: 'timestamptz', nullable: true })
  lockedUntil: Date | null;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // Relations
  @OneToOne(() => ProviderProfile, (profile) => profile.user, { cascade: true, nullable: true })
  providerProfile: ProviderProfile | null;

  @OneToOne(() => PatientProfile, (profile) => profile.user, { cascade: true, nullable: true })
  patientProfile: PatientProfile | null;

  @OneToMany(() => RefreshToken, (token) => token.user, { cascade: true })
  refreshTokens: RefreshToken[];

  @OneToMany(() => OtpRecord, (otp) => otp.user, { cascade: true })
  otpRecords: OtpRecord[];
}