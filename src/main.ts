import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { json, urlencoded } from 'express';
import process from 'process';

async function bootstrap() {
  const isProd = process.env.NODE_ENV === 'production';
  const corsOptions = {
    origin: isProd
      ? ['https://musicapply.mkwsieci.pl']
      : ['http://localhost:3000'],
    credentials: true,
    allowedHeaders: 'Content-Type, Accept, Origin, Authorization, Cookie',
    preflightContinue: false,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  };
  const app = await NestFactory.create(AppModule);
  app.enableCors(corsOptions);
  app.enableCors({ origin: '*' });
  app.use(json({ limit: '50mb' }));
  app.use(urlencoded({ extended: true, limit: '50mb' }));
  await app.listen(process.env.PORT || 5000);
}

bootstrap();
