import { Injectable, Inject } from '@nestjs/common';
import { Users } from './users.entity'
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserInput } from './dto/create-user.input';
import { ClientProxy } from '@nestjs/microservices';
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
    
    
    



    
    


}
