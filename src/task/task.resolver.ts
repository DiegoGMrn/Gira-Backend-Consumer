import { Query, Resolver,Args,Mutation,Context } from '@nestjs/graphql';

import { Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

import * as jwt from 'jsonwebtoken';
import { JwtPayload } from 'jsonwebtoken';
import { TaskService } from './task.service';
import { CreateTaskInput } from './dtos/create-task.input';
import { CreateTaskDescripcionInput } from './dtos/añadir-descripcion.input';

import { DeleteTaskInput } from './dtos/delete-task.input';
import { CreateTaskComentaryInput } from './dtos/añadir-comentario.input';
import { UpdateTaskComentaryInput } from './dtos/update-comentario.input';
import { DeleteComentaryInput } from './dtos/delete-comentariy.input';
import { ShowTaskProjectInput } from './dtos/show-task-proyect.input';
import { ShowSoloTaskProjectInput } from './dtos/show-solotask-project.input';




@Resolver()
export class TaskResolver {
    constructor(@Inject('TASK_SERVICE') private client: ClientProxy,private taskService: TaskService){}
    
    @Mutation(() => Boolean)
    async createTask(
      @Args('taskInput') taskInput: CreateTaskInput,@Context() context,) {
      const authorization = context.req.headers.authorization;
      
      if (!authorization) {
        throw new Error('No se proporcionó un tokeen de autorización.');
      }
      try {
        const decoded = jwt.verify(authorization,'tu_clave_secreta') as JwtPayload;;
        
        const correo = decoded.correo
        //console.log("asd1",taskInput.fechaV)
        if(decoded){
          
          const result = await this.taskService.createTask(taskInput.name,taskInput.fechaV,correo,taskInput.idEquipo,taskInput.idProyecto);
          
          return result
        }
      } catch (error) {
        throw new Error('Token no válido. Verificación fallida.');
      }
    }
    @Mutation(() => Boolean)
    async deleteTask(
      @Args('taskDeleteInput') taskDeleteInput: DeleteTaskInput,@Context() context,) {
      const authorization = context.req.headers.authorization;
      
      if (!authorization) {
        throw new Error('No se proporcionó un tokeen de autorización.');
      }
      try {
        const decoded = jwt.verify(authorization,'tu_clave_secreta') as JwtPayload;;
        
        const correo = decoded.correo
        //console.log("asd1",taskInput.fechaV)
        if(decoded){
          
          const result = await this.taskService.deleteTask(taskDeleteInput.idTask,correo);
          
          return result
        }
      } catch (error) {
        throw new Error('Token no válido. Verificación fallida.');
      }
    }
    @Mutation(() => Boolean)
    async createTaskDescripcion(
      @Args('taskDescripcionInput') taskDescripcionInput: CreateTaskDescripcionInput,@Context() context,) {
      const authorization = context.req.headers.authorization;
      
      if (!authorization) {
        throw new Error('No se proporcionó un tokeen de autorización.');
      }
      try {
        const decoded = jwt.verify(authorization,'tu_clave_secreta') as JwtPayload;;
        
        const correo = decoded.correo
        //console.log("asd1",taskInput.fechaV)
        if(decoded){
          
          const result = await this.taskService.createTaskDescripcion(taskDescripcionInput.idTask,taskDescripcionInput.descripcion);
          
          return result
        }
      } catch (error) {
        throw new Error('Token no válido. Verificación fallida.');
      }
    }

    @Mutation(() => Boolean)
    async createTaskComentary(
      @Args('taskComentaryInput') taskComentaryInput: CreateTaskComentaryInput,@Context() context,) {
      const authorization = context.req.headers.authorization;
      
      if (!authorization) {
        throw new Error('No se proporcionó un tokeen de autorización.');
      }
      try {
        const decoded = jwt.verify(authorization,'tu_clave_secreta') as JwtPayload;;
        
        const correo = decoded.correo
        
        if(decoded){
          
          const result = await this.taskService.createTaskComentary(taskComentaryInput.idProyecto,taskComentaryInput.idEquipo,taskComentaryInput.idTarea,taskComentaryInput.comentario);
          
          return result
        }
      } catch (error) {
        throw new Error('Token no válido. Verificación fallida.');
      }
    }
    @Mutation(() => Boolean)
    async updateTaskComentary(
      @Args('updateTaskComentaryInput') updateTaskComentaryInput: UpdateTaskComentaryInput,@Context() context,) {
      const authorization = context.req.headers.authorization;
      
      if (!authorization) {
        throw new Error('No se proporcionó un tokeen de autorización1.');
      }
      try {
        const decoded = jwt.verify(authorization,'tu_clave_secreta') as JwtPayload;;
        
        const correo = decoded.correo
        
        if(decoded){
          
          const result = await this.taskService.updateTaskComentary(updateTaskComentaryInput.idComentary,updateTaskComentaryInput.comentario,updateTaskComentaryInput.idTask,correo);
          
          return result
        }
      } catch (error) {
        throw new Error('Token no válido1. Verificación fallida.');
      }
    }
    @Mutation(() => Boolean)
    async deleteComentary(
      @Args('comentaryDeleteInput') comentaryDeleteInput: DeleteComentaryInput,@Context() context,) {
      const authorization = context.req.headers.authorization;
      
      if (!authorization) {
        throw new Error('No se proporcionó un tokeen de autorización.');
      }
      try {
        const decoded = jwt.verify(authorization,'tu_clave_secreta') as JwtPayload;;
        
        const correo = decoded.correo
        //console.log("asd1",taskInput.fechaV)
        if(decoded){
          
          const result = await this.taskService.deleteComentary(comentaryDeleteInput.idComentary,correo);
          
          return result
        }
      } catch (error) {
        throw new Error('Token no válido. Verificación fallida.');
      }
    }
    @Query(() => String)
    async showTaskProject(
      @Args('mostrarTaskProject') mostrarTaskProject: ShowTaskProjectInput,@Context() context,) {
      const authorization = context.req.headers.authorization;
      
      if (!authorization) {
        throw new Error('No se proporcionó un tokeen de autorización1.');
      }
      try {
        const decoded = jwt.verify(authorization,'tu_clave_secreta') as JwtPayload;;
        
        const correo = decoded.correo
        
        if(decoded){
          
          const result = await this.taskService.showInfoTaskProject(mostrarTaskProject.idTask,correo);
          const jsonResult = JSON.stringify(result);
          return jsonResult;
        }
      } catch (error) {
        throw new Error('Token no válido. Verificación fallida.');
      }
    }

    @Query(() => String)
    async showSoloTaskProject(
      @Args('mostrarSoloTaskProject') mostrarSoloTaskProject: ShowSoloTaskProjectInput,
      @Context() context,
    ) {
      const authorization = context.req.headers.authorization;

      if (!authorization) {
        throw new Error('No se proporcionó un token de autorización1.');
      }

      try {
        const decoded = jwt.verify(authorization, 'tu_clave_secreta') as JwtPayload;
        const correo = decoded.correo;

        if (decoded) {
          
          const result = await this.taskService.showSoloInfoTaskProject(mostrarSoloTaskProject.idProyecto, correo);
          const jsonResult = JSON.stringify(result);
          return jsonResult;
        }
      } catch (error) {
        throw new Error('Token no válido1. Verificación fallida.');
      }
    }
}



