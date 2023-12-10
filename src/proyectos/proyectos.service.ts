import { Injectable, Inject } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ClientProxy } from '@nestjs/microservices';

import { firstValueFrom } from 'rxjs';

import { JwtService } from '@nestjs/jwt';
import { Proyectos } from './proyectos.entity';
import { CreateProyectoInput } from './dto/create-proyecto.input';

import { DeleteProyectoInput } from './dto/delete-proyecto.input';
import { normalize } from 'path';
import { AgregarEquipo } from './dto/agregar-equipo.input';
import { DeleteEquipoInput } from './dto/delete-equipo.input';
@Injectable()
export class ProyectosService {
    constructor(@Inject('PROYECTO_SERVICE') private readonly client: ClientProxy,@InjectRepository(Proyectos) private proyectosRepository:Repository<Proyectos>,private jwtService: JwtService){}
   
    async createProyecto(nombre: string, correoCreador: string): Promise<boolean> {
      
      
      const token = await firstValueFrom(this.client.send('new_proyecto_created',{nombre,correoCreador}))
      
      
      return token;
    }
    async deleteProyecto(deleteProyectoInput: DeleteProyectoInput, correo: string): Promise<boolean> {
        const name = deleteProyectoInput.name;
        
      
        
        
        const token = await firstValueFrom(this.client.send('delete_name_proyecto',{name,correo}))
        console.log(correo)
        return token;
      }
  async showInfoProyecto(correo: string): Promise<string> {
      
      
      const proyectoInfo = await firstValueFrom(this.client.send('show_info_proyecto',{correo}))
      
      
      return proyectoInfo;
    }

    async agregarEquipo(agregarEquipoInput: AgregarEquipo, correo: string): Promise<boolean> {
      const idProyecto = agregarEquipoInput.idProyecto
      const idEquipo = agregarEquipoInput.idEquipo;
       
      
     
      
      
      const token = await firstValueFrom(this.client.send('agregar_equipo',{idProyecto,idEquipo,correo}))
      
      return token;
    }


    async deleteEquipo(deleteEquipoInput: DeleteEquipoInput, correo: string): Promise<boolean> {
      const idP = deleteEquipoInput.idProyecto;
      const idE = deleteEquipoInput.idEquipo;
      
    
      
      
      const token = await firstValueFrom(this.client.send('delete_name_equipo',{idP,idE,correo}))
      
      return token;
    }
}
