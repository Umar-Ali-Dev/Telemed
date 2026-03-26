import client from './client';
import type { Role, OtpPurpose } from '../constants/roles';

// ─── Types ────────────────────────────────────────────────────────────────────

export interface LoginResponse {
  message: string;
  email: string;
}

export interface VerifyOtpResponse {
  message: string;
  role?: Role;
}

export interface RegisterProviderPayload {
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  npiNumber?: string;
  credentials?: string;
  licenseNumber?: string;
  licenseState?: string;
}

// ─── Auth API calls ───────────────────────────────────────────────────────────

// Step 1 of login — validates credentials and sends OTP to email
export const login = async (email: string, password: string): Promise<LoginResponse> => {
  const res = await client.post('/auth/login', { email, password });
  return res.data;
};

// Step 2 of login — verifies OTP, sets cookies (web), returns role
export const verifyOtp = async (
  email: string,
  otp: string,
  purpose: OtpPurpose,
): Promise<VerifyOtpResponse> => {
  const res = await client.post('/auth/verify-otp', { email, otp, purpose });
  return res.data;
};

// Provider signup — no password, sends email verification OTP
export const registerProvider = async (
  payload: RegisterProviderPayload,
): Promise<{ message: string; email: string }> => {
  const res = await client.post('/auth/register/provider', payload);
  return res.data;
};

// Sends password reset OTP to email
export const forgotPassword = async (email: string): Promise<{ message: string }> => {
  const res = await client.post('/auth/forgot-password', { email });
  return res.data;
};

// Resets password using OTP from forgot-password flow
export const resetPassword = async (
  email: string,
  otp: string,
  newPassword: string,
): Promise<{ message: string }> => {
  const res = await client.post('/auth/reset-password', { email, otp, newPassword });
  return res.data;
};

// Sets password for newly approved provider using token from email link
export const setPassword = async (
  token: string,
  password: string,
): Promise<{ message: string }> => {
  const res = await client.post('/auth/set-password', { token, password });
  return res.data;
};

// Resend OTP for any purpose
export const resendOtp = async (email: string, purpose: OtpPurpose): Promise<{ message: string }> => {
  const res = await client.post('/auth/resend-otp', { email, purpose });
  return res.data;
};

// Refresh access token — web reads cookie automatically
export const refreshToken = async (): Promise<void> => {
  await client.post('/auth/refresh');
};

// Logout — clears cookies and deletes device refresh token from DB
export const logout = async (): Promise<void> => {
  await client.post('/auth/logout');
};