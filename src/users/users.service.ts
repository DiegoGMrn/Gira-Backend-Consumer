import { Injectable, Inject } from '@nestjs/common';
import { Users } from './users.entity'
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserInput } from './dto/create-user.input';
import { ClientProxy } from '@nestjs/microservices';
import { LoginUserInput } from './dto/login-user.input';
import { Observable, firstValueFrom, from, take } from 'rxjs';
@Injectable()
export class UsersService {
    constructor(@Inject('USERS_SERVICE') private readonly client: ClientProxy,@InjectRepository(Users) private usersRepository:Repository<Users>){}
    findAll(): Promise<Users[]>{
        return this.usersRepository.find()
    }
   

    async createUser(user: CreateUserInput):Promise<Users>{
        await this.client.emit('new_user_created', user);
        console.log(user)
        return user;
    }
    
    async loginUser(user: LoginUserInput): Promise<boolean> {
      const result = await firstValueFrom(
        this.client.send<boolean, LoginUserInput>('login_user', user),
      );
      console.log('log', result);
      return result;
    }
    
  
    
    
    



    
    


}
