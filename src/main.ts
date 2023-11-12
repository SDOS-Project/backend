import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import helmet from 'helmet';
import { ValidationPipe } from '@nestjs/common';
import * as fs from 'fs';

async function bootstrap() {
  let httpsOptions = {};
  const isLocal = process.env.NODE_ENV !== 'production';

  if (!isLocal) {
    httpsOptions = {
      key: fs.readFileSync('./private-key.pem'),
      cert: fs.readFileSync('./public-cert.pem'),
    };
  }
  const app = await NestFactory.create(AppModule, { httpsOptions, cors: true });
  app.useGlobalPipes(new ValidationPipe());
  app.use(helmet());
  const config = new DocumentBuilder()
    .setTitle('SDOS APIs')
    .setDescription('The SDOS API description')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(5001);
}
bootstrap();
