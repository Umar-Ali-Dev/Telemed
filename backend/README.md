# InstaVisitRX — Backend API

NestJS REST API serving the InstaVisitRX telemedicine platform.
Supports **web** (admin + provider portal) and **mobile** (patient app) simultaneously.

---

## Tech Stack

| Tool | Purpose |
|---|---|
| NestJS 10 | Framework |
| TypeORM + PostgreSQL | Database ORM |
| passport-jwt | JWT authentication |
| bcrypt | Password + OTP + token hashing |
| nodemailer | OTP + approval emails |
| @nestjs/throttler | Rate limiting |
| helmet | Secure HTTP headers |
| class-validator | DTO input validation |
| cookie-parser | HttpOnly cookie support for web |

---

## Project Structure

```
src/
├── main.ts                          # Boot: helmet, cors, cookies, validation, global prefix
├── app.module.ts                    # Root: ConfigModule, TypeORM, Throttler, feature modules
│
├── common/
│   ├── filters/http-exception.filter.ts     # All errors → { success: false, code, message }
│   └── interceptors/response.interceptor.ts # All success → { success: true, message, data }
│
├── users/
│   ├── entities/
│   │   ├── user.entity.ts           # users table — core user data, all roles
│   │   ├── provider-profile.entity.ts # provider_profiles — NPI, license, approval status
│   │   ├── patient-profile.entity.ts  # patient_profiles — DOB, gender, address
│   │   ├── refresh-token.entity.ts    # refresh_tokens — per-device, bcrypt hashed
│   │   └── otp-record.entity.ts       # otp_records — bcrypt hashed, rate limited
│   ├── users.service.ts             # All DB queries
│   └── users.module.ts
│
├── mail/
│   ├── mail.service.ts              # sendOtp(), sendProviderApproval(), sendRejection()
│   └── mail.module.ts
│
└── auth/
    ├── dto/                         # Input validation shapes
    │   ├── login.dto.ts
    │   ├── verify-otp.dto.ts
    │   ├── register-provider.dto.ts
    │   ├── register-patient.dto.ts
    │   ├── forgot-password.dto.ts
    │   ├── reset-password.dto.ts
    │   ├── set-password.dto.ts
    │   └── refresh-token.dto.ts
    ├── strategies/
    │   └── jwt.strategy.ts          # Reads JWT from cookie (web) or Bearer header (mobile)
    ├── guards/
    │   ├── jwt-auth.guard.ts        # @UseGuards(JwtAuthGuard) — protect routes
    │   └── roles.guard.ts           # @UseGuards(RolesGuard) + @Roles('admin')
    ├── decorators/
    │   ├── roles.decorator.ts       # @Roles('admin', 'provider')
    │   └── current-user.decorator.ts # @CurrentUser() — pulls req.user
    ├── auth.service.ts              # All business logic
    ├── auth.controller.ts           # 11 HTTP endpoints
    └── auth.module.ts
```

---

## API Endpoints

All routes prefixed with `/api/v1`

| Method | Route | Auth | Description |
|---|---|---|---|
| POST | `/auth/login` | Public | Validate credentials → send OTP |
| POST | `/auth/verify-otp` | Public | Verify OTP → issue tokens |
| POST | `/auth/register/provider` | Public | Provider signup → send email OTP |
| POST | `/auth/register/patient` | Public | Patient signup → send email OTP |
| POST | `/auth/forgot-password` | Public | Send password reset OTP |
| POST | `/auth/reset-password` | Public | Verify OTP → set new password |
| POST | `/auth/set-password` | Public (token) | Provider sets password after approval |
| POST | `/auth/refresh` | Public (token) | Rotate refresh token → new tokens |
| POST | `/auth/logout` | JWT required | Delete device token + clear cookies |
| POST | `/auth/providers/:id/approve` | Admin only | Approve provider + send set-password email |
| POST | `/auth/providers/:id/reject` | Admin only | Reject provider + send rejection email |

---

## Roles

| Role | Registration | Approval | Portal |
|---|---|---|---|
| `admin` | Manual DB seed | N/A | Web |
| `provider` | Request-based (no password at signup) | Admin must approve | Web |
| `patient` | Self-register with password | None | Mobile app |

---

## Auth Flow

### Login (all roles — 2 steps)
```
POST /auth/login       { email, password }
→ validates credentials, checks lockout, sends OTP
→ returns { message, email }

POST /auth/verify-otp  { email, otp, purpose: "login" }
→ verifies OTP
→ web:    sets HttpOnly cookies (access_token, refresh_token)
→ mobile: returns { accessToken, refreshToken } in body
```

### Provider Signup
```
POST /auth/register/provider  { email, firstName, lastName, ... }
→ creates user (no password), provider profile (status=pending)
→ sends email verification OTP

POST /auth/verify-otp  { email, otp, purpose: "email_verification" }
→ marks email verified → "pending admin approval" message

Admin: POST /auth/providers/:id/approve
→ status=approved, sends set-password link (JWT token, 24h expiry)

User: POST /auth/set-password  { token, password }
→ account fully active, can now log in
```

