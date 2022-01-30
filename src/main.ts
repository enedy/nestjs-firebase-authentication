import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { initializeApp } from 'firebase/app';
import { VersioningType } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();
  app.enableVersioning({
    type: VersioningType.URI,
  });

  app.setGlobalPrefix('api');

  const config = new DocumentBuilder()
    .setTitle('Firebase SSO')
    .setDescription('Firebase SSO Api description')
    .setVersion('1.0')
    // .addTag('template')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/', app, document);

  const firebaseConfig = {
    apiKey: process.env.API_KEY,
    authDomain: process.env.AUTH_DOMAIN,
    projectId: process.env.PROJECT_ID,
    storageBucket: process.env.STORAGE_BUCKET,
    messagingSenderId: process.env.MESSAGIN_SENDER_ID,
    appId: process.env.APP_ID,
  };

  // Initialize Firebase
  initializeApp(firebaseConfig);

  await app.listen(3000);
}
bootstrap();
