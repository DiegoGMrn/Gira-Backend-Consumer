import { Query, Resolver,Args,Mutation,Context } from '@nestjs/graphql';

import { Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

import * as jwt from 'jsonwebtoken';
import { JwtPayload } from 'jsonwebtoken';
import { RolesService } from './roles.service';


@Resolver()
export class RolesResolver {
    constructor(@Inject('ROLES_SERVICE') private client: ClientProxy,private rolesService: RolesService){}

    @Query(() => String)
      async showInfoRoles(@Context() context): Promise<string> {
        const authorization = context.req.headers.authorization;

        if (!authorization) {
          throw new Error('No se proporcionó un token de autorización.');
        }

        try {
          const decoded = jwt.verify(authorization, 'tu_clave_secreta') as JwtPayload;
          const correo = decoded.correo;

          if (decoded) {
            const result = await this.rolesService.showInfoRoles(correo);
            const jsonResult = JSON.stringify(result);
            return jsonResult;
          }
        } catch (error) {
          throw new Error('Token no válido. Verificación fallida.');
        }
      }
    
    
}