### Forgot Password
```
POST /auth/forgot-password  { email }
POST /auth/reset-password   { email, otp, newPassword }
```

### Token Refresh
```
# Web — reads refresh_token cookie automatically
POST /auth/refresh

# Mobile — send token in body
POST /auth/refresh  { refreshToken }
```

---

## Client Detection

Send header on every request:
```
x-client-type: web     # default
x-client-type: mobile
```

Also send for device tracking:
```
x-device-id: <unique-device-uuid>   # for per-device logout
x-platform: ios | android           # mobile only
```

---

## Response Shape

**Success**
```json
{ "success": true, "message": "...", "data": { ... } }
```

**Error**
```json
{ "success": false, "code": "AUTH_001", "message": "..." }
```

### Error Codes
| Code | Meaning |
|---|---|
| AUTH_001 | Invalid credentials |
| AUTH_002 | Account locked |
| AUTH_003 | Account pending approval |
| AUTH_004 | Account inactive |
| AUTH_005 | Email not verified |
| AUTH_006 | Invalid or expired OTP |
| AUTH_007 | OTP max attempts exceeded |
| AUTH_008 | OTP rate limit exceeded |
| AUTH_009 | Email already registered |
| AUTH_010 | Invalid refresh token |
| AUTH_011 | Account rejected |

---

## Security

- Passwords: bcrypt rounds 12
- OTPs: bcrypt rounds 10, 6-digit, 10min expiry
- OTP rate limit: max 3 requests per 15min window
- OTP attempts: max 5 wrong → OTP invalidated
- Login lockout: 5 failed attempts → 15min lock
- Refresh tokens: stored as bcrypt hash per device, never raw
- Token theft detection: token not in DB → wipe ALL tokens for user
- Cookies: HttpOnly always; Secure + SameSite=None in prod; Lax in dev
- Rate limiting: 20 requests/min per IP (global)

---

## Setup & Running

### 1. Create PostgreSQL database
```bash
createdb instavisit
```

### 2. Configure environment
Edit `backend/.env` — fill in:
- `DB_PASSWORD` — your postgres password
- `MAIL_HOST`, `MAIL_PORT`, `MAIL_USER`, `MAIL_PASS` — Mailtrap credentials (dev)
- `JWT_ACCESS_SECRET`, `JWT_REFRESH_SECRET` — change to random 32+ char strings

### 3. Run in dev mode
```bash
cd backend
npm run start:dev
```
TypeORM will auto-create all tables on first run (`synchronize: true` in dev).

### 4. Seed first admin
```bash
# Generate bcrypt hash of your password first
node -e "const b=require('bcrypt'); b.hash('yourpassword',12).then(console.log)"
```

Then insert into DB:
```sql
INSERT INTO users (id, email, password, role, "firstName", "lastName", "isActive", "isEmailVerified")
VALUES (
  gen_random_uuid(),
  'admin@instavisit.com',
  '<paste_bcrypt_hash>',
  'admin',
  'Admin',
  'User',
  true,
  true
);
```

---

## Environment Variables

| Variable | Example | Description |
|---|---|---|
| `PORT` | `3000` | API port |
| `CLIENT_ORIGIN` | `http://localhost:5173` | Frontend URL for CORS |
| `NODE_ENV` | `development` | Affects cookie config + DB sync |
| `DB_HOST` | `localhost` | Postgres host |
| `DB_PORT` | `5432` | Postgres port |
| `DB_USERNAME` | `postgres` | Postgres user |
| `DB_PASSWORD` | `postgres` | Postgres password |
| `DB_NAME` | `instavisit` | Database name |
| `JWT_ACCESS_SECRET` | `...32chars...` | Access token signing secret |
| `JWT_REFRESH_SECRET` | `...32chars...` | Refresh token signing secret |
| `JWT_ACCESS_EXPIRES_IN` | `15m` | Access token TTL |
| `JWT_REFRESH_EXPIRES_IN` | `7d` | Refresh token rolling TTL |
| `JWT_REFRESH_ABSOLUTE_DAYS` | `30` | Refresh token absolute max days |
| `MAIL_HOST` | `sandbox.smtp.mailtrap.io` | SMTP host |
| `MAIL_PORT` | `2525` | SMTP port |
| `MAIL_USER` | `...` | SMTP username |
| `MAIL_PASS` | `...` | SMTP password |
| `MAIL_FROM` | `InstaVisitRX <no-reply@...>` | From address |
| `OTP_EXPIRY_MINUTES` | `10` | OTP validity window |
| `OTP_MAX_ATTEMPTS` | `5` | Wrong attempts before OTP invalidated |
| `OTP_MAX_REQUESTS` | `3` | Max OTP requests per window |
| `OTP_REQUEST_WINDOW_MINUTES` | `15` | Rate limit window |
| `LOGIN_MAX_ATTEMPTS` | `5` | Failed logins before lockout |
| `LOGIN_LOCKOUT_MINUTES` | `15` | Lockout duration |
