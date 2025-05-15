import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SuccessResponse } from './lib/dataHandle';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalInterceptors(new SuccessResponse());
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap().catch((err) => {
  console.error('Error starting the application:', err);
  process.exit(1);
});
