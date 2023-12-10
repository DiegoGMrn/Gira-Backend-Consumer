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
      },{
        name: 'ROLES_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://localhost:5672'],
          queue: 'roles_queue',
          queueOptions: {
            durable: false,
          },
        },
      },
    ]),TypeOrmModule.forRoot({
      
        "name": "default",
        "type": "postgres",
        "url": "postgres://rukwoxhs:UW_pQtefIkPwl35b87k25aq-2yyWESrv@isabelle.db.elephantsql.com/rukwoxhs", 
        "synchronize": true,
        "logging": true,
        "entities": ["src/entity/."],}),
      
     TypeOrmModule.forRoot({
      
        "name": "default",
        "type": "postgres",
        "url": "postgres://rukwoxhs:UW_pQtefIkPwl35b87k25aq-2yyWESrv@isabelle.db.elephantsql.com/rukwoxhs", 
        "synchronize": true,
        "logging": true,
        "entities": ["src/entity/."],}),
      
      
     ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
