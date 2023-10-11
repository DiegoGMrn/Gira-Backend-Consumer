import { Injectable, Inject } from '@nestjs/common';
import { Users } from './users.entity'
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserInput } from './dto/create-user.input';
import { ClientProxy } from '@nestjs/microservices';
import { LoginUserInput } from './dto/login-user.input';
import { firstValueFrom } from 'rxjs';
import { UpdatePasswordInput } from './dto/update-userpass.input';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {
    constructor(@Inject('USERS_SERVICE') private readonly client: ClientProxy,@InjectRepository(Users) private usersRepository:Repository<Users>,private jwtService: JwtService){}
    findAll(): Promise<Users[]>{
        return this.usersRepository.find()
    }
    
    
    async createUser(user: CreateUserInput):Promise<Users>{
        await this.client.emit('new_user_created', user);
        console.log(user)
        return user;
    }
    ////////////////////////////////////////////////// TEST CAMBIO CLAVE ///////////////////////////////////////////////
    async updatePassUser(updatePasswordInput: UpdatePasswordInput): Promise<string> {
      //await this.client.emit('password_reset', updatePasswordInput);
      const oldpass = updatePasswordInput.claveAntigua;
      const newpass = updatePasswordInput.claveNueva;
      const combinedPasswords = `Antigua contraseña: ${oldpass}, Nueva contraseña: ${newpass}`;
      
    
      return combinedPasswords;
    }
    ////////////////////////////////////////////////// TEST CAMBIO CLAVE ///////////////////////////////////////////////
    
    //////////////////////////////////////////// TESTEO JWT ////////////////////////////////////////////////////////
    async loginUserTest(user: LoginUserInput): Promise<string | null> {
      try {
        // Llama al microservicio para obtener el token JWT
        const token = await firstValueFrom(
          this.client.send<string, LoginUserInput>('login_user1', user),
        );
        console.log(token);
    
        return token; // Retorna el token JWT del microservicio o null si la autenticación falla
      } catch (error) {
        console.error('Error en la llamada a loginUserTest:', error);
        return "";
      }
    }
    
  
    
    
    
    
    



    
    


}
