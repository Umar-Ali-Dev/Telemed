import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from './user.entity';

export enum ProviderStatus {
  PENDING = 'pending',       // just signed up, awaiting email verification
  APPROVED = 'approved',     // admin approved, can log in
  REJECTED = 'rejected',     // admin rejected
}

@Entity('provider_profiles')
export class ProviderProfile {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => User, (user) => user.providerProfile, { onDelete: 'CASCADE' })
  @JoinColumn()
  user: User;

  @Column()
  userId: string;

  // National Provider Identifier — unique ID for healthcare providers in the US
  @Column({ nullable: true })
  npiNumber: string | null;

  @Column({ nullable: true })
  credentials: string | null;  // e.g. "MD", "DO", "NP"

  @Column({ nullable: true })
  licenseNumber: string | null;

  @Column({ type: 'date', nullable: true })
  licenseExpirationDate: Date | null;

  @Column({ nullable: true })
  licenseState: string | null;

  // Home address
  @Column({ nullable: true })
  homeStreetAddress: string | null;

  @Column({ nullable: true })
  homeCity: string | null;

  @Column({ nullable: true })
  homeState: string | null;

  @Column({ nullable: true })
  homeZipCode: string | null;

  // Practice address
  @Column({ nullable: true })
  practiceAddress: string | null;

  @Column({ type: 'enum', enum: ProviderStatus, default: ProviderStatus.PENDING })
  status: ProviderStatus;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}