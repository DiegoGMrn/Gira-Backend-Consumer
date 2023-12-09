import { Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { JwtService } from '@nestjs/jwt';
import { normalize } from 'path';
import { Roles } from './roles.entity';

@Injectable()
export class RolesService {
    constructor(@Inject('ROLES_SERVICE') private readonly client: ClientProxy,@InjectRepository(Roles) private rolesRepository:Repository<Roles>,private jwtService: JwtService){}
   
    async showInfoRoles(correo: string): Promise<string> {
      
      
        const rolesInfo = await firstValueFrom(this.client.send('show_info_roles',{correo}))
        
        
        return rolesInfo;
      }
    
}
