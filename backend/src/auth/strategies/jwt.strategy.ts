import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';

export interface JwtPayload {
  sub: string;    // user id
  email: string;
  role: string;
}

// Extracts JWT from cookie (web) or Authorization header (mobile)
const cookieOrBearerExtractor = (req: Request): string | null => {
  // Check cookie first (web clients)
  if (req?.cookies?.access_token) {
    return req.cookies.access_token;
  }
  // Fall back to Bearer header (mobile clients)
  return ExtractJwt.fromAuthHeaderAsBearerToken()(req);
};

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private configService: ConfigService) {
    super({
      jwtFromRequest: cookieOrBearerExtractor,
      ignoreExpiration: false,   // reject expired tokens
      secretOrKey: configService.get<string>('JWT_ACCESS_SECRET'),
    });
  }

  // Called after token is verified — return value is attached to req.user
  async validate(payload: JwtPayload) {
    if (!payload.sub || !payload.role) {
      throw new UnauthorizedException();
    }
    return { id: payload.sub, email: payload.email, role: payload.role };
  }
}
