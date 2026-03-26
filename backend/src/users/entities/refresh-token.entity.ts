import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
} from 'typeorm';
import { User } from './user.entity';

export enum Platform {
  WEB = 'web',
  IOS = 'ios',
  ANDROID = 'android',
}

@Entity('refresh_tokens')
export class RefreshToken {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, (user) => user.refreshTokens, { onDelete: 'CASCADE' })
  @JoinColumn()
  user: User;

  @Column()
  userId: string;

  // We store bcrypt hash of the token, never the raw token
  @Column()
  tokenHash: string;

  // Unique per device so logout only affects one device
  @Column()
  deviceId: string;

  @Column({ type: 'enum', enum: Platform, default: Platform.WEB })
  platform: Platform;

  // FCM (Android) or APNs (iOS) push notification token — for mobile only
  @Column({ nullable: true })
  deviceToken: string | null;

  // Token expires after 7 days of inactivity (rolling)
  @Column({ type: 'timestamptz' })
  expiresAt: Date;

  // Token is always invalid after 30 days regardless of activity
  @Column({ type: 'timestamptz' })
  absoluteExpiresAt: Date;

  @CreateDateColumn()
  createdAt: Date;
}
