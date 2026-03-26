import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Response } from 'express';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(HttpExceptionFilter.name);

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Internal server error';
    let code = 'SERVER_ERROR';

    // Log non-HTTP errors (unexpected crashes) with full stack trace
    if (!(exception instanceof HttpException)) {
      const err = exception as any;
      this.logger.error(err?.message ?? 'Unknown error', err?.stack);
    }

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const res = exception.getResponse();

      if (typeof res === 'string') {
        message = res;
      } else if (typeof res === 'object' && res !== null) {
        const resObj = res as Record<string, any>;
        // Use our custom code if provided, otherwise derive from status
        code = resObj.code ?? `HTTP_${status}`;
        // ValidationPipe returns array of messages — join them
        message = Array.isArray(resObj.message)
          ? resObj.message.join('; ')
          : resObj.message ?? message;
      }
    }

    response.status(status).json({
      success: false,
      code,
      message,
    });
  }
}
