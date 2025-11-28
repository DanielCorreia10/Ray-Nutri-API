import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const port = process.env.PORT || 3000;
  const frontendUrl = process.env.FRONTEND_URL;

  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');

  app.enableCors({
    origin: frontendUrl,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  app.useGlobalPipes(new ValidationPipe({
 transform: true,            
    whitelist: true,            
    forbidNonWhitelisted: false, // IMPORTANTE: Aceita campos extras sem dar erro
    skipMissingProperties: true, // IMPORTANTE: Aceita criar mesmo faltando campos obrigatórios
    disableErrorMessages: false, // Mantém mensagens de erro caso algo muito grave ocorra
  }));

  await app.listen(port);

  console.log(`🚀 APLICAÇÃO RODANDO NA PORTA: ${port}`);
}
bootstrap();