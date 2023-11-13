import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { Transport, ClientsModule } from '@nestjs/microservices';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProyectosResolver } from './proyectos.resolver';
import { ProyectosService } from './proyectos.service';
import { JwtModule } from '@nestjs/jwt'; // Asegúrate de importar JwtModule
import { Proyectos } from './proyectos.entity';
import { EquipoProyecto } from './equiposProyecto.entity';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      
    }),
    ProyectosModule,
    ClientsModule.register([
      {
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
    ]),
    TypeOrmModule.forFeature([Proyectos,EquipoProyecto]),
    JwtModule.register({
      secret: 'tu_clave_secreta', // Reesmplaza2 con tu clave secreta real
      signOptions: { expiresIn: '1h' }, // Opciones de firma del token
    }),
  ],
  providers: [ProyectosResolver, ProyectosService],
})
export class ProyectosModule {}
