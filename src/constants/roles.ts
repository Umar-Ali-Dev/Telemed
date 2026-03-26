export const ROLES = {
  ADMIN: 'admin',
  PROVIDER: 'provider',
  PATIENT: 'patient',
} as const;

export type Role = (typeof ROLES)[keyof typeof ROLES];

// Where each role lands after login
export const ROLE_DASHBOARDS: Record<Role, string> = {
  [ROLES.ADMIN]: '/admin/dashboard',
  [ROLES.PROVIDER]: '/provider/dashboard',
  [ROLES.PATIENT]: '/', // mobile only — no web dashboard
};

export const OTP_PURPOSES = {
  LOGIN: 'login',
  EMAIL_VERIFICATION: 'email_verification',
  PASSWORD_RESET: 'password_reset',
} as const;

export type OtpPurpose = (typeof OTP_PURPOSES)[keyof typeof OTP_PURPOSES];