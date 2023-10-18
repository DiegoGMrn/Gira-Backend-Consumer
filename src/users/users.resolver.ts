import { Query, Resolver,Args,Mutation,Context } from '@nestjs/graphql';

import { UsersService } from './users.service';
import { Users } from './users.entity';
import { Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateUserInput } from './dto/create-user.input';
import { LoginUserInput } from './dto/login-user.input';
import { UpdatePasswordInput } from './dto/update-userpass.input';
import * as jwt from 'jsonwebtoken';
import { JwtPayload } from 'jsonwebtoken';
import { ConfirmCodeInput } from './dto/confirm-code.input';
import { RecoveryPassInput } from './dto/recovery-pass.input';
import { UpdatePasswordInput2 } from './dto/update2-userpass.input';
import { CreateEquipoInput } from './dto/create-equipo.input';
import { UpdateEquipoNameInput } from './dto/update-equipoName.input';
import { DeleteEquipoInput } from './dto/delete-equipo.input';
@Resolver()
export class UsersResolver {
    constructor(@Inject('USERS_SERVICE') private client: ClientProxy,private usersService: UsersService){}
    
    @Query(() =>[Users])
    user(){
        return this.usersService.findAll();
    }
    
   /////////////////////////////////////////////////////// USUARIOS  ///////////////////////////////////////////////////////
   
    @Mutation(() => Users)
    createUsers(@Args('userInput') userInput: CreateUserInput) {
    console.log(userInput)
    const result = this.usersService.createUser(userInput);
    
    return result;
    }

    @Mutation(() => String)
    async loginUsersTest(@Args('loginInput') loginInput: LoginUserInput) {
      try {
        
        const token = await this.usersService.loginUserTest(loginInput);
    
        if (token) {
            
          return token;
        } else {
          return "";
        }
      } catch (error) {
        console.error('Error en la llamada a loginUsersTest:', error);
        return "";
      }
    }
    

    @Mutation(() => Boolean)
    async resetPassword(
      @Args('resetPasswordInput') resetPasswordInput: UpdatePasswordInput,@Context() context,) {
      const authorization = context.req.headers.authorization;
      if (!authorization) {
        throw new Error('No se proporcionó un token de autorización.');
      }
      try {
        const decoded = jwt.verify(authorization, 'tu_clave_secreta') as JwtPayload;;
        const correo = decoded.correo
        if(decoded){
          const result = await this.usersService.updatePassUser(resetPasswordInput,correo);
          return result
        }
      } catch (error) {
        throw new Error('Token no válido. Verificación fallida.');
      }
    }
   
    @Mutation(() => String)
    async showInfo(@Context() context) {
      const authorization = context.req.headers.authorization;

      if (!authorization) {
        throw new Error('No se proporcionó un token de autorización.');
      }

      try {
        const decoded = jwt.verify(authorization, 'tu_clave_secreta') as JwtPayload;
        const correo = decoded.correo;

        if (decoded) {
          const result = await this.usersService.showInfo(correo);
          

      
          const jsonResult = JSON.stringify(result)
          return jsonResult;
        }
      } catch (error) {
        throw new Error('Token no válido. Verificación fallida.');
      }
    }


    
    @Mutation(() => String)
    async recoveryPass(@Args('recoveryPassInput') recoveryPassInput: RecoveryPassInput) {
      if (!recoveryPassInput.correo) {
        throw new Error('No se proporcionó un correo.');
      }
      try {
        if(recoveryPassInput.correo){
          const result = await this.usersService.recovery(recoveryPassInput.correo);
          console.log(result)
          return result
        }
      } catch (error) {
        throw new Error('Correo no válido. Verificación fallida.');
      }
    }

    @Mutation(() => Boolean)
    async confirmC(@Args('confirmCodeInput') confirmCodeInput: ConfirmCodeInput) {
      if (!confirmCodeInput) {
        throw new Error('No se proporcionó la autorización para Confirmar Codigo.');
      }
      try {
        if(confirmCodeInput){
          const result = await this.usersService.confirmCode(confirmCodeInput.correo,confirmCodeInput.code);

          return result
        }
      } catch (error) {
        throw new Error('Token no válido. Verificación fallida.');
      }
    }
    @Mutation(() => Boolean)
    async resetPassword2(@Args('resetPasswordInput') resetPasswordInput2: UpdatePasswordInput2) {
      const result = await this.usersService.updatePassUser2(resetPasswordInput2);
      return result
      }
    
    
   
    /////////////////////////////////////////////////////// USUARIOS  ///////////////////////////////////////////////////////



     /////////////////////////////////////////////////////// Equipos  ///////////////////////////////////////////////////////

     
     @Mutation(() => Boolean)
      async createEquipo(
        @Args('equipoInput') equipoInput: CreateEquipoInput,@Context() context,) {
        const authorization = context.req.headers.authorization;
        console.log(authorization)
        if (!authorization) {
          throw new Error('No se proporcionó un token de autorización.');
        }
        try {
          const decoded = jwt.verify(authorization,'tu_clave_secreta') as JwtPayload;;
          console.log(decoded.correo)
          const correo = decoded.correo
          if(decoded){
            const result = await this.usersService.createEquipo(equipoInput.name,correo);
            return result
          }
        } catch (error) {
          throw new Error('Token no válido. Verificación fallida.');
        }
      }

      @Mutation(() => String)
      async showInfoEquipo(@Context() context) {
        const authorization = context.req.headers.authorization;

        if (!authorization) {
          throw new Error('No se proporcionó un token de autorización.');
        }

        try {
          const decoded = jwt.verify(authorization, 'tu_clave_secreta') as JwtPayload;
          const correo = decoded.correo;

          if (decoded) {
            const result = await this.usersService.showInfoEquipo(correo);
            

        
            const jsonResult = JSON.stringify(result)
            return jsonResult;
          }
        } catch (error) {
          throw new Error('Token no válido. Verificación fallida.');
        }
      }
      @Mutation(() => Boolean)
      async updateEquipoName(
        @Args('updateNameInput') updateNameInput: UpdateEquipoNameInput,@Context() context,) {
        const authorization = context.req.headers.authorization;
        if (!authorization) {
          throw new Error('No se proporcionó un token de autorización.');
        }
        try {
          const decoded = jwt.verify(authorization, 'tu_clave_secreta') as JwtPayload;;
          const correo = decoded.correo
          if(decoded){
            const result = await this.usersService.updateEquipoName(updateNameInput,correo);
            return result
          }
        } catch (error) {
          throw new Error('Token no válido. Verificación fallida1.');
        }
      }
      @Mutation(() => Boolean)
      async deleteEquipo(
        @Args('deleteEquipoInput') deleteEquipoInput: DeleteEquipoInput,@Context() context,) {
        const authorization = context.req.headers.authorization;
        if (!authorization) {
          throw new Error('No se proporcionó un token de autorización.');
        }
        try {
          const decoded = jwt.verify(authorization, 'tu_clave_secreta') as JwtPayload;;
          const correo = decoded.correo
          if(decoded){
            const result = await this.usersService.deleteEquipo(deleteEquipoInput,correo);
            return result
          }
        } catch (error) {
          throw new Error('Token no válido. Verificación fallida.');
        }
      }
}



