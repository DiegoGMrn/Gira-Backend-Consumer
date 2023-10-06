import { Query, Resolver,Args,Mutation } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { Users } from './users.entity';
import { Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateUserInput } from './dto/create-user.input';
import { LoginUserInput } from './dto/login-user.input';
@Resolver()
export class UsersResolver {
    constructor(@Inject('USERS_SERVICE') private client: ClientProxy,private usersService: UsersService){}
    
    @Query((returns) =>[Users])
    user(){
        return this.usersService.findAll();
    }
    
   
    //Creacion Usuario
    @Mutation((returns) => Users)
    createUsers(@Args('userInput') userInput: CreateUserInput) {
    const result = this.usersService.createUser(userInput);
    console.log(result)
    return result;
    }
    

    
    @Mutation((returns) => Boolean)
    async loginUsers(@Args('loginInput') loginInput: LoginUserInput) {
    try {
        const result = await this.usersService.loginUser(loginInput);
        return result;
    } catch (error) {
        console.error('Error en la llamada a loginUser:', error);
        return false;
    }
    }
}



