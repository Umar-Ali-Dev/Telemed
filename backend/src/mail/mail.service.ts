import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailService {
  private transporter: nodemailer.Transporter;
  private readonly logger = new Logger(MailService.name);

  constructor(private configService: ConfigService) {
    this.transporter = nodemailer.createTransport({
      host: this.configService.get<string>('MAIL_HOST'),
      port: this.configService.get<number>('MAIL_PORT'),
      auth: {
        user: this.configService.get<string>('MAIL_USER'),
        pass: this.configService.get<string>('MAIL_PASS'),
      },
    });
  }

  async sendOtp(to: string, otp: string, purpose: string): Promise<void> {
    const subjects: Record<string, string> = {
      login: 'Your InstaVisitRX Login Code',
      email_verification: 'Verify Your InstaVisitRX Email',
      password_reset: 'Reset Your InstaVisitRX Password',
    };

    const subject = subjects[purpose] ?? 'Your InstaVisitRX Code';

    await this.transporter.sendMail({
      from: this.configService.get<string>('MAIL_FROM'),
      to,
      subject,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 480px; margin: 0 auto;">
          <h2 style="color: #705295;">InstaVisitRX</h2>
          <p>Your one-time verification code is:</p>
          <div style="font-size: 36px; font-weight: bold; letter-spacing: 8px; color: #705295; margin: 24px 0;">
            ${otp}
          </div>
          <p>This code expires in 10 minutes.</p>
          <p style="color: #888; font-size: 12px;">If you did not request this, please ignore this email.</p>
        </div>
      `,
    });

    this.logger.log(`OTP email sent to ${to} for purpose: ${purpose}`);
  }

  async sendProviderApprovalSetPassword(to: string, token: string): Promise<void> {
    const clientOrigin = this.configService.get<string>('CLIENT_ORIGIN');
    const link = `${clientOrigin}/auth/set-password?token=${token}`;

    await this.transporter.sendMail({
      from: this.configService.get<string>('MAIL_FROM'),
      to,
      subject: 'Your InstaVisitRX Account Has Been Approved',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 480px; margin: 0 auto;">
          <h2 style="color: #705295;">InstaVisitRX</h2>
          <p>Congratulations! Your provider account has been approved.</p>
          <p>Please click the link below to set your password and activate your account:</p>
          <a href="${link}" style="
            display: inline-block;
            background: #705295;
            color: white;
            padding: 12px 24px;
            border-radius: 6px;
            text-decoration: none;
            margin: 16px 0;
          ">Set My Password</a>
          <p style="color: #888; font-size: 12px;">This link expires in 24 hours.</p>
        </div>
      `,
    });
  }

  async sendProviderRejection(to: string): Promise<void> {
    await this.transporter.sendMail({
      from: this.configService.get<string>('MAIL_FROM'),
      to,
      subject: 'InstaVisitRX — Account Application Update',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 480px; margin: 0 auto;">
          <h2 style="color: #705295;">InstaVisitRX</h2>
          <p>We regret to inform you that your provider account application could not be approved at this time.</p>
          <p>Please contact support for more information.</p>
        </div>
      `,
    });
  }
}