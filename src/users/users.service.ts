import { Injectable, Inject } from '@nestjs/common';
import { Users } from './users.entity'
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserInput } from './dto/create-user.input';
import { ClientProxy } from '@nestjs/microservices';
import { LoginUserInput } from './dto/login-user.input';
@Injectable()
export class UsersService {
    constructor(@Inject('USERS_SERVICE') private readonly client: ClientProxy,@InjectRepository(Users) private usersRepository:Repository<Users>){}
    findAll(): Promise<Users[]>{
        return this.usersRepository.find()
    }
   

    async createUser(user: CreateUserInput):Promise<Users>{
        await this.client.emit('new_user_created', user);
        return user;
    }
   
    async loginUser(user: LoginUserInput): Promise<boolean> {
        const isLoginSuccessful = await this.client.emit('login_user',user);
        console.log(isLoginSuccessful)
        if (isLoginSuccessful) {
          return true;
        } else {
          return false;
        }
    }
    
    
    



    
    


}
