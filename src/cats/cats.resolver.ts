import { Query, Resolver,Args,Mutation } from '@nestjs/graphql';
import { CatsService } from './cats.service';
import { Cats } from './cats.entity';
import { Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateCatInput } from './dto/create-cat.input';
//import { MessagePattern } from '@nestjs/microservices';
@Resolver()
export class CatsResolver {
    constructor(@Inject('CATS_SERVICE') private client: ClientProxy,private catsService: CatsService){}
    
    @Query((returns) =>[Cats])
    cats(){
        return this.catsService.findAll();
    }
    
    @Mutation((returns) => Cats)
    createCats(@Args('catInput') catInput:CreateCatInput){
        console.log('Nuevo gato creado:',catInput)
        return this.catsService.createCat(catInput);
        
    }


}
