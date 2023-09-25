import { Module } from '@nestjs/common';
import { CatsResolver } from './cats.resolver';
import { CatsService } from './cats.service';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import {join} from 'path'
import { Transport, ClientsModule } from '@nestjs/microservices';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cats } from './cats.entity';
@Module({
  imports: [GraphQLModule.forRoot<ApolloDriverConfig>({
    driver: ApolloDriver,
    autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
  }),
  CatsModule,
    ClientsModule.register([
      {
        name: 'CATS_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://localhost:5672'],
          queue: 'cats_queue',
          queueOptions: {
            durable: false,
          },
        },
      },
    ]),TypeOrmModule.forFeature([Cats]),
    ],
  providers: [CatsResolver, CatsService]

})
export class CatsModule {}
