import { Query, Resolver,Args,Mutation,Context } from '@nestjs/graphql';
import { CreateProyectoInput } from './dto/create-proyecto.input';
import { Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ProyectosService } from './proyectos.service';
import * as jwt from 'jsonwebtoken';
import { JwtPayload } from 'jsonwebtoken';
import { DeleteProyectoInput } from './dto/delete-proyecto.input';
import { AgregarEquipo } from './dto/agregar-equipo.input';

@Resolver()
export class ProyectosResolver {
    constructor(@Inject('PROYECTO_SERVICE') private client: ClientProxy,private proyectoService: ProyectosService){}
    
    @Mutation(() => Boolean)
      async createProyecto(
        @Args('proyectoInput') proyectoInput: CreateProyectoInput,@Context() context,) {
        const authorization = context.req.headers.authorization;
        
        if (!authorization) {
          throw new Error('No se proporcionó un tokeen de autorización.');
        }
        try {
          const decoded = jwt.verify(authorization,'tu_clave_secreta') as JwtPayload;;
          
          const correo = decoded.correo
          
          if(decoded){
            
            const result = await this.proyectoService.createProyecto(proyectoInput.name,correo);
            
            return result
          }
        } catch (error) {
          throw new Error('Token no válido. Verificación fallida.');
        }
      }
    @Mutation(() => Boolean)
      async deleteProyecto(
        @Args('deleteProyectoInput') deleteProyectoInput: DeleteProyectoInput,@Context() context,) {
        const authorization = context.req.headers.authorization;
        if (!authorization) {
          throw new Error('No se proporcionó un token de autorización.');
        }
        try {
          const decoded = jwt.verify(authorization, 'tu_clave_secreta') as JwtPayload;;
          const correo = decoded.correo
          if(decoded){
            const result = await this.proyectoService.deleteProyecto(deleteProyectoInput,correo);
            return result
          }
        } catch (error) {
          throw new Error('Token no válido. Verificación fallida.');
        }
      }

      @Query(() => String)
      async showInfoProyecto(@Context() context): Promise<string> {
        const authorization = context.req.headers.authorization;

        if (!authorization) {
          throw new Error('No se proporcionó un token de autorización.');
        }

        try {
          const decoded = jwt.verify(authorization, 'tu_clave_secreta') as JwtPayload;
          const correo = decoded.correo;

          if (decoded) {
            const result = await this.proyectoService.showInfoProyecto(correo);
            const jsonResult = JSON.stringify(result);
            return jsonResult;
          }
        } catch (error) {
          throw new Error('Token no válido. Verificación fallida.');
        }
      }

      @Mutation(() => Boolean)
      async agregarEquipo(
        @Args('agregarEquipo') agregarEquipo: AgregarEquipo,@Context() context,) {
        const authorization = context.req.headers.authorization;
        if (!authorization) {
          throw new Error('No se proporcionó un token de autorización.');
        }
        try {
          const decoded = jwt.verify(authorization, 'tu_clave_secreta') as JwtPayload;;
          const correo = decoded.correo
          if(decoded){
            const result = await this.proyectoService.agregarEquipo(agregarEquipo,correo);
            return result
          }
        } catch (error) {
          throw new Error('Token no válido. Verificación fallida.');
        }
      }
      
}


