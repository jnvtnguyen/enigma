import { NestFactory } from '@nestjs/core';
import { json } from 'express';
import helmet from 'helmet';

import environment from '@/environment';
import App from '@/app';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(App);

  app.use(json());
  app.use(helmet());

  app.setGlobalPrefix(environment.app.globalPrefix);

  await app.listen(environment.app.port);
}

bootstrap().catch((error) => {
  console.error(error);
  process.exit();
});
