import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

// Triggers the JwtStrategy — verifies the token and attaches user to request
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}