import { Query, Resolver,Args,Mutation } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { Users } from './users.entity';
import { Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateUserInput } from './dto/create-user.input';
@Resolver()
export class UsersResolver {
    constructor(@Inject('USERS_SERVICE') private client: ClientProxy,private usersService: UsersService){}
    
    @Query((returns) =>[Users])
    user(){
        return this.usersService.findAll();
    }
    
   
    
    @Mutation((returns) => Users)
    createUsers(@Args('userInput') userInput: CreateUserInput) {
    const result = this.usersService.createUser(userInput);
    console.log(result)
    return result;
    }


}
