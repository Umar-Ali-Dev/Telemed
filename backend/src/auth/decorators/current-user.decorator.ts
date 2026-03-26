import { createParamDecorator, ExecutionContext } from '@nestjs/common';

// Instead of writing req.user in every controller, use @CurrentUser()
// Example: async getProfile(@CurrentUser() user: JwtPayload) { ... }
export const CurrentUser = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);