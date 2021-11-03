import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { enviroment } from './enviroment';

async function bootstrap () {
  const app = await NestFactory.create(AppModule);
  await app.listen(enviroment.PORT);
}
bootstrap();
