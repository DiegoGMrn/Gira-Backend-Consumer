import { Query, Resolver,Args,Mutation,Context } from '@nestjs/graphql';

import { UsersService } from './users.service';
import { Users } from './users.entity';
import { Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateUserInput } from './dto/create-user.input';
import { LoginUserInput } from './dto/login-user.input';
import { UpdatePasswordInput } from './dto/update-userpass.input';
import * as jwt from 'jsonwebtoken';

@Resolver()
export class UsersResolver {
    constructor(@Inject('USERS_SERVICE') private client: ClientProxy,private usersService: UsersService){}
    
    @Query(() =>[Users])
    user(){
        return this.usersService.findAll();
    }
    
   
    //Creacion Usuario
    @Mutation(() => Users)
    createUsers(@Args('userInput') userInput: CreateUserInput) {
    const result = this.usersService.createUser(userInput);
    console.log(result)
    return result;
    }


    ////////////////////////////////////////////////// TEST CAMBIO CLAVE ///////////////////////////////////////////////
    @Mutation(() => Users)
    async resetPassword(
      @Args('resetPasswordInput') resetPasswordInput: UpdatePasswordInput,
      @Context() context,
    ) {
      const authorization = context.req.headers.authorization;

     
      if (!authorization) {
        throw new Error('No se proporcionó un token de autorización.');
      }

      try {
        
        const decoded = jwt.verify(authorization, 'tu_clave_secreta');
        if(decoded){
          const result = await this.usersService.updatePassUser(resetPasswordInput);
          return result
        }
      } catch (error) {
        throw new Error('Token no válido. Verificación fallida.');
      }
    }
    
////////////////////////////////////////////////// TEST CAMBIO CLAVE ///////////////////////////////////////////////
     @Mutation(() => String)
async loginUsersTest(@Args('loginInput') loginInput: LoginUserInput) {
  try {
    // Realiza una llamada al microservicio para obtener el token JWT
    const token = await this.usersService.loginUserTest(loginInput);

    if (token) {
        //console.log(token);
      return token; // Retorna solo el token JWT como una cadena
    } else {
      return "";
    }
  } catch (error) {
    console.error('Error en la llamada a loginUsersTest:', error);
    return "";
  }
}







}



