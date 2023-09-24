import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(AppModule, {
    transport: Transport.RMQ,
    options: {
      urls: ['amqp://localhost:5672'],
      queue: 'cats_queue',
      queueOptions: {
        durable: false,
      },
    },
  });
  await app.listen();
  const app2 = await NestFactory.create(AppModule);
  const PORT = 4000; // Cambia 4000 al puerto que desees
  await app2.listen(PORT);
}
bootstrap();
