import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface StandardResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

@Injectable()
export class ResponseInterceptor<T>
  implements NestInterceptor<T, StandardResponse<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<StandardResponse<T>> {
    return next.handle().pipe(
      map((res) => {
        // Controllers can return { message, data } to customize the message
        if (res && typeof res === 'object' && 'data' in res) {
          return {
            success: true,
            message: res.message ?? 'OK',
            data: res.data,
          };
        }
        return {
          success: true,
          message: 'OK',
          data: res,
        };
      }),
    );
  }
}