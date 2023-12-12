import { Injectable, Inject } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ClientProxy } from '@nestjs/microservices';

import { JwtService } from '@nestjs/jwt';
import { Task } from './entitys/task.entity';
import { firstValueFrom } from 'rxjs';



@Injectable()
export class TaskService {
    constructor(@Inject('TASK_SERVICE') private readonly client: ClientProxy,@InjectRepository(Task) private taskRepository:Repository<Task>,private jwtService: JwtService){}
    
    async createTask(nombre: string,fechaV:string,correo:string,idEquipo:number,idProyecto:number): Promise<boolean> {
      
      
        const token = await firstValueFrom(this.client.send('new_task_created',{nombre,fechaV,correo,idEquipo,idProyecto}))
        
        return token;
      }

    async deleteTask(idTask:number,correo:string): Promise<boolean> {
    
      
        const token = await firstValueFrom(this.client.send('delete_task',{idTask,correo}))
        
        
        return token;
      }
    async createTaskDescripcion(idTask:number,descripcion:string): Promise<boolean> {
    
      
        const token = await firstValueFrom(this.client.send('new_taskDescripcion_created',{idTask,descripcion}))
        
        
        return token;
      }

    async createTaskComentary(idProyecto:number,idEquipo:number,idTarea:number,comentario:string): Promise<boolean> {
  
      
    const token = await firstValueFrom(this.client.send('new_taskComentary_created',{idProyecto,idEquipo,idTarea,comentario}))
    
    
    return token;
  }

  async updateTaskComentary(idComentary:number,comentario:string,idTask:number,correo:string): Promise<boolean> {
  
    console.log(idComentary)
    const token = await firstValueFrom(this.client.send('update_task_comentary',{idComentary,comentario,idTask,correo}))
    
    
    return token;
  }

  async deleteComentary(idComentary:number,correo:string): Promise<boolean> {
    
      
    const token = await firstValueFrom(this.client.send('delete_comentary',{idComentary,correo}))
    
    
    return token;
  }
  async showInfoTaskProject(idTask: number, correo: string): Promise<boolean> {
    try {
      const token = await firstValueFrom(this.client.send('show_task_project', { idTask, correo }));
      return token;
    } catch (error) {
      console.error('Error al procesar la solicitud en showInfoTaskProject:', error);
      return false;
    }
  }
  async showSoloInfoTaskProject(idProyecto: number, correo: string): Promise<string | null> {
    try {
        const result = await firstValueFrom(this.client.send('show_solotask_project', { idProyecto, correo }));
        //console.log(result)
        
        return result;
    } catch (error) {
        console.error('Error al procesar la solicitud en showInfoTaskProject:', error);
        return null;
    }
}
  

  
}
