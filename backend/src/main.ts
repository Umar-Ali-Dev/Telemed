import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as cookieParser from 'cookie-parser';
import helmet from 'helmet';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { ResponseInterceptor } from './common/interceptors/response.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT', 3000);
  const clientOrigin = configService.get<string>('CLIENT_ORIGIN', 'http://localhost:5173');

  app.use(helmet());
  app.use(cookieParser());

  app.enableCors({
    origin: clientOrigin,
    credentials: true,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,         // strip unknown fields from request body
      forbidNonWhitelisted: true, // throw error if unknown fields are sent
      transform: true,         // auto-convert strings to numbers/booleans where typed
    }),
  );

  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalInterceptors(new ResponseInterceptor());

  app.setGlobalPrefix('api/v1');

  await app.listen(port);
  console.log(`InstaVisitRX API running on port ${port}`);
}

bootstrap();