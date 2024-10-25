import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ResponseInterceptor } from './interceptors/response.interceptor';
import { HttpExceptionFilter } from './filters/httpException.filter';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import Moralis from 'moralis';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new ResponseInterceptor());
  app.useGlobalFilters(new HttpExceptionFilter());
  const config = new DocumentBuilder()
    .setTitle('Blockchain price tracker')
    .setDescription('To Track the price of different tokens')
    .setVersion('1.0')
    .addTag('blockchain')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);
  await Moralis.start({
    apiKey: process.env.MORALISAPIKEY,
  });
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
