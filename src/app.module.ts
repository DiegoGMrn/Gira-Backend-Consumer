import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Transport, ClientsModule } from '@nestjs/microservices';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import {join} from 'path'
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProyectosModule } from './proyectos/proyectos.module';
@Module({
  imports: [GraphQLModule.forRoot<ApolloDriverConfig>({
    driver: ApolloDriver,
    autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
  }),
  UsersModule,ProyectosModule,
    ClientsModule.register([
      {
        name: 'USERS_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://localhost:5672'],
          queue: 'users_queue',
          queueOptions: {
            durable: false,
          },
        },
      },{
        name: 'PROYECTO_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://localhost:5672'],
          queue: 'proyecto_queue',
          queueOptions: {
            durable: false,
          },
        },
      },
    ]),TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3307,
      username: 'user_crud',
      password: 'root',
      database: 'db_crud',
      autoLoadEntities:true,
      synchronize: true,
      entities: [__dirname + '/**/*.entity{.ts,.js'],}),
     TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3310,
      username: 'user_crud2',
      password: 'root',
      database: 'db_crud2',
      autoLoadEntities:true,
      synchronize: true,
      entities: [__dirname + '/**/*.entity{.ts,.js'],})
     ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
